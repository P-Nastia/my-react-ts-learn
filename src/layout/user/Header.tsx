
import { Link } from "react-router-dom";
import { APP_ENV } from "../../env";
import {useContext} from "react";
import {UserContext} from "../../context/UserContext.tsx";

const Header: React.FC = () => {
    const userContext=useContext(UserContext);

    const {user, logout} = userContext;

    return (
        <header className="w-full py-4 px-6 bg-orange-500 text-white shadow-md flex justify-between items-center">
            <h1 className="text-xl font-semibold">FoodDelivery</h1>
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        {user.roles.includes("Admin") ? (
                            <Link to="/admin/home">Адмінка</Link>
                        ): (<></>)}

                        <img
                            src={`${APP_ENV.IMAGES_200_URL}${user.image}`}
                            alt="User avatar"
                            className="w-8 h-8 rounded-full"
                        />
                        <div onClick={logout} className="cursor-pointer">
                            Logout
                        </div>
                    </>
                ) : (
                    <Link to="account/login">Login</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
