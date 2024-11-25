import * as CustomAxios from "../CustomAxios.js";

export const register = async (data) => {
    return await CustomAxios.post(data, 'users/register');
}

export const login = async (data) => {
    return await CustomAxios.post(data, 'users/login');
}

export const update = async (data) => {
    return await CustomAxios.put(data, 'users/update');
}
export const logout = async (data) => { 
    return await CustomAxios.post(data, 'users/logout');
}