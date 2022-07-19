import Dexie, { Table } from 'dexie';
import { Notification } from './domainObject';
import { FavoriteDomains } from './domainObject/FavoriteDomains';
import { UserWallet } from './domainObject/UserWallet';
import 'dexie-observable';

export interface Friend {
    id?: number;
    name: string;
    age: number;
}

export interface IUserDatabase {

}

export class Database extends Dexie {
    constructor(databaseName: string) {
        super(databaseName);
    }

    /**
     * Delete the entire database
     */
    async deleteDatabase() {
        try {
            await this.delete()
        } catch (err) {
            console.error;
        }
    }

    /**
     * Open a  database
     */
    async openDatabase() {
        try {
            await this.open()
        } catch (err) {
            console.error
        }
    }

    /**
     * Clear all tables
     */
    async clearAllTables(database) {
        try {
            await Promise.all([
                database.favoriteDomains.clear()
            ]);
        } catch (err) {
            console.error
        }

    }

}

/**
 * For specific purposes like several tables special realtion methods
 */
export class UserBansDatabase extends Database implements IUserDatabase {
    public favoriteDomains!: Table<FavoriteDomains, string>
    public notifications!: Table<Notification, string>
    //public userWallet: Table<UserWallet, string>

    constructor(databaseName: string) {
        try {
            super(databaseName);
        } catch (err) {
            if (err instanceof Dexie.InvalidTableError) {
                console.log("Seems to be an invalid table here...");
            } else {
                throw err;
            }
        }
    }
}

class InitializeDatabase {
    protected database: UserBansDatabase;

    constructor(databaseName:string, schema: { [tableName: string]: string; }) {
        this.database = new UserBansDatabase(databaseName);

        this.database.version(1).stores(schema);
        //for dexie-observable
        this.database.version(2).stores({}); 
    }

    get userDatabase(): UserBansDatabase{
        return this.database;
    }
}

export const observeDatabaseChanges = (database, callback) => {
    try {
        database.on("changes", callback);
    } catch(e) {
        console.log(e);
    }
}


const databaseInstance = new InitializeDatabase('user-bans', {
    favoriteDomains: '&gid, domainName',
    notifications: '&gid, *notifyData, type, state, deffered',
});

export const userDatabase = databaseInstance.userDatabase;
