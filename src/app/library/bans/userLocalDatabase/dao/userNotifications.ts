import { UserWallet, Notification, NotificationState, NotificationType } from '../domainObject'
import cuid from 'cuid'
import { userDatabase as database } from '../database';


export async function readAllNotifications() {
    return await database.notifications.toArray()
}

export const getNotificationsAsync = async () => await database.notifications;

export const getNotificationsByCondition = async (condition: object, callback?: any) => {
    callback = callback || null;
    return await database.notifications.where(condition).toArray(callback); 
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

export async function updateNotificationState(search: string | Notification, state: NotificationState): Promise<number> {
    if (typeof search === "string") {

    }

    return await database.notifications.update(search, { state: state });
}

/* export async function loadFavoriteBans(favoriteBans, database) {
    favoriteBans.test =
        await database.favoriteBans.where('bansName').equals(favoriteBans.id).toArray()
} */