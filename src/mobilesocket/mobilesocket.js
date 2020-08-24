import React from 'react';
import { Picker, List, InputItem, Toast } from 'antd-mobile';
import { Modal, Spin } from 'antd';
import './mobilesocket.css';
import { Link } from 'react-router-dom';
import {
    Button,
} from "antd";

import {
    checkboard,
    deviceByAdmin,
    addroom
} from "../axios";


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'money',
            submitdis: false,
            worklist: [],
            socketimei: localStorage.getItem('socketimei'),
            cuparr: localStorage.getItem('cuparr') === undefined || localStorage.getItem('cuparr') === "undefined" || localStorage.getItem('cuparr') === null
                || localStorage.getItem('cuparr') === "" ? [] : JSON.parse(localStorage.getItem('cuparr')),
            equipmentid: localStorage.getItem('indexCode') === undefined || localStorage.getItem('indexCode') === "undefined" || localStorage.getItem('indexCode') === null
                ? [] : localStorage.getItem('indexCode').split(','),
            cols: 1,
            waitdis: 'none',
            disresult: 'none'
        };


    }



    componentWillMount = () => {
        if (window.location.href.replace(/%22/g, '').replace(/%7B/g, "").replace(/%3A/g, "=").replace(/%3B/g, "?=").replace(/%7D/g, "").split('ID=')[1] != undefined) {    //eslint-disable-line
            this.setState({
                socketimei: window.location.href.replace(/%22/g, '').replace(/%7B/g, "").replace(/%3A/g, "=").replace(/%3B/g, "?=").replace(/%7D/g, "").split('ID=')[1],
            }, function () {
                localStorage.setItem('socketimei', this.state.socketimei)
            })
        }
        document.title = "设备绑定";
        deviceByAdmin([

        ]).then(res => {
            if (res.data && res.data.msg === "SUCCESS") {
                var arr = []
                for (var i in res.data.data.list) {
                    arr.push({
                        'label': res.data.data.list[i].cameraName,
                        'value': res.data.data.list[i].cameraIndexCode,
                    })
                }
                this.setState({
                    equipmentdata: arr
                }, function () {
                    console.log(this.state.equipmentdata)
                })
            }
        })

    }



    areachange = (e) => {
        console.log(e)
        this.setState({
            areaid: e
        })
    }

    onPickerChange = (e, b) => {
        console.log(e)
        this.setState({
            equipmentid: e
        }, function () {
            console.log(this.state.equipmentid[0])
            localStorage.setItem('indexCode', this.state.equipmentid[0])
        }
        )
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    //提交
    btnquery = () => {
        if (!this.state.socketimei || !this.state.equipmentid || this.state.equipmentid.length === 0) {
            Toast.fail('请扫一扫或输入插座IMEI号,并选择对应摄像头')
        } else {
            var arrs = {}
            this.setState({
                submitdis: true
            })
            // arrs.cupId = localStorage.getItem('cuparr')
            arrs.cupId = this.state.cuparr
            arrs.imei = localStorage.getItem('socketimei').split(',')
            arrs.indexCode = localStorage.getItem('indexCode')
            arrs.name = localStorage.getItem('roomname')
            arrs.sterilizerDTOS = [{
                "brand": localStorage.getItem('roombrand'),
                "capacity": localStorage.getItem('capacity'),
                "model": localStorage.getItem('roommodel'),
                "photo": "http://disimg.terabits.cn/xiaodu.jpg",
                "power": parseInt(localStorage.getItem('roompower'), 10),
                "standartTime": localStorage.getItem('standartTime'),
            }]

            addroom([
                arrs,
                localStorage.getItem('erweimacode')
            ]).then(res => {
                if (res.data && res.data.message === "success") {
                    Toast.success('提交成功，请开始插座校验');
                    localStorage.removeItem('sterilizerphoto')
                    this.setState({
                        deletevisible: true,
                        submitdis: false,
                    })
                }
                if (res.data && res.data.code === 502) {
                    Toast.fail(res.data.message);
                    setTimeout(function () {
                        window.location.href = "/mobilelogin?deviced?=" + localStorage.getItem('erweimacode');
                    }, 1000);
                }
                if (res.data && res.data.code === -1) {
                    Toast.fail(res.data.data);
                    this.setState({
                        submitdis: false,
                    })
                }
            });
        }
    }
    //关闭弹窗
    handleCancel = () => {
        this.setState({
            deletevisible: false,
            secondvisible: false,
            threevisible: false,
            fourvisible: false,
            waitdis: 'none',
            btndis: 'block',
        })
    }

    //上一步
    secondCancel = () => {
        this.setState({
            deletevisible: true,
            secondvisible: false,
        })
    }


    //下一步
    deleteOk = () => {
        this.setState({
            secondvisible: true,
            deletevisible: false,
        })
    }

    //插座验证
    secondOk = () => {
        const _that = this
        this.setState({
            btndis: 'none',
            waitdis: 'block'
        })
        checkboard([
            localStorage.getItem('erweimacode'),
            this.state.socketimei,
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                this.setState({
                    secondvisible: false,
                    fourvisible: true,
                    worklist: res.data.data,
                })
            } else {
                setTimeout(function () {
                    checkboard([
                        localStorage.getItem('erweimacode'),
                        localStorage.getItem('socketimei'),
                    ]).then(res => {
                        if (res.data && res.data.message === "success") {
                            _that.setState({
                                secondvisible: false,
                                fourvisible: true,
                                worklist: res.data.data,
                            })
                        }
                        else {
                            setTimeout(function () {
                                checkboard([
                                    localStorage.getItem('erweimacode'),
                                    localStorage.getItem('socketimei'),
                                ]).then(res => {
                                    if (res.data && res.data.message === "success") {
                                        _that.setState({
                                            secondvisible: false,
                                            fourvisible: true,
                                            worklist: res.data.data,
                                        })
                                    } else {
                                        _that.setState({
                                            secondvisible: false,
                                            threevisible: true,
                                            worklist: res.data.data,
                                        })
                                    }
                                })
                            }, 5000);
                        }
                    })
                }, 5000);
            }
        })
    }

    //验证成功
    successbtn = () => {
        this.setState({
            secondvisible: false,
            fourvisible: true,
        })
    }

    //验证失败
    failbtn = () => {
        this.setState({
            secondvisible: false,
            threevisible: true,
        })
    }

    //重新验证
    failsubmit = () => {
        this.setState({
            secondvisible: true,
            threevisible: false,
            waitdis: 'none',
            btndis: 'block',
        })
    }


    lookresult = () => {
        this.setState({
            threevisible: true,
        })
    }

    //验证失败弹窗关闭
    submitfail = () => {
        this.setState({
            secondvisible: false,
            threevisible: false,
            waitdis: 'none',
            btndis: 'block',
            disresult: 'flex',
        })
    }

    //插座IMEI输入value
    socketimei = (value) => {
        this.setState({
            socketimei: value
        }, function () {
            localStorage.setItem('socketimei', this.state.socketimei)
        })
    }

    //扫一扫接口
    scan = () => {

    }

    render() {
        const { worklist } = this.state
        const workStatus = worklist.workStatus === true ? < span style={{ color: 'green' }}>开启</span> : < span style={{ color: 'red' }}>关闭</span>
        const loadStatus = worklist.loadStatus === true ? < span style={{ color: 'green' }}>开启</span> : < span style={{ color: 'red' }}>关闭</span>
        const onlineStatus = worklist.onlineStatus === true ? < span style={{ color: 'green' }}>在线</span> : < span style={{ color: 'red' }}>离线</span>
        const ledStatus = worklist.ledStatus === true ? < span style={{ color: 'green' }}>开启</span> : < span style={{ color: 'red' }}>关闭</span>
        return (
            <div id="mobilesocket">
                <div className="cupdispose">
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                                设备绑定
                            </div>
                            <Button type="primary">
                                <Link to="/cupdispose">
                                    <span>返回</span>
                                </Link>
                            </Button>
                        </div>
                        <div className="content">
                            <div className="contentline">
                                <Picker
                                    data={this.state.equipmentdata}
                                    cols={this.state.cols}
                                    value={this.state.equipmentid}
                                    onPickerChange={this.onPickerChange}
                                    onOk={v => console.log(v)}
                                >
                                    <List.Item arrow="horizontal" onClick={this.onClick}>绑定摄像头</List.Item>
                                </Picker>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请填写插座IMEI号"
                                        style={{ textAlign: 'right' }}
                                        value={this.state.socketimei}
                                        onChange={this.socketimei}
                                    >插座IMEI号</InputItem>
                                </List>
                            </div>
                            <div className="lines" style={{ marginBottom: '2rem' }}>
                                <a href={"http://sao315.com/w/api/saoyisao?redirect_uri=http://provdisinfection.terabits.cn/mobilesocket"} style={{ color: 'white' }}>
                                    <Button type="primary" style={{ background: 'orange', border: '1px solid orange', marginTop: '1rem' }}
                                        onClick={this.scan}
                                        className="loginbtn">
                                        <span>扫一扫</span>
                                    </Button>
                                </a>
                            </div>
                            <div style={{ display: this.state.disresult, justifyContent: 'space-around' }}>
                                <Button type="primary"
                                    onClick={this.lookresult}>
                                    <span>查看结果</span>
                                </Button>
                                <Button type="primary" style={{ background: 'red', border: '1px solid red' }}>
                                    <Link to="/mobilesuccess">
                                        <span>退出</span>
                                    </Link>
                                </Button>
                            </div>
                            <div className="lines" style={{ marginTop: '.2rem' }}>
                                <Button type="primary" onClick={this.btnquery} className="loginbtn" disabled={this.state.submitdis}>
                                    {/* <Link to="/houseinfo"> */}
                                    <span>提交并开始验证</span>
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
                {/* <div className="footer">
                    监管单位：浙江省卫生监督所  &nbsp;&nbsp;&nbsp;&nbsp;   技术支持：钛比科技
                </div> */}
                <Modal
                    title="插座验证"
                    visible={this.state.deletevisible}
                    onOk={this.deleteOk}
                    width="300px"
                    okText="下一步"
                    centered
                    onCancel={this.handleCancel}
                >
                    <div className="modelsocket">
                        <img src={require('./chazuo2.png')} alt="" style={{ width: '100%' }} />
                    </div>
                    <div className="secondtitle">
                        请按示意图连接插座，连接成功后点击下一步
                    </div>
                </Modal>
                <Modal
                    title="插座验证"
                    visible={this.state.secondvisible}
                    // onOk={this.secondOk}
                    width="300px"
                    okText="开始验证"
                    cancelText="上一步"
                    centered
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <div className="modelsocket">
                        <img src={require('./chazuo.png')} alt="" className="socketimg" />
                    </div>
                    <div className="sockettitle">
                        指示灯说明
                    </div>
                    <div>
                        <img src={require('./chazuo1.png')} alt="" className="socketimgs" />
                    </div>
                    <div className="socketbot">
                        *请确认插座正常运行后,进行插座验证。请等待1-2分钟。
                    </div>
                    <div className="socketbtn">
                        <div style={{ display: this.state.waitdis }}>
                            请等待 <Spin />
                        </div>
                        <div style={{ display: this.state.btndis }}>
                            <Button type="primary" onClick={this.secondCancel} >
                                <span>上一步</span>
                            </Button>
                            <Button type="primary" onClick={this.secondOk} style={{ marginLeft: '20px' }}>
                                <span>开始验证</span>
                            </Button>
                        </div>
                    </div>
                </Modal>
                <Modal
                    title="插座验证"
                    visible={this.state.threevisible}
                    width="300px"
                    okText="下一步"
                    cancelText="上一步"
                    centered
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div className="modelsocket">
                        <img src={require('./chazuo3.png')} alt="" style={{ width: '100%' }} />
                    </div>
                    <div className="secondtitle">
                        <span style={{ color: 'red' }}>*</span>  <span style={{ color: 'green', fontWeight: 'bold' }}>消毒间已注册成功!</span><br />
                        <span style={{ color: 'green', fontWeight: 'bold' }}>感谢您的配合！！</span> <br />
                        插座校验失败您可以尝试重新验证<br />
                        或联系电话：0571-87755736
                    </div>
                    <div className="socketbtn">
                        <Button type="primary" onClick={this.submitfail} >
                            <span>关闭</span>
                        </Button>
                        <Button type="primary" onClick={this.failsubmit} style={{ marginLeft: '20px' }}>
                            <span>重新验证</span>
                        </Button>
                    </div>
                </Modal>
                <Modal
                    title="插座验证"
                    visible={this.state.fourvisible}
                    width="300px"
                    okText="下一步"
                    cancelText="上一步"
                    centered
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div className="modelsocket">
                        <img src={require('./chazuo4.png')} alt="" style={{ width: '100%' }} />
                    </div>
                    <div className="secondtitle">
                        <div className="socketline">
                            开关状态：  {workStatus}
                        </div>
                        <div className="socketline">
                            信号强度:<span>{worklist.sig}</span>
                        </div>
                        <div className="socketline">
                            在线状态： {onlineStatus}
                        </div>
                        <div className="socketline">
                            LED灯状态： {ledStatus}
                        </div>
                        <div className="socketline">
                            负载状态： {loadStatus}
                        </div>
                        插座运行良好
                    </div>
                    <div className="socketbtn">
                        <Link to="/mobilesuccess">
                            <span>确认</span>
                        </Link>
                    </div>
                </Modal>
            </div >
        )
    }
}


export default App;