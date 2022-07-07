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
        role: "manager",
        action: "pay",
        requiredParams:["amount", "name"],
        type: "writable"
    },
    {
        role: "user",
        action: "my_key",
        type: "readable"
    },
    {
        role: "user",
        action: "view",
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
        action: "domain_extend",
        requiredParams: ["name", "nPeriods"],
        type: "writable"
    },
    {
        role: "user",
        action: "domain_set_owner",
        requiredParams: ["name", "pkOwner"],
        type: "writable"
    },
    {
        role: "user",
        action: "domain_set_price",
        requiredParams: ["name", "amount"],
        type: "writable"
    },
    {
        role: "user",
        action: "domain_buy",
        requiredParams: ["name"],
        type: "writable"
    },
    {
        role: "user",
        action: "receive",
        requiredParams: [],
        type: "writable"
    },
]


export default methods; 