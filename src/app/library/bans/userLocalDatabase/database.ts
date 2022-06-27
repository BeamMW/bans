import Dexie, { Table } from 'dexie';
import { FavoriteBans } from './domainObject/FavoriteBans';
import { UserWallet } from './domainObject/UserWallet';

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
    async deleteDatabase(database) {
        try {
            await database.delete()
        } catch (err) {
            console.error;
        }
    }

    /**
     * Open a  database
     */
    async openDatabase(database) {
        try {
            await database.open()
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
                database.userWallet.clear(),
                database.favoriteBans.clear()
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
    public favoriteBans!: Table<FavoriteBans, string>
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
    protected database: Database;

    constructor(databaseName:string, schema: { [tableName: string]: string; }) {
        this.database = new UserBansDatabase(databaseName);

        this.database.version(1).stores(schema);
    }

    get userDatabase(): Database{
        return this.database;
    }
}


export const database = new InitializeDatabase('user-favorite-bans', {
    favoriteBans: '&gid, bansName',
});
