import { UserWallet, FavoriteBans } from '../domainObject'
import cuid from 'cuid'
import { Database, IUserDatabase, UserBansDatabase } from '../database';

/**
 * Read all contacts
 */
export async function readAllFavoriteBans(database) {
    return await database.favoriteBans.toArray()
}

/**
 * Delete all favorites
 */
export async function deleteAllFavoriteBans(database) {
    return await database.favoriteBans.clear()
}

export async function createFavoriteBans(database, favoriteBans: FavoriteBans): Promise<string> {
    return await database.favoriteBans.put(favoriteBans)
}

/* export async function loadFavoriteBans(favoriteBans, database) {
    favoriteBans.emails =
        await database.favoriteBans.where('bansName').equals(favoriteBans.id).toArray()
} */