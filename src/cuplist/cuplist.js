import React, { Component } from 'react';
import './cuplist.css';
import { Table, Button } from "antd";
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
            time: now,
            cuppage: false,
            listpage: false,
        };
        this.cupcolumns = [
            {
                title: "杯子种类",
                dataIndex: "name",
            }, {
                title: "数量",
                dataIndex: "count",
            }
        ];

    }



    componentWillMount = () => {
        document.title = "杯具添加情况";
        this.setState({
            mobileurl: "/mobileuser",
            cuplist: localStorage.getItem("cupdetail") === undefined || localStorage.getItem("cupdetail") === "undefined" ? [] :
                JSON.parse(localStorage.getItem("cupdetail"))
        })
    }





    render() {
        return (
            <div id="cuplist">
                <div className="cuplist">
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
                                    {localStorage.getItem('cuproom')}
                                </span>
                            </div>
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/time.png')} alt="" /> &nbsp;日期：
                            </span>
                                <span>
                                    {moment(new Date(localStorage.getItem('time').replace(/-/g, '/'))).format("YYYY-MM-DD")}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="header" style={{ paddingBottom: '.1rem' }}>
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                                杯具清洗记录
                        </div>
                        </div>
                        <div className="content">
                            <Table
                                dataSource={this.state.cuplist}
                                columns={this.cupcolumns}
                                pagination={this.state.listpage}
                                bordered
                                style={{ marginTop: '.1rem' }}
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