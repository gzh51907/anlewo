import React, { Component } from "react";
import api from "@/api";
import Nav from "~/Nav";
import "./index.css";
import { Badge, Carousel } from "antd";
class Home extends Component {
    state = {
        banner: [],
        datalist: [],
        navlist: []
    }
    async componentDidMount() {
        let { data } = await api.get();
        console.log(data);
        this.setState({
            banner: data.banner,
            navlist: data.nav
        })
    }
    render() {
        let { banner, datalist, navlist } = this.state;
        console.log(navlist);
        return <div>
            <Nav></Nav>
            <header>
                <p>广州市<i></i></p>
                <div className="logo"></div>
                <div className="right">
                    <img src="../../../static/mes.png" />
                    <Badge count={1}>
                        <img src="../../../static/call.png" />
                    </Badge>
                </div>
            </header>
            <Carousel autoplay>
                {
                    banner.map(item => <img key={item.img} src={item.img} />)
                }
            </Carousel>
            <div className="alw-nav">
                {
                    navlist.map(item => <div key={item.name}>
                        <img src={item.icon} />
                        <p>{item.name}</p>
                    </div>)
                }
            </div>
        </div >
    }
}
export default Home;