import React, { Component } from "react";
import axios from "axios";
import "./Login.scss";
import { Icon, Button, Modal, message } from "antd";
class Login extends Component {
    state = {
        havephone: false,
        visible: false,
        code: 0,
        timer: null,
        date: null,
        reg: false,
        phone: 0
    }
    visible = (ev) => {
        this.setState({
            visible: true,
            code: parseInt((Math.random() * 9000)) + 1000,
        });
        // console.log(ev.target.children[0].innerHTML);
        ev.target.children[0].innerHTML = '60 S';
        ev.target.disabled = true;
    };
    handleOk = () => {
        let date = Date.now();
        clearInterval(this.state.timer);
        this.setState({
            visible: false,
            date,
            timer: setInterval(async () => {
                let nowdate = Date.now();
                // console.log(this.refs.btn.parentElement);
                // console.log(this.state.date, nowdate);
                if (nowdate < this.state.date + 1000 * 60) {
                    let minutes = parseInt(this.refs.btn.innerHTML);
                    this.refs.btn.innerHTML = minutes - 1 + ' S';
                } else {
                    clearInterval(this.state.timer);
                    this.refs.btn.innerHTML = "获取验证码";
                    this.refs.btn.parentElement.disabled = false;
                }
            }, 1000)
        });
    };
    goto = () => {
        this.props.history.push('/home');
    }
    inputPhone = async (ev) => {
        let reg = /^1[3-9]\d{9}$/;
        let phone = ev.target.value;
        // console.log(reg.test(ev.target.value));
        let isOK = reg.test(ev.target.value);
        if (isOK) {
            let { data } = await axios.get('http://localhost:1998/users/check', {
                params: {
                    phone: ev.target.value
                }
            })
            console.log(data);
            this.setState({
                reg: data.code,
                havephone: isOK,
                phone
            })
        }
        ev.persist();
    }
    login = async () => {
        let { havephone, code, reg, phone } = this.state;
        // console.log(this.refs.phoneNumber.value, this.refs.verify.value)
        if (this.refs.phoneNumber.value && this.refs.verify.value) {
            if (havephone) {
                if (this.state.code == this.refs.verify.value) {
                    if (reg) {
                        let { data: data1 } = await axios.post('http://localhost:1998/users/reg', {
                            phone
                        });
                        console.log(data1);
                        let { data: { data: data2 } } = await axios.get("http://localhost:1998/users/login", {
                            params: {
                                phone
                            }
                        });
                        // console.log(data2);
                        localStorage.setItem('user', JSON.stringify({
                            phone,
                            Authorization: data2
                        }));
                        this.props.history.push('/mine');
                    } else {
                        let { data: { data: data2 } } = await axios.get("http://localhost:1998/users/login", {
                            params: {
                                phone
                            }
                        });
                        localStorage.setItem('user', JSON.stringify({
                            phone,
                            Authorization: data2
                        }));
                        this.props.history.push('/mine');
                    }
                } else {
                    message.error('验证码错误！');
                }
            } else {
                message.error('手机号和格式错啦！');
            }
        } else {
            message.error('手机号和验证码为必填项！');
        }
        console.log(code);
    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
    }
    render() {
        let { havephone, visible, code } = this.state;
        return (<div className="login">
            <h2><Icon type="close" onClick={this.goto} /></h2>
            <div className="l-head">
                <h3>登录/注册</h3>
                <h4>未注册过的手机号将自动创建安乐窝账号</h4>
            </div>
            <div className="l-form">
                <div className="inputbox">
                    <p>手机号</p>
                    <input type="text" ref="phoneNumber" placeholder="请输入手机号" onBlur={this.inputPhone.bind(this)} />
                </div>
                <div className="inputbox">
                    <div>
                        <label>验证码</label>
                        {
                            havephone
                                ? <>
                                    <Button size="small" className="btn1" onClick={this.visible}><span style={{ width: 80, textAlign: 'center' }} ref="btn">获取验证码</span></Button>
                                    <Modal
                                        title="短信验证码"
                                        visible={visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleOk}
                                    >
                                        <p>【安乐窝】验证码 {code}，您正在登录安乐窝，若非本人操作，请勿泄露。</p>
                                    </Modal>
                                </>
                                : <Button size="small" className="btn2" disabled>获取验证码</Button>
                        }
                    </div>
                    <input type="text" ref="verify" placeholder="请输入验证码" />
                </div>
            </div>
            <Button size="large" onClick={this.login}>登录</Button>
            <div className="l-foot">
                <span>使用社交账号登录</span>
                <Icon type="qq" />
                <Icon type="weibo-circle" />
            </div>
        </div>)
    }
}
export default Login