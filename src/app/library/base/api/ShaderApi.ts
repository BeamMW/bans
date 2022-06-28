import Utils from "@library/base/utils"
import ApiError from "./ApiError";
import { IShaderApi } from "./Interfaces";
import ShaderApiAbstract from "./ShaderApiAbstract";
import { IMethod, IRegisteredMethods, IShaderStore } from "./Interfaces";
import UtilsShader from "../shader/utilsShader";
import { ShaderApiGenerator } from "./ShaderApiGenerator";
import { MethodRoles } from "./types";

export class ShaderStore implements IShaderStore{

    protected static shaderStore: Map<string, UtilsShader> = new Map<string, UtilsShader>();

    protected constructor(){}

    static addShaderToStore(shaderData: UtilsShader): void {
        if(ShaderStore.shaderStore.has(shaderData.cid)) {
            console.log(`We do not rewirite ${shaderData.shaderName} shader in ShaderStore`);
            //ShaderStore.shaderStore.delete(shaderData.cid);
        }
            
        ShaderStore.shaderStore.set(shaderData.cid, shaderData);

    }

    static retriveShader(cid: string): UtilsShader | undefined {
        if(!ShaderStore.shaderStore.has(cid))
            throw new ApiError(0, "shader with " + cid + " cid does not exists in ShaderStore", false);

        return ShaderStore.shaderStore.get(cid);
    }

    static clearStorage() {
        ShaderStore.shaderStore.clear();
    }

}

export default class ShaderApi<ShaderActions> extends ShaderApiAbstract implements IShaderApi {

    public static useShaderStore: IShaderStore = ShaderStore;

    protected registeredMethods: any/* IRegisteredMethods<ShaderActions> */ = {};

    //protected methodGenerator: ShaderApiGenerator<ShaderActions>;
    //protected shaderData: UtilsShader;
    
    public constructor(shaderData: UtilsShader, methodsList: Array<IMethod<ShaderActions>>) {
        super(shaderData.cid);

        if (!(shaderData instanceof UtilsShader))
            throw new ApiError(0, "shaderData have to be UtilsShader instance", false);

        //Fill ShaderStore
        ShaderStore.addShaderToStore(shaderData);

        this.registeredMethods = ShaderApiGenerator.generateShaderApi/* <ShaderActions> */(
            shaderData.cid,
            methodsList 
        );
    }

    public getRegisteredMethods () {
        if(Object.keys(this.registeredMethods).length === 0)
            throw new ApiError(0, "Methods not registered in ShaderAPI", false);

        return this.registeredMethods;
    }

}

