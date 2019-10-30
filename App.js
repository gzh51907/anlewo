import React, { Component } from "react";
import { Route, Redirect, Switch, NavLink, withRouter } from "react-router-dom";
import { Menu, Icon, Badge } from "antd";
import { MenuItem } from "rc-menu";
import Home from '~/Home';
import Discover from '~/Discover';
import Cart from '~/Cart';
import Mine from '~/Mine';
import Goods from '~/Goods';
// import store from "./store";
import { connect } from "react-redux";
const mapStateToProps = function ({ cart }) {
    return {
        cartlength: cart.goodslist.length
    }
}
@withRouter
@connect(mapStateToProps)
class App extends Component {
    state = {
        selected: '',
        // cartlength: 6,
        menu: [{
            name: 'home',
            path: '/home',
            text: '首页',
            icon: 'home'
        }, {
            name: 'discover',
            path: '/discover',
            text: '发现',
            icon: 'search'
        }, {
            name: 'cart',
            path: '/cart',
            text: '购物车',
            icon: 'shopping-cart'
        }, {
            name: 'mine',
            path: '/mine',
            text: '我的',
            icon: 'user'
        }]
    }
    componentDidMount() {
        // console.log(this.props);
        this.setState({
            selected: this.props.history.location.pathname,
            // cartlength: store.getState().goodslist.length
        })
        // 监听store修改，更新购物车数量
        // store.subscribe(() => {
        //     this.setState({
        //         cartlength: store.getState().goodslist.length
        //     })
        // })
    }
    componentDidUpdate() {
        // console.log(this.props);
        if (this.state.selected !== this.props.location.pathname) {
            this.setState({
                selected: this.props.history.location.pathname
            })
        }
    }
    render() {
        let { selected, menu } = this.state;
        let { history, cartlength } = this.props;
        return (
            <div>
                <Menu
                    mode="horizontal"
                    selectedKeys={selected}
                    onSelect={({ key }) => {
                        // console.log(this.props, key)
                        if (key === '/discover') {
                            history.push(key + '/256');
                        } else {
                            history.push(key);
                        }
                        this.setState({ selected: key });
                    }}
                >
                    {
                        menu.map(item => <MenuItem key={item.path}>
                            {
                                item.name === 'cart' ?
                                    <Badge count={cartlength}>
                                        <Icon type={item.icon}></Icon>
                                        {item.text}
                                    </Badge>
                                    :
                                    <>
                                        <Icon type={item.icon}></Icon>
                                        {item.text}
                                    </>
                            }

                        </MenuItem>)
                    }
                </Menu>
                <Switch>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/cart" component={Cart}></Route>
                    <Route path="/discover" component={Discover}></Route>
                    <Route path="/mine" component={Mine}></Route>
                    <Route path="/goods/:id" component={Goods}></Route>
                    <Redirect from="/" to="/home" exact></Redirect>
                    <Route render={() => <div>404 not found</div>} />
                </Switch>
            </div>
        )
    }
}

export default App;