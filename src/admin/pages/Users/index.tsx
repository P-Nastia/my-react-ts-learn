import React from 'react';
import {Avatar, Checkbox, Divider, Input, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import type {IAdminUser, ISearchUsers} from "../../../services/apiUser.ts";
import {APP_ENV} from "../../../env";
import {useGetSearchUsersQuery} from "../../../services/apiUser.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import {useSearchParams} from "react-router";

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
            render: (_, {loginTypes}) => (
                <>
                    {loginTypes.map((loginType) => {
                        let color;
                        if (loginType === 'Google') {
                            color = 'volcano';
                        } else {
                            color = 'green'
                        }
                        return (
                            <Tag color={color} key={loginType}>
                                {loginType.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <a>Edit</a>
                    <a>Delete</a>
                </Space>
            ),
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

            </Space>
            <Table<IAdminUser> columns={columns} dataSource={data?.users}
                               pagination={{
                current: search.paginationRequest.currentPage,
                pageSize: search.paginationRequest.itemsPerPage,
                total: data?.pagination.totalAmount,
                onChange: handlePageChange,
                position: ['bottomCenter'],
            }}/>
        </>

    );
}

export default AdminUsersPage;