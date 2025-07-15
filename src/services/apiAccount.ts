import {createApi} from "@reduxjs/toolkit/query/react";
import type {IUserLogin, ILoginResponse, IRegister} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";
import {loginSuccess} from "../store/authSlice.ts";
import {apiCart} from "./apiCart.ts";

export interface IForgotPasswordRequest {
    email: string;
}

export interface IValidateTokenRequest {
    token: string;
    email: string;
}

export  interface IResetPasswordRequest {
    newPassword: string;
    token: string;
    email: string;
}


export const apiAccount = createApi({
    reducerPath: 'api/account',
    baseQuery: createBaseQuery('account'),
    tagTypes:['Account'],
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, IUserLogin>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),

            async onQueryStarted(_,{dispatch,queryFulfilled}){
                try{
                    const result=await queryFulfilled;
                    if(result.data && result.data.token){
                        dispatch(loginSuccess(result.data.token));
                        dispatch(apiCart.util.invalidateTags(["Carts"]));
                        //localStorage.removeItem('cart');
                    }
                }
                catch(error){
                    console.log("Login fail",error);
                }
            }
        }),
        loginByGoogle:builder.mutation<{token: string}, string>({
            query: (token) => ({
                url: 'googleLogin',
                method: 'POST',
                body: {token}
            }),
            async onQueryStarted(_,{dispatch,queryFulfilled}){
                try{
                    const result=await queryFulfilled;
                    if(result.data && result.data.token){
                        dispatch(loginSuccess(result.data.token));
                        dispatch(apiCart.util.invalidateTags(["Carts"]));

                    }
                }
                catch(error){
                    console.log("Login fail",error);
                }
            }
        }),
        register: builder.mutation<ILoginResponse, IRegister>({
            query: (credentials) => {
                const formData = serialize(credentials);

                return{
                    url: 'register',
                    method: 'POST',
                    body: formData};
            },
        }),
        // запуск процедури відновлння паролю по пошті
        forgotPassword: builder.mutation<void, IForgotPasswordRequest>({
            query: (data) => ({
                url: 'forgotPassword',
                method: 'POST',
                body: data
            })
        }),
        // перевірка чи дійсний токен
        validateResetToken: builder.query<{ isValid: boolean }, IValidateTokenRequest>({
            query: (params) => ({
                url: 'validateResetToken',
                params, // це додасть параметри як query string: ?token=abc&email=...
            }),
            providesTags: ['Account'],
        }),

        // встановлення нового паролю
        resetPassword: builder.mutation<void, IResetPasswordRequest>({
            query: (data) => ({
                url: 'resetPassword',
                method: 'POST',
                body: data
            })
        }),
    }),
});

export const {
    useLoginMutation,
    useLoginByGoogleMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useValidateResetTokenQuery,
} = apiAccount;