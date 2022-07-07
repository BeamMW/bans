import { BANS_CID } from "@app/constants";
import { getGlobalApiProviderValue } from "@app/contexts/Bans/BansApiProvider";
import methods from "@app/library/bans/methods";
import ShaderApi from "@app/library/base/api/ShaderApi";
import { delay } from "@app/library/base/appUtils";
import _ from "lodash";

export const getBansApi = () => {
    let bansApi;

    try {
        bansApi = !_.isEmpty(getGlobalApiProviderValue()) ? getGlobalApiProviderValue() : (() => {
            const bansShader = ShaderApi.useShaderStore.retriveShader(BANS_CID)
            const bansApi = new ShaderApi(bansShader, methods);

            return bansApi.getRegisteredMethods();
        })()
    } catch (e) {
        throw new Error(e.message);        
    }


    return bansApi;
}
