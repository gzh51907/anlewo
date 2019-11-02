import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cartAction from '../../store/action/actionCreators'
const mapStateToProps = () => ({
    cartlist: cartlist,
    totalPrice: cartlist.reduce((prev, item) => prev + item.goods_price * item.goods_qty, 0)
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators(cartAction, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class Cart extends Component {
    render() {
        return (
            <div className="cart">
                <h1>cart</h1>
                <Provider store={store}>
                    {store}
                </Provider>
            </div>
        )
    }
}
export default Cart