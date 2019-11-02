import React, { Component } from 'react';
import api from "@/api";
import './list.css'
import { Icon, Row, Col, Button } from 'antd'
class List extends Component {
    state = {
        cateIds: [],
        cateName: '',
        cateId: 0,
        page: 1,
        datalist: [],
        titlelist: [],
        currentIndex: 0,
        flag: true,
    }
    async componentDidMount() {
        this.init();
    }
    init = () => {
        let cateIds, cateName, cateId;
        let url = this.props.location.search.slice(1).split('&');
        var queryObj = {};
        url.forEach(item => {
            var temp = item.split("=");
            queryObj[temp[0]] = temp[1];
        });
        cateIds = queryObj['cateId'];
        cateName = queryObj['cateName'];
        cateId = queryObj['cateId'].split(',')[0];
        this.setState({
            cateIds,
            cateName,
            cateId
        }, async () => {
            let { page } = this.state;
            let { data } = await api.get('goods', {
                cateName,
                cateId,
                page,
            })
            let res = await api.get('cates/child', {
                cateIds
            })
            this.setState({
                datalist: data.items,
                titlelist: res.data
            })
        })
    }
    back = () => {
        let { history } = this.props;
        history.go(-1);
    }
    tabClick = async (cateId, index) => {
        let { page, cateName } = this.state;
        let { data } = await api.get('', {
            cateName,
            cateId,
            page: 1
        })
        this.setState({
            datalist: data.items,
            currentIndex: index
        })
    }
    goto=(goodsId)=>{
        let {history}=this.props;
        history.push('/detail/'+goodsId) 
    }
    render() {
        let active = {
            borderBottom: '2px solid #ddd',
        }
        let { datalist, titlelist, currentIndex, flag, cateName } = this.state;
        return (
            <div className="list">
                <div className="listtop" style={{ textAlign: "center" }}>
                    <Icon type="arrow-left" style={{ float: 'left', lineHeight: '46px', fontSize: '18px' }} onClick={this.back} />
                    <span style={{ fontSize: '16px', fontWeight: 800 }}>
                        {decodeURI(cateName)}
                    </span>
                    <Icon type="qrcode" style={{ float: 'right', lineHeight: '46px', fontSize: '18px' }} />
                </div>
                {
                    titlelist.length > 1 ?
                        <div className="list-title">
                            <ul className="list-ul">
                                {
                                    titlelist.map((item, index) => {
                                        return (
                                            <li key={item.cateId} className="list-li" onClick={this.tabClick.bind(this, item.cateId, index)} style={index === currentIndex ? active : null}>{item.cateName}</li>
                                        )
                                    })
                                }
                            </ul>
                            <div className="icondown" ><Icon type="down" /></div>
                        </div>
                        :
                        ''
                }
                <div className="listdata">
                    <Row type="flex" justify="space-between">
                        {
                            datalist.map((item) => {
                                return (
                                    <Col span={24} key={item.goodsId} style={{ marginBottom: '20px', borderTop: '1px dashed #999' }}>
                                        <div className="list-detail" key={item.goodsId} onClick={this.goto.bind(this,item.goodsId)}>
                                            <img src={item.img} style={{ width: 154, height: 154, float: 'left' }} />
                                            <div className="info-list" style={{ float: 'right' }}>
                                                <Button>{item.brandName}</Button>
                                                <p>
                                                    <span>{item.goodsName}</span>
                                                </p>
                                                {
                                                    item.packages.map(tag => {
                                                        return (
                                                            <span key={tag.id} style={{ padding: '5px' }}>{tag.name}</span>
                                                        )
                                                    })
                                                }
                                                <p>
                                                    <span style={{ color: 'pink' }}>
                                                        <Icon type="money-collect" />
                                                        + ￥ {item.floatPrice}元
                                                    </span>
                                                    <span className="btn">套餐</span>
                                                </p>


                                                市场价：<del><span>{item.marketPrice}</span></del>
                                                <span style={{ textAlign: 'rightF' }}>{item.saleNum + '已售'}</span>
                                            </div>
                                        </div>
                                    </Col>
                                )

                            })
                        }
                    </Row>
                </div>



            </div>
        );
    }
}

export default List;
