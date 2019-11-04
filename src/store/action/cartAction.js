import { ADD_CART, REMOVE_CART, CHANGE_QTY, GET_CARTLIST, CLEAR_CART, CHANGE_QTY_LAST, CHECK_SINGLE_CHANGE, CHECK_ALL_CHANGE } from './actionType'

// 加入购物车
function addToCartAction(goods) {
    return {
        type: ADD_CART,
        payload: goods
    }
}
// 改变购物车的数量 
function changeQtyAction(goods_id, goods_qty) {
    return {
        type: CHANGE_QTY,
        payload: { goods_id, goods_qty }
    }
}

// 获取购物车的信息 
function getCartListAction(payload) {
    return {
        type: GET_CARTLIST,
    }
}
// 删除购物车
function removeCartAction(goods_id) {
    return {
        type: REMOVE_CART,
        payload: { goods_id }
    }
}

// 清空购物车
function clearCartAction() {
    return {
        type: CLEAR_CART,
    }
}

// 直接改数量
function changeQtyLastAction(goods_id, goods_qty) {
    return {
        type: CHANGE_QTY_LAST,
        payload: { goods_id, goods_qty }
    }
}

// 单选
function checkSingleChangeAction(goods_id, checked) {
    return {
        type: CHECK_SINGLE_CHANGE,
        payload: { goods_id, checked }
    }
}

// 全选
function checkAllChangeAction(checked) {
    return {
        type: CHECK_ALL_CHANGE,
        payload: { checked: !checked }
    }
}
export default {
    addToCartAction,
    changeQtyAction,
    getCartListAction,
    removeCartAction,
    clearCartAction,
    changeQtyLastAction,
    checkSingleChangeAction,
    checkAllChangeAction
}

