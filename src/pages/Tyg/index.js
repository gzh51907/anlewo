import React, { Component } from "react";
import axios from "axios";
import Nav from "~/Nav";
// import api from "@/api";
import { BackTop } from "antd";
import "./Tyg.scss";
class Tyg extends Component {
    state = {
        page: 1,
        datas: [],
        timer: null
    }
    gotoTop = () => {
        window.scrollTo(0);
    }
    errorPic = (tygimg) => {
        // console.log(this.refs);
        this.refs[tygimg].src = "../../../static/error.jpg";
        this.refs[tygimg].style = "height: 6.6rem;"
    }
    handleScroll = () => {
        // console.log(this.refs.tygs.childNodes[this.refs.tygs.childNodes.length - 1]);
        var scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
        var offsetTop = this.refs.tygs.childNodes[this.refs.tygs.childNodes.length - 1].offsetTop;
        // console.log(scrollTop + 350, offsetTop);
        if (scrollTop >= 100) {
            this.refs.head.style = "font-size:0.48rem;";
        } else {
            this.refs.head.style = "font-size:0.6rem;";
        }
        if (scrollTop + 350 >= offsetTop) {
            clearTimeout(this.state.timer);
            this.setState({
                timer: setTimeout(async () => {
                    let page = this.state.page;
                    this.setState({
                        page: page + 1
                    });
                    let { data: { data: newdata } } = await axios.get('http://localhost:1907/goods/tyg', {
                        params: {
                            num: 9,
                            page: this.state.page
                        }
                    });
                    let olddata = this.state.datas;
                    newdata.forEach(item => {
                        olddata.push(item);
                    })
                    this.setState({
                        datas: olddata
                    });
                    console.log(this.state.datas)
                }, 1000)
            });
        }
    }
    async componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        let { data: { data: datas } } = await axios.get('http://localhost:1907/goods/tyg', {
            params: {
                num: 9,
                page: this.state.page
            }
        });
        this.setState({
            datas
        })
        console.log(this.state.datas);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }
    render() {
        let { datas } = this.state;
        return (<div className="tyg">
            <Nav></Nav>
            <header ref="head">体验馆</header>
            <div className="tyg-con" ref="tygs">
                {
                    datas.map((item, index) => <div className="tyg-item" key={item.code}>
                        <img src={item.img} ref={"tygimg" + index} onError={this.errorPic.bind(this, ('tygimg' + index))} />
                        <h3>{item.name}</h3>
                        <p>{item.addr}</p>
                    </div>)
                }
            </div>
            <BackTop visibilityHeight="200" />
        </div>)
    }
}
export default Tyg