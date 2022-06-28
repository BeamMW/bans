import cuid from 'cuid';

export abstract class AbstractEntity {
    constructor(public gid?: string) {
        gid ? (this.gid = gid) : (this.gid = cuid());
    }
 
    equals(e1: AbstractEntity, e2: AbstractEntity) {
        return e1.gid == e2.gid
    }
}