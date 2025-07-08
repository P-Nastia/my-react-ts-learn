import { Button, Form, type FormProps, Input, message,Checkbox } from "antd";
import type { ServerError } from "../../../../services/types.ts";
import { useNavigate, useParams } from "react-router";
import LoadingOverlay from "../../../../components/ui/loading/LoadingOverlay.tsx"
import { useFormServerErrors } from "../../../../utilities/useFormServerErrors.ts";
import {type IEditUser, useEditUserMutation, useGetUserByIdQuery} from "../../../../services/apiUser.ts";

const AdminUserEditPage: React.FC = () => {
    const navigate = useNavigate();

    const params = useParams<{ id: number }>();
    const id = params.id || 0;
    console.log("ID",id);

    const { data: user, isLoading: isLoadingUser, isError: isErrorUser } = useGetUserByIdQuery(id);
    console.log("USER",user);

    const [editUser, { isLoading: isLoadingEdit }] = useEditUserMutation();

    const [form] = Form.useForm<IEditUser>();
    const setServerErrors = useFormServerErrors(form);
    const allRoles = ['Admin', 'User'];

    const onFinish: FormProps<IEditUser>['onFinish'] = async (values) => {
        try {
            const result = await editUser(values).unwrap();
            message.success(`Користувача "${result.id}" успішно відредаговано`);
            navigate(-1);
        } catch (error) {
            const serverError = error as ServerError;

            if (serverError?.status === 400 && serverError?.data?.errors) {
                setServerErrors(serverError.data.errors);
            } else {
                message.error("Сталася помилка при зміні категорії");
            }
        }
    };

    if (isLoadingUser) return <p>Завантаження користувача...</p>;
    if (isErrorUser || !user) return <p>Користувача не знайдена.</p>;

    const [firstName, ...rest] = user.fullName.split(' ');
    const lastName = rest.join(' ');

    const initialValues = {
        id: user.id,
        firstName,
        lastName,
        email: user.email,
        roles: user.roles,
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            {(isLoadingEdit) && <LoadingOverlay />}
            <div className="max-w-full overflow-x-auto">
                <h1>Редагувати користувача</h1>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={onFinish}
                    layout="horizontal"
                    initialValues={initialValues}
                >
                    <Form.Item name="id" noStyle>
                        <Input type="hidden" />
                    </Form.Item>

                    <Form.Item<IEditUser>
                        label="Ім'я"
                        name="firstName"
                        rules={[{ required: true, message: "Вкажіть ім'я користувача" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<IEditUser>
                        label="Прізвище"
                        name="lastName"
                        rules={[{ required: true, message: 'Вкажіть прізвище користувача' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<IEditUser>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Вкажіть пошту користувача' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<IEditUser>
                        label="Ролі"
                        name="roles"
                        rules={[{ required: true, message: 'Виберіть хоча б одну роль' }]}
                    >
                        <Checkbox.Group options={allRoles} />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Змінити
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default AdminUserEditPage;