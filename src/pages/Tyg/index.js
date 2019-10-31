import React, { Component } from "react";
import axios from "axios";
import Nav from "~/Nav";
import api from "@/api";
class Tyg extends Component {
    async componentDidMount() {
        let { data: query } = await api.get();
        console.log(query);
        // let res = await axios.post('http://localhost:1907/creeper', query);
        // console.log(res);
    }
    render() {
        return (<div>
            <Nav></Nav>
        </div>)
    }
}
export default Tyg