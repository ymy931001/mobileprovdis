import React, { Component } from 'react';
import './explainroom.css';
import { Button } from "antd";
import { List, TextareaItem, Toast } from 'antd-mobile';
import { QRcodeInfo, cupremark } from '../axios';
import { Link } from 'react-router-dom';
import moment from 'moment';


export default class Devicedisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileurl: '',
            mobiledis: 'none',
            cameraonline: 'none',
            uncameraonline: 'none',
        };

    }

    componentWillMount = () => {
        document.title = "说明";
        this.setState({
            mobileurl: "/mobile"
        })

        QRcodeInfo([
            localStorage.getItem('erweimacode'),
            localStorage.getItem('begintime'),
            localStorage.getItem('begintime'),
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                this.setState({
                    sitename: res.data.data.site.sitename,
                    roomname: res.data.data.room.name,
                    cameraid: res.data.data.camera.id,
                    onlinestatus: res.data.data.camera.onlinestatus,
                    socketmei: res.data.data.board.length > 0 ? res.data.data.board[0].imei : "无",
                }, function () {
                    if (this.state.onlinestatus === true) {
                        this.setState({
                            cameraonline: 'block'
                        })
                    }
                    if (this.state.onlinestatus === false) {
                        this.setState({
                            uncameraonline: 'block'
                        })
                    }
                })
            }
        })
    }


    mobilechange = () => {
        localStorage.setItem("mobilenum", "1")
    }

    addexplain = () => {
        if (!this.state.explaintext) {
            Toast.fail('请输入原因说明')
        } else {
            cupremark([
                localStorage.getItem('explainid'),
                this.state.explaintext,
            ]).then(res => {
                if (res.data && res.data.message === "success") {
                    Toast.success('添加成功')
                    setTimeout(function () {
                        window.location.href = "/mobile";
                    }, 1000);
                } else {
                    Toast.fail(res.data.data)
                    setTimeout(function () {
                        window.location.href = "/mobilelogin?=" + localStorage.getItem('erweimacode');
                    }, 1000);
                }
            })
        }

    }


    //原因说明
    explaintext = (value) => {
        this.setState({
            explaintext: value
        })
    }

    render() {
        return (
            <div id="explainroom">
                <div className="explainroom">
                    <div className="head">
                    </div>
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                            消毒间信息
                        </div>
                            <div className="more">
                                <Button type="primary" onClick={this.mobilechange} style={{ float: 'right' }}>
                                    <Link to={this.state.mobileurl}>
                                        <span>返回</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="content">
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/img.png')} alt="" /> &nbsp;酒店名称：
                            </span>
                                <span>
                                    {localStorage.getItem('hotelname')}
                                </span>
                            </div>
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/img1.png')} alt="" /> &nbsp;消毒间位置：
                            </span>
                                <span>
                                    {localStorage.getItem('roomname')}
                                </span>
                            </div>
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/time.png')} alt="" /> &nbsp;消毒日期：
                            </span>
                                <span>
                                    {moment(new Date(localStorage.getItem('explaintime').replace(/-/g, '/'))).format("YYYY-MM-DD")}
                                </span>
                            </div>
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/img3.png')} alt="" /> &nbsp;摄像头：
                            </span>
                                <span style={{ color: 'green', display: this.state.cameraonline }}>
                                    在线
                                        </span>
                                <span style={{ color: 'red', display: this.state.uncameraonline }}>
                                    离线
                                        </span>
                            </div>
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/img2.png')} alt="" /> &nbsp;插座IMEI：
                            </span>
                                <span>
                                    {this.state.socketmei}
                                </span>
                            </div>
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/img5.png')} alt="" />报警原因：
                            </span>
                                <span style={{ color: 'red' }}>
                                    {localStorage.getItem('explainmessage')}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="header" style={{ paddingBottom: '.1rem' }}>
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} alt="" className="borderimg" />
                            原因说明
                        </div>
                        </div>
                        <div className="content">
                            <List
                            // renderHeader={() => 'Count'}
                            >
                                <TextareaItem
                                    // {...getFieldProps('count', {
                                    //     initialValue: '计数功能,我的意见是...',
                                    // })}
                                    rows={5}
                                    count={100}
                                    onChange={this.explaintext}
                                    value={this.state.explaintext}
                                />
                            </List>
                            <Button type="primary" className="explainbtn" onClick={this.addexplain}>
                                <span>提交</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="foot">
                        监管单位:<img src={require('../images/foot2.png')} alt="" className="footimg" />浙江省卫生监督所&nbsp;&nbsp;
                        技术支持:<img src={require('../images/foot3.png')} alt="" className="footimg" />钛比科技
              </div>
                </div>
            </div>

        )
    }
}