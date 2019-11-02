import React, { Component } from "react";
import "./Info.scss";
import axios from "axios";
import { Button, Icon, Upload, message } from "antd";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class Info extends Component {
    state = {
        fileList: [],
        tx: null,
        imgurl: ''
    };
    handleChange = async ({ fileList }) => {
        // console.log(fileList);
        let tx = await getBase64(fileList[fileList.length - 1].originFileObj);
        let imgurl = '';
        if (fileList[0].response) {
            imgurl = await fileList[0].response.data.imgurl;
        }
        this.setState({
            fileList,
            tx,
            imgurl
        });
        // console.log(this.state.imgurl);
    };
    handleUpload = async () => {
        let user = JSON.parse(localStorage.getItem('user'));
        let { data } = await axios.patch('http://localhost:1998/users', {
            phone: user.phone,
            pic: this.state.imgurl
        })
        // console.log(data);
        if (data.code === 1) {
            this.props.history.push('/mine');
        }
    }
    goback = () => {
        this.props.history.push('/mine');
    }
    async componentDidMount() {
        this.refs.info.style = `height:${window.innerHeight}px;`
        let user = JSON.parse(localStorage.getItem('user'));
        // console.log((user));
        let { data: { data } } = await axios.get('http://localhost:1998/users/tx', {
            params: {
                phone: user.phone
            }
        })
        // console.log(data);
        if (data[0].pic) {
            this.setState({
                tx: data[0].pic
            })
        } else {
            this.setState({
                tx: '../../../static/head-img.png'
            })
        }
    }
    render() {
        const { fileList, tx } = this.state;
        // console.log(tx);
        return (<div className="info" ref="info">
            <header>
                <Icon type="arrow-left" onClick={this.goback} />
                <span>编辑个人头像</span>
            </header>
            <div className="upload">
                <Upload
                    action="http://localhost:1998/change/picture"
                    fileList={fileList}
                    onChange={this.handleChange}
                    name="tx"
                >
                    <div className="tx">
                        <img src={tx} />
                    </div>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    style={{ marginTop: 16 }}
                >
                    确定头像
                </Button>
            </div>
        </div>)
    }
}
export default Info