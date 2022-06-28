import { userDatabase } from "@app/library/bans/userLocalDatabase/database";
import { useLiveQuery } from "dexie-react-hooks";

export const useIsBansFavorite = (search) => {
    return useLiveQuery(
        () => userDatabase.favoriteBans.where({ bansName: search }).toArray(),
        [search])
};
