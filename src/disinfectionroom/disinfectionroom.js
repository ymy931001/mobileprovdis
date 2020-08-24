import React, { Component } from 'react';
import './disinfectionroom.css';
import { Table, Button } from "antd";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Toast } from 'antd-mobile';


export default class Devicedisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobiledis: 'none',
            worktime: localStorage.getItem('worktime'),
            runtime: localStorage.getItem('runtime'),
            worklist: localStorage.getItem('timePiars') === undefined || localStorage.getItem('timePiars') === "undefined" ? [] : JSON.parse(localStorage.getItem('timePiars')),
            accesslist: localStorage.getItem('readingVOS') === undefined || localStorage.getItem('readingVOS') === "undefined" ? [] : JSON.parse(localStorage.getItem('readingVOS')),
        };

    }

    componentWillMount = () => {
        document.title = "消毒详情";
    }

    lookimg = (text, record, index) => {
        if (record.timePiarsInfo === undefined) {
            Toast.fail('暂无图片')
        } else {
            if (record.timePiarsInfo.length != 0) {   //eslint-disable-line 
                this.setState({
                    mobiledis: 'block',
                    lookimgurl: "http://iva.terabits.cn" + record.timePiarsInfo[0].file
                })
            }
        }
    }


    mobilechange = () => {
        localStorage.setItem("mobilenum", "1")
    }


    render() {
        const components = {
            body: {
            },
        };
        this.nodeInfoTableColumns = [
            {
                title: "开始时间",
                dataIndex: "start",
                render: (text, record, index) =>
                    <div>
                        {moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
            }, {
                title: "结束时间",
                dataIndex: "end",
                render: (text, record, index) =>
                    <div>
                        {moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
            },
            {
                title: "图片",
                dataIndex: "adminname",
                render: (text, record, index) =>
                    <div onClick={() => this.lookimg(text, record, index)} style={{ color: '#1890ff', cursor: 'pointer' }}>
                        查看
                    </div>
            },
        ];

        this.accessolumns = [
            {
                title: "开始时间",
                dataIndex: "begin",
            }, {
                title: "结束时间",
                dataIndex: "end",
            }, {
                title: "功率",
                dataIndex: "power",
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

        const accessolumns = this.accessolumns.map((col) => {
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
            <div id="mobilenetxbody">
                <div className="mobilenetxbody">
                    <div className="head">
                        {/* <div>
                            监管单位：浙江省卫生监督所
                    </div>
                        <div>
                            技术支持：钛比科技
                    </div> */}
                    </div>
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                            消毒间信息
                        </div>
                            <div className="more">
                                <Button type="primary" onClick={this.mobilechange} style={{ float: 'right' }}>
                                    <Link to="/mobile">
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
                                    <img src={require('../images/img4.png')} alt="" /> &nbsp;消毒人员工作时长（分）：
                            </span>
                                <span>
                                    {(localStorage.getItem('worktime') / 60).toFixed(1)}
                                </span>
                            </div>
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/img1.png')} alt="" /> &nbsp;消毒柜工作时长（分）：
                            </span>
                                <span>
                                    {(localStorage.getItem('runtime') / 60).toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="header" style={{ paddingBottom: '.1rem' }}>
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} alt="" className="borderimg" />
                            消毒人员工作情况
                        </div>
                        </div>
                        <div className="content">
                            <Table
                                dataSource={this.state.worklist}
                                components={components}
                                columns={nodeInfoTableColumns}
                                pagination={false}
                                bordered
                                style={{ marginTop: '.05rem' }}
                            />
                            <div style={{ width: '100%', marginTop: '.1rem', display: this.state.mobiledis }}>
                                <img src={this.state.lookimgurl} alt="" style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>

                    <div className="header" style={{ paddingBottom: '.1rem' }}>
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                            智能插座工作情况
                        </div>
                        </div>
                        <div className="content">
                            <Table
                                dataSource={this.state.accesslist}
                                components={components}
                                columns={accessolumns}
                                pagination={false}
                                bordered
                                style={{ marginTop: '.05rem' }}
                            />
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