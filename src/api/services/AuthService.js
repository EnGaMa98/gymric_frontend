import * as CustomAxios from "../CustomAxios.js";

export const register = async (data) => {
    return await CustomAxios.post(data, 'users/register');
}