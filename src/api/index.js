import axios from "axios";
let ajax = axios.create({
    baseURL: 'https://wap.woapi.net/v1/store?page=20&city=%E5%B9%BF%E5%B7%9E%E5%B8%82&per-page=9'
})
export async function get(params, config = {}) {
    let { data } = await ajax.get('', {
        ...config,
        params
    });
    return data
}
export async function post(params, config = {}) {
    let { data } = await ajax.post('', params, config);
    return data;
}
export default {
    get,
    post
}