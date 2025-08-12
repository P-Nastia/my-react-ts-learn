import {Link, useNavigate} from "react-router";
import {Button, Form, type FormProps, Input, message} from "antd";
import type { ServerError} from "../../../services/types.ts";
import {useFormServerErrors} from "../../../utilities/useFormServerErrors.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import {
    type IEditModel,
    useEditMutation,
    useChangePasswordMutation,
    type IChangePasswordRequest
} from "../../../services/apiAccount.ts";
import ImageUploadFormItem from "../../../components/ui/form/ImageUploadFormItem.tsx";
import {APP_ENV} from "../../../env";
import {useAppSelector} from "../../../store";
import { useAppDispatch } from "../../../store";
import { loginSuccess } from "../../../store/authSlice";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import {useState} from "react";

const ProfilePage: React.FC = () => {

    const navigate = useNavigate();
    const {user} = useAppSelector(state => state.auth);

    const [form] = Form.useForm<IEditModel>();
    const parts = user?.name?.trim().split(' ');
    const dispatch = useAppDispatch();
    if(parts){
        const lastName = parts[0] || '';
        const firstName = parts.slice(1).join(' ') || '';
        form.setFieldsValue({
            ...user,
            firstName,
            lastName,
        });
    }

    const [edit, {isLoading}] = useEditMutation();
    const setServerErrors = useFormServerErrors(form);

    const [changePasswordForm] = Form.useForm<IChangePasswordRequest>();
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [changePassword] = useChangePasswordMutation();

    const onFinish: FormProps<IEditModel>['onFinish'] = async (values) => {
        try {
            const result = await edit(values).unwrap();
            if (result?.token) {
                dispatch(loginSuccess(result.token));
                message.success('Профіль оновлено');
                navigate('/');
            } else {
                message.error('Не вдалося оновити токен після зміни профілю');
            }

        } catch (error) {
            const serverError = error as ServerError;

            if (serverError?.status === 400 && serverError?.data?.errors) {
                setServerErrors(serverError.data.errors);
            } else {
                message.error("Сталася помилка при створенні акаунта");
            }
        }
    };

    const onFinishChangePassword: FormProps<IChangePasswordRequest>['onFinish'] = async (values) => {
        try {
            await changePassword(values).unwrap();
            message.success("Пароль успішно змінено");
            changePasswordForm.resetFields();
            setChangePasswordVisible(false);
        } catch (error: any) {
            const serverError = error as ServerError;
            if (serverError?.status === 400 && serverError?.data?.oldPassword) {
                changePasswordForm.setFields([
                    {
                        name: "oldPassword",
                        errors: [serverError.data.oldPassword],
                    },
                ]);
            } else {
                message.error("Помилка при зміні пароля");
            }
        }
    };

    return (
        <>
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 animate-fade-in">
                    {isLoading && <LoadingOverlay />}

                    <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">Профіль користувача</h2>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="space-y-4"
                    >
                        <ImageUploadFormItem name="image" label="" src={`${APP_ENV.IMAGES_400_URL}${user.image}`}  />

                        <Form.Item<IEditModel>
                            label={<span className="text-gray-700 dark:text-white font-medium"></span>}
                            name="email"
                            rules={[{ required: true, message: 'Вкажіть email' }]}
                        >
                            <Input
                                className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                            />
                        </Form.Item>

                        <Form.Item<IEditModel>
                            label={<span className="text-gray-700 dark:text-white font-medium"></span>}
                            name="firstName"
                            rules={[{ required: true, message: "Вкажіть ім'я" }]}
                        >
                            <Input
                                className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                            />
                        </Form.Item>

                        <Form.Item<IEditModel>
                            label={<span className="text-gray-700 dark:text-white font-medium"></span>}
                            name="lastName"
                            rules={[{ required: true, message: 'Вкажіть прізвище' }]}
                        >
                            <Input
                                className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition"
                            >
                                Зберегти зміни
                            </Button>
                        </Form.Item>
                    </Form>

                    <Form
                        form={changePasswordForm}
                        layout="vertical"
                        onFinish={onFinishChangePassword}
                        className="mt-4 space-y-4"
                    >

                        {!changePasswordVisible ? (
                            <Button
                                type="default"
                                icon={<EditOutlined />}
                                onClick={() => setChangePasswordVisible(true)}
                                className="text-orange-500 border-orange-500 hover:bg-orange-50"
                            >
                                Змінити пароль
                            </Button>
                        ) : (
                            <>
                                <Form.Item<IChangePasswordRequest>
                                    label="Старий пароль"
                                    name="oldPassword"
                                    rules={[
                                        { required: true, message: "Введіть старий пароль" }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item<IChangePasswordRequest>
                                    label="Новий пароль"
                                    name="newPassword"
                                    rules={[
                                        { required: true, message: "Введіть новий пароль" },
                                        { min: 6, message: "Пароль має містити щонайменше 6 символів" }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item className="flex gap-2">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="bg-orange-500 hover:bg-orange-600 text-white mx-8"
                                    >
                                        Змінити пароль
                                    </Button>
                                    <Button
                                        icon={<CloseOutlined />}
                                        danger
                                        onClick={() => {
                                            setChangePasswordVisible(false);
                                            changePasswordForm.resetFields(['newPassword']);
                                        }}
                                        className={"mx-5"}
                                    >
                                        Скасувати
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form>

                    <Link
                        to="/orders"
                        className="text-orange-500 border-orange-500 hover:bg-orange-50 mt-5"
                    >
                        Переглянути історію замовлень
                    </Link>

                </div>
            </div>
        </>
    );
}

export default ProfilePage;