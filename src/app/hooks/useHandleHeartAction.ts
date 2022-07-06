import { createFavoriteBans, deleteFavoriteBansByName } from "@app/library/bans/userLocalDatabase/dao/userFavorites";
import { FavoriteBans } from "@app/library/bans/userLocalDatabase/domainObject";
import { loadAllFavoritesBans } from "@app/store/BansStore/actions";
import store from "index";
import { useCallback } from "react";

export const useHandleHeartAction = (isBansLove, search) => {
    return useCallback(
        (e) => {
            !!isBansLove && isBansLove.length ?
            deleteFavoriteBansByName(search) :
            createFavoriteBans(new FavoriteBans(search));
            e.stopPropagation()
            
            /* @TODO:refactor - update in store only added/removed favorites domains instead of load all batch  */
            store.dispatch(loadAllFavoritesBans.request());

        },
        [isBansLove, search]
    )
};