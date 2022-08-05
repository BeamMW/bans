export type ShaderActions =
    "view" |
    "view_params" |
    "view_name" |
    "domain_register" |
    "my_key" |
    "view_domain" |
    "pay" |
    "domain_extend" |
    "domain_set_owner" |
    "domain_buy" |
    "domain_set_price" |
    "receive" |
    "receive_all" |
    "receive_list";


export enum ShaderTransactionComments {
    setDomainPrice = "BANS: setting the domain price",
    setExtendDomain = "BANS: extending the domain registration period",
    setDomainOwner = "BANS: setting the domain owner",
    setRegisterDomain = "BANS: registering domain",
    setBuyDomain = "BANS: buying the domain",

    sendVaultAnon = "vault_anon send anon",
    receiveVaultAnon = "vault_anon receive",
}