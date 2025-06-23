export interface ICategoryItem {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface ICategoryDelete {
    id: number;
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