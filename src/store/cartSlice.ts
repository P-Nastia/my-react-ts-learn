import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
    id?: number;
    productId?: number;
    categoryId?: number;
    name?: string;
    categoryName?: string;
    quantity?: number;
    price?: number;
    imageName?: string;
}

export  interface ICartState {
    items: ICartItem[];
    totalPrice: number;
    isSync: boolean;
}


const initialState: ICartState = {
    items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')!) : [],
    totalPrice: 0,
    isSync: false,
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        createUpdateCart: (state, action: PayloadAction<ICartItem[]>) => {
            state.items = action.payload;
            state.totalPrice = action.payload.reduce(
                (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0),
                0
            );
        },
    },
});

export const {createUpdateCart} = cartSlice.actions;


export default cartSlice.reducer;