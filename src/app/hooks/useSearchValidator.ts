import { useMemo } from "react";

export const useSearchValidator = (search) => useMemo(() => {
    if (search.length < 3) return false;

    if (!search.match(/^[a-zA-Z0-9\-\_\~]*$/i)) return false;

    return true;
}, [search]);