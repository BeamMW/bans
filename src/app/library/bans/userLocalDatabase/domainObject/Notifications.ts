import { AbstractEntity } from "./AbstractDomain";

enum NotificationType {
    favorites,
    sold,
    transferred,
}

enum NotificationState {
    active,
    deferred,
    none
};

export class Notifications extends AbstractEntity {
    constructor(
        public type: NotificationType,
        public state: NotificationState,
        public deffered: null | Date,
        gid?: string
    ) {
        super(gid)

        Object.defineProperties(this, {
            notifyData: { value: [], enumerable: false, writable: true }
        })
    }
}