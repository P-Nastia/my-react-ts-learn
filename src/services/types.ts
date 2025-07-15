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

export interface IAuthResponse {
    token: string;
}

export interface IRegister
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    imageFile: string;
}


export interface ProductSizeModel {
    id: number;
    name: string;
}

export interface ProductIngredientModel {
    id: number;
    name: string;
    image: string;
}

export interface ProductImageModel {
    id: number;
    name: string;
    priority: number;
}

export interface ProductItemModel {
    id: number;
    name: string;
    slug: string;
    price: number;
    weight: number;
    category?: ICategoryItem;
    productSize?: ProductSizeModel;
    productIngredients?: ProductIngredientModel[];
    productImages?: ProductImageModel[];
}

export interface IProductCreate {
    name: string;
    slug: string;
    price: number;
    weight: number;
    categoryId: number;
    productSizeId: number;
    ingredientIds?: number[];
    imageFiles?: File[];
}