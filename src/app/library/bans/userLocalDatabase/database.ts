import Dexie, { Table } from 'dexie';
import { Notification } from './domainObject';
import { FavoriteDomains } from './domainObject/FavoriteDomains';
import { UserWallet } from './domainObject/UserWallet';
import 'dexie-observable';
import connector from '@core/connector';
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
let currentShaderBytesCid = null;

const bulkShaderDownload = async (shaderList: Array<UtilsShader>) => {
    const sortedShadersData = [...shaderList].sort((a, b) => (a.order < b.order ? 1 : -1));
    await Promise.all(sortedShadersData.map(async (shaderData) => {
        const bytes = await fetch(shaderData.path).then((response) => response.arrayBuffer());
        await shaderData.prepareAndSetShaderBytes(bytes);
    }));
    return sortedShadersData;
};

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
        await connector.connect({ headless: true });
        const shadersData = Array.from([
            ["bans", BANS_CID, "./bansAppShader.wasm", 0],
        ], params => new UtilsShader(...params));

        try {
            const downloadedShaders = await bulkShaderDownload(shadersData);
            if (currentShaderBytesCid !== BANS_CID) {
                currentShaderBytesCid = BANS_CID;
            }
            const bytes = Array.from(downloadedShaders[0].shaderBytes);
            const result: any = await connector.invokeContract(
                `cid=${BANS_CID},role=user,action=my_key`,
                bytes
            );
            const uniqueDatabaseKey = result?.res?.key;
            const databaseName = "user-bans";
            userDatabaseInstance = userDatabaseInit(databaseName, uniqueDatabaseKey);
        } catch(e) {
            console.log(e);
        }
    }

    return userDatabaseInstance;
};

export const userDatabase = await getUserDatabase();