import React, { useState, useEffect, useMemo, Fragment } from 'react';
import { Row, Col } from 'antd';
import './mall.css'
import api from "@/api";
import Nav from "~/Nav";
import Mallnav from './Mallnav'
function Mall(props) {
    const [shopData, setShopData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            let { data } = await api.get('home/shop');
            setShopData(data)
            return data
        };
        fetchData();
    }, [])
    const goto = (cateId, cateName) => {
        let { history } = props
        cateId = cateId.replace('[', '').replace(']', '');
        history.push({ pathname: `/list?cateId=${cateId}&cateName=${cateName}` })
    }
    return (
        <div className="mall">
            <Mallnav />
            <Nav />
            <div className="shop-list">
                {
                    shopData.map((items, index) => {
                        return (
                            <div key={items.id} className="shop-list-item">
                                <h2 className="title">{items.name}</h2>
                                <Row type="flex" justify="space-between">
                                    {
                                        items.data.map((item) => {
                                            return (
                                                <Col span={index == 2 ? 20 : 10} key={item.ids} style={{ marginBottom: 20, width: index == 2 ? 330 : 159 }} onClick={goto.bind(this, item.ids, item.name)}>
                                                    <img src={item.img} style={{ width: '100%', height: index == 2 ? 96 : 87 }} />
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Mall