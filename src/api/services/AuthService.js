import * as CustomAxios from "../CustomAxios.js";

export const login = async (data) => {
    return await CustomAxios.post(data, 'users/login');
}

export const register = async (data) => {
    return await CustomAxios.post(data, 'users/register');
}

export const logout = async (data) => { 
    return await CustomAxios.post(data, 'users/me/logout');
}