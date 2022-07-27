import { GROTHS_IN_BEAM } from "@app/constants";
import moment from 'moment';

export type DomainPresenterType = {
    rawDomain: RawDomainType;
    name: string;
    expiresAt: any;
    isExpired: any;
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

class DomainPresenterValidator {
    protected constructor() { }

    static checkIsValidNameAndReturn(rawDomainName: string): string {
        if (rawDomainName.length < 3) throw new DomainPresenterError("name is too short");

        if (!rawDomainName.match(/^[a-zA-Z0-9\-\_\~]*$/i)) throw new DomainPresenterError("contains forbidden symbols");

        return rawDomainName;
    }
}

export class DomainPresenter implements IDomainPresenter {

    protected unixTimestamp: number;

    constructor(
        protected rawDomain: RawDomainType,
        protected currentStateTimestamp?: number | null,
        protected currentStateHeight?: number | null,
        protected userPublicKey?: string
    ) {
        this.unixTimestamp = this.rawDomain?.hExpire ?
            (((this.rawDomain.hExpire - this.currentStateHeight) * 60 /*  - 100000000 */) + this.currentStateTimestamp)  * 1000 :
            null;
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

    protected domainIsExpireTimeConverter(): boolean {
        return this.unixTimestamp ?
            moment(this.unixTimestamp).isBefore() :
            null;
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
            aid: 0, amount: null
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
                price: this.resolveDomainPrice(),
                gracePeriod: () => this.unixTimestamp ? moment(this.unixTimestamp).add(90, 'days').format('LL') : null,
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

