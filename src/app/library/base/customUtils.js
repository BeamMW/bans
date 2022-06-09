import Utils from "./utils";

const MIN_AMOUNT = 0.00000001;
const MAX_AMOUNT = 254000000;

let BEAM         = null
let CallID       = 0
let Calls        = {}
let APIResCB     = undefined
let headlessNode = "eu-node01.masternet.beam.mw:8200"
let InitParams   = undefined

export default class CustomUtils extends Utils {

    static async initialize(params, initcback) {
        InitParams = params
        APIResCB = params["apiResultHandler"]
        let headless = params["headless"]
        
        let setWalletState = params["walletStateHandler"]

        console.log('###########################INIT PARAMS###########################');
        
        try
        {
            if (Utils.isDesktop()) {
                BEAM = await Utils.createDesktopAPI((...args) => Utils.handleApiResult(...args))
            } 
            
            if (Utils.isWeb()) {
                let apiver    = params["api_version"] || "current"
                let apivermin = params["min_api_version"] || ""
                let appname   = params["appname"]

                if (!Utils.isChrome()) {
                    Utils.showChromeDownload();
                    return false;
                }
                
                if (headless) {
                    BEAM = await Utils.createHeadlessAPI(
                                apiver, apivermin, appname, 
                                (...args) => Utils.handleApiResult(...args)
                            )        
                } else {
                    BEAM = await Utils.createWebAPI(
                                apiver, apivermin, appname, 
                                (...args) => Utils.handleApiResult(...args)
                            )
                }
            }

            if (Utils.isMobile()) {
                try {
                    BEAM = await Utils.createMobileAPI((...args) => Utils.handleApiResult(...args));
                } catch (e) {
                    Utils.showMobileStoresLinks();
                    return false;
                }
            }

            const delay = async (delay) => {
                return new Promise(function(resolve) {
                    setTimeout(resolve, delay);
                });
              }
              
            if (!BEAM) {
                return initcback("Failed to create BEAM API")
            }

            return initcback(null)
        }
        catch (err)
        {
            return initcback(err)
        }
    }


}