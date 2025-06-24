import {createApi} from "@reduxjs/toolkit/query/react";
import type {IUserLogin, LoginResponse} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";

export const apiAccount = createApi({
    reducerPath: 'api/account',
    baseQuery: createBaseQuery('account'),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, IUserLogin>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = apiAccount