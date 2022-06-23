import { useCallback, useEffect, useState } from "react";

const useGetFavoritesDomains = async (): Promise<{domains: Array<any>}> => {
    return await new Promise((resolve, reject) => {
        resolve({domains: []});
    });
};

export default useGetFavoritesDomains;