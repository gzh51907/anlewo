import React, { Component } from 'react';
import api from "@/api";
import './detail.css'
import { Icon, Button, InputNumber, Badge } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cartAction from '@/store/action/cartAction'
import saga from '@/store/saga'
// ES7语法
const mapStateToProps = (state) => {
    return {
        carlength: state.cart.cartlist.length,
        cartlist: state.cart.cartlist
    }
}
// 默认自动传dispatch到props
const mapDispatchToProps = (dispatch) => {
    // return {
    //     addCart(payload) {
    //         // dispatch({ type: ADD_CART, payload })
    //         dispatch(Action.cartAction.addToCartAction(payload))
    //     },
    //     changQty(payload) {
    //         // dispatch({ type: CHANGE_QTY, payload })
    //         dispatch(Action.cartAction.changeQtyAction(payload))
    //     }
    // }
    return bindActionCreators(cartAction, dispatch)

}
@connect(mapStateToProps,mapDispatchToProps)
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1,
            info: {},
            packages: []
        }
    }
    async componentDidMount() {  
        let { goodsId } = this.props.match.params;
        let { data } = await api.getalw('goods/detail', {
            goodsId
        });
        this.setState({
            info: data[0],
            packages: data[0].packages
        })
    }
    back = () => {
        let { history } = this.props;
        history.go(-1);
    }
    add2Cart = (info, qty) => {
        let { cartlist, addToCartAction, changeQtyAction } = this.props;
        let goods = {
            goods_id: info.goodsId,
            goods_img: info.img,
            goods_name: info.goodsName,
            goods_price: info.price,
            goods_qty: qty,
            checked: true
        }
        // 判断商品是否存在cartlist
        let currentCart = cartlist.filter(item => {
            return item.goods_id === goods.goods_id
        })[0]
        // 存在
        if (currentCart) {
            changeQtyAction(goods.goods_id, goods.goods_qty)
        } else {  //不存在
            // this.props.dispatch({type:'ADD_CART_ASYNC',payload:goods});
            addToCartAction(goods)

        }
    }
    gotoCart = () => {
        let { history } = this.props;
        history.push('/cart')
    }
    onChange = (value) => {
        this.setState({
            num: value
        })
    }
    render() {
        let { carlength } = this.props
        let { num, info, packages } = this.state;
        return (
            <div className="detail">
                <div className="iconback" onClick={this.back}>
                    <Icon type="arrow-left" className="iconstyle" />
                </div>
                <div className="center">
                    <img src={info.img} style={{ width: 360, height: 360 }} />
                    <div style={{ marginTop: '12px', padding: '12px 16px 0' }}>
                        <img src={info.img} style={{ width: 43, height: 43, float: 'left' }} />
                        <div style={{ float: 'left' }}>
                            <span className="preview">款式<br></br>预览</span>
                        </div>
                        <img src={info.img} style={{ width: 43, height: 43 }} />
                    </div>
                    <div className="detail-info">
                        <h2 className="title">{info.goodsName}</h2>
                        <div style={{ margin: '6px 0px' }}>
                            <p style={{ fontSize: 18 }}>
                                <span style={{ color: 'pink' }}>
                                    <Icon type="money-collect" />
                                    + ￥ {info.floatPrice}元
                        </span>
                                <span className="btn" >套餐</span>
                            </p>
                            <p style={{ padding: '10px 0px 20px', fontSize: 12 }}>
                                <span style={{ float: "left" }}>
                                    市场价：<del><span>{info.marketPrice}</span></del>
                                </span>
                                <span style={{ textAlign: 'rightF', float: "right" }}>{info.saleNum + '已售'}</span>
                            </p>
                            <p style={{ margin: '5px 0px' }}>
                                {
                                    packages.map(item => {
                                        return (
                                            <span key={item.id} style={{ padding: '5px' }}>{item.name}</span>
                                        )
                                    })
                                }
                            </p>
                        </div>
                    </div>
                    <InputNumber size="large" min={1} max={100000} defaultValue={1} onChange={this.onChange} style={{ marginLeft: '130px' }} />
                </div>
                <div className="cartBtn">
                    <Button size="large" type="primary" style={{ verticalAlign: 'middle', paddingTop: 5 }} onClick={this.add2Cart.bind(this, info, num)}>加入购物车</Button>
                    <div style={{ float: 'right', verticalAlign: 'middle', paddingTop: 5 }}>
                        <Badge count={carlength} style={{ backgroundColor: '#52c41a' }} >
                            <Button size="large" type="danger" onClick={this.gotoCart}>购物车</Button>
                        </Badge>
                    </div>

                </div>
            </div>
        );
    }
}

// const mapStateToProps = function (state) {
//     return {
//         carlength: state.cart.cartlist.length,
//     }
// }
// Detail = connect(mapStateToProps)(Detail)
export default Detail;