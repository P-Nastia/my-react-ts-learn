import {Button, Form, type FormProps, Input} from "antd";
import type {IUserLogin} from "../../../services/types.ts";
import {useLoginMutation} from "../../../services/apiAccount.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../store";
import {getUserFromToken, loginSuccess} from "../../../store/authSlice.ts";

const LoginPage: React.FC = () => {

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const onFinish: FormProps<IUserLogin>["onFinish"] = async (values) => {
        try {
            // console.log("Begin login", values);
            const response = await login(values).unwrap();
            const {token} = response;
            dispatch(loginSuccess(token)); // залогінить користувача

            const user = getUserFromToken(token);
            if(!user || !user.roles.includes("Admin")){
                navigate('/');
            }
            else{
                navigate('/admin/home');
            }
        } catch (error) {
            console.log("ERROR",error);
            // const serverError = error as ServerError;
            //
            // if (serverError?.status === 400 && serverError?.data?.errors) {
            //     setServerErrors(serverError.data.errors);
            // } else {
            //     message.error("Сталася помилка при авторизації");
            // }
        }
    };

    return (
        (
            <>
                <div className="flex justify-center items-center min-h-[70vh] px-4">
                    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
                        {isLoading && <LoadingOverlay />}

                        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
                            Вхід до акаунту
                        </h1>

                        <Form
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item<IUserLogin>
                                label="Пошта"
                                name="email"
                                rules={[{ required: true, message: "Вкажіть пошту" }]}
                            >
                                <Input placeholder="Введіть адресу пошти" />
                            </Form.Item>

                            <Form.Item<IUserLogin>
                                label="Пароль"
                                name="password"
                                rules={[{ required: true, message: "Вкажіть пароль" }]}
                            >
                                <Input.Password placeholder="Введіть пароль" />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button  htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </>

        )
    );
}

export default LoginPage;