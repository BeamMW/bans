type DomainPresenterType = {
    name: string;
    expireAt: any;
    isExpired: any;
    isAvailable: boolean;
    isYouOwn: boolean;
}

type RawDomainType = {
    name: string;
    hExpire: number;
    key: string;
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
    protected rawDomain;
    protected currentStateTimestamp;

    constructor(rawDomain: RawDomainType, currentStateTimestamp?: false) {
        ;
    }

    protected domainBlockTimeConverter(rawExpire: number): Date {
        return new Date("now");
    }

    protected domainExpireTimeConverter(rawExpire: number): Date {
        return new Date("now");
    }

    protected domainIsExpireTimeConverter(rawExpire: number): Date {
        return new Date("now");
    }

    public getDomainPresenterData(): DomainPresenterType {
        try{
            return {
                name: DomainPresenterValidator.checkIsValidNameAndReturn(this.rawDomain.name),
                expireAt: this.domainExpireTimeConverter(this.rawDomain.hExpire),
                isExpired: this.domainIsExpireTimeConverter(this.rawDomain.hExpire),
                isAvailable: true,
                isYouOwn: true,
            }
        } catch(e) {
            throw new DomainPresenterError(e.message)
        }
        
    }


}


export const getDomainPresentedData = (rawDomain) => {
    const domainsPresenter: DomainPresenter = new DomainPresenter(rawDomain);

    return domainsPresenter.getDomainPresenterData();
}

