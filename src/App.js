import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Loadable from 'react-loadable';

const loadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

const Home = Loadable({
    loader: () => import('~/Home'),
    loading: loadingComponent
});

const Cart = Loadable({
    loader: () => import('~/Cart'),
    loading: loadingComponent
});

const Tyg = Loadable({
    loader: () => import('~/Tyg'),
    loading: loadingComponent
});
const Mine = Loadable({
    loader: () => import('~/Mine'),
    loading: loadingComponent
});

const Login = Loadable({
    loader: () => import('~/Mine/Login'),
    loading: loadingComponent
});

const Info = Loadable({
    loader: () => import('~/Mine/Info'),
    loading: loadingComponent
});
const Mall = Loadable({
    loader: () => import('~/Mall'),
    loading: loadingComponent
});

const List = Loadable({
    loader: () => import('~/List'),
    loading: loadingComponent
});

const Detail = Loadable({
    loader: () => import('~/Detail'),
    loading: loadingComponent
});

// import Home from "~/Home";
// import Cart from "~/Cart"
// import Tyg from "~/Tyg";
// import Mine from "~/Mine";
// import Login from "~/Mine/Login";
// import Info from "~/Mine/Info";
// import Mall from "~/Mall";
// import List from "~/List";
// import Detail from '~/Detail';

class App extends Component {
    render() {
        return (<div>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/tyg" component={Tyg} />
                <Route path="/mall" component={Mall} />
                <Route path="/mine" component={Mine} />
                <Route path="/login" component={Login} />
                <Route path="/info" component={Info} />
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