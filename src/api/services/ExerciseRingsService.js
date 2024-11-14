import * as CustomAxios from "../CustomAxios.js";

export const list = async () => {
    return await CustomAxios.get({
        include: "",
    }, 'exercise-rings');
}

export const get = async (id) => {
    return await CustomAxios.get({
        include: "",
    }, `exercise-rings/${id}`);
}

export const create = async (data) => {
    return await CustomAxios.post(data, 'exercise-rings/new');
}