import axios from "axios";
let ajax = axios.create({
    baseURL: 'https://wap.woapi.net/v1'
})
let alw = axios.create({
    baseURL: 'http://47.98.245.185:1998'
    // baseURL: 'http://10.3.133.73:1998'
})
export async function get(url = '', params, config = {}) {
    let { data } = await ajax.get(url, {
        ...config,
        params
    });
    return data
}

export async function getalw(url = '', params, config = {}) {
    let { data } = await alw.get(url, {
        ...config,
        params
    });
    return data
}

export async function postalw(url = '', params, config = {}) {
    let { data } = await alw.post(url, params, config);
    return data;
}
export async function post(params, config = {}) {
    let { data } = await ajax.post('', params, config);
    return data;
}

export default {
    get,
    post,
    getalw,
    postalw
}