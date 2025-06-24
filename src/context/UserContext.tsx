
import React, { createContext, useState, ReactNode } from "react";
import { getUser as getUserFromToken, logout as logoutUtil } from "../utilities/userAccountFunc";

interface IUserContext {
    user: ReturnType<typeof getUserFromToken> | null;
    setUser: React.Dispatch<React.SetStateAction<ReturnType<typeof getUserFromToken> | null>>;
    logout: () => void;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState(() => getUserFromToken());

    const logout = () => {
        logoutUtil();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
