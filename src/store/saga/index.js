import { takeEvery, takeLatest, put, call, apply } from 'redux-saga/effects'
import { addToCartAction } from '@/store/action/cartAction'

import api from '@/api'

function* getCartListSaga() {
    let { data } = yield api.getalw('cart')
    console.log(data);
    // const action = getCartListAction(res.data)
    // yield put(action)
}

function* addToCartSaga({ payload }) {
    console.log(payload, '33');
    let res = yield api.postalw('cart', payload)
    console.log(res, 'res');
    // const action =yield addToCartAction();
    // yield put(action)
}


function* mySaga() {
    console.log('start');

    //  监听sagaAction，当dispatch({type:'ADD_CART'})时，自动执行addToCartSaga
    yield takeEvery('ADD_CART_ASYNC', getCartListSaga)
    console.log('end');

    yield takeEvery('GET_CARTLIST_ASYNC', getCartListSaga)
}

export default mySaga