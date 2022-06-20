export interface Amount {
    amount: number;
    asset_id: number;
}

export interface Contract {
    amounts?: Amount[];
    contract_id: string;
}