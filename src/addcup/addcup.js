import React, { Component } from 'react';
import './addcup.css';
import { Button, Table, Modal } from "antd";
import { List, Stepper, InputItem, Toast, Picker } from 'antd-mobile';
import { QRcodeInfofindBySite, QRcodeInfo, findCupTypeByCode, addCupRecordQRcodeInfo } from '../axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default class Devicedisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onlinecolor: 'green',
            mobileurl: '',
            tempdis: 'none',
            pleadingvisible: false,
            testvisible: false,
            username: null,
            temp: null,
            cuplist: [],
            cols: 1,
            cup: 10,
            cup1: 10,
            cup2: 10,
            cup3: 10,
            cup4: 10,
            cup5: 10,
            cup6: 10,
            cup7: 10,
            cup8: 10,
            cup9: 10,
            cup10: 10,
            type: 'money',
            discup8: 'none',
            discup7: 'none',
            discup6: 'none',
            discup9: 'none',
            discup10: 'none',
            cleaneroption: "",
            todaytime: moment(new Date()),
        };

        this.cupColumns = [
            {
                title: "杯具名称",
                dataIndex: "name",
            },
            {
                title: "数量",
                dataIndex: "count",
            },
        ];


    }



    componentWillMount = () => {

        document.title = "添加杯具";
        this.setState({
            mobileurl: "/mobile"
        })

        QRcodeInfo([
            localStorage.getItem('erweimacode'),
            moment(new Date()).format("YYYY-MM-DD"),
            moment(new Date()).format("YYYY-MM-DD"),
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                this.setState({
                    sitename: res.data.data.site.sitename,
                    roomname: res.data.data.room.name,
                })
            }
        })

        QRcodeInfofindBySite([
            localStorage.getItem('erweimacode'),
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                var arr = []
                var newarr = {}
                for (var i in res.data.data) {
                    if (res.data.data[i] != undefined) {   //eslint-disable-line
                        arr.push({
                            'label': res.data.data[i].name,
                            'value': res.data.data[i].id,
                        })
                    }
                    newarr[res.data.data[i].id] = res.data.data[i].name
                }
                console.log(newarr)
                arr.push({
                    'label': "其他",
                    'value': null,
                })
                this.setState({
                    cleaneroption: newarr,
                    cleanerlist: arr
                })
            }
        })

        findCupTypeByCode([
            localStorage.getItem('erweimacode'),
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                this.setState({
                    cupname1: res.data.data[0] === undefined ? null : res.data.data[0].name,
                    cupname2: res.data.data[1] === undefined ? null : res.data.data[1].name,
                    cupname3: res.data.data[2] === undefined ? null : res.data.data[2].name,
                    cupname4: res.data.data[3] === undefined ? null : res.data.data[3].name,
                    cupname5: res.data.data[4] === undefined ? null : res.data.data[4].name,
                    cupname6: res.data.data[5] === undefined ? null : res.data.data[5].name,
                    cupname7: res.data.data[6] === undefined ? null : res.data.data[6].name,
                    cupname8: res.data.data[7] === undefined ? null : res.data.data[7].name,
                    cupname9: res.data.data[8] === undefined ? null : res.data.data[8].name,
                    cupname10: res.data.data[9] === undefined ? null : res.data.data[9].name,
                    discup1: res.data.data[0] === undefined ? 'none' : "block",
                    discup2: res.data.data[1] === undefined ? 'none' : "block",
                    discup3: res.data.data[2] === undefined ? 'none' : "block",
                    discup4: res.data.data[3] === undefined ? 'none' : "block",
                    discup5: res.data.data[4] === undefined ? 'none' : "block",
                    discup6: res.data.data[5] === undefined ? 'none' : "block",
                    discup7: res.data.data[6] === undefined ? 'none' : "block",
                    discup8: res.data.data[7] === undefined ? 'none' : "block",
                    discup9: res.data.data[8] === undefined ? 'none' : "block",
                    discup10: res.data.data[9] === undefined ? 'none' : "block",
                    cuplist: res.data.data,
                })
            }
        })



    }


    submit = () => {
        var arr = []
        console.log(this.state.cuplist)
        for (var i in this.state.cuplist) {
            if (i === "0") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup1,
                })
            }
            if (i === "1") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup2,
                })
            }
            if (i === "2") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup3,
                })
            }
            if (i === "3") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup4,
                })
            }
            if (i === "4") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup5,
                })
            }
            if (i === "5") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup6,
                })
            }
            if (i === "6") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup7,
                })
            }
            if (i === "7") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup8,
                })
            }
            if (i === "8") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup9,
                })
            }
            if (i === "9") {
                arr.push({
                    'id': this.state.cuplist[i].id,
                    'name': this.state.cuplist[i].name,
                    'count': this.state.cup10,
                })
            }
        }
        this.setState({
            cuplists: arr,
            cupvisible: true
        })
    }

    addcupok = () => {
        addCupRecordQRcodeInfo([
            localStorage.getItem('erweimacode'),
            this.state.cleanerid.join(','),
            this.state.checkOutCount,
            this.state.cuplists,
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                Toast.success('添加成功');
                this.setState({
                    cupvisible: false,
                })
                setTimeout(function () {
                    window.location.href = "/mobile";
                }, 1000);
            }
        });
    }

    onChange = (val) => {
        console.log(val);
        this.setState({ val });
    }


    timeonChange = (value) => {
        console.log(value)
        this.setState({
            todaytime: moment(new Date(value)),
        })
    }
    //保洁员选择
    onPickerChange = (value) => {
        console.log(value)
        this.setState({
            cleanerid: value
        })
    }

    //退房数
    checkOutCount = (value) => {
        console.log(value)
        this.setState({
            checkOutCount: value.replace(/[^0-9.]/g, '')
        })
    }


    //提交杯具确认弹窗关闭
    handleCancel = () => {
        this.setState({
            cupvisible: false
        })
    }


    render() {
        // const cupoption = this.state.cuplist.map((province, index) => <List >
        //     <List.Item
        //         wrap
        //         extra={
        //             <Stepper
        //                 // style={{ width: '100%', minWidth: '100px' }}
        //                 showNumber
        //                 max={100}
        //                 min={0}
        //                 id={"a" + index}
        //                 name={province.name}
        //                 defaultValue={10}
        //                 // value={this.state.cup}
        //                 // ref={"a1" + province.name}
        //                 ref={"a" + index}
        //                 // onChange={val => this.setState({ cup: val })}
        //                 onChange={this.cupchange}
        //             />}
        //     >
        //         {index+1}.{province.name}
        //     </List.Item>
        // </List >
        // );


        return (
            <div id="addcup">
                <div className="addcup">
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
                                    {this.state.sitename}
                                </span>
                            </div>
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/img1.png')} alt="" /> &nbsp;消毒间位置：
                            </span>
                                <span>
                                    {this.state.roomname}
                                </span>
                            </div>
                            <div className="contentline">
                                <span className="lefttitle">
                                    <img src={require('../images/time.png')} alt="" /> &nbsp;日期：
                            </span>
                                <span>
                                    {moment(new Date()).format("YYYY-MM-DD")}
                                    {/* <DatePicker onChange={this.timeonChange} style={{ width: '140px' }} value={this.state.todaytime} /> */}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                                杯具清洗记录
                            </div>
                            {/* <div className="more">
                                <Button type="primary" onClick={this.mobilechange} style={{ float: 'right' }}>
                                    <Link to={this.state.mobileurl}>
                                        <span>修改杯具配置</span>
                                    </Link>
                                </Button>
                            </div> */}
                        </div>
                        <div className="content">
                            {/* {cupoption} */}
                            <List style={{ display: this.state.discup1 }}>
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup1}
                                            onChange={val => this.setState({
                                                cup1: val
                                            })}
                                        />}
                                >
                                    1.{this.state.cupname1}
                                </List.Item>
                            </List>
                            <List style={{ display: this.state.discup2 }} >
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup2}
                                            onChange={val => this.setState({ cup2: val })}
                                        />}
                                >
                                    2.{this.state.cupname2}
                                </List.Item>
                            </List>
                            <List style={{ display: this.state.discup3 }} >
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup3}
                                            onChange={val => this.setState({ cup3: val })}
                                        />}
                                >
                                    3.{this.state.cupname3}
                                </List.Item>
                            </List>

                            <List style={{ display: this.state.discup4 }}>
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup4}
                                            onChange={val => this.setState({ cup4: val })}
                                        />}
                                >
                                    4.{this.state.cupname4}
                                </List.Item>
                            </List>

                            <List style={{ display: this.state.discup5 }} >
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup5}
                                            onChange={val => this.setState({
                                                cup5: val
                                            })}
                                        />}
                                >
                                    5.{this.state.cupname5}
                                </List.Item>
                            </List>
                            <List style={{ display: this.state.discup6 }} >
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup6}
                                            onChange={val => this.setState({
                                                cup6: val
                                            })}
                                        />}
                                >
                                    6.{this.state.cupname6}
                                </List.Item>
                            </List>
                            <List style={{ display: this.state.discup7 }} >
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup7}
                                            onChange={val =>
                                                this.setState({
                                                    cup7: val
                                                })
                                            }
                                        />}
                                >
                                    7.{this.state.cupname7}
                                </List.Item>
                            </List>
                            <List style={{ display: this.state.discup8 }} >
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup8}
                                            onChange={val => this.setState({
                                                cup8: val
                                            })}
                                        />}
                                >
                                    8.{this.state.cupname8}
                                </List.Item>
                            </List>
                            <List style={{ display: this.state.discup9 }} >
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup9}
                                            onChange={val => this.setState({
                                                cup9: val
                                            })}
                                        />}
                                >
                                    9.{this.state.cupname9}
                                </List.Item>
                            </List>
                            <List style={{ display: this.state.discup10 }} >
                                <List.Item
                                    wrap
                                    extra={
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={100}
                                            min={0}
                                            value={this.state.cup10}
                                            onChange={val => this.setState({
                                                cup10: val
                                            })}
                                        />}
                                >
                                    10.{this.state.cupname10}
                                </List.Item>
                            </List>
                            <div style={{ borderBottom: '1px solid #ddd' }}>
                                <InputItem
                                    style={{ paddingLeft: '10px', textAlign: 'right' }}
                                    // type={type}
                                    placeholder="请输入退房数"
                                    clear
                                    onChange={this.checkOutCount}
                                    value={this.state.checkOutCount}
                                // onBlur={(v) => { console.log('onBlur', v); }}
                                >退房数</InputItem>
                            </div>
                            <div style={{ borderBottom: '1px solid #ddd', paddingLeft: '10px' }}>
                                <Picker
                                    data={this.state.cleanerlist}
                                    cols={this.state.cols}
                                    value={this.state.cleanerid}
                                    onPickerChange={this.onPickerChange}
                                    onOk={this.onPickerChange}
                                >
                                    <List.Item arrow="horizontal">操作人</List.Item>
                                </Picker>
                            </div>
                            <div className="btn">
                                <Button
                                    className="SignIn-requestbutton"
                                    onClick={this.submit}
                                    style={{ height: '40px', width: '100%', fontSize: '18px', background: '#1890ff', color: 'white', border: 'none' }}
                                >
                                    {/* <Link to="/mobile"> */}
                                    <span>提交</span>
                                    {/* </Link> */}
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
                    title="提交杯具"
                    visible={this.state.cupvisible}
                    onOk={this.addcupok}
                    width="300px"
                    okText="确认"
                    centered
                    onCancel={this.handleCancel}
                >
                    <div className="cuptable">
                        <div style={{ color: 'red', marginBottom: '10px' }}>
                            *请仔细确认填写的信息，一经确认不得修改，谢谢合作！
                        </div>
                        <div className="cupline">
                            <span>退房数：</span> <span>{this.state.checkOutCount}</span>
                        </div>
                        <div className="cupline">
                            <span>操作人：</span>  <span> {this.state.cleaneroption[this.state.cleanerid]}</span>
                        </div>
                        <Table
                            dataSource={this.state.cuplists}
                            columns={this.cupColumns}
                            pagination={false}
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}