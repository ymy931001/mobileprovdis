import React from 'react';
import { List, InputItem, DatePicker, Toast } from 'antd-mobile';
import { Radio, message, Modal, } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './cleanerchange.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    Input,
    Button,
    Upload,
} from "antd";

import {
    getQRcodestatus, findCleanerBySiteid, postcleaner, mobilelogin, getcode
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
            updis: 'none',
            nextdis: 'none',
            submitdis: false,
            flag: true,
            codename: '发送验证码',
        };


    }



    componentWillMount = () => {
        document.title = "保洁员信息查看";

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
                        findCleanerBySiteid([
                            localStorage.getItem('siteId')
                        ]).then(res => {
                            if (res.data && res.data.message === "success") {
                                if (res.data.data.length != 0) {   //eslint-disable-line
                                    this.setState({
                                        sex: res.data.data[0].sex,
                                        cleanername: res.data.data[0].name,
                                        certificateCode: res.data.data[0].certificatecode,
                                        cleanerphone: res.data.data[0].phone,
                                        fadate: new Date(res.data.data[0].issueDate.replace(/-/g, '/')),
                                        imageUrl: res.data.data[0].certificate,
                                        certificate: res.data.data[0].certificate,
                                        cleanerid: res.data.data[0].id,
                                        listnum: 0
                                    })
                                } else {

                                }
                                if (res.data.data.length > 1) {
                                    this.setState({
                                        nextdis: 'inline-block',
                                        clearlist: res.data.data
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }

    }


    //下一份
    nextone = () => {
        this.setState({
            sex: this.state.clearlist[parseInt(this.state.listnum, 10) + 1].sex,
            cleanername: this.state.clearlist[parseInt(this.state.listnum, 10) + 1].name,
            certificateCode: this.state.clearlist[parseInt(this.state.listnum, 10) + 1].certificatecode,
            cleanerphone: this.state.clearlist[parseInt(this.state.listnum, 10) + 1].phone,
            fadate: new Date(this.state.clearlist[parseInt(this.state.listnum, 10) + 1].issueDate.replace(/-/g, '/')),
            imageUrl: this.state.clearlist[parseInt(this.state.listnum, 10) + 1].certificate,
            cleanerid: this.state.clearlist[parseInt(this.state.listnum, 10) + 1].id,
            listnum: this.state.listnum + 1,
            updis: 'inline-block',
        }, function () {
            if (this.state.listnum === this.state.clearlist.length - 1) {
                this.setState({
                    nextdis: 'none',
                })
            }
        })
    }

    //上一份
    upone = () => {
        this.setState({
            sex: this.state.clearlist[parseInt(this.state.listnum, 10) - 1].sex,
            cleanername: this.state.clearlist[parseInt(this.state.listnum, 10) - 1].name,
            certificateCode: this.state.clearlist[parseInt(this.state.listnum, 10) - 1].certificatecode,
            cleanerphone: this.state.clearlist[parseInt(this.state.listnum, 10) - 1].phone,
            fadate: new Date(this.state.clearlist[parseInt(this.state.listnum, 10) - 1].issueDate.replace(/-/g, '/')),
            imageUrl: this.state.clearlist[parseInt(this.state.listnum, 10) - 1].certificate,
            cleanerid: this.state.clearlist[parseInt(this.state.listnum, 10) - 1].id,
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
        postcleaner([
            this.state.cleanerid,
            this.state.certificate,
            this.state.certificateCode,
            this.state.cleanername,
            this.state.sex,
            this.state.cleanerphone,
            moment(this.state.fadate).format('YYYY-MM-DD'),
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                message.success('修改成功')
                findCleanerBySiteid([
                    localStorage.getItem('siteId')
                ]).then(res => {
                    if (res.data && res.data.message === "success") {
                        this.setState({
                            clearlist: res.data.data
                        })
                    }
                })
            }
        })
    }

    //取消添加
    handleCancel = () => {
        this.setState({
            cupvisible: false,
            discup: 'none',
            yanzvisible: false,
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
                findCleanerBySiteid([
                    localStorage.getItem('siteId')
                ]).then(res => {
                    if (res.data && res.data.message === "success") {
                        if (res.data.data.length != 0) {  //eslint-disable-line 
                            this.setState({
                                sex: res.data.data[0].sex,
                                cleanername: res.data.data[0].name,
                                certificateCode: res.data.data[0].certificatecode,
                                cleanerphone: res.data.data[0].phone,
                                fadate: new Date(res.data.data[0].issueDate),
                                imageUrl: res.data.data[0].certificate,
                                certificate: res.data.data[0].certificate,
                                cleanerid: res.data.data[0].id,
                                listnum: 0
                            })
                        } else {

                        }
                        if (res.data.data.length > 1) {
                            this.setState({
                                nextdis: 'inline-block',
                                clearlist: res.data.data
                            })
                        }
                    }
                })
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
                            <div>
                                <Button type="primary" style={{ marginRight: '10px' }}>
                                    <Link to="/cleanerchangeadd">
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
                                    // onPreview={this.handlePreview}
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
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
                                <Button type="primary" onClick={this.btnquery} className="loginbtn" disabled={this.state.submitdis}>
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