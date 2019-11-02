import { ADD_CART, REMOVE_CART, CHANGE_QTY } from '../action/actionType'
const defaultStore = {
    cartlist:[]
}

export default (state = defaultStore, {type,payload}) => {
    switch(type){
        case ADD_CART:
            return{
                ...state,
                cartlist:[payload,...state.cartlist]
            }
    }
    return state
}