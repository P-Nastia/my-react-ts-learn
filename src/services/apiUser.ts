import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";

export interface IAdminUser{
    id: number;
    email: string;
    image: string;
    fullName: string;
    dateCreated: string;
    roles: string[];
    isLoginGoogle: boolean;
    isLoginPassword: boolean;
}

export interface ISearchUsers{
    paginationRequest: {
        currentPage: number;
        itemsPerPage: number;
    };
    name: string;
    email: string;
    roles: string[];
    startDate?: string;
    endDate?: string;
}

export interface IPaginationResponse{
    currentPage: number;
    totalAmount: number;
}

export interface ISearchUserResponse{
    list: IAdminUser[];
    pagination: IPaginationResponse
}

export interface IEditUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

export const apiUser = createApi({
    reducerPath: 'api/users',
    baseQuery: createBaseQuery('users'),
    tagTypes: ['Users',"User"],
    endpoints: (builder) => ({
        getAllUsers: builder.query<IAdminUser[], void>({
            query: () => 'list',
            providesTags: ['Users'],
        }),
        getSearchUsers: builder.query<ISearchUserResponse, ISearchUsers>({
            query: (data) => ({
                url: 'search',
                method: 'POST',
                body: data
            }),
            providesTags: ['Users'],
        }),
        getUserById: builder.query<IAdminUser, number>({
            query: (id) => `${id}`,
            providesTags:['User']
        }),
        editUser: builder.mutation<IAdminUser, IEditUser>({
            query: (user) => {
                try {
                    const formData = serialize(user);
                    return {
                        url: 'edit',
                        method: 'PUT',
                        body: formData,
                    };
                } catch {
                    throw new Error('Error edit user');
                }
            },
            invalidatesTags: ['User','Users'],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetSearchUsersQuery,
    useEditUserMutation,
    useGetUserByIdQuery,
} = apiUser;