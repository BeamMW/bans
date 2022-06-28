import { AbstractEntity } from "./AbstractDomain";

export class FavoriteBans extends AbstractEntity {
    constructor(
        public bansName: string,
        gid?: string) {
            super(gid)
   }
}