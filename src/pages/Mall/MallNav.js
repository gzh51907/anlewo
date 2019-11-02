import React from 'react';
import { Icon, Row, Col } from 'antd'
function MallNav() {
    return (
        <div className="mall-nav" style={{ height: 46 }}>
            <Row type="flex" justify="space-between" style={{lineHeight:'46px'}}>
                <Col span={10}>
                    <img src="../../../static/mall.png" style={{ width: 120, height: 23}} />
                </Col>
                <Col>
                    <Icon type="menu" style={{fontSize:25,fontWeight:800}}/>
                </Col>
            </Row>
        </div>
    )
}

export default MallNav