import React from 'react';
import { List, InputItem, Toast } from 'antd-mobile';
import './houseinfo.css';
import { Link } from 'react-router-dom';

import {

    Button,
    Upload,
} from "antd";


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
            siteName: localStorage.getItem('siteName'),
            roomname: localStorage.getItem('roomname'),
            roombrand: localStorage.getItem('roombrand'),
            roommodel: localStorage.getItem('roommodel'),
            roompower: localStorage.getItem('roompower'),
            standartTime: localStorage.getItem('standartTime'),
            capacity: localStorage.getItem('capacity'),
            imageUrl: localStorage.getItem('sterilizerphoto'),
            sterilizerphoto: localStorage.getItem('sterilizerphoto'),
        };



    }



    componentWillMount = () => {
        document.title = "消毒间信息录入";
        // localStorage.setItem('sterilizerphoto', "http://disimg.terabits.cn/xiaodu.jpg")
        // Toast.fail(localStorage.getItem('erweimacode'))
        // findCupTypeBySiteId([

        // ]).then(res => {
        //     if (res.data && res.data.code === 502) {
        //         setTimeout(function () {
        //             window.location.href = "/mobilelogin";
        //         }, 1000);
        //     }
        // })
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
                }, function () {
                    localStorage.setItem('sterilizerphoto', this.state.sterilizerphoto)
                }),
            );
        }
    };

    // //酒店名称
    // siteName = (value) => {
    //     console.log(value)
    //     this.setState({
    //         siteName: value
    //     })
    // }

    //消毒间名字
    roomname = (value) => {
        console.log(value)
        this.setState({
            roomname: value
        }, function () {
            localStorage.setItem("roomname", this.state.roomname)
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




    render() {
        // const { getFieldProps } = this.props.form;
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
                            配置消毒间
                            </div>
                            <Button type="primary">
                                <Link to="/mobilelogin">
                                    <span>返回</span>
                                </Link>
                            </Button>
                        </div>
                        <div className="content">
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请输入酒店名称"
                                        style={{ textAlign: 'right' }}
                                        value={this.state.siteName}
                                        editable={false}
                                    >酒店名称</InputItem>
                                </List>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        value={this.state.roomname}
                                        onChange={this.roomname}
                                        clear
                                        placeholder="请输入消毒间位置"
                                        style={{ textAlign: 'right' }}
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
                                    name="multipartFile"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    accept="image/*"
                                    capture="camera"
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            <div className="lines">
                                <Button type="primary" onClick={this.btnquery} className="loginbtn">
                                    <Link to="/cupdispose">
                                        <span>下一步</span>
                                    </Link>
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
            </div>
        )
    }
}


export default App;