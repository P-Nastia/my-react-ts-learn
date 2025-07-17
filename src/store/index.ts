import {configureStore} from "@reduxjs/toolkit";
import {apiCategory} from "../services/apiCategory.ts";
import {apiAccount} from "../services/apiAccount.ts";
import {apiProduct} from "../services/apiProduct.ts";
import authReducer from "./authSlice.ts"
import localCarReducer from './localCartSlice.ts';
import {type TypedUseSelectorHook, useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {apiUser} from "../services/apiUser.ts";
import {apiCart} from "../services/apiCart.ts";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [apiCategory.reducerPath]: apiCategory.reducer,
        [apiAccount.reducerPath]: apiAccount.reducer,
        [apiProduct.reducerPath]: apiProduct.reducer,
        [apiUser.reducerPath]: apiUser.reducer,
        [apiCart.reducerPath]: apiCart.reducer,
        localCart: localCarReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiCategory.middleware,
            apiAccount.middleware,
            apiProduct.middleware,
            apiUser.middleware,
            apiCart.middleware
        ),
});
setupListeners(store.dispatch);
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector