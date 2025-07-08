import React from 'react';
import {Avatar, Checkbox, Divider, Input, Space, Table, Tag, DatePicker } from 'antd';
import type { TableProps } from 'antd';
import type {IAdminUser, ISearchUsers} from "../../../services/apiUser.ts";
import {APP_ENV} from "../../../env";
import {useGetSearchUsersQuery} from "../../../services/apiUser.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import {Link, useSearchParams} from "react-router";
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';

const AdminUsersPage: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const allRoles = ['Admin', 'User'];

    const search: ISearchUsers = {
        paginationRequest: {
            currentPage: parseInt(searchParams.get('page') || '1', 10),
            itemsPerPage: parseInt(searchParams.get('itemsPerPage') || '5', 10),
        },
        name: searchParams.get('name') || '',
        email: searchParams.get('email') || '',
        roles: searchParams.get('roles')?.split(',').filter(r => r) || [],
        startDate: searchParams.get("startDate") || undefined,
        endDate: searchParams.get("endDate") || undefined,
    };

    const { data, isLoading } = useGetSearchUsersQuery(search);

    console.log("DATA",data)

    const handlePageChange = (page: number, pageSize?: number) => {
        setSearchParams(prev => ({
            ...Object.fromEntries(prev.entries()),
            page: String(page),
            itemsPerPage: String(pageSize || search.paginationRequest.itemsPerPage),
        }));
    };

    const handleFilterChange = (key: string, value: string | string[]) => {
        setSearchParams(prev => {
            const updated = {
                ...Object.fromEntries(prev.entries()),
                page: '1',
                [key]: Array.isArray(value) ? value.join(',') : value,
            };

            if (!value || (Array.isArray(value) && value.length === 0)) {
                delete updated[key];
            }

            return updated;
        });
    };

    const handleDateChange = (dates: null | [dayjs.Dayjs, dayjs.Dayjs]) => {
        if (!dates) {

            setSearchParams(prev => {
                const params = Object.fromEntries(prev.entries());
                delete params.startDate;
                delete params.endDate;
                params.page = '1';
                return params;
            });
        } else {

            setSearchParams(prev => ({
                ...Object.fromEntries(prev.entries()),
                startDate: dates[0].toISOString(),
                endDate: dates[1].toISOString(),
                page: '1',
            }));
        }
    };

    const columns: TableProps<IAdminUser>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (url: string) => <Avatar src={`${APP_ENV.IMAGES_200_URL}${url}`}/>,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Date Created',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
            render: (date) => <a>{new Date(date).toLocaleDateString()}</a>
        },
        {
            title: 'Roles',
            key: 'roles',
            dataIndex: 'roles',
            render: (_, {roles}) => (
                <>
                    {roles.map((role) => {
                        let color;
                        if (role === 'Admin') {
                            color = 'volcano';
                        } else {
                            color = 'green'
                        }
                        return (
                            <Tag color={color} key={role}>
                                {role.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Login Types',
            key: 'loginTypes',
            dataIndex: 'loginTypes',
            render: (_, {isLoginPassword,isLoginGoogle}) => (
                <>
                    {isLoginPassword?  (
                        <Tag color={'green'} key={"Password"}>
                {"Password".toUpperCase()}
                </Tag>
            ) : <></>}
                    {isLoginGoogle?  (
                        <Tag color={'green'} key={"Password"}>
                            {"Password".toUpperCase()}
                        </Tag>
                    ) : <></>}

                </>
            ),
        },
        {
            title: 'Action',
            key: 'id',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`edit/${record.id}`}>Edit</Link>
                    <a>Delete</a>
                </Space>
            )
        },
    ];
    return (
        <>
            {isLoading && <LoadingOverlay/>}
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search by name"
                    value={search.name}
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                    style={{ width: 200 }}
                />
                <Input
                    placeholder="Search by email"
                    value={search.email}
                    onChange={(e) => handleFilterChange('email', e.target.value)}
                    style={{ width: 200 }}
                />
                <Divider>Filter by Roles</Divider>
                <Checkbox.Group
                    options={allRoles}
                    value={search.roles}
                    onChange={(checkedValues) => handleFilterChange('roles', checkedValues as string[])}
                />

                <div className="flex flex-col">
                    <label htmlFor="dateRange" className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Діапазон дат створення
                    </label>
                    <RangePicker
                        id="dateRange"
                        className="dark:bg-gray-800 dark:text-white"
                        onChange={handleDateChange}
                        value={
                            search.startDate && search.endDate
                                ? [dayjs(search.startDate), dayjs(search.endDate)]
                                : null
                        }
                    />
                </div>
            </Space>

            <Table<IAdminUser> columns={columns} dataSource={data?.users}
                               pagination={{
                current: search.paginationRequest.currentPage,
                pageSize: search.paginationRequest.itemsPerPage,
                total: data?.pagination.totalAmount,
                onChange: handlePageChange,
                pageSizeOptions: [5,10,15,20],
                position: ['bottomCenter']
            }}
            />
        </>

    );
}

export default AdminUsersPage;