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

export interface ISearchUsers{
    currentPage: number;
    itemsPerPage: number;
}

export interface IPaginationUsersResponse{
    currentPage: number;
    totalAmount: number;
}

export interface ISearchResponse{
    users: IAdminUser[];
    pagination: IPaginationUsersResponse
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
        getSearchUsers: builder.query<ISearchResponse, ISearchUsers>({
            query: (data) => ({
                url: 'search',
                method: 'POST',
                body: data
            }),
            providesTags: ['Users'],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetSearchUsersQuery,
} = apiUser;