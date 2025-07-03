import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";

export interface IAdminUser{
    id: number;
    email: string;
    image: string;
    fullName: string;
    dateCreated: string;
    roles: string[];
    loginTypes: string[];
}

export const apiUser = createApi({
    reducerPath: 'api/users',
    baseQuery: createBaseQuery('users'),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<IAdminUser[], void>({
            query: () => 'list',
            providesTags: ['Users'],
        }),

    }),
});

export const {
    useGetAllUsersQuery
} = apiUser;