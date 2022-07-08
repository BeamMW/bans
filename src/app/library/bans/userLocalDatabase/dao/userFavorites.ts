import { UserWallet, FavoriteDomains } from '../domainObject'
import cuid from 'cuid'
import { userDatabase as database } from '../database';


export async function readAllFavoriteDomains() {
    return await database.favoriteDomains.toArray()
}

export async function deleteAllFavoriteDomains() {
    return await database.favoriteDomains.clear()
}

export async function deleteFavoriteDomains(search: string): Promise<any> {
    return await database.favoriteDomains.where({domainName: search}).delete();
}

export async function createFavoriteDomains(favoriteDomains: FavoriteDomains): Promise<string> {
    return await database.favoriteDomains.put(favoriteDomains)
}

/* export async function loadFavoriteBans(favoriteBans, database) {
    favoriteBans.test =
        await database.favoriteBans.where('bansName').equals(favoriteBans.id).toArray()
} */