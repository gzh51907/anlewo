import { takeEvery, takeLatest, put, call, apply } from 'redux-saga/effects'
import { addToCartAction } from '@/store/action/actionCreators'
import { GET_CARTLIST, ADD_CART } from '../action/actionType'
import api from '@/api'

export  function* getCartListSaga() {
    let { data } = yield call(api.getalw('cart'))
    console.log(data);
    const action = getCartListAction(res.data)
    yield put(action)
}

export  function* addToCartSaga({ payload }) {
    console.log(payload, '33');

    let res = yield api.postalw('cart', payload)

    console.log(res, 'res');
    const action =yield addToCartAction();
    yield put(action)
}


function* mySaga() {
    console.log('1');

    //  监听sagaAction，当dispatch({type:'ADD_CART'})时，自动执行addToCartSaga
    yield takeLatest(ADD_CART, addToCartSaga)
    yield takeEvery(GET_CARTLIST, getCartListSaga)
}

export default mySaga