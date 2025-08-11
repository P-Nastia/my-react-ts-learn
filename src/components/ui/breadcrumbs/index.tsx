import {useLocation, Link} from "react-router-dom";

const Breadcrumbs=()=>{
    const location = useLocation();
    const pathNames = location.pathname
        .split("/")
        .filter(value => value && isNaN(Number(value)));

    return (
        <nav className="text-orange-300 my-3">
            <ul className="flex space-x-1 items-center">
                <li>
                    <Link to="/" className="hover:underline">Home</Link>
                </li>
                {pathNames.map((value, index) => {
                    const last = index === pathNames.length - 1;
                    const to = `/${pathNames.slice(0, index + 1).join("/")}`;
                    const title = value;

                    return (
                        <li key={to} className="flex items-center space-x-1">
                            <span className="mx-1 text-gray-400">/</span>
                            {last ? (
                                <span className="text-gray-500">{title}</span>
                            ) : (
                                <Link to={to} className="hover:underline">
                                    {title}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}

export default Breadcrumbs;