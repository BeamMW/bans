import { UserWallet, FavoriteBans } from '../domainObject'
import cuid from 'cuid'
import { userDatabase as database } from '../database';


export async function readAllFavoriteBans() {
    return await database.favoriteBans.toArray()
}

export async function deleteAllFavoriteBans() {
    return await database.favoriteBans.clear()
}

export async function deleteFavoriteBansByName(search: string): Promise<any> {
    return await database.favoriteBans.where({bansName: search}).delete();
}

export async function createFavoriteBans(favoriteBans: FavoriteBans): Promise<string> {
    return await database.favoriteBans.put(favoriteBans)
}

/* export async function loadFavoriteBans(favoriteBans, database) {
    favoriteBans.test =
        await database.favoriteBans.where('bansName').equals(favoriteBans.id).toArray()
} */