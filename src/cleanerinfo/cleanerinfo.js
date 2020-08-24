import React from 'react';
import { List, InputItem, DatePicker, Toast } from 'antd-mobile';
import { Radio } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './cleanerinfo.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    Button,
    Upload
} from "antd";

import {
    addaudit
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
            cols: 1,
            updis: 'none',
            nextdis: 'none',
            submitdis: false,
        };


    }



    componentWillMount = () => {
        document.title = "保洁员信息录入";
        if (localStorage.getItem('clearnerlist') != undefined && localStorage.getItem('clearnerlist') != "undefined") {  //eslint-disable-line
            if (JSON.parse(localStorage.getItem('clearnerlist')).length != 0) {  //eslint-disable-line
                this.setState({
                    sex: JSON.parse(localStorage.getItem('clearnerlist'))[0].sex,
                    cleanername: JSON.parse(localStorage.getItem('clearnerlist'))[0].name,
                    certificateCode: JSON.parse(localStorage.getItem('clearnerlist'))[0].certificateCode,
                    cleanerphone: JSON.parse(localStorage.getItem('clearnerlist'))[0].phone,
                    fadate: new Date(JSON.parse(localStorage.getItem('clearnerlist'))[0].issueDate),
                    imageUrl: JSON.parse(localStorage.getItem('clearnerlist'))[0].certificate,
                    certificate: JSON.parse(localStorage.getItem('clearnerlist'))[0].certificate,
                    listnum: 0
                })
            } else {

            }
            if (JSON.parse(localStorage.getItem('clearnerlist')).length > 1) {
                this.setState({
                    nextdis: 'inline-block',
                })
            }
        }
    }


    //下一份
    nextone = () => {
        this.setState({
            sex: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) + 1].sex,
            cleanername: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) + 1].name,
            certificateCode: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) + 1].certificateCode,
            cleanerphone: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) + 1].phone,
            fadate: new Date(JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) + 1].issueDate),
            imageUrl: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) + 1].certificate,
            listnum: this.state.listnum + 1,
            updis: 'inline-block',
        }, function () {
            if (this.state.listnum === JSON.parse(localStorage.getItem('clearnerlist')).length - 1) {
                this.setState({
                    nextdis: 'none',
                })
            }
        })
    }

    //上一份
    upone = () => {
        this.setState({
            sex: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) - 1].sex,
            cleanername: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) - 1].name,
            certificateCode: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) - 1].certificateCode,
            cleanerphone: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) - 1].phone,
            fadate: new Date(JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) - 1].issueDate),
            imageUrl: JSON.parse(localStorage.getItem('clearnerlist'))[parseInt(this.state.listnum, 10) - 1].certificate,
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
                    certificate: "http://iva.terabits.cn" + info.file.response.data
                }, function () {
                    localStorage.setItem('certificate', this.state.certificate)
                }),
            );
        }
    };


    //性别选择
    sexonChange = (e) => {
        this.setState({
            sex: e.target.value
        })
    }

    //编号选择
    certificateCode = (value) => {
        console.log(value)
        this.setState({
            certificateCode: value.replace(/[^0-9.]/g, '')
        })
    }

    //保洁员姓名
    cleanername = (value) => {
        console.log(value)
        this.setState({
            cleanername: value
        })
    }


    //保洁员电话
    cleanerphone = (value) => {
        console.log(value)
        this.setState({
            cleanerphone: value.replace(/[^0-9.]/g, '')
        })
    }

    //发证时间
    fadate = (value) => {
        console.log(moment(value).format("YYYY-MM-DD"))
        this.setState({
            fadate: value
        })
    }

    //提交
    btnquery = () => {
        this.setState({
            submitdis: true,
        })
        if (JSON.parse(localStorage.getItem('clearnerlist')) === undefined || JSON.parse(localStorage.getItem('clearnerlist')) === null ||
            JSON.parse(localStorage.getItem('clearnerlist')) === "" || JSON.parse(localStorage.getItem('clearnerlist')) === "undefined") {
            if (!this.state.certificateCode || !this.state.cleanername || !this.state.sex || !this.state.cleanerphone || !this.state.fadate) {
                Toast.fail('请输入完整信息')
            } else {
                var cleanerarr = []
                cleanerarr.push({
                    "certificateCode": this.state.certificateCode,
                    "name": this.state.cleanername,
                    "sex": this.state.sex,
                    "phone": this.state.cleanerphone,
                    "issueDate": this.state.fadate,
                    "certificate": this.state.certificate,
                })
                var arrs = {}
                console.log(cleanerarr)
                arrs.creditcode = localStorage.getItem("creditcode")
                arrs.sitename = localStorage.getItem("hotelname")
                arrs.address = localStorage.getItem("address")
                arrs.adminName = localStorage.getItem("adminName")
                arrs.phone = localStorage.getItem("phone")
                arrs.mail = localStorage.getItem("adminemail")
                arrs.area = localStorage.getItem("areaid")
                arrs.province = localStorage.getItem("provinceid")
                arrs.city = localStorage.getItem("cityid")
                arrs.license = localStorage.getItem("license")
                arrs.cleanerDTOS = cleanerarr
                this.setState({
                    cleanerlists: cleanerarr,
                    arrslist: arrs
                }, function () {
                    localStorage.setItem("clearnerlist", JSON.stringify(this.state.cleanerlists))
                    this.submit()
                })
            }
        } else {
            var newarrs = {}
            console.log(JSON.parse(localStorage.getItem('clearnerlist')))
            newarrs.creditcode = localStorage.getItem("creditcode")
            newarrs.sitename = localStorage.getItem("hotelname")
            newarrs.address = localStorage.getItem("address")
            newarrs.adminName = localStorage.getItem("adminName")
            newarrs.phone = localStorage.getItem("phone")
            newarrs.mail = localStorage.getItem("adminemail")
            newarrs.area = localStorage.getItem("areaid")
            newarrs.province = localStorage.getItem("provinceid")
            newarrs.city = localStorage.getItem("cityid")
            newarrs.license = localStorage.getItem("license")
            newarrs.cleanerDTOS = JSON.parse(localStorage.getItem('clearnerlist'))
            this.setState({
                arrslist: newarrs
            }, function () {
                this.submit()
            })
        }
    }

    submit = () => {
        addaudit([
            localStorage.getItem('codenum'),
            this.state.arrslist,
            localStorage.getItem('erweimacode')
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                Toast.success('提交成功，请等待审核');
                setTimeout(function () {
                    window.location.href = "/mobileaddsuccess";
                }, 1000);
                localStorage.removeItem('clearnerlist')
                localStorage.removeItem('hotelname')
                localStorage.removeItem('creditcode')
                localStorage.removeItem('failseason')
                localStorage.removeItem('address')
                localStorage.removeItem('provinceid')
                localStorage.removeItem('areaid')
                localStorage.removeItem('cityid')
                localStorage.removeItem('adminName')
                localStorage.removeItem('phone')
                localStorage.removeItem('adminemail')
                localStorage.removeItem('license')
                this.setState({
                    submitdis: false,
                })
            }
            if (res.data && res.data.message === "common fail") {
                Toast.fail(res.data.data);
                this.setState({
                    submitdis: false,
                })
            }
        });
    }

    //关闭model
    handleCancel = () => {
        this.setState({
            visible: false,
            describevisible: false,
        })
    }



    //新增
    newadd = () => {
        if (localStorage.getItem('clearnerlist') != undefined && JSON.parse(localStorage.getItem('clearnerlist')).length > 1) {  //eslint-disable-line 
            window.location.href = "/cleanerinfoadd";
        } else {
            if (!this.state.certificateCode || !this.state.cleanername || !this.state.sex || !this.state.cleanerphone || !this.state.fadate) {
                Toast.fail('请输入完整信息')
            } else {
                var cleanerarr = []
                cleanerarr.push({
                    "certificateCode": this.state.certificateCode,
                    "name": this.state.cleanername,
                    "sex": this.state.sex,
                    "phone": this.state.cleanerphone,
                    "issueDate": this.state.fadate,
                    "certificate": this.state.certificate
                })
                localStorage.setItem("clearnerlist", JSON.stringify(cleanerarr))
                window.location.href = "/cleanerinfoadd";
            }
        }
    }

    render() {
        // const { getFieldProps } = this.props.form;
        const { imageUrl } = this.state;
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">点击添加健康证</div>
            </div>
        );
        return (
            <div id="cleanerinfo">
                <div className="cleanerinfo">
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                                保洁员添加
                            </div>
                            <Button type="primary" onClick={this.newadd}>
                                {/* <Link to="/cleanerinfoadd"> */}
                                <span>新增</span>
                                {/* </Link> */}
                            </Button>
                        </div>
                        <div className="content">
                            <div className="jiankang">
                                健康证
                                <Button type="primary" onClick={this.upone} style={{ marginLeft: '10px', display: this.state.updis }}>
                                    <span>上一份</span>
                                </Button>
                                <Button type="primary" onClick={this.nextone} style={{ marginLeft: '10px', display: this.state.nextdis }}>
                                    <span>下一份</span>
                                </Button>
                            </div>
                            <div className="line" style={{ marginTop: '.1rem' }}>
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
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请填写健康证编号"
                                        style={{ textAlign: 'right' }}
                                        value={this.state.certificateCode}
                                        onChange={this.certificateCode}
                                    >编号</InputItem>
                                </List>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请填写真实姓名"
                                        style={{ textAlign: 'right' }}
                                        value={this.state.cleanername}
                                        onChange={this.cleanername}
                                    >姓名</InputItem>
                                </List>
                            </div>

                            <div className="sexline">
                                <span className="sexspan">性别</span>
                                <Radio.Group onChange={this.sexonChange} value={this.state.sex}>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </Radio.Group>
                            </div>
                            <div className="contentline">
                                <List style={{ backgroundColor: 'white' }} className="picker-list">
                                    <InputItem
                                        // {...getFieldProps('autofocus')}
                                        clear
                                        placeholder="请填写手机号"
                                        style={{ textAlign: 'right' }}
                                        value={this.state.cleanerphone}
                                        onChange={this.cleanerphone}
                                    // ref={el => this.autoFocusInst = el}
                                    >手机号</InputItem>
                                </List>
                            </div>
                            <div className="contentline">
                                <DatePicker
                                    mode="date"
                                    title="请选择发证时间"
                                    extra="发证时间"
                                    value={this.state.fadate}
                                    onChange={this.fadate}
                                    okText="确认"
                                    dismissText="取消"
                                >
                                    <List.Item arrow="horizontal">发证时间</List.Item>
                                </DatePicker>
                            </div>
                            <div className="lines">
                                <Button type="primary" className="backbtn">
                                    <Link to="/register">
                                        <span>上一步</span>
                                    </Link>
                                </Button>
                            </div>
                            <div className="lines">
                                <Button type="primary" onClick={this.btnquery} className="loginbtn" disabled={this.state.submitdis}>
                                    <span>提交</span>
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
            </div>
        )
    }
}


export default App;