export interface Caller {
    id?: string;
    name?: string;
    slug?: {
        current?: string;
    }
}

export interface User {
    address: string,
    name: string,
    avatar: string,
    isAdmin?: boolean,
    isCaller?: boolean,
}