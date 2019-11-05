import React, { Component } from "react";
import "./Brand.css";
class Brand extends Component {
    render() {
        let { brand } = this.props;
        // console.log(brand);
        return <div className="brands">
            <div className="title">
                <h3>品牌街</h3>
                <p>更多{brand.count}个 ></p>
            </div>
            <div className="box">
                <div className="con">
                    {
                        brand.items
                            ? brand.items.map(item => (<img src={item.logo.replace(/^http\:\/\/www\.woimg\.com\/beego\/cms\/2019\/06\/|^http\:\/\/www\.woimg\.com\/beego\//, '../../../static/')} key={item.id} />))
                            : ''
                    }
                </div>
            </div>
        </div>
    }
}
export default Brand