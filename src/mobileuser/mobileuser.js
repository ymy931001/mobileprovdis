import React, { Component } from 'react';
import './mobileuser.css';
import { Table, DatePicker } from "antd";
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
            cuppage: false,
            time: moment(new Date().getTime() - 24 * 60 * 60 * 1000)
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
                            <Link to="/cuplist">
                                <span>查看</span>
                            </Link>
                        </div >
                    )
                }

            },
        ];

    }



    componentWillMount = () => {

        document.title = "消毒情况展示";
        QRcodeInfo([
            localStorage.getItem('erweimacode'),
            moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYY-MM-DD"),
            moment(new Date().getTime() - 24 * 60 * 60 * 1000).format("YYYY-MM-DD"),
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                this.setState({
                    sitename: res.data.data.site.sitename,
                    address: res.data.data.site.address,
                    worklist: res.data.data.timePairsVOS,
                    cuplist: res.data.data.cupRecords,
                }, function () {
                    localStorage.setItem('hotelname', this.state.sitename)
                })
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


    //查看杯具添加记录
    addcuplist = (text, record, index) => {
        localStorage.setItem("time", record.date)
        localStorage.setItem("cupdetail", record.detail)
        localStorage.setItem("cuproom", record.roomName)
    }




    addcups = () => {
        localStorage.setItem('cuptest', 6666)
    }

    timeonChange = (value) => {
        this.setState({
            time: moment(new Date(value)),
        }, function () {
            QRcodeInfo([
                localStorage.getItem('erweimacode'),
                moment(new Date(value)).format("YYYY-MM-DD"),
                moment(new Date(value)).format("YYYY-MM-DD"),
            ]).then(res => {
                if (res.data && res.data.message === "success") {
                    this.setState({
                        worklist: res.data.data.timePairsVOS,
                        cuplist: res.data.data.cupRecords,
                    })
                }
            })
        })
    }

    render() {
        const components = {
            body: {
            },
        };
        this.nodeInfoTableColumns = [
            {
                title: "位置",
                dataIndex: "name",
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
                render: (text, record, index) =>
                    <div onClick={() => this.lookimg(text, record, index)} style={{ color: '#1890ff', cursor: 'pointer' }}>
                        <Link to="/mobilenext">
                            <span>查看</span>
                        </Link>
                    </div>
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





        return (
            <div id="mobileuser">
                <div className="mobileuser">
                    <div className="head">
                    </div>
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                        酒店信息
                        </div>
                            {/* <div className="more">
                            更多>>
                        </div> */}
                        </div>
                        <div className="content">
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/img.png')} alt="" /> &nbsp;名称
                                </span>

                                <span>
                                    {this.state.sitename}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                        消毒记录
                        </div>
                            <div className="contmid">
                                <DatePicker onChange={this.timeonChange}
                                    style={{ width: '120px' }}
                                    value={this.state.time}
                                />
                                {/* <span className="contlefttext">前一日</span>
                            - 06-02 -
                            <span className="contlefttext">后一日</span> */}
                            </div>
                        </div>
                        <div className="content">
                            <div className="list">
                                <Table
                                    dataSource={this.state.worklist}
                                    components={components}
                                    columns={nodeInfoTableColumns}
                                // pagination={this.state.listpage}
                                // pagination={false}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                        杯具清洗记录
                        </div>
                            {/* <div className="contmid">
                                <span className="contlefttext">前一日</span>
                            - 06-02 -
                            <span className="contlefttext">后一日</span>
                            </div> */}
                        </div>
                        <div className="content">
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