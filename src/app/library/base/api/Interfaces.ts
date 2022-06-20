import UtilsShader from "../shader/utilsShader";
import { MethodRoles, MethodType } from "./types";

export interface IApiAbstract {
    cid?: string;
}

export interface IShaderApiGenerator extends IApiAbstract {
    methodFactory: IMethodFactory; 
}

export interface IShaderApi extends IApiAbstract {

}

export interface IMethodFactory {
    createShaderMethod(type: string)
}

export interface IMethod<ShaderActions> {
    role: MethodRoles;
    action: ShaderActions;
    type: MethodType;
    requiredParams?: Array<string>;
    couldPredict?: boolean;
}

export interface IRegisteredMethods<ShaderActions> {
    (key: MethodRoles): any/* & {
        (action: ShaderActions): Function
    } */;
}

export interface ShaderStore {
    addShaderToStore: void,
    retriveShader:  UtilsShader | undefined,
}