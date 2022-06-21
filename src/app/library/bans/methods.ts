import { IMethod } from "../base/api/Interfaces";
import { ShaderActions } from "./types";


const methods: Array<IMethod<ShaderActions>> = [
    {
        role: "manager",
        action: "view",
        type: "readable"
    },
    {
        role: "manager",
        action: "view_name",
        requiredParams:["name"],
        type: "readable"
    },
    {
        role: "manager",
        action: "view_domain",
        requiredParams:[""],
        type: "readable"
    },
    {
        role: "user",
        action: "domain_register",
        requiredParams: ["name"],
        type: "writable"
    },
    {
        role: "user",
        action: "my_key",
        type: "readable"
    },
]


export default methods; 