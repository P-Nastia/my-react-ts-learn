import {createApi} from "@reduxjs/toolkit/query/react";
import type {ICategoryCreate, ICategoryItem} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";

export const apiCategory = createApi({
    reducerPath: 'api',
    baseQuery: createBaseQuery('categories'),
    endpoints: (builder) => ({
        getAllCategories: builder.query<ICategoryItem, void>({
            query: () => ''
        }),
        createCategory: builder.mutation<ICategoryItem, ICategoryCreate>({ // спочатку те, що вертає, потім -- шо вертає запит
            query:(newCategory) =>{
                try {
                    const formData= serialize(newCategory); // перетворення JSON
                    return {
                        url: '',
                        method: 'POST',
                        body: formData
                    }
                }
                catch {
                    throw new Error('Error create category');
                }
}
        })
    }),
});

// queryrtk 
export const { useGetAllCategoriesQuery,useCreateCategoryMutation } = apiCategory;
