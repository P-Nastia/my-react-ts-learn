import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {createUpdateCart, type ICartItem} from "../store/cartSlice.ts";

export interface ICreateUpdateCartItem {
    productId: number;
    quantity: number;
}

export interface IRemoveCartItem {
    id: number;
}

export  interface ICart {
    id: number;
    items: ICartItem[];
    totalPrice: number;
}

export const apiCart = createApi({
    reducerPath: 'apiCart',
    baseQuery: createBaseQuery('Carts'),
    tagTypes: ["Carts"],
    endpoints: (builder) => ({
        getCart: builder.query<ICart, void>({
            query: () => ({
                url: 'getItems',
                method: 'GET'
            }),
            providesTags: ['Carts'],
            async onQueryStarted(_, {dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log("Get user items", result.data)
                    if(result.data && result.data.items) {
                        dispatch(createUpdateCart(result.data.items));
                    }
                } catch (error) {
                    console.log("getCart fail", error);
                }
            },
        }),

        createUpdateCart: builder.mutation<void, ICreateUpdateCartItem>({
            query: (item) => {
                try {
                    return {
                        url: 'createUpdate',
                        method: 'POST',
                        body: item,
                    };
                } catch {
                    throw new Error('Error add item to cart');
                }
            },
            invalidatesTags: ["Carts"]
        }),
        removeCartItem: builder.mutation<void, IRemoveCartItem>({
            query: (item) => {
                try {
                    return {
                        url: `delete/${item.id}`,
                        method: 'PUT'
                    };
                } catch {
                    throw new Error('Error remove item from cart');
                }
            },
            invalidatesTags: ["Carts"]
        }),
    })
});


export const {
    useGetCartQuery,
    useLazyGetCartQuery,
    useCreateUpdateCartMutation,
    useRemoveCartItemMutation
} = apiCart;