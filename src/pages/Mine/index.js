import React, { Component } from "react";
import Nav from "~/Nav";
import "./Mine.scss";
import { Button } from "antd";
class Mine extends Component {
    state = {
        datalist1: [{
            text: '预约',
            imgurl: '../../../static/icon1.png'
        }, {
            text: '订单',
            imgurl: '../../../static/icon2.png'
        }, {
            text: '关注',
            imgurl: '../../../static/icon3.png'
        }, {
            text: '房屋',
            imgurl: '../../../static/icon4.png'
        }],
        datalist2: [{
            text: '在线咨询',
            imgurl: '../../../static/list1.png'
        }, {
            text: '电话客服',
            imgurl: '../../../static/list2.png'
        }, {
            text: '投诉建议',
            imgurl: '../../../static/list3.png'
        }, {
            text: '清除缓存',
            imgurl: '../../../static/list4.png'
        }]
    }
    logout = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login');
    }
    componentDidMount() {
        this.refs.mine.style = `height:${window.innerHeight}px;`
    }
    render() {
        let { datalist1, datalist2 } = this.state;
        return (<div className="mine" ref="mine">
            <Nav></Nav>
            <header>
                <div>
                    <img className="xg" src="../../../static/editor.png" />
                </div>
            </header>
            <ul className="operation">
                {
                    datalist1.map(item => <li key={item.text}>
                        <img src={item.imgurl} />
                        <p>{item.text}</p>
                    </li>)
                }
            </ul>
            <ul className="handle">
                {
                    datalist2.map(item => <li key={item.text}>
                        <p>{item.text}</p>
                        <img src={item.imgurl} />
                    </li>)
                }
            </ul>
            <Button type="danger" size="large" onClick={this.logout}>退出</Button>
        </div>)
    }
}
export default Mine