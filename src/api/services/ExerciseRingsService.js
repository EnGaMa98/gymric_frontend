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

export const save = async (id, data) => {
    return await CustomAxios.post(data, `exercise-rings/${id ?? 'new'}`);
}

export const destroy = async (data) => { 
    return await CustomAxios.remove(`exercise-rings/${data.id}`);
}