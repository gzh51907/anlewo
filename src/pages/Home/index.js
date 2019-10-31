import React, { Component } from "react";
// import api from "@/api";
import Nav from "~/Nav";
import Brand from "./Brand";
import "./index.css";
import { Badge, Carousel } from "antd";
import axios from "axios";
class Home extends Component {
    state = {
        banner: [],
        navlist: [],
        packages: [],
        brand: [],
        match: []
    }
    handleScroll = () => {
        var scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
        if (scrollTop >= 100) {
            this.refs.alhead.className = "changing";
            if (scrollTop >= 200) {
                this.refs.alhead.className = "active";
                this.refs.mes.src = "../../../static/mes2.png";
                this.refs.call.src = "../../../static/call2.png";
            } else {
                // console.log(this.refs.mes.src);
                this.refs.alhead.className = "changing";
                this.refs.mes.src = "../../../static/mes.png";
                this.refs.call.src = "../../../static/call.png";
            }
        } else {
            this.refs.alhead.className = "init";
        }
    }
    async componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        let { data: { data } } = await axios.get('http://localhost:1907/goods/index');
        // console.log(data);
        this.setState({
            banner: data[0].banner,
            navlist: data[0].nav,
            packages: data[0].packages,
            brand: data[0].brand,
            match: data[0].match
        })
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        let { banner, navlist, packages, brand, match } = this.state;
        // console.log(match);
        return <div className="home">
            <Nav></Nav>
            <header ref="alhead" className="init">
                <p className="city">广州市<i></i></p>
                <div className="logo"></div>
                <div className="right">
                    <img ref="mes" src="../../../static/mes.png" />
                    <Badge count={1}>
                        <img ref="call" src="../../../static/call.png" />
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
            <div className="alw-package">
                {
                    packages.map(item => {
                        let res = null;
                        if (item.id === 1) {
                            res = <img className="b-img" src="../../../static/pack1.jpg" key={item.id} />
                        } else if (item.id === 2) {
                            res = <img className="s-img" src="../../../static/pack2.png" key={item.id} />
                        } else if (item.id === 3) {
                            res = <img className="s-img" src="../../../static/pack3.png" key={item.id}
                                style={{ marginBottom: 0 }} />
                        }
                        return res
                    })
                }
            </div>
            <Brand brand={brand}></Brand>
            <div className="alw-collocation">
                <div className="title">
                    <h3>窝搭配</h3>
                    <p>更多搭配 ></p>
                </div>
                <div className="box">
                    <div className="con">
                        {
                            match.map(item => <div key={item.url}>
                                <img src={item.img} />
                                <h5>{item.title}</h5>
                                <p>
                                    {
                                        item.scope.map(i => <span key={i.id}>
                                            {i.name + ' | '}
                                        </span>)
                                    }
                                    {
                                        item.style.map((i, idx) => <span key={i.id}>
                                            {i.name} {idx === item.style.length - 1 ? '' : '| '}
                                        </span>)
                                    }
                                </p>
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <img className="footer" src="../../../static/footer.png" />
            <div style={{ paddingBottom: 80, display: 'flex', justifyContent: 'center' }}>
                <i style={{ marginBottom: 14, width: '35%', height: 14, boxShadow: "rgb(204, 204, 204) 0px 1px 1px -1px" }}></i>
                <span style={{ fontSize: 14, lineHeight: '28px', color: 'rgb(68, 68, 68)' }}>我是有底线的</span>
                <i style={{ marginBottom: 14, width: '35%', height: 14, boxShadow: "rgb(204, 204, 204) 0px 1px 1px -1px" }}></i>
            </div>
        </div >
    }
}
export default Home;