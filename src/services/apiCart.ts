import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {type ICartItem} from "../store/localCartSlice.ts";


export const apiCart = createApi({
    reducerPath: 'apiCart',
    baseQuery: createBaseQuery('Carts'),
    tagTypes: ["Carts"],
    endpoints: (builder) => ({
        getCart: builder.query<ICartItem[], void>({
            query: () => ({
                url: 'getItems',
                method: 'GET'
            }),
            providesTags: ['Carts']
        }),

        addToCartsRange: builder.mutation<void, ICartItem[]>({
            query: (items) => ({
                url: 'addRange',
                method: 'POST',
                body: items,
            }),
            invalidatesTags: ["Carts"],
        }),

        createUpdateCart: builder.mutation<void, ICartItem>({
            query: (item) => ({
                url: 'createUpdate',
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ["Carts"],
        }),
        removeCartItem: builder.mutation<void, number>({
            query: (id) => ({
                url: `delete/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ["Carts"],
        }),
    })
});


export const {
    useGetCartQuery,
    useCreateUpdateCartMutation,
    useRemoveCartItemMutation
} = apiCart;