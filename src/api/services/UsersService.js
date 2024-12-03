import * as CustomAxios from "../CustomAxios.js";

export const get = async (id) => {
    return await CustomAxios.get({
        include: "",
    }, `users/${id ?? 'me'}`);
}
export const update = async (id, data) => {
    return await CustomAxios.post(data, `users/${id ?? 'me'}`);
}