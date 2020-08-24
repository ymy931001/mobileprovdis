import React from 'react';
import { Toast } from 'antd-mobile';
import { Checkbox, Modal } from 'antd';
import './cupchange.css';
import { Link } from 'react-router-dom';

import {
    Input,
    Button,
    message
} from "antd";

import {
    addCupType,
    getQRcodestatus, getcode, mobilelogin, findCupTypeByRoomId, modifyCupRoom
} from "../axios";

const { Search } = Input;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'money',
            cols: 1,
            cuplist: [],
            flag: true,
            discup: 'none',
            codename: '发送验证码',
        };


    }



    componentWillMount = () => {
        document.title = "杯具配置";

        if (!localStorage.getItem('authorization')) {
            this.setState({
                yanzvisible: true,
            })
        } else {
            getQRcodestatus([
                localStorage.getItem('erweimacode')
            ]).then(res => {
                if (res.data && res.data.message === "success") {
                    if (!res.data.data.ifHasAuthority || res.data.data.ifHasAuthority === false) {
                        this.setState({
                            yanzvisible: true,
                        })
                    } else {
                        localStorage.setItem('roomId', res.data.data.roomId)
                        localStorage.setItem('siteId', res.data.data.siteId)
                        findCupTypeByRoomId([
                            res.data.data.roomId
                        ]).then(res => {
                            if (res.data && res.data.message === "success") {
                                var arr = []
                                for (var i in res.data.data.allCup) {
                                    arr.push({
                                        'label': res.data.data.allCup[i].name,
                                        "value": res.data.data.allCup[i].id,
                                    })
                                }
                                this.setState({
                                    cuplist: arr,
                                    cuparr: res.data.data.roomCupIds
                                })
                            }
                        })
                    }
                }
            })
        }
    }




    cupchange = (value, b) => {
        this.setState({
            cuparr: value
        })
    }

    //输入其他杯具
    addcup = (e) => {
        this.setState({
            addcup: e.target.value
        })
    }

    //其他杯具
    othercup = () => {
        this.setState({
            discup: 'block'
        })
    }

    //添加杯具
    addcuplist = () => {
        if (!this.state.addcup) {
            this.setState({
                discup: 'none'
            })
        } else {
            this.setState({
                cupvisible: true,
            })
        }
    }

    //取消添加
    handleCancel = () => {
        this.setState({
            cupvisible: false,
            discup: 'none',
            yanzvisible: false,
        })
    }

    //确认添加
    addcupOk = () => {
        addCupType([
            this.state.addcup,
            localStorage.getItem('siteId')
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                message.success('添加成功')
                this.setState({
                    cupvisible: false,
                    discup: 'none',
                })
                findCupTypeByRoomId([
                    localStorage.getItem('roomId')
                ]).then(res => {
                    if (res.data && res.data.message === "success") {
                        var arr = []
                        for (var i in res.data.data.allCup) {
                            arr.push({
                                'label': res.data.data.allCup[i].name,
                                "value": res.data.data.allCup[i].id,
                            })
                        }
                        this.setState({
                            cuplist: arr,
                            cuparr: res.data.data.roomCupIds
                        })
                    }
                })
            }
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
        if (!this.state.phone) {
            Toast.fail('请输入手机号')
        } else {
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

    //手机号输入
    phone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    //确认登录
    yanzok = () => {
        console.log(1111)
        mobilelogin([
            this.state.phone,
            this.state.codenum,
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                Toast.success('验证成功');
                this.setState({
                    yanzvisible: false,
                })
                localStorage.setItem("authorization", res.headers.authorization);
                findCupTypeByRoomId([
                    localStorage.getItem('roomId')
                ]).then(res => {
                    if (res.data && res.data.message === "success") {
                        var arr = []
                        for (var i in res.data.data.allCup) {
                            arr.push({
                                'label': res.data.data.allCup[i].name,
                                "value": res.data.data.allCup[i].id,
                            })
                        }
                        this.setState({
                            cuplist: arr,
                            cuparr: res.data.data.roomCupIds
                        })
                    }
                })
            } else {
                Toast.fail(res.data.data);
            }
        })
    }

    changecup = () => {
        modifyCupRoom([
            localStorage.getItem('roomId'),
            this.state.cuparr.join(',')
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                Toast.success('修改成功')
                setTimeout(function () {
                    window.location.href = "/mobile";
                }, 1000);
            }
        })
    }



    render() {
        return (
            <div id="cupdispose">
                <div className="cupdispose">
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                                客房杯具配置
                            </div>
                            <Button type="primary">
                                <Link to="/mobile">
                                    <span>返回</span>
                                </Link>
                            </Button>
                        </div>
                        <div className="content">
                            <div className="cupheader">
                                （ 请选择需要的杯具类型 ）
                            </div>
                            <div>
                                <Checkbox.Group options={this.state.cuplist}
                                    onChange={this.cupchange}
                                    value={this.state.cuparr}
                                // onChange={onChange} 
                                />
                            </div>
                            <Button type="primary" onClick={this.othercup} style={{ marginLeft: '.3rem' }}>
                                <span>其他</span>
                            </Button>
                            <div style={{ textAlign: 'center', paddingLeft: '.3rem', paddingRight: '.3rem', display: this.state.discup }}>
                                <Search
                                    placeholder="请输入其他杯具名称"
                                    enterButton="添加"
                                    size="middle"
                                    onSearch={this.addcuplist}
                                    value={this.state.addcup}
                                    onChange={this.addcup}
                                    style={{ width: '100%', marginBottom: "10px", marginTop: '20px', fontSize: '14px' }}
                                />
                            </div>
                            <div className="cupbotbtn">
                                <Button type="primary" className="loginbtn" onClick={this.changecup}>
                                    <span>修改</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="foot">
                        监管单位:<img src={require('../images/foot2.png')} alt="" className="footimg" />浙江省卫生监督所&nbsp;&nbsp;
                        技术支持:<img src={require('../images/foot3.png')} alt="" className="footimg" />钛比科技
                    </div>
                </div>
                <Modal
                    title="添加杯具种类"
                    visible={this.state.cupvisible}
                    onOk={this.addcupOk}
                    width="300px"
                    okText="确认"
                    centered
                    onCancel={this.handleCancel}
                >
                    您确认要添加{this.state.addcup}吗？
                </Modal>

                <Modal
                    title="请先进行身份验证"
                    visible={this.state.yanzvisible}
                    onOk={this.yanzok}
                    width="300px"
                    okText="确认"
                    centered
                    onCancel={this.handleCancel}
                >
                    <div className="cupline">
                        <Input placeholder="请输入手机号"
                            value={this.state.phone}
                            onChange={this.phone}
                            autoComplete="off"
                            className="loginphone"
                        />
                    </div>
                    <div className="cupline">
                        <Search
                            placeholder="请输入验证码"
                            enterButton={this.state.codename}
                            style={{ fontSize: '14px' }}
                            value={this.state.codenum}
                            onChange={this.codenum}
                            autoComplete="off"
                            // size="large"
                            onSearch={this.search}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}


export default App;