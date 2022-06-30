import { GROTHS_IN_BEAM } from "@app/constants";

export type DomainPresenterType = {
    rawDomain: RawDomainType;
    name: string;
    expiresAt: any;
    isExpired: any;
    isAvailable: boolean;
    isYourOwn: boolean;
    isOnSale: boolean;
    price: PriceInfo
}

export type RawDomainType = {
    searchName: string;
    hExpire?: number;
    key?: string;
    isAvailable?: boolean;
    price: PriceInfo
}

export type PriceInfo  = {
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

class DomainPresenterValidator {
    protected constructor() { }

    static checkIsValidNameAndReturn(rawDomainName: string): string {
        if (rawDomainName.length < 3) throw new DomainPresenterError("name is too short");

        return rawDomainName;
    }
}

export class DomainPresenter implements IDomainPresenter {
    protected rawDomain: RawDomainType;
    protected currentStateHeight: number | null;
    protected currentStateTimestamp: number | null;
    protected userPublicKey: string | null;

    constructor(rawDomain: RawDomainType, currentStateTimestamp?: number | null, currentStateHeight?: number | null, userPublicKey?: string) {
        this.rawDomain = rawDomain;
        this.currentStateHeight = currentStateHeight;
        this.currentStateTimestamp = currentStateTimestamp;
        this.userPublicKey = userPublicKey;
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
        const unixTimestamp = this.rawDomain?.hExpire ?
            (this.rawDomain.hExpire - this.currentStateHeight) * 60 + this.currentStateTimestamp :
            null;

        return unixTimestamp ? (new Date(unixTimestamp * 1000)).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) : null;
    }

    protected domainIsExpireTimeConverter(): boolean {
        return false;
    }

    protected resolveIsAvailable(): boolean {
        return this.rawDomain?.isAvailable || !(this.rawDomain?.key && this.rawDomain?.hExpire && !this.rawDomain?.price);
    }

    protected resolveIsYouOwn(): boolean {
        const isYourOwn = (this.rawDomain?.key && this.rawDomain?.hExpire && this.userPublicKey) && this.rawDomain.key === this.userPublicKey;
        return !!isYourOwn;
    }

    protected resolveDomainPrice(): PriceInfo {
        return this.rawDomain?.price ?? {
            aid: 0, amount: GROTHS_IN_BEAM * 640
        };
    }

    public getDomainPresenterData(): DomainPresenterType {
        try {
            return {
                rawDomain: this.rawDomain,
                name: DomainPresenterValidator.checkIsValidNameAndReturn(this.rawDomain.searchName),
                expiresAt: this.domainExpireTimeConverter(),
                isExpired: this.domainIsExpireTimeConverter(),
                isAvailable: this.resolveIsAvailable(),
                isYourOwn: this.resolveIsYouOwn(),
                isOnSale: !!this.rawDomain?.price,
                price: this.resolveDomainPrice()
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
    userPublicKey?: string
): DomainPresenterType => {
    const domainsPresenter: DomainPresenter = new DomainPresenter(rawDomain, currentStateTimestamp, currentStateHeight, userPublicKey);

    return domainsPresenter.getDomainPresenterData();
}

