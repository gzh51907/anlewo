import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "~/Home";
import Cart from "~/Cart"
import Tyg from "~/Tyg";
import Mine from "~/Mine";
import Mall from "~/Mall"
import List from "~/List"
import Detail from '~/Detail'
class App extends Component {
    render() {
        return (<div>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/tyg" component={Tyg} />
                <Route path="/mall" component={Mall} />
                <Route path="/mine" component={Mine} />
                <Route path="/list" component={List} />
                <Route path="/cart" component={Cart} />
                <Route path="/detail/:goodsId" component={Detail} />
                <Redirect from="/" to="/home" exact />
                <Route render={() => <div><h1>404</h1>页面不存在</div>} />
            </Switch>
        </div>)
    }
}

export default App;