import React from 'react';
import {Avatar, Space, Table, Tag} from 'antd';
import type { TableProps } from 'antd';
import type {IAdminUser} from "../../../services/apiUser.ts";
import {APP_ENV} from "../../../env";
import {useGetAllUsersQuery} from "../../../services/apiUser.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";

const AdminUsersPage: React.FC = () => {
    const {data, isLoading} = useGetAllUsersQuery();

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
            <Table<IAdminUser> columns={columns} dataSource={data}/>
        </>

    );
}

export default AdminUsersPage;