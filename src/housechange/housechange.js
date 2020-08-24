import React from 'react';
import { List, InputItem, Toast } from 'antd-mobile';
import './housechange.css';
import { Link } from 'react-router-dom';

import {
    Input,
    Button,
    Upload, Modal
} from "antd";

import {
    getroomsterilizer, getQRcodestatus, getcode, mobilelogin, changesterilizer
} from "../axios";

const { Search } = Input;

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
            cols: 1,
            flag: true,
            codename: '发送验证码',
            updis: "none",
            nextdis: 'none',
        };



    }



    componentWillMount = () => {
        document.title = "消毒柜信息查看";
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
                        this.alllist()
                    }
                }
            }).catch(error => {
                alert(error)
            })
        }



    }


    alllist = () => {
        getroomsterilizer([
            localStorage.getItem('roomId')
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                if (res.data.data != undefined && res.data.data.length > 0) {  //eslint-disable-line 
                    this.setState({
                        sterilizerid: res.data.data[0].id,
                        siteName: res.data.data[0].siteName,
                        roomname: res.data.data[0].roomName,
                        roombrand: res.data.data[0].brand,
                        roommodel: res.data.data[0].model,
                        roompower: res.data.data[0].power,
                        standartTime: res.data.data[0].standartTime,
                        capacity: res.data.data[0].capacity,
                        imageUrl: res.data.data[0].photo,
                        photo: res.data.data[0].photo,
                        listnum: 0
                    })
                    if (res.data.data.length > 1) {
                        this.setState({
                            nextdis: 'inline-block',
                            sterilizerlist: res.data.data
                        })
                    }
                }

            }
        })
    }

    areachange = (e) => {
        console.log(e)
        this.setState({
            areaid: e
        })
    }

    onPickerChange = (e) => {
        console.log(e)
        this.setState({
            asyncValue: e
        })
    }


    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            Toast.success('上传成功')
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                    sterilizerphoto: "http://iva.terabits.cn" + info.file.response.data
                }),
            );
        }
    };

    //取消添加
    handleCancel = () => {
        this.setState({
            yanzvisible: false,
        })
    }



    //消毒柜品牌
    roombrand = (value) => {
        this.setState({
            roombrand: value
        }, function () {
            localStorage.setItem("roombrand", this.state.roombrand)
        })
    }

    //消毒柜型号
    roommodel = (value) => {
        this.setState({
            roommodel: value
        }, function () {
            localStorage.setItem("roommodel", this.state.roommodel)
        })
    }


    //消毒柜功率
    roompower = (value) => {
        this.setState({
            roompower: value.replace(/[^0-9.]/g, '')
        }, function () {
            localStorage.setItem("roompower", parseInt(this.state.roompower, 10))
        })
    }


    //消毒柜标准时长
    standartTime = (value) => {
        this.setState({
            standartTime: value.replace(/[^0-9.]/g, '')
        }, function () {
            localStorage.setItem("standartTime", parseInt(this.state.standartTime, 10))
        })
    }

    //消毒柜容量
    capacity = (value) => {
        this.setState({
            capacity: value.replace(/[^0-9.]/g, '')
        }, function () {
            localStorage.setItem("capacity", this.state.capacity)
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
                this.alllist()
            } else {
                Toast.fail(res.data.data);
            }
        })
    }


    //验证码输入
    codenum = (e) => {
        this.setState({
            codenum: e.target.value
        })
    }

    //手机号输入
    phone = (e) => {
        this.setState({
            phone: e.target.value
        })
    }



    //修改
    btnquery = () => {
        changesterilizer([
            this.state.sterilizerid,
            this.state.roombrand,
            this.state.roommodel,
            this.state.roompower,
            this.state.standartTime,
            this.state.capacity,
            this.state.sterilizerphoto,
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                Toast.success('修改成功')
            }
        })
    }


    //下一份
    nextone = () => {
        this.setState({
            roombrand: this.state.sterilizerlist[parseInt(this.state.listnum, 10) + 1].brand,
            roommodel: this.state.sterilizerlist[parseInt(this.state.listnum, 10) + 1].model,
            roompower: this.state.sterilizerlist[parseInt(this.state.listnum, 10) + 1].power,
            standartTime: this.state.sterilizerlist[parseInt(this.state.listnum, 10) + 1].standartTime,
            capacity: this.state.sterilizerlist[parseInt(this.state.listnum, 10) + 1].capacity,
            imageUrl: this.state.sterilizerlist[parseInt(this.state.listnum, 10) + 1].photo,
            photo: this.state.sterilizerlist[parseInt(this.state.listnum, 10) + 1].photo,
            sterilizerid: this.state.sterilizerlist[parseInt(this.state.listnum, 10) + 1].id,
            listnum: this.state.listnum + 1,
            updis: 'inline-block',
        }, function () {
            if (this.state.listnum === this.state.sterilizerlist.length - 1) {
                this.setState({
                    nextdis: 'none',
                })
            }
        })
    }

    //上一份
    upone = () => {
        this.setState({
            roombrand: this.state.sterilizerlist[parseInt(this.state.listnum, 10) - 1].brand,
            roommodel: this.state.sterilizerlist[parseInt(this.state.listnum, 10) - 1].model,
            roompower: this.state.sterilizerlist[parseInt(this.state.listnum, 10) - 1].power,
            standartTime: this.state.sterilizerlist[parseInt(this.state.listnum, 10) - 1].standartTime,
            capacity: this.state.sterilizerlist[parseInt(this.state.listnum, 10) - 1].capacity,
            imageUrl: this.state.sterilizerlist[parseInt(this.state.listnum, 10) - 1].photo,
            photo: this.state.sterilizerlist[parseInt(this.state.listnum, 10) - 1].photo,
            sterilizerid: this.state.sterilizerlist[parseInt(this.state.listnum, 10) - 1].id,
            listnum: this.state.listnum - 1,
            nextdis: 'inline-block',
        }, function () {
            if (this.state.listnum === 0) {
                this.setState({
                    updis: 'none',
                })
            }
        })
    }




    render() {
        const { imageUrl } = this.state;
        const uploadButton = (
            <div>
                {/* {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />} */}
                <div className="ant-upload-text">请上传消毒柜正面照片</div>
            </div>
        );
        return (
            <div id="houseinfo">
                <div className="houseinfo">
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                            配置消毒柜
                            </div>
                            <div>
                                <Button type="primary" style={{ marginRight: '10px' }}>
                                    <Link to="/housechangeadd">
                                        <span>新增</span>
                                    </Link>
                                </Button>
                                <Button type="primary">
                                    <Link to="/mobile">
                                        <span>返回</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="content">
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请输入酒店名称"
                                        style={{ textAlign: 'right' }}
                                        value={this.state.siteName || localStorage.getItem('siteName')}
                                        editable={false}
                                    >酒店名称</InputItem>
                                </List>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        value={this.state.roomname || localStorage.getItem('roomname')}
                                        clear
                                        placeholder="请输入消毒间位置"
                                        style={{ textAlign: 'right' }}
                                        editable={false}
                                    >消毒间位置</InputItem>
                                </List>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请输入消毒柜品牌"
                                        style={{ textAlign: 'right' }}
                                        value={this.state.roombrand}
                                        onChange={this.roombrand}
                                    // ref={el => this.autoFocusInst = el}
                                    >消毒柜品牌</InputItem>
                                </List>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请输入消毒柜型号"
                                        value={this.state.roommodel}
                                        onChange={this.roommodel}
                                        style={{ textAlign: 'right' }}
                                    >消毒柜型号</InputItem>
                                </List>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请输入消毒柜功率"
                                        value={this.state.roompower}
                                        onChange={this.roompower}
                                        style={{ textAlign: 'right' }}
                                        ref={el => this.autoFocusInst = el}
                                    >消毒柜功率（W）</InputItem>
                                </List>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请输入消毒标准时长"
                                        value={this.state.standartTime}
                                        onChange={this.standartTime}
                                        style={{ textAlign: 'right' }}
                                    >消毒标准时长（分）</InputItem>
                                </List>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        value={this.state.capacity}
                                        onChange={this.capacity}
                                        placeholder="请输入消毒柜容量"
                                        style={{ textAlign: 'right' }}
                                    >消毒柜容量（L）</InputItem>
                                </List>
                            </div>
                            <div>

                            </div>
                            <div className="line">
                                消毒柜正面照：
                                <Upload
                                    action='http://iva.terabits.cn:9090/upload/certificate'
                                    data={file => ({ // data里存放的是接口的请求参数
                                        code: localStorage.getItem('erweimacode'),
                                        multipartFile: file, // file 是当前正在上传的图片
                                    })}
                                    onChange={this.handleChange}
                                    // onPreview={this.handlePreview}
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            <div className="lines"   >
                                <Button type="primary" onClick={this.upone} className="loginbtn" style={{ marginTop: '.1rem', display: this.state.updis }}>
                                    <span>上一个</span>
                                </Button>
                            </div>
                            <div className="lines"   >
                                <Button type="primary" onClick={this.nextone} className="loginbtn" style={{ marginTop: '.1rem', display: this.state.nextdis }}>
                                    <span>下一个</span>
                                </Button>
                            </div>
                            <div className="lines" style={{ marginTop: '.1rem' }}>
                                <Button type="primary" onClick={this.btnquery} className="loginbtn">
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