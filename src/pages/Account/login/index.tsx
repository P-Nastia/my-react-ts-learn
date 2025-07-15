import {Link} from "react-router";
import { Form, type FormProps, Input, message} from "antd";
import type {IUserLogin, ServerError} from "../../../services/types.ts";
import {useFormServerErrors} from "../../../utilities/useFormServerErrors.ts";
import LoadingOverlay from "../../../components/ui/loading/LoadingOverlay.tsx";
import {useLoginByGoogleMutation, useLoginMutation} from "../../../services/apiAccount.ts";
import {useGoogleLogin} from "@react-oauth/google";
import {useGetCartQuery, useLazyGetCartQuery} from "../../../services/apiCart.ts";
import {useAppSelector} from "../../../store";
import {useNavigate} from "react-router-dom";


const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [triggerGetCart] = useLazyGetCartQuery();    const { user } = useAppSelector(state => state.auth);
    const { data: serverCart, isLoading: isLoadingCart } = useGetCartQuery(undefined, {
        skip: !user, // <-- only run after login
    });
    const [login, { isLoading: isLoginLoading, isError }] = useLoginMutation();
    const [loginByGoogle, { isLoading: isGoogleLoading }] = useLoginByGoogleMutation();

    const [form] = Form.useForm<IUserLogin>();
    const setServerErrors = useFormServerErrors(form);

    console.log("Server cart", serverCart?.items);

    console.log("isLoadingCart", isLoadingCart, "serverCart", serverCart);
    const onFinish: FormProps<IUserLogin>['onFinish'] = async (values) => {
        try {
            await login(values).unwrap();
            // console.log("Local store", serverCart?.items);
            triggerGetCart();
            //await asyncCartLocalStorage();
            navigate('/');



        } catch (error) {
            const serverError = error as ServerError;

            if (serverError?.status === 400 && serverError?.data?.errors) {
                setServerErrors(serverError.data.errors);
            } else {
                message.error("Сталася помилка при вході");
            }
        }
    };

    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) =>
        {
            try {
                await loginByGoogle(tokenResponse.access_token).unwrap();
                triggerGetCart();
                // await asyncCartLocalStorage();
                navigate('/');
            } catch (error) {

                const serverError = error as ServerError;

                if (serverError?.status === 400 && serverError?.data?.errors) {
                    setServerErrors(serverError.data.errors);
                } else {
                    message.error("Сталася помилка при вході");
                }
            }
        },
    });



    return (
        <div className="min-h-[600px] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800 animate-fade-in">
                {(isLoginLoading || isGoogleLoading)  && <LoadingOverlay />}

                <h2 className="text-2xl font-semibold text-center text-orange-500 mb-6">Вхід в акаунт</h2>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="space-y-4"
                >
                    <Form.Item<IUserLogin>
                        label={<span className="text-gray-700 dark:text-white font-medium">Email</span>}
                        name="email"
                        rules={[{ required: true, message: 'Вкажіть email' }]}
                    >
                        <Input
                            className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </Form.Item>

                    <Form.Item<IUserLogin>
                        label={<span className="text-gray-700 dark:text-white font-medium">Пароль</span>}
                        name="password"
                        rules={[{ required: true, message: 'Вкажіть пароль' }]}
                    >
                        <Input.Password
                            className="rounded-lg py-2 px-4 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-orange-400 transition"
                        />
                    </Form.Item>

                    {isError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                            Неправильний логін або пароль
                        </div>
                    )}

                    <div className="flex justify-end">
                        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                            Забули пароль?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                    >
                        {isLoginLoading ? 'Logging in...' : 'Login'}
                    </button>

                    <button
                        onClick={(event) => {
                            event.preventDefault();
                            loginUseGoogle();
                        }}
                        className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                    >
                        {'LoginGoogle'}
                    </button>
                </Form>
            </div>
        </div>

    );
}

export default LoginPage;