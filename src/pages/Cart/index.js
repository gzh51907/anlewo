import React, { Component } from "react";
import { connect } from 'react-redux';
import Nav from "~/Nav";
import './cart.css'
import { InputNumber, Button } from 'antd'
import {bindActionCreators} from 'redux';
import cartAction from '@/store/action/cartAction'
const mapStateToProps = ({ cart }) => ({
    cartlist: cart.cartlist,
    totalPrice: cart.cartlist ? cart.cartlist.filter(item => item.checked == true).reduce((preValue, item) => {
        return preValue + item.goods_price * item.goods_qty
    }, 0).toFixed(2) : 0,
    checkLength: cart.cartlist.filter(item => item.checked == true).length,
});
const mapDispatchToProps = dispatch => {
    
    // return {
    //     valueChange(payload) {
    //         // dispatch({ type: CHANGE_QTY_LAST, payload })
    //         dispatch(Action.cartAction.changeQtyLastAction(payload))
    //     },
    //     checkSingleChange(payload) {
    //         // dispatch({ type: CHECK_SINGLE_CHANGE, payload })
    //         dispatch(Action.cartAction.checkSingleChangeAction(payload))
    //     },
    //     checkAllChange(payload) {
    //         // dispatch({ type: CHECK_ALL_CHANGE, payload })
    //         dispatch(Action.cartAction.checkAllChangeAction(payload))
    //     },
    //     removeItemCart(payload) {
    //         // dispatch({ type: REMOVE_CART, payload })
    //         dispatch(Action.cartAction.removeCartAction(payload))
    //     }

    // }
    return bindActionCreators(cartAction,dispatch);

}

@connect(mapStateToProps, mapDispatchToProps)
class Cart extends Component {
    // onChange = (goods_id, goods_qty) => {
    //     let { valueChange } = this.props;
    //     valueChange({ goods_id, goods_qty })
    // }
    // isCheck = (goods_id, checked) => {
    //     let { checkSingleChange } = this.props;
    //     checkSingleChange({ goods_id, checked })
    // }
    // checkAll = (isCheck) => {
    //     let { checkAllChange } = this.props;
    //     checkAllChange({ checked: !isCheck })
    // }
    // removeItem = (goods_id) => {
    //     let { removeItemCart } = this.props;
    //     removeItemCart({ goods_id })
    // }
    render() {
        let { removeCartAction, checkAllChangeAction, checkSingleChangeAction,changeQtyLastAction,checkLength ,cartlist, totalPrice } = this.props;
        let isAllCheckFlag = (checkLength === cartlist.length && checkLength != 0)
        return (
            <div className="cart">
                <div className="nav-bar">
                    购物车({cartlist.length})
                </div>
                <div className="centercart">
                    {
                        cartlist.map(item => {
                            return (
                                <div className="cart-item" key={item.goods_id}>
                                    <div className="icon-selector" style={item.checked ? { backgroundColor: '#ff8198', borderColor: '#ff8198' } : {}} onClick={checkSingleChangeAction.bind(this, item.goods_id, item.checked)}>
                                        <img src="../../static/tick.svg" />
                                    </div>
                                    <div className="item-img">
                                        <img src={item.goods_img} alt="商品图片" />
                                        <div className="item-info">
                                            <h2 className="item-title">{item.goods_name}</h2>
                                            <InputNumber size="small" defaultValue={item.goods_qty} onChange={changeQtyLastAction.bind(this, item.goods_id)} />
                                            <p style={{ marginTop: 20 }}>金额：{item.goods_price * item.goods_qty}</p>
                                            <Button type="danger" shape="circle" icon="delete" size="small" className="iconDel" onClick={removeCartAction.bind(this, item.goods_id)} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="bottom-menu">
                    <div className="select-all">
                        <div className="icon-selector" style={isAllCheckFlag ? { backgroundColor: '#ff8198', borderColor: '#ff8198' } : {}} onClick={checkAllChangeAction.bind(this, isAllCheckFlag)}>
                            <img src="../../static/tick.svg" />
                        </div>
                        <span>全选</span>
                    </div>
                    <span className="total-price">合计:&nbsp;&nbsp;&nbsp; ¥{totalPrice}</span>
                    <span className="buy-product">去计算({checkLength})</span>
                </div>
                <Nav />
            </div >
        )
    }
}
export default Cart