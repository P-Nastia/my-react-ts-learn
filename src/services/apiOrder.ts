import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utilities/createBaseQuery.ts";
import {serialize} from "object-to-formdata";

export interface IBaseSelectItem {
    id: number;
    name: string;
}


export interface ISearchPostDepartment {
    cityId: number;
    name: string;
}

export interface ICreateOrderItem {
    recipientName: string;
    postDepartmentId: number;
    phoneNumber: number;
    paymentTypeId: number;
}

export interface IOrder {
    id: number;
    status: string;
    dateCreated: string;
    totalPrice: number;
    deliveryInfo: IDeliveryInfo;
    orderItems: IOrderItem[];
}

export interface IDeliveryInfo {
    recipientName: string;
    phoneNumber: string;
    postDepartment: ISimpleType;
    paymentType: ISimpleType;
    city: ISimpleType;
}

export interface ISimpleType {
    id: number;
    name: string;
}

export interface IOrderItem {
    priceBuy: number;
    count: number;
    productId: number;
    productSlug: string;
    productName: string;
    productImage: string;
}

export const apiOrder = createApi({
    reducerPath: 'apiOrder',
    baseQuery: createBaseQuery('order'),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getUserOrders: builder.query<IOrder[], string>({
            query: (token) => ({
                url: 'list',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            providesTags: ['Order'],
        }),
        getPaymentTypes: builder.query<IBaseSelectItem[], void>({
            query: () => 'payment-types',
            providesTags: ['Order'],
        }),
        getCities: builder.query<IBaseSelectItem[], string>({
            query: (city) => ({
                url: `search-city`,
                params: {
                    city,
                },
            }),

            providesTags: ['Order'],
        }),
        getPostDepartments: builder.query<IBaseSelectItem[], ISearchPostDepartment>({
            query: ({ cityId, name }) => ({
                url: 'post-departments',
                params: {
                    cityId,
                    name,
                },
            }),
            providesTags: ['Order'],
        }),
        createOrder: builder.mutation<void, ICreateOrderItem>({
            query: (newOrder) => {
                const formData = serialize(newOrder);
                return {
                    url: 'create',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Order'],
        })
    }),
});

export const {
    useGetPaymentTypesQuery,
    useGetCitiesQuery,
    useGetPostDepartmentsQuery,
    useCreateOrderMutation,
    useGetUserOrdersQuery,
} = apiOrder;