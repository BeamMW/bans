import { AbstractEntity } from "./AbstractDomain";
import { FavoriteBans } from "./FavoriteBans";

export class UserWallet extends AbstractEntity {
    bans: FavoriteBans[]
  
    constructor(
      public address: string,
      public publicKey: string,
      gid?: string
    ) {
      super(gid)
      Object.defineProperties(this, {
        favoriteBans: { value: [], enumerable: false, writable: true }
      });
    }
  }