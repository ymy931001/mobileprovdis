import React from 'react';
import { List, InputItem, DatePicker, Toast } from 'antd-mobile';
import { Radio } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './cleanerinfoadd.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
    Button,
    Upload
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
            submitdis: false,
        };


    }



    componentWillMount = () => {
        document.title = "保洁员信息录入"
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

    //关闭model
    handleCancel = () => {
        this.setState({
            visible: false,
            describevisible: false,
        })
    }

    //新增
    btnquery = () => {
        console.log(!this.state.certificateCode)
        console.log(!this.state.cleanername)
        console.log(!this.state.sex)
        console.log(!this.state.cleanerphone)
        console.log(!this.state.fadate)
        if (!this.state.certificateCode || !this.state.cleanername || !this.state.sex || !this.state.cleanerphone || !this.state.fadate) {
            Toast.fail('请输入完整信息')
        } else {
            var cleanerarr = localStorage.getItem('clearnerlist') === undefined
                || localStorage.getItem('clearnerlist') === "undefined"
                || localStorage.getItem('clearnerlist') === null ? [] :
                JSON.parse(localStorage.getItem('clearnerlist'))
            var arr = []
            var arrs = []
            for (var i in cleanerarr) {
                arr.push(cleanerarr[i].phone)
            }
            for (var j in cleanerarr) {
                arrs.push(cleanerarr[j].certificateCode)
            }
            if (arr.indexOf(this.state.cleanerphone) != -1) {  //eslint-disable-line
                Toast.fail('手机号码重复')
            } else if (arrs.indexOf(this.state.certificateCode) != -1) {  //eslint-disable-line
                Toast.fail('健康证编号重复')
            } else {
                cleanerarr.push({
                    "certificateCode": this.state.certificateCode,
                    "name": this.state.cleanername,
                    "sex": this.state.sex,
                    "phone": this.state.cleanerphone,
                    "issueDate": this.state.fadate,
                    "certificate": this.state.certificate
                })
                localStorage.setItem("clearnerlist", JSON.stringify(cleanerarr))
                Toast.success('添加成功')
                setTimeout(function () {
                    window.location.href = "/cleanerinfo";
                }, 1000);
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
            <div id="cleanerinfoadd">
                <div className="cleanerinfoadd">
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                                保洁员添加
                            </div>
                            <Button type="primary">
                                <Link to="/cleanerinfo">
                                    <span>返回</span>
                                </Link>
                            </Button>
                        </div>
                        <div className="content">
                            <div className="jiankang">
                                健康证
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
                                <Button type="primary" onClick={this.btnquery} className="loginbtn">
                                    <span>确认</span>
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