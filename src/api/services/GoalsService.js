import * as CustomAxios from "../CustomAxios.js";

export const list = async () => {
    return await CustomAxios.get({
        include: "",
    }, 'goals');
}

export const get = async (id) => {
    return await CustomAxios.get({
        include: "",
    }, `goals/${id}`);
}

export const create = async (data) => {
    return await CustomAxios.post(data, 'goals/new');
}