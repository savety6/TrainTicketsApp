export type User = {};
export type Ticket = {};
export type Train = {};
export type Station = {};
export type Route = {};

export type UserActionIncomingData = {
    name: string;
    email?: string;
    password: string;
};

export type UserActionResponse = {
    status: 'success' | 'error';
    message: string;
    token?: string;
}