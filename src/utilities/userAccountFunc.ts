import type {IUserTokenDecode} from "../services/types.ts";
import { jwtDecode } from 'jwt-decode';

export const getUser = (): IUserTokenDecode | null => {
    const token = localStorage.getItem('jwt-token');
    if (!token) return null;

    try {
        return jwtDecode<IUserTokenDecode>(token);
    } catch {
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem('jwt-token');
};