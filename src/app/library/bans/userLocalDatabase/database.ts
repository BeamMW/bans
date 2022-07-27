import Dexie, { Table } from 'dexie';
import { Notification } from './domainObject';
import { FavoriteDomains } from './domainObject/FavoriteDomains';
import { UserWallet } from './domainObject/UserWallet';
import 'dexie-observable';
import Utils from '../../base/utils';
import { BANS_CID } from '@app/constants';
import { resolve } from 'path';
import UtilsShader from '../../base/shader/utilsShader';

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

    constructor(databaseName: string, schema: { [tableName: string]: string; }) {
        this.database = new UserBansDatabase(databaseName);

        this.database.version(1).stores(schema);
        //for dexie-observable
        this.database.version(2).stores({});
    }

    get userDatabase(): UserBansDatabase {
        return this.database;
    }
}

export const observeDatabaseChanges = (database, callback) => {
    try {
        database.on("changes", callback);
    } catch (e) {
        console.log(e);
    }
}

//original logic without specific key
/* const databaseInstance = new InitializeDatabase('user-bans', {
    favoriteDomains: '&gid, domainName',
    notifications: '&gid, *notifyData, type, state, deffered',
});

export const userDatabase = databaseInstance.userDatabase; */


/**
 * Temporary public key fetching and initing database
 * @TODO: THIS IS TEMPORARY! PLEASE REFACTOR! WE HAVE ALREADY HAVE LOGIC IN WALLET API CONNECTOR 
 */

let userDatabaseInstance = null;

export const userDatabaseInit = (databaseName: string, uniqueDatabaseKey: string) => {
    try {
        const database = new InitializeDatabase(`${uniqueDatabaseKey}-${databaseName}`, {
            favoriteDomains: '&gid, domainName',
            notifications: '&gid, *notifyData, type, state, deffered',
        });

        return database.userDatabase;
    } catch (e) {
        throw new Error(e);
    }
}

export const getUserDatabase = async () => {
    if (!userDatabaseInstance) {

        await Utils.initialize({
            "appname": "BEAM DAO BANS APP",
            "headless": true,
            "min_api_version": "6.3",
        }, async (err) => {

            const shadersData = Array.from([
                ["bans", BANS_CID, "./bansAppShader.wasm", 0],
            ], params => new UtilsShader(...params));

            try {
                userDatabaseInstance = await Utils.bulkShaderDownload(
                    shadersData,
                    async (err, shadersData) => {
    
                        /**
                         * Set current initilized cid artificialy
                         */
                        Utils.currentShaderBytesCid = BANS_CID;
                        const bytes = Array.from(shadersData[0].shaderBytes);
    
                        const { res: { res: { key: uniqueDatabaseKey } } } = await Utils.invokeContractAsync(
                            `cid=${BANS_CID},role=user,action=my_key`,
                            bytes //first item in array - shader
                        );

                        const databaseName = "user-bans";
    
                        return userDatabaseInit(databaseName, uniqueDatabaseKey);
    
                    });
            } catch(e) {
                console.log(e);
            }
            

        });
    }

    return userDatabaseInstance;
};

export const userDatabase = await getUserDatabase();