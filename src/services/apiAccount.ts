import {createApi} from "@reduxjs/toolkit/query/react";
import type {IUserLogin} from "./types.ts";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";

export const apiAccount = createApi({
    reducerPath: 'api/account',
    baseQuery: createBaseQuery('account'),
    tagTypes: ['User'],
    endpoints: (builder) => ({

        login: builder.mutation<{ token: string }, IUserLogin>({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response: { token: string }) => {
                localStorage.setItem("jwt-token", response.token);
                return response;
            },
            invalidatesTags: ['User'],
        }),

    }),
});

export const { useLoginMutation } = apiAccount