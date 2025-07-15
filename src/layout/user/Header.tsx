
import { Link } from "react-router-dom";
import { APP_ENV } from "../../env";
import {useAppDispatch, useAppSelector} from "../../store";
import {logout} from "../../store/authSlice.ts";
import {Button} from "antd";
import CartDrawer from "../../components/ui/cart";
import {useCart} from "../../hooks/useCart.ts";
import {apiCart} from "../../services/apiCart.ts";
import {addItem} from "../../store/localCartSlice.ts";

const Header: React.FC = () => {

    const {user} = useAppSelector(state => state.auth);

    const { cart } = useCart(user!=null);

    const dispatch = useAppDispatch();


    const logoutHandler = async () => {
        // if (!serverCart?.items) return;

        const serverCart = [...cart];
        dispatch(logout());
        console.log('Server cart', serverCart);
        dispatch(apiCart.util.resetApiState()); // очищення кешу запитів кошика
        console.log('Server cart', serverCart);
        serverCart.forEach(item => {
            dispatch(addItem(item));
        });
    }

    return (
        <header className="w-full py-4 px-6 bg-orange-500 text-white shadow-md flex justify-between">
            <h1 className="text-xl font-semibold">FoodDelivery</h1>
            <div className="flex items-center gap-4">

                {user ? (
                    <>
                        <Link to="/account" className="flex items-center gap-2">
                            <img
                                src={user.image ? `${APP_ENV.IMAGES_50_URL}${user.image}` : '/images/user/default.png'}
                                alt={user.name}
                                className="w-10 h-10 rounded-full border-2 border-white object-cover"
                            />
                            <span className="font-medium">{user.name}</span>
                        </Link>

                        <Link
                            to="/admin/home"
                            className="bg-white text-orange-500 px-3 py-1 rounded hover:bg-orange-100 transition"
                        >
                            Адмінка
                        </Link>


                        <Button
                            onClick={logoutHandler}
                            className="bg-white text-orange-500 border-none hover:bg-orange-100"
                        >
                            Вихід
                        </Button>
                    </>
                ) : (
                    <>
                        <Link
                            to="login"
                            className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition"
                        >
                            Вхід
                        </Link>

                        <Link
                            to="register"
                            className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition"
                        >
                            Реєстрація
                        </Link>
                    </>

                )}
                <CartDrawer />
                {/*<Badge count={items.length} showZero>*/}
                {/*    <Button>Кошик</Button>*/}
                {/*</Badge>*/}
            </div>



        </header>
    );
};

export default Header;
