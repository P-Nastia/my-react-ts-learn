export interface ICategoryItem {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface ICategoryCreate
{
    name: string;
    slug: string;
    imageFile: string;
}

export interface ICategoryEdit{
    id: number;
    name: string;
    slug: string;
    imageFile: string;
}

export interface ServerError {
    status: number;
    data: {
        errors: Record<string, string[]>;
    };
}

export interface IUserLogin{
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}

export interface IUserTokenDecode{
    email: string;
    name: string;
    image: string;
    roles: string[];
}

export interface IRegister
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    imageFile: string;
}