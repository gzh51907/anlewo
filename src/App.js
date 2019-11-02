import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Home from "~/Home";
import Cart from "~/Cart";
import Tyg from "~/Tyg";
import Mine from "~/Mine";
import Login from "~/Mine/Login";
class App extends Component {
    render() {
        return (<div>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/tyg" component={Tyg} />
                <Route path="/cart" component={Cart} />
                <Route path="/mine" component={Mine} />
                <Route path="/login" component={Login} />
                <Redirect from="/" to="/home" exact />
                <Route render={() => <div><h1>404</h1>页面不存在</div>} />
            </Switch>
        </div>)
    }
}

export default App;