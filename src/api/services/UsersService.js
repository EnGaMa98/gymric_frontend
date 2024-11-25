import * as CustomAxios from "../CustomAxios.js";

export const get = async (id) => {
    return await CustomAxios.get({
        include: "",
    }, `users/${id ?? 'me'}`);
}