
import { Link } from "react-router-dom";
import { APP_ENV } from "../../env";
import {useAppDispatch, useAppSelector} from "../../store";
import {logout} from "../../store/authSlice.ts";
import {Button, Input} from "antd";
import CartDrawer from "../../components/ui/cart";
import {useCart} from "../../hooks/useCart.ts";
import {apiCart} from "../../services/apiCart.ts";
import {addItem} from "../../store/localCartSlice.ts";
import {useNavigate, useSearchParams} from "react-router";
import React from "react";

const Header: React.FC = () => {
    //const { categorySlug } = useParams<{ categorySlug: string }>();
    //console.log("categorySlug",categorySlug);
    const {user} = useAppSelector(state => state.auth);

    const { cart } = useCart(user!=null);

    const dispatch = useAppDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const value = searchParams.get("value") || "";
    const navigate = useNavigate();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const params = new URLSearchParams(searchParams);
        params.set("value", newValue);
        params.set("page", "1"); // reset to first page on new search
        setSearchParams(params);
    };

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
        navigate("/");
    }

    return (
        <header className="w-full py-4 px-6 bg-orange-500 text-white shadow-md flex justify-between">
            <Link
                to="/"
                style={{
                    fontSize: '3.0rem',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 700,
                    color: 'white',
                    textDecoration: 'none',
                }}
            >
                Pizushi
            </Link>
            <Input
                placeholder="Пошук продукту"
                value={value}
                onChange={handleSearchChange}
                style={{ width: 200 }}
            />
            <div className="flex items-center gap-4">

                {user ? (
                    <>
                        <Link to="profile" className="flex items-center gap-2">
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
                            onClick={() => logoutHandler()}
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
            </div>



        </header>
    );
};

export default Header;
