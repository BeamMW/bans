import { useCallback, useEffect, useState } from "react";

const useGetFavoritesDomains = async () => {
    return await new Promise((resolve, reject) => {
        resolve({domains: []});
    });
};

export default useGetFavoritesDomains;