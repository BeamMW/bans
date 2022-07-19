import store from "index";
import { END, eventChannel } from "redux-saga";
import { call, fork, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { getBansApi } from '@app/utils/getBansApi';
import _ from "lodash";
import { createNotification, deleteNotification, getNotificationFavoriteDomain, getNotificationsAsync, getNotificationsByCondition, readAllActiveNotifications, readAllNotifications } from "@app/library/bans/userLocalDatabase/dao/userNotifications";
import { Notification, NotificationState, NotificationType } from "@app/library/bans/userLocalDatabase/domainObject";
import { userDatabase } from "@app/library/bans/userLocalDatabase";
import { actions } from ".";

const secs = 4;

const externalNotificationsEventChannel = eventChannel(emitter => {

  const unsubscribe = () => {
    emitter(END);
  };

  try {

    const interval = setInterval(() => {
      if (secs <= 0)
        return unsubscribe;

      const bandApiMethods: any/* ShaderActions */ = getBansApi();

      bandApiMethods.managerViewDomain().then(result => {
        emitter(result)
      }).catch(error => {
        throw new Error(error);
      });
    }, secs * 1000);

    return () => {
      clearInterval(interval)
      return unsubscribe;
    }

  } catch (e) {
    console.log(e);
    return unsubscribe;
  }
});

const wrapperExternalNotificationsEventChannel = function* () {
  return externalNotificationsEventChannel;
}


const domainNamesPreparedForSale = (payload): Array<string> => {
  return _.filter(payload, domain => !!domain?.price)
    .map(domain => domain.name);
}

const domainNamesPreparedWithdrawnFromSale = (payload): Array<string> => {
  return _.filter(payload, domain => !("price" in domain))
    .map(domain => domain.name);
}

//@TODO: move in database logic layer
const notificationDomainObjectFactory = ({ type, state, data }) => {
  const notification = new Notification(
    type, state
  );

  notification.notifyData = data;

  return notification
}

function* notificationsFavoritesOnSaleSaga(payload: { domains: Array<any> } = { domains: [] }) {
  try {
    const state = (yield select()) as { shared; bans };

    const favoritesDomains = state.bans.allFavoritesDomains;
    const receivedDomains = payload.domains;

    if (!favoritesDomains.length || !receivedDomains.length) return;

    const favoritesStoresInNotifications = yield call(
      getNotificationsByCondition, { type: NotificationType.favorites }
    );

    const receivedDomainNamesPrepared = domainNamesPreparedForSale(receivedDomains);
    const favoriteDomainsOnSale = _.chain(favoritesDomains)
      .filter(favoriteDomain => receivedDomainNamesPrepared.includes(favoriteDomain.name))
      .filter(favoriteDomain => {
        const favoriteDomainsNamesNotification = favoritesStoresInNotifications.length ?
          _.map(favoritesStoresInNotifications, ({ notifyData }) => notifyData.domain.name) :
          [];

        return favoriteDomainsNamesNotification.length ? !favoriteDomainsNamesNotification.includes(favoriteDomain.name) : true;
      })
      .value();


    for (const domain of favoriteDomainsOnSale) {

      const notification = notificationDomainObjectFactory({
        type: NotificationType.favorites,
        state: NotificationState.active,
        data: { domain: domain }
      });

      yield call(createNotification, notification);
    }

  } catch (err) {
    externalNotificationsEventChannel.close();
    console.log(err);
  }
}

function* notificationsFavoritesWithdrawnFromSaleSaga(payload: { domains: Array<any> } = { domains: [] }) {
  try {
    const state = (yield select()) as { shared; bans; notifications; };

    const favoritesDomains = state.bans.allFavoritesDomains;
    const receivedDomains = payload.domains;

    if (!favoritesDomains.length || !receivedDomains.length) return;

    const favoritesStoresInNotifications = yield call(
      getNotificationsByCondition, { type: NotificationType.favorites }
    );

    const receivedDomainNamesPrepared = domainNamesPreparedWithdrawnFromSale(receivedDomains);

    const notificationsForRemoving = _.chain(favoritesStoresInNotifications)
      .filter(({ notifyData }) => receivedDomainNamesPrepared.includes(notifyData.domain.name))
      .value();

    for (const entry of notificationsForRemoving) {
      yield call(deleteNotification, entry.gid);
    }  

  } catch (e) {
    console.log(e);
  }
}

function* notificationFavoriteDomainRemoved(
  action: ReturnType<typeof actions.notificationFavoriteDomainRemoved>
) {
  try {
    const removedFavoriteDomain = action.payload;
    const favoriteDomainInStorage = yield call(getNotificationFavoriteDomain, removedFavoriteDomain);

    yield call(deleteNotification, favoriteDomainInStorage.gid);
  } catch(e) {
    console.log(e);
  }

}


function* notificationsEntriesChangedSaga(
  action: ReturnType<typeof actions.updateNotifications.request>
) {
  try {
    const entry = action.payload;

    if (entry.state !== NotificationState.active) return;

    const state = (yield select()) as { notifications; };
    const notifications = _.chain(state.notifications.queue)
      .filter(notification => notification.gid !== entry.gid)
      .union([entry])
      .value();

    yield put(actions.updateNotifications.success(notifications));
  } catch (e) {
    console.log(e);
    yield put(actions.updateNotifications.failure(e))
  }
}

function* loadFavoritesNotificationsFromDatabaseSaga(
  action?: ReturnType<typeof actions.reinitNotifications.request>
) {
  try {
    const notifications = yield call(readAllActiveNotifications);

    yield put(actions.initNotifications.success(notifications));
  } catch (e) {
    yield put(actions.initNotifications.failure(e));
    console.log(e);
  }
}

export default function* notificationsSaga() {
  if (userDatabase.isOpen) {
    //init
    yield call(loadFavoritesNotificationsFromDatabaseSaga);

    //event channel based
    yield takeLatest(externalNotificationsEventChannel, notificationsFavoritesOnSaleSaga);
    yield takeLatest(externalNotificationsEventChannel, notificationsFavoritesWithdrawnFromSaleSaga);

    //by action
    yield takeEvery(actions.updateNotifications.request, notificationsEntriesChangedSaga);
    yield takeLatest(actions.notificationFavoriteDomainRemoved, notificationFavoriteDomainRemoved);
    yield takeLatest(actions.reinitNotifications.request, loadFavoritesNotificationsFromDatabaseSaga);
  }
}

