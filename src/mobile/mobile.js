import React, { Component } from 'react';
import './mobile.css';
import { Table, Button } from "antd";
import { Toast, Accordion } from 'antd-mobile';
import { QRcodeInfo } from '../axios';
import { Link } from 'react-router-dom';
import moment from 'moment';


const nowTimeStamps = new Date();
const nowTimeStamp = new Date();
const nows = new Date(nowTimeStamps.getTime());

const now = new Date(nowTimeStamp.getTime() - 7 * 24 * 3600 * 1000);




export default class Devicedisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onlinecolor: 'green',
            date: now,
            dates: nows,
            cameraonline: 'none',
            uncameraonline: 'none',
            nocamera: 'none',
            time: now,
            cuppage: false,
        };
        this.cupcolumns = [
            {
                title: "日期",
                dataIndex: "date",
                render: (text, record, index) => {
                    return (
                        <div>
                            <span>{moment(new Date(text.replace(/-/g, '/'))).format("YYYY-MM-DD")}</span>
                        </div>
                    )
                }
            }, {
                title: "退房数",
                dataIndex: "checkoutCount",
            }, {
                title: "操作人",
                dataIndex: "cleanerName",
            },
            {
                title: "详情",
                dataIndex: "id",
                render: (text, record, index) => {
                    return (
                        < div style={{ color: '#1890ff', cursor: 'pointer' }} onClick={() => this.addcuplist(text, record, index)}>
                            <Link to="/cuplistwork">
                                <span>查看</span>
                            </Link>
                        </div >
                    )
                }

            },
        ];


        this.alarmcolumns = [
            {
                title: "位置",
                dataIndex: "name",
                // render: (text, record, index) => {
                //     return (
                //         <div>
                //             <span>{moment(new Date(text)).format("YYYY-MM-DD")}</span>
                //         </div>
                //     )
                // }
            }, {
                title: "报警日期",
                dataIndex: "date",
                render: (text, record, index) => {
                    return (
                        <div>
                            <span>{moment(new Date(text.replace(/-/g, '/'))).format("YYYY-MM-DD")}</span>
                        </div>
                    )
                }
            }, {
                title: "报警原因",
                dataIndex: "message",
                render: (text, record, index) => {
                    return (
                        <div>
                            <span style={{ color: 'red' }}>{text}</span>
                        </div>
                    )
                }
            },
            {
                title: "详情",
                dataIndex: "id",
                render: (text, record, index) => {
                    return (
                        <div onClick={() => this.lookexplain(text, record, index)} style={{ color: '#1890ff', cursor: 'pointer' }}>
                            <Link to="/explainroom">
                                <span style={{ color: 'red' }}>说明</span>
                            </Link>
                        </div>
                    )
                }

            },
        ];



    }



    componentWillMount = () => {
        document.title = "消毒情况展示";
        QRcodeInfo([
            localStorage.getItem('erweimacode'),
            moment(new Date().getTime() - 24 * 60 * 60 * 1000 * 7).format("YYYY-MM-DD"),
            moment(new Date().getTime()).format("YYYY-MM-DD"),
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                this.setState({
                    sitename: res.data.data.site.sitename,
                    roomname: res.data.data.room.name,
                    worklist: res.data.data.timePairsVOS,
                    cuplist: res.data.data.cupRecords,
                    onlinestatus: res.data.data.camera === undefined ? "无" : res.data.data.camera.onlinestatus,   //eslint-disable-line
                    model: res.data.data.sterilizers.length > 0 ? res.data.data.sterilizers[0].model : "无",
                    power: res.data.data.sterilizers.length > 0 ? res.data.data.sterilizers[0].power : "0",
                    time: moment(new Date().getTime()).format("YYYY-MM-DD"),
                    alarmlist: res.data.data.alarmHistoryVOS,
                    boardimei: res.data.data.board.length > 0 ? res.data.data.board[0].imei : "无",
                }, function () {
                    localStorage.setItem('hotelname', this.state.sitename)
                    localStorage.setItem('roomname', this.state.roomname)
                    if (this.state.onlinestatus === true) {
                        this.setState({
                            cameraonline: 'block'
                        })
                    }
                    if (this.state.onlinestatus === "无") {
                        this.setState({
                            nocamera: 'block'
                        })
                    }
                    if (this.state.onlinestatus === false) {
                        this.setState({
                            uncameraonline: 'block'
                        })
                    }
                })

            } else {
                Toast.fail(res.data.data)
            }
        })


    }


    lookimg = (text, record, index) => {
        console.log(record)
        localStorage.setItem("devicetime", record.date)
        localStorage.setItem("begintime", this.state.time)
        localStorage.setItem("endtime", this.state.time)
        localStorage.setItem("roomname", record.name)
        localStorage.setItem("worktime", record.worktime)
        localStorage.setItem("runtime", record.runtime)
        localStorage.setItem("readingVOS", JSON.stringify(record.readingVOS))
        localStorage.setItem("timePiars", JSON.stringify(record.timePiars))
    }

    lookexplain = (text, record, index) => {
        console.log(record)
        localStorage.setItem("explainid", record.id)
        localStorage.setItem("explaintime", record.date)
        localStorage.setItem("explainmessage", record.message)
        localStorage.setItem("roomname", record.name)
    }

    addcup = (text, record, index) => {
        localStorage.setItem("devicetime", record.date)
        localStorage.setItem("begintime", this.state.date)
        localStorage.setItem("endtime", this.state.dates)
    }

    lookcup = (text, record, index) => {
        Toast.fail('暂无数据');
    }


    addcups = () => {
        console.log(777)
        this.setState({
            visible: true,
        })
    }


    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
    }


    //查看杯具添加记录
    addcuplist = (text, record, index) => {
        localStorage.setItem("time", record.date)
        localStorage.setItem("cupdetail", record.detail)
        localStorage.setItem("cuproom", record.roomName)
    }

    //关闭添加杯具弹窗
    onClose = () => {
        this.setState({
            visible: false,
        })
    }
    render() {
        const components = {
            body: {
            },
        };
        this.nodeInfoTableColumns = [
            {
                title: "日期",
                dataIndex: "date",
                render: (text, record, index) => {
                    return (
                        <div>
                            <span>{moment(new Date(text.replace(/-/g, '/'))).format("YYYY-MM-DD")}</span>
                        </div>
                    )
                }
            },
            {
                title: "结果",
                dataIndex: "result",
                render: (text, record, index) => {
                    if (text === 0) {
                        return (
                            <div>
                                <span style={{ color: 'red' }}>未消毒</span>
                            </div>
                        )
                    }
                    if (text === 1) {
                        return (
                            <div>
                                <span style={{ color: 'green' }}>已消毒</span>
                            </div>
                        )
                    }
                    if (record.status === 5) {
                        if (text === 2) {
                            return (
                                <div>
                                    <span style={{ color: 'blue' }}>未达标</span>
                                </div>
                            )
                        }
                    } else {
                        if (text === 2) {
                            return (
                                <div>
                                    <span style={{ color: 'blue' }}>进行中</span>
                                </div>
                            )
                        }
                    }
                    if (text === null) {
                        return (
                            <div>
                                <span >无</span>
                            </div>
                        )
                    }
                }
            },
            {
                title: "详情",
                dataIndex: "adminname",
                render: (text, record, index) => {
                    return (
                        <div onClick={() => this.lookimg(text, record, index)} style={{ color: '#1890ff', cursor: 'pointer' }}>
                            <Link to="/disinfectionroom">
                                <span>查看</span>
                            </Link>
                        </div>
                    )
                }

            },
        ];


        const nodeInfoTableColumns = this.nodeInfoTableColumns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                }),
            };
        });

        const cupcolumns = this.cupcolumns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                }),
            };
        });

        const alarmcolumns = this.alarmcolumns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                }),
            };
        });







        return (
            <div id="mobile">
                <div className="mobile">
                    <div className="head">
                    </div>
                    <div className="header">
                        <Accordion className="my-accordion" onChange={this.onChange} >
                            <Accordion.Panel header={<div className="Accordion">
                                <div>
                                    <img src={require('../images/border.png')} className="borderimg" alt="" />
                                消毒间信息
                            </div>
                                {/* <div className="Accordionmore">
                                    更多
                            </div> */}
                            </div>}>
                                <div className="content">
                                    <div className="contentline">
                                        <span className="lefttitle">
                                            <img src={require('../images/img.png')} alt="" /> &nbsp;酒店
                            </span>
                                        <span>
                                            {this.state.sitename}
                                        </span>
                                        {/* <div><a href="http://sao315.com/w/api/saoyisao?redirect_url=http://****.com/rl?code=1">扫一扫</a></div> */}
                                    </div>
                                    <div className="contentline">
                                        <span className="lefttitle">
                                            <img src={require('../images/img1.png')} alt="" /> &nbsp;消毒间位置
                            </span>
                                        <span>
                                            {this.state.roomname}
                                        </span>
                                    </div>
                                    <div className="contentline">
                                        <span className="lefttitle">
                                            <img src={require('../images/img1.png')} alt="" /> &nbsp;消毒柜
                                        </span>
                                        <span style={{ color: '#1890ff' }}>
                                            <Link to="/housechange">
                                                <span>查看</span>
                                            </Link>
                                        </span>
                                    </div>
                                    <div className="contentline">
                                        <span className="lefttitle">
                                            <img src={require('../images/img3.png')} alt="" /> &nbsp;摄像头
                                        </span>
                                        <span style={{ color: 'green', display: this.state.cameraonline }}>
                                            在线
                                        </span>
                                        <span style={{ color: 'red', display: this.state.uncameraonline }}>
                                            离线
                                        </span>
                                        <span style={{ color: 'red', display: this.state.nocamera }}>
                                            无
                                        </span>
                                    </div>
                                    <div className="contentline">
                                        <span className="lefttitle">
                                            <img src={require('../images/img2.png')} alt="" /> &nbsp;插座IMEI
                                        </span>
                                        <span>
                                            {this.state.boardimei}
                                        </span>
                                    </div>
                                    <div className="contentline">
                                        <span className="lefttitle">
                                            <img src={require('../images/img6.png')} alt="" /> &nbsp;杯具配置
                                        </span>
                                        <span style={{ color: '#1890ff' }}>
                                            <Link to="/cupchange">
                                                <span>查看</span>
                                            </Link>
                                        </span>
                                    </div>
                                    <div className="contentline">
                                        <span className="lefttitle">
                                            <img src={require('../images/img4.png')} alt="" /> &nbsp;保洁员管理
                                        </span>
                                        <span style={{ color: '#1890ff' }}>
                                            <Link to="/cleanerchange">
                                                <span>查看</span>
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                    <div className="header">
                        <Accordion className="my-accordion" onChange={this.onChange}>
                            <Accordion.Panel header={<div className="Accordion">
                                <div>
                                    <img src={require('../images/border.png')} className="borderimg" alt="" />
                                消毒记录
                            </div>
                            </div>}>
                                <div className="content">
                                    <div className="list">
                                        <Table
                                            dataSource={this.state.worklist}
                                            components={components}
                                            columns={nodeInfoTableColumns}
                                            // pagination={this.state.listpage}
                                            pagination={false}
                                        />
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>

                    <div className="header">
                        <Accordion className="my-accordion" onChange={this.onChange} defaultActiveKey="0">
                            <Accordion.Panel header={<div className="Accordion">
                                <div>
                                    <img src={require('../images/border.png')} className="borderimg" alt="" />
                                    杯具清洗记录
                                </div>
                            </div>}>
                                <div className="content">
                                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                                        <Button type="primary">
                                            <Link to="/addcup">
                                                <span>添加</span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <div className="list">
                                        <Table
                                            dataSource={this.state.cuplist}
                                            components={components}
                                            columns={cupcolumns}
                                            // pagination={this.state.listpage}
                                            pagination={false}
                                        />
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>

                    <div className="header">
                        <Accordion className="my-accordion" onChange={this.onChange}>
                            <Accordion.Panel header={<div className="Accordion">
                                <div>
                                    <img src={require('../images/border.png')} className="borderimg" alt="" />
                                    报警记录
                                </div>
                            </div>}>
                                <div className="content">
                                    <div className="list alarmtable">
                                        <Table
                                            dataSource={this.state.alarmlist}
                                            components={components}
                                            columns={alarmcolumns}
                                        // pagination={this.state.listpage}
                                        // pagination={false}
                                        />
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                </div>
                <div className="footer">
                    <div className="foot">
                        监管单位:<img src={require('../images/foot2.png')} alt="" className="footimg" />浙江省卫生监督所&nbsp;&nbsp;
                        技术支持:<img src={require('../images/foot3.png')} alt="" className="footimg" />钛比科技
              </div>
                </div>
            </div >
        )
    }
}