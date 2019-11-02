import { ADD_CART, REMOVE_CART, CHANGE_QTY, GET_CARTLIST, CLEAR_CART } from './actionType'

// 加入购物车
export const addToCartAction = (goods) => ({
    type: ADD_CART,
    payload: goods
})
// 改变购物车的数量 
export const changeQtyAction = (goodsId, goods_qty) => ({
    type: CHANGE_QTY,
    payload: { goodsId, goods_qty }
})
// 获取购物车的信息 
export const getCartListAction = () => ({
    type: GET_CARTLIST,
})
// 删除购物车
export const removeCartAction = (goodsId) => ({
    type: REMOVE_CART,
    payload: { goodsId }
})

// 清空购物车

export const clearCartAction = () => ({
    type: CLEAR_CART,
})

export default {
    addToCartAction,
    changeQtyAction,
    getCartListAction,
    removeCartAction,
    clearCartAction
}

