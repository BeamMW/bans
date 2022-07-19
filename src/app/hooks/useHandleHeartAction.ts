import { createFavoriteDomains, deleteFavoriteDomains } from "@app/library/bans/userLocalDatabase/dao/userFavorites";
import { FavoriteDomains } from "@app/library/bans/userLocalDatabase/domainObject";
import { loadAllFavoritesDomains } from "@app/store/BansStore/actions";
import { notificationFavoriteDomainRemoved } from "@app/store/NotificationsStore/actions";
import store from "index";
import { useCallback } from "react";

export const useHandleHeartAction = (isBansLove, search) => {
    return useCallback(
        (e) => {
            !!isBansLove && isBansLove.length ?
                (
                    deleteFavoriteDomains(search),
                    //@TODO: maybe not the best place for operating with indexDB throught saga
                    store.dispatch(notificationFavoriteDomainRemoved(search))

                ) :
                createFavoriteDomains(new FavoriteDomains(search));

            e.stopPropagation()

            /* @TODO: not optimized! refactor - update in store only added/removed favorites domains instead of load all batch  */
            store.dispatch(loadAllFavoritesDomains.request());

        },
        [isBansLove, search]
    )
};