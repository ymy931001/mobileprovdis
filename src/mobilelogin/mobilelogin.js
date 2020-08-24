import React, { Component } from 'react';
import './mobilelogin.css';
import { Link } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import {
    Input,
    Button,
} from "antd";
import {
    getcode,
    mobilelogin,
    getQRcodestatus,
} from "../axios";

const { Search } = Input;

export default class Devicedisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codename: '发送验证码',
            flag: true,
        };

    }



    componentWillMount = () => {
        document.title = "登录页面";
    }

    componentDidMount = () => {
        let url = window.location.href;
        url = url.split('?=', 2);
        localStorage.setItem('erweimacode', url[1] === undefined ? localStorage.getItem("erweimacode") : url[1])
        getQRcodestatus([
            url[1]
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                localStorage.setItem('siteName', res.data.data.siteName)
                localStorage.setItem('roomId', res.data.data.roomId)
                localStorage.setItem('siteId', res.data.data.siteId)
                this.setState({
                    hasRoom: res.data.data.hasRoom,
                    ifHasAuthority: res.data.data.ifHasAuthority,
                })
                if (res.data.data.ifRegisterSite === true) {  //注册成功
                    if (res.data.data.qrcodeType === 0) {   //跳转展示码
                        window.location.href = "/mobileuser";
                    } else {  //跳转工作码
                        if (this.state.hasRoom === true) {   //房间已经注册
                            window.location.href = "/mobile";
                        } else { //没注册过房间
                            if (!localStorage.getItem('authorization') || localStorage.getItem('authorization') === undefined) { //没有token

                            } else {     //有token
                                if (this.state.ifHasAuthority === true) { //token有效
                                    window.location.href = "/houseinfo";
                                } else { //token无效

                                }
                            }
                        }
                    }
                } else {     //未注册成功(//审核未通过或审核失败)
                    if (res.data.data.auditRecordStatus === -1) {
                        localStorage.setItem('failseason', res.data.data.failRemark)
                        window.location.href = "/register";
                    } else {
                        window.location.href = "/register";
                    }
                }
            }
        })
    }


    //手机号输入
    phone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    //验证码输入
    codenum = (e) => {
        this.setState({
            codenum: e.target.value
        })
    }

    //发送验证码
    search = () => {
        if (this.state.flag === true) {
            getcode([
                this.state.phone
            ]).then(res => {
                if (res.data && res.data.code === 0) {
                    Toast.success('短信发送成功');
                    this.setState({
                        code: 60,
                        // codedisabled: true,
                    }, function () {
                        this.setState({
                            codename: this.state.code + 's',
                            // codedisabled: true,
                        })
                    })
                    this.interval = setInterval(() => this.time(), 1000);
                } else {
                    if (res.data && res.data.code === -1) {
                        Toast.fail(res.data.data);
                    }
                }
            })
        } else {

        }
    }

    time = () => {
        this.setState({
            code: this.state.code - 1,
        }, function () {
            this.setState({
                codename: this.state.code + 's',
                codedisabled: true,
            })
            if (this.state.code === 0) {
                this.setState({
                    flag: true,
                    codename: '获取验证码',
                    codedisabled: false,
                })
                clearInterval(this.interval)
            }
        })

    }

    //登录
    btnquery = () => {
        console.log(1111)
        mobilelogin([
            this.state.phone,
            this.state.codenum,
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                Toast.success('登录成功');
                localStorage.setItem("authorization", res.headers.authorization);
                setTimeout(function () {
                    window.location.href = "/houseinfo";
                }, 1000);
            } else {
                Toast.fail(res.data.data);
            }
        })
    }


    render() {
        return (
            <div id="mobilelogin">
                <div className="title">
                    酒店保洁智能监管平台
                </div>
                <div className="line">
                    <Input placeholder="请输入手机号"
                        value={this.state.phone}
                        onChange={this.phone}
                        autoComplete="off"
                        className="loginphone"
                    />
                </div>
                <div className="line">
                    <Search
                        placeholder="请输入验证码"
                        enterButton={this.state.codename}
                        value={this.state.codenum}
                        onChange={this.codenum}
                        autoComplete="off"
                        size="large"
                        onSearch={this.search}
                    />
                </div>
                <div className="zhuce">
                    <Link to="/register">
                        <span style={{ color: 'white' }}>没账户? / 注册</span>
                    </Link>

                </div>
                <div className="lines">
                    <Button type="primary" onClick={this.btnquery} className="loginbtn">
                        <span>登录</span>
                    </Button>
                </div>
                <div className="footer">
                    监管单位：浙江省卫生监督所  &nbsp;&nbsp;&nbsp;&nbsp;   技术支持：钛比科技
                </div>
            </div>
        )
    }
}