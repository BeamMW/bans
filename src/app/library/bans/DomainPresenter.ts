import moment from 'moment';

/**
 * BANS contract stores `m_hExpire` as Beam chain Height (blocks), not a Unix time.
 * `s_PeriodValidity = 1440 * 365` blocks/year ⇒ ~1 block / minute ⇒ this many seconds per height step.
 * @see beam/bvm/Shaders/bans/contract.h — NameService::Domain::m_hExpire, s_PeriodHold
 */
export const BANS_BLOCK_TIME_SECONDS = 60;

/** Contract grace after paid period: `s_PeriodHold = 1440 * 90` blocks (~90 days at 1 block/min). */
export const BANS_GRACE_DAYS_APPROX = 90;

/** Must match `NameService::Domain::s_PeriodHold` in the BANS contract (`contract.h`). */
export const BANS_PERIOD_HOLD_BLOCKS = 1440 * 90;

export type DomainPresenterType = {
    rawDomain: RawDomainType;
    name: string;
    expiresAt: any;
    isExpired: any;
    /** True only while wall time is after paid end and before grace deadline; see `gracePeriod` */
    isInGracePeriod: boolean | null;
    isAvailable: boolean;
    isYourOwn: boolean;
    isOnSale: boolean;
    price: PriceInfo
    gracePeriod: any;
}

export type RawDomainType = {
    searchName: string;
    hExpire?: number;
    key?: string;
    isAvailable?: boolean;
    price?: PriceInfo
}

export type PriceInfo = {
    aid: number,
    amount: number
}

interface IDomainPresenterValidator {
    checkIsValidName: Function
}

interface IDomainPresenter {
    getDomainPresenterData: Function
}

class DomainPresenterError extends Error { }

/** Wallet / chain clock hints — some APIs fill `tip_*` but leave `current_*` at 0 */
export type DomainSystemClockHint = {
    tip_height?: number | null;
    tip_state_timestamp?: number | null;
};

function toFiniteNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === '') return null;
    const n = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(n) ? n : null;
}

/** First strictly positive finite number among candidates */
function firstPositiveHeight(...candidates: Array<number | null | undefined>): number | null {
    for (const c of candidates) {
        const n = toFiniteNumber(c);
        if (n !== null && n > 0) return n;
    }
    return null;
}

/** Beam wallet may send seconds or ms; normalize to Unix seconds */
function toUnixSeconds(value: unknown): number | null {
    const n = toFiniteNumber(value);
    if (n === null || n <= 0) return null;
    return n > 1e12 ? Math.floor(n / 1000) : Math.floor(n);
}

/** App shader wraps `view_name` payload in DocGroup `res` — flatten so `hExpire` / `key` are on the domain object */
export function mergeShaderResIntoRawDomain(raw: RawDomainType): RawDomainType {
    const r = raw as Record<string, unknown>;
    const inner = r.res;
    if (inner && typeof inner === 'object' && !Array.isArray(inner)) {
        return { ...r, ...(inner as Record<string, unknown>) } as RawDomainType;
    }
    return raw;
}

class DomainPresenterValidator {
    protected constructor() { }

    static checkIsValidNameAndReturn(rawDomainName: string): string {
        if (rawDomainName.length < 3) throw new DomainPresenterError("name is too short");

        if (!rawDomainName.match(/^[a-zA-Z0-9\-\_\~]*$/i)) throw new DomainPresenterError("contains forbidden symbols");

        return rawDomainName;
    }
}

export class DomainPresenter implements IDomainPresenter {

    protected unixTimestamp: number | null;

    constructor(
        protected rawDomain: RawDomainType,
        protected currentStateTimestamp?: number | null,
        protected currentStateHeight?: number | null,
        protected userPublicKey?: string,
        protected systemClockHint?: DomainSystemClockHint | null,
    ) {
        const hExpire = toFiniteNumber(this.rawDomain?.hExpire);
        if (hExpire === null) {
            this.unixTimestamp = null;
            return;
        }

        const chainHeight = firstPositiveHeight(
            this.currentStateHeight,
            this.systemClockHint?.tip_height,
        );

        let tsSec =
            toUnixSeconds(this.currentStateTimestamp) ??
            toUnixSeconds(this.systemClockHint?.tip_state_timestamp);

        if (chainHeight !== null && tsSec === null) {
            tsSec = Math.floor(Date.now() / 1000);
        }

        if (chainHeight === null || tsSec === null) {
            this.unixTimestamp = null;
            return;
        }

        const expirationHeightDiff = hExpire - chainHeight;
        this.unixTimestamp = (tsSec + expirationHeightDiff * BANS_BLOCK_TIME_SECONDS) * 1000;
    }

    get rawSearch() {
        return this.rawDomain.searchName;
    }

    public static convertHeightToTimestamp() {

    }

    protected domainBlockTimeConverter(): Date {
        return new Date("now");
    }

    protected domainExpireTimeConverter(): string {
        return this.unixTimestamp ?
            moment(this.unixTimestamp).format('LL') :
            null;
    }

    /** True once wall time is past the paid registration end (`m_hExpire`). Stays true after grace ends. */
    protected domainIsExpireTimeConverter(): boolean | null {
        return this.unixTimestamp != null ? moment().isAfter(moment(this.unixTimestamp)) : null;
    }

    /** True only between end of paid term and end of hold/grace window (contract `s_PeriodHold` ≈ 90 days). */
    protected domainIsInGracePeriodConverter(): boolean | null {
        if (this.unixTimestamp == null) return null;
        const paidEnd = moment(this.unixTimestamp);
        const graceEnd = moment(this.unixTimestamp).add(BANS_GRACE_DAYS_APPROX, 'days');
        const now = moment();
        return now.isAfter(paidEnd) && now.isBefore(graceEnd);
    }

    /** Paid term and hold/grace are over — name is reclaimable; shader may still return the old owner fields. */
    protected isPastGracePeriod(): boolean {
        if (this.unixTimestamp == null) return false;
        return (
            this.domainIsExpireTimeConverter() === true &&
            this.domainIsInGracePeriodConverter() === false
        );
    }

    protected resolveIsAvailable(): boolean {
        if (this.isPastGracePeriod()) return true;
        return this.rawDomain?.isAvailable || !(this.rawDomain?.key && this.rawDomain?.hExpire && !this.rawDomain?.price);
    }

    protected resolveIsYouOwn(): boolean {
        const isYourOwn = (this.rawDomain?.key && this.rawDomain?.hExpire && this.userPublicKey) && this.rawDomain.key === this.userPublicKey;
        return !!isYourOwn;
    }

    protected gracePeriod(): string {
        return this.unixTimestamp ? moment(this.unixTimestamp).add(BANS_GRACE_DAYS_APPROX, 'days').format('LL') : null;
    }

    protected resolveDomainPrice(): PriceInfo {
        return this.rawDomain?.price ?? {
            aid: 0, amount: null
        };
    }

    /**
     * Mirrors contract `Domain::IsExpired(h)`: `h >= m_hExpire + s_PeriodHold`.
     * When chain height is missing, falls back to wall-clock `isPastGracePeriod()` (same window the UI already uses for reclaimability).
     */
    protected isContractExpiredForResale(): boolean {
        const hExpire = toFiniteNumber(this.rawDomain?.hExpire);
        const chainHeight = firstPositiveHeight(
            this.currentStateHeight,
            this.systemClockHint?.tip_height,
        );

        if (hExpire !== null && chainHeight !== null) {
            return chainHeight >= hExpire + BANS_PERIOD_HOLD_BLOCKS;
        }

        return this.isPastGracePeriod();
    }

    /** Non-zero listing amount — matches contract “for sale” check on `m_Price.m_Amount`. */
    protected hasActiveListPrice(): boolean {
        const amount = toFiniteNumber(this.rawDomain?.price?.amount);
        return amount !== null && amount > 0;
    }

    public getDomainPresenterData(): DomainPresenterType {
        try {
            const listingDead = this.hasActiveListPrice() && this.isContractExpiredForResale();
            const isOnSale = this.hasActiveListPrice() && !this.isContractExpiredForResale();
            const price = listingDead
                ? { aid: 0, amount: null }
                : this.resolveDomainPrice();

            return {
                rawDomain: this.rawDomain,
                name: DomainPresenterValidator.checkIsValidNameAndReturn(this.rawDomain.searchName),
                expiresAt: this.domainExpireTimeConverter(),
                isExpired: this.domainIsExpireTimeConverter(),
                isInGracePeriod: this.domainIsInGracePeriodConverter(),
                isAvailable: this.resolveIsAvailable(),
                isYourOwn: this.resolveIsYouOwn(),
                isOnSale,
                price,
                gracePeriod: this.gracePeriod(),
            }
        } catch (e) {
            throw new DomainPresenterError(e.message)
        }
    }
}

export const getDomainPresentedData = (
    rawDomain: RawDomainType,
    currentStateTimestamp?: number | null,
    currentStateHeight?: number | null,
    userPublicKey?: string,
    systemClockHint?: DomainSystemClockHint | null,
): DomainPresenterType => {
    const merged = mergeShaderResIntoRawDomain(rawDomain);
    const domainsPresenter: DomainPresenter = new DomainPresenter(
        merged,
        currentStateTimestamp,
        currentStateHeight,
        userPublicKey,
        systemClockHint,
    );

    return domainsPresenter.getDomainPresenterData();
}

