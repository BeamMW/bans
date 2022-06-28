import { createFavoriteBans, deleteFavoriteBansByName } from "@app/library/bans/userLocalDatabase/dao/userFavorites";
import { FavoriteBans } from "@app/library/bans/userLocalDatabase/domainObject";
import { useCallback } from "react";

export const useHandleHeartAction = (isBansLove, search) => {
    return useCallback(
        () => !!isBansLove && isBansLove.length ?
            deleteFavoriteBansByName(search) :
            createFavoriteBans(new FavoriteBans(search)),
        [isBansLove, search]
    )
};