import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Nav.css";
@withRouter
class Nav extends Component {
    state = {
        active: '',
        navlist: [{
            name: '主页',
            path: '/home',
            imgurl: '../../static/home-gray.png',
            active: '../../static/home.png'
        }, {
            name: '体验馆',
            path: '/tyg',
            imgurl: '../../static/tyg-gray.png',
            active: '../../static/tyg.png'
        }, {
            name: '家装商城',
            path: '/mall',
            imgurl: '../../static/shop-gray.png',
            active: '../../static/shop.png'
        }, {
            name: '我的',
            path: '/mine',
            imgurl: '../../static/user-gary.png',
            active: '../../static/user.png'
        }]
    }
    select = (path) => {
        if (path === '/mine') {
            if (localStorage.getItem('user')) {
                this.props.history.push('/mine');
            } else {
                this.props.history.push('/login');
            }
        } else {
            this.props.history.push(path);
        }
    }
    render() {
        let { navlist } = this.state;
        let { pathname } = this.props.location;
        // console.log(this.props);
        return (<div className="nav-box">
            {
                navlist.map(item => <div key={item.name} onClick={this.select.bind(this, item.path)}>
                    {
                        item.path === pathname
                            ? <><img src={item.active} /> <h4 style={{ color: '#333' }}>{item.name}</h4></>
                            : <><img src={item.imgurl} /> <h4>{item.name}</h4></>
                    }
                </div>)
            }
        </div>)
    }
}
export default Nav