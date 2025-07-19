import { Outlet} from "react-router";
import Header from "./Header.tsx"

const UserLayout: React.FC = () => {

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
            <Header />

            <main className="flex-1 p-4 md:p-6">
                <Outlet />
            </main>

            <footer className="w-full py-3 px-6 bg-gray-100 text-sm text-center dark:bg-gray-800 dark:text-gray-300">
                © 2025 Pizushi. Усі права захищено.
            </footer>
        </div>
    );
};

export default UserLayout;
