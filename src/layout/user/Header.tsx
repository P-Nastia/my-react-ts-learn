
import { Link } from "react-router-dom";
import { APP_ENV } from "../../env";
import {getUser, logout} from "../../utilities/userAccountFunc.ts"
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const user=getUser();

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
                        <div onClick={()=>{logout();navigate("/")}} className="cursor-pointer">
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
