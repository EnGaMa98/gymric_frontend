import Axios from "axios";
import {ENV_API_URL} from "../env.js";
import qs from "qs";

const CustomAxios = Axios.create({
    baseURL: ENV_API_URL,
    withCredentials: false,
});

CustomAxios.interceptors.request.use(function (config) {
    config.headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const get = async (params, url) => {
    try {
        const options = {
            url: '/' + url,
            method: 'get',
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
            params,
            paramsSerializer: params => {
                return qs.stringify(params)
            },
        };
        const response = await CustomAxios(options);
        return response.data;
    } catch (error) {
        throw new Error(error.response.status ?? error.code);
    }
};

export const post = async (data, url) => {
    try {
        const options = {
            url: '/' + url,
            method: 'post',
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
            data,
        };
        const response = await CustomAxios(options);
        return response.data;
    } catch (error) {
        throw new Error(error.response.status ?? error.code);
    }
};

export const remove = async (url) => {
    try {
        const options = {
            url: '/' + url,
            method: 'delete',
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
        };
        const response = await CustomAxios(options);
        return response.data;
    } catch (error) {
        throw new Error(error.response.status ?? error.code);
    }
};

