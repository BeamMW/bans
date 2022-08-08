import hash from "object-hash";

export const generateTransactionId = (data: string | object) => {
    if (typeof data == 'object')
        throw new Error("Do not support yet!");

    return hash(data);

}