import { userDatabase } from "@app/library/bans/userLocalDatabase/";
import { useLiveQuery } from "dexie-react-hooks";

export const useIsBansFavorite = (search) => {
    return useLiveQuery(
        () => userDatabase.favoriteDomains.where({ domainName: search }).toArray(),
        [search])
};
