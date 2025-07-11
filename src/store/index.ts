import {configureStore} from "@reduxjs/toolkit";
import {apiCategory} from "../services/apiCategory.ts";
import {apiAccount} from "../services/apiAccount.ts";
import {apiProduct} from "../services/apiProduct.ts";
import authReducer from "./authSlice.ts"
import cartReducer from "./cartSlice.ts"
import {type TypedUseSelectorHook, useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {apiUser} from "../services/apiUser.ts";

export const store = configureStore({
    reducer: {
        [apiCategory.reducerPath]: apiCategory.reducer,
        [apiAccount.reducerPath]: apiAccount.reducer,
        [apiProduct.reducerPath]: apiProduct.reducer,
        [apiUser.reducerPath]: apiUser.reducer,
        auth: authReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiCategory.middleware)
            .concat(apiAccount.middleware)
            .concat(apiProduct.middleware)
            .concat(apiUser.middleware),
});

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector