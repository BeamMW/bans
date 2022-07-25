import { AbstractEntity } from "./AbstractDomain";

export enum NotificationType {
    favorites = 0,
    sold = 1,
    transferred = 2,
    gifted = 3,
}

export enum NotificationState {
    active = 0,
    deferred = 1,
    none = 3,
    disabled = 4
};

export class Notification extends AbstractEntity {
    
    notifyData: object;
    
    constructor(
        public type: NotificationType,
        public state: NotificationState,
        public deffered?: null | Date,
        gid?: string
    ) {
        super(gid)
        this.deffered = deffered || null;
    }

    set notifyDataSetter(data) {
        this.notifyData = data;
    }
}