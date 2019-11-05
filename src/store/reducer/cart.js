import { ADD_CART, REMOVE_CART, CHANGE_QTY, CHANGE_QTY_LAST, CHECK_SINGLE_CHANGE, CHECK_ALL_CHANGE } from '../action/actionType'
const defaultStore = {
    cartlist: [
        {
            goods_id: "1",
            goods_name: "huawei mate30 pro",
            goods_img:
                "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3089410232,3830777459&fm=11&gp=0.jpg",
            goods_price: 5998,
            goods_qty: 10,
            checked: true,
        },
        {
            goods_id: "2",
            goods_name: "xiaomi9",
            goods_img:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571131475&di=2df2d3a54a89db9e09952799acb25261&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F8488db95efa140b9c50cb4615e2ca337a6981aa7.jpg",
            goods_price: 2999,
            goods_qty: 2,
            checked: false,
        },
        {
            goods_id: "3",
            goods_name: "onePlus9 pro",
            goods_img:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570536784660&di=d4471f6edf73cace7d98fb05869a9277&imgtype=0&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn1%2Fs450x450_jfs%2Ft28117%2F273%2F1288839750%2F66834%2F8ef15c40%2F5cdd22b8Nbc711aba.jpg",
            goods_price: 3999,
            goods_qty: 1,
            checked: true,
        }
    ]
}

function reducer(state = defaultStore, { type, payload }) {
    switch (type) {
        case ADD_CART:
            console.log(type, payload,'type, payload'); 
            return {
                ...state,
                cartlist: [payload, ...state.cartlist]
            }
        case CHANGE_QTY:
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.goods_id === payload.goods_id) {
                        item.goods_qty = payload.goods_qty + item.goods_qty
                    }
                    return item;
                })
            }

        case CHANGE_QTY_LAST:
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.goods_id == payload.goods_id) {
                        item.goods_qty = payload.goods_qty
                    }
                    return item;
                })
            }
        case CHECK_SINGLE_CHANGE:
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                    if (item.goods_id == payload.goods_id) {
                        item.checked = !payload.checked
                    }
                    return item;
                })

            }
        case CHECK_ALL_CHANGE:
            return {
                ...state,
                cartlist: state.cartlist.map(item => {
                     item.checked = payload.checked;
                     return item
                })
            }
        case REMOVE_CART:
            return {
                ...state,
                cartlist: state.cartlist.filter(item => item.goods_id != payload.goods_id)
            }
    }
    return state
}

export default reducer