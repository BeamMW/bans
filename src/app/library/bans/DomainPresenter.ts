export type DomainPresenterType = {
    name: string;
    expireAt: any;
    isExpired: any;
    isAvailable: boolean;
    isYourOwn: boolean;
}

export type RawDomainType = {
    searchName: string;
    hExpire?: number;
    key?: string;
    isAvailable?: boolean;
}


interface IDomainPresenterValidator {
    checkIsValidName: Function
}

interface IDomainPresenter {
    getDomainPresenterData: Function
}

class DomainPresenterError extends Error {}

class DomainPresenterValidator {
    protected constructor(){}

    static checkIsValidNameAndReturn(rawDomainName:string): string {
        if(rawDomainName.length < 3) throw new DomainPresenterError("name is too short");

        return rawDomainName;
    }
}

export class DomainPresenter implements IDomainPresenter {
    protected rawDomain: RawDomainType;
    protected currentStateTimestamp: number | null;
    protected userPublicKey: string | null;

    constructor(rawDomain: RawDomainType, currentStateTimestamp?: null, userPublicKey?: string) {
        this.rawDomain = rawDomain;
        this.currentStateTimestamp = currentStateTimestamp;
        this.userPublicKey = userPublicKey;
    }

    get rawSearch(){
        return this.rawDomain.searchName;
    }

    protected domainBlockTimeConverter(): Date {
        return new Date("now");
    }

    protected domainExpireTimeConverter(): Date {
        return new Date("now");
    }

    protected domainIsExpireTimeConverter(): Date {
        return new Date("now");
    }

    protected resolveIsAvailable(): boolean {
        return this.rawDomain?.isAvailable || !(this.rawDomain?.key && this.rawDomain?.hExpire);
    }

    protected resolveIsYouOwn(): boolean {
        const isYourOwn = (this.rawDomain?.key && this.rawDomain?.hExpire && this.userPublicKey) && this.rawDomain.key === this.userPublicKey;
        return !!isYourOwn;
    }

    public getDomainPresenterData(): DomainPresenterType {
        try{
            return {
                name: DomainPresenterValidator.checkIsValidNameAndReturn(this.rawDomain.searchName),
                expireAt: this.domainExpireTimeConverter(),
                isExpired: this.domainIsExpireTimeConverter(),
                isAvailable: this.resolveIsAvailable(),
                isYourOwn: this.resolveIsYouOwn(),
            }
        } catch(e) {
            throw new DomainPresenterError(e.message)
        }
    }
}

export const getDomainPresentedData = (rawDomain: RawDomainType, currentStateTimestamp?: null, userPublicKey?: string): DomainPresenterType => {
    const domainsPresenter: DomainPresenter = new DomainPresenter(rawDomain, currentStateTimestamp, userPublicKey);

    return domainsPresenter.getDomainPresenterData();
}

