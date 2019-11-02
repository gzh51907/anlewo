import React, { Component } from 'react';
import api from "@/api";
import './detail.css'
import { Icon, Button, InputNumber } from 'antd'
import { ADD_CART } from '@/store/action/actionType'

import { connect } from 'react-redux';

@connect()
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
        let goods = {
            goods_img: info.img,
            goods_name: info.goodsName,
            goods_price: info.price,
            goods_qty: qty,
            checked: true
        }
        console.log(goods);
        this.props.dispatch({ type: ADD_CART });//字节进入saga中间件
        // // this.props.dispatch({type:'GET_DATA_ASYNC'});//字节进入saga中间件

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
                    <Button size="large" type="danger" style={{ float: 'right', verticalAlign: 'middle', paddingTop: 5 }} onClick={this.gotoCart}>购物车</Button>
                </div>
            </div>
        );
    }
}

export default Detail;