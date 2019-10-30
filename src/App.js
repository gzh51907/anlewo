import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "~/Home";
import Cart from "~/Cart";
import Tyg from "~/Tyg";
import Mine from "~/Mine";
class App extends Component {
    state = {
        menu: [{
            name: 'home',
            path: '/home',
            text: '首页',
            icon: 'home'
        }, {
            name: 'discover',
            path: '/discover',
            text: '发现',
            icon: 'eye'
        }, {
            name: 'cart',
            path: '/cart',
            text: '购物车',
            icon: 'shopping-cart'
        }, {
            name: 'reg',
            path: '/reg',
            text: '注册',
            icon: 'user-add'
        }, {
            name: 'login',
            path: '/login',
            text: '登录',
            icon: 'login'
        }]
    }
    render() {
        return (<div>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/tyg" component={Tyg} />
                <Route path="/cart" component={Cart} />
                <Route path="/mine" component={Mine} />
                <Redirect from="/" to="/home" exact />
                <Route render={() => <div><h1>404</h1>页面不存在</div>} />
            </Switch>
        </div>)
    }
}

export default App;