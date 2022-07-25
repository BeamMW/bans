import { UserWallet, Notification, NotificationState, NotificationType } from '../domainObject'
import cuid from 'cuid'
import { userDatabase as database } from '../database';
import { DomainPresenterType } from '../../DomainPresenter';
import { domainToASCII } from 'url';


export async function readAllNotifications() {
    return await database.notifications.toArray()
}

export async function readAllActiveNotifications() {
    return await database.notifications.where({state:NotificationState.active}).toArray()
}

export const getNotificationsAsync = async () => await database.notifications;

export const getNotificationsByCondition = async (condition: object, callback?: any) => {
    callback = callback || null;
    return await database.notifications.where(condition).toArray(callback);
}

export const getNotificationFavoriteDomain = async (domain: DomainPresenterType | string) => {
    const domainName = typeof domain !== "string" ? domain.name : domain;

    return await database.notifications
        .where({ "type": NotificationType.favorites })
        .and((value) => value.notifyData?.domain.name === domainName )
        .first();
}

export async function deleteAllNotifications() {
    return await database.notifications.clear()
}

export async function deleteNotification(gid: string): Promise<any> {
    return await database.notifications.where({ gid }).delete();
}

export async function createNotification(notification: Notification): Promise<string> {
    return await database.notifications.put(notification);
}

export async function bulkCreateNotification(notifications: Array<Notification>): Promise<string> {
    return await database.notifications.bulkAdd(notifications);
}

export async function updateNotificationState(search: string | Notification, state: NotificationState): Promise<number> {
    if (typeof search === "string") {

    }

    return await database.notifications.update(search, { state: state });
}

/* export async function loadFavoriteBans(favoriteBans, database) {
    favoriteBans.test =
        await database.favoriteBans.where('bansName').equals(favoriteBans.id).toArray()
} */