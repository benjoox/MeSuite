// @flow

export interface IAccount {
    date: string;
    amount: string;
    description: string;
    balance: string;
    category: string;
    account: string;
}

export interface IUser {
    email: string;
    createdAt?: string;
}
