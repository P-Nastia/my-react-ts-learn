import {createApi} from "@reduxjs/toolkit/query/react";
import type {IUserLogin, ILoginResponse, IRegister} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";

export interface IForgotPasswordRequest {
    email: string;
}

export const apiAccount = createApi({
    reducerPath: 'api/account',
    baseQuery: createBaseQuery('account'),
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, IUserLogin>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        loginByGoogle:builder.mutation<{token: string}, string>({
            query: (token) => ({
                url: 'googleLogin',
                method: 'POST',
                body: {token}
            })
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
        forgotPassword: builder.mutation<IForgotPasswordRequest,void>({
            query: (data) => ({
                url: 'forgotPassword',
                method: 'POST',
                body: {data},
            }),
        }),
        // перевірка чи дійсний токен
        validateResetToken: builder.mutation<{token: string},boolean>({
            query: (token) => ({
                url: 'validateResetToken',
                method: 'POST',
                body: {token},
            }),
        }),
        // встановлення нового паролю
        resetPassword: builder.mutation<{password: string},void>({
            query: (password) => ({
                url: 'resetPassword',
                method: 'POST',
                body: {password},
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLoginByGoogleMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useValidateResetTokenMutation,
} = apiAccount;