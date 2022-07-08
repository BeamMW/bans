import { AbstractEntity } from "./AbstractDomain";

export class FavoriteDomains extends AbstractEntity {
    constructor(
        public domainName: string,
        gid?: string) {
            super(gid)
   }
}