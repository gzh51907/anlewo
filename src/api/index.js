import axios from "axios";
let ajax = axios.create({
    baseURL: 'https://www.nanshig.com/mobile/index.php'
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
    return data
}
let ajax2 = axios.create({
    baseURL: 'https://wap.woapi.net/v1/home'
})
export async function get(params, config = {}) {
    let { data } = await ajax.get('', {
        ...config,
        params
    });
    return data
}
export default {
    get,
    post
}