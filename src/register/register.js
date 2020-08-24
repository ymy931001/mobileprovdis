import React from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Picker, List, Toast } from 'antd-mobile';
import { Link } from 'react-router-dom';
import './register.css';
import {
    Input,
    Button,
    Upload, Modal
} from "antd"

import {
    allProvinceCityDistrict,
    getallRegion,
    getcode,
} from "../axios";

require('es6-promise').polyfill();
require('isomorphic-fetch');

const data = [];

const { Search } = Input;

const AMap = window.AMap;


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            codename: '发送验证码',
            flag: true,
            files: data,
            loading: false,
            uptoken: localStorage.getItem('authorization'),
            permissionlist: [],
            creditcode: localStorage.getItem('creditcode'),
            hotelname: localStorage.getItem('hotelname'),
            hoteladdress: localStorage.getItem('hoteladdress'),
            arealist: localStorage.getItem('arealist') === undefined || localStorage.getItem('arealist') === null || localStorage.getItem('arealist') === "undefined" ? [] : localStorage.getItem('arealist').split(','),
            adminName: localStorage.getItem('adminName'),
            phone: localStorage.getItem('phone'),
            adminemail: localStorage.getItem('adminemail'),
            codenum: localStorage.getItem('codenum'),
            imageUrl: localStorage.getItem("license") === undefined ? null : localStorage.getItem("license"),
            imgsdis: "none",
            file: {
                files: [],
                multiple: true,
            }
        };


    }



    componentWillMount = () => {
        document.title = "注册页面";
        console.log(localStorage.getItem('arealist'))
        getallRegion([
            330000
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                for (var i in res.data.data) {
                    res.data.data[i].label = res.data.data[i].name
                    res.data.data[i].value = res.data.data[i].adcode
                    for (var j in res.data.data[i].children) {
                        res.data.data[i].children[j].label = res.data.data[i].children[j].name
                        res.data.data[i].children[j].value = res.data.data[i].children[j].adcode
                        for (var k in res.data.data[i].children[j].children) {
                            res.data.data[i].children[j].children[k].label = res.data.data[i].children[j].children[k].name
                            res.data.data[i].children[j].children[k].value = res.data.data[i].children[j].children[k].adcode
                        }
                    }
                }
                this.setState({
                    permissionlist: res.data.data
                })
            }
        });

        if (localStorage.getItem('failseason') != undefined) {  //eslint-disable-line
            this.setState({
                failreason: localStorage.getItem('failseason') === "" ? '无' : localStorage.getItem('failseason'),
                failvisible: true,
            }, function () {

            })
        }

    }

    componentDidMount() {
        this.initMap()
        // var vConsole = new VConsole();
    }





    //验证码输入
    codenum = (e) => {
        this.setState({
            codenum: e.target.value
        }, function () {
            localStorage.setItem("codenum", this.state.codenum)
        })
    }

    //发送验证码
    search = () => {
        if (this.state.flag === true) {
            getcode([
                this.state.phone
            ]).then(res => {
                if (res.data && res.data.code === 0) {
                    Toast.success('短信发送成功');
                    this.setState({
                        code: 60,
                        // codedisabled: true,
                        codenum: null,
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

    time = () => {
        this.setState({
            code: this.state.code - 1,
        }, function () {
            this.setState({
                codename: this.state.code + 'S',
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






    areachange = (e) => {
        console.log(e)
        this.setState({
            arealist: e
        }, function () {
            localStorage.setItem('provinceid', e[0])
            localStorage.setItem('cityid', e[1])
            localStorage.setItem('areaid', e[2])
        })
    }

    hoteladdress = (e) => {
        this.setState({
            hoteladdress: e.target.value
        })
    }

    hotelname = (e) => {
        this.setState({
            hotelname: e.target.value
        }, function () {
            localStorage.setItem("hotelname", this.state.hotelname)
        })
    }





    initMap() {
        var that = this
        var map = new AMap.Map("mapContainer", {
            resizeEnable: true,
            keyboardEnable: false,
            center: [120.201316, 30.236285],//地图中心点
            zoom: 15,//地图显示的缩放级别
        });

        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function () {
            var autoOptions = {
                city: "3301", //城市，默认全国
                citylimit: true,
                input: "facilityLocation",//使用联想输入的input的id
            };
            var autocomplete = new AMap.Autocomplete(autoOptions);

            // var clickEventListener = map.on('click', function (e) {
            //     console.log(e)
            //     document.getElementById('longitudetext').innerHTML = e.lnglat.getLng();
            //     document.getElementById('latitudetext').innerHTML = e.lnglat.getLat();
            //     // alert(e.lnglat.getLng() + ',' + e.lnglat.getLat())
            // });
            var placeSearch = new AMap.PlaceSearch({
                // city: '浙江',
                map: map
            })
            AMap.event.addListener(autocomplete, "select",
                function (e) {
                    console.log(e)
                    // console.log(e.poi.name)
                    // console.log(e.poi.adcode)
                    //TODO 针对选中的poi实现自己的功能
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name);
                    that.setState({
                        hotelname: e.poi.name,
                        hoteladdress: e.poi.address,
                        address: e.poi.district + e.poi.address,
                        area: e.poi.district,
                        areacode: e.poi.adcode,
                        longitude: e.poi.location.lng,
                        latitude: e.poi.location.lat,
                    }, function () {
                        localStorage.setItem("address", this.state.address)
                        localStorage.setItem("hotelname", this.state.hotelname)
                        localStorage.setItem("hoteladdress", this.state.hoteladdress)
                        allProvinceCityDistrict([
                            this.state.areacode,
                        ]).then(res => {
                            if (res.data && res.data.message === "success") {
                                var arr = []
                                for (var i in res.data.data) {
                                    if (res.data.data[i].adcode != "100000") {  //eslint-disable-line
                                        arr.push(res.data.data[i].adcode)
                                    }
                                }
                                function mysort(a, b) {
                                    return a - b;
                                }
                                this.setState({
                                    arealist: arr.sort(mysort)
                                }, function () {
                                    localStorage.setItem('provinceid', this.state.arealist[0])
                                    localStorage.setItem('cityid', this.state.arealist[1])
                                    localStorage.setItem('areaid', this.state.arealist[2])
                                    localStorage.setItem("arealist", this.state.arealist)
                                })
                            }
                        });

                    })
                },

            );
        });
    }


    //社会信用代码
    creditcode = (e) => {
        this.setState({
            creditcode: e.target.value
        }, function () {
            localStorage.setItem("creditcode", this.state.creditcode)
        })
    }


    //卫生管理员姓名
    adminName = (e) => {
        this.setState({
            adminName: e.target.value
        }, function () {
            localStorage.setItem("adminName", this.state.adminName)
        })
    }


    //卫生管理员手机号
    phone = (e) => {
        this.setState({
            phone: e.target.value
        }, function () {
            localStorage.setItem("phone", this.state.phone)
        })
    }

    //卫生管理员邮箱
    adminemail = (e) => {
        this.setState({
            adminemail: e.target.value
        }, function () {
            localStorage.setItem("adminemail", this.state.adminemail)
        })
    }



    //审核失败弹窗关闭
    handleCancel = () => {
        this.setState({
            failvisible: false,
        })
    }


    imgonChange = (files, type, index) => {
        console.log(files, type, index);


    };


    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
            Toast.fail('请上传图片');
        }
        return isJpgOrPng;
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
                    license: "http://iva.terabits.cn" + info.file.response.data
                }, function () {
                    localStorage.setItem('license', this.state.license)
                }),
            );
        }
    };





    render() {
        const { imageUrl } = this.state;
        const uploadButton = (
            <div>

                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">请上传卫生许可证</div>
            </div>
        );
        return (
            <div id="register">
                <div className="title">
                    酒店保洁智能监管平台
                </div>
                <div className="line">
                    <Input placeholder="请输入酒店社会信用代码"
                        value={this.state.creditcode}
                        onChange={this.creditcode}
                        autoComplete="off"
                        className="loginphone"
                    />
                </div>
                <div className="line">
                    <Input placeholder="请输入酒店名称"
                        value={this.state.hotelname}
                        onChange={this.hotelname}
                        autoComplete="off"
                        className="loginphone"
                        id="facilityLocation"
                    />
                </div>
                <div className="line" style={{ border: '1px solid white', borderRadius: '5px', color: 'white' }}>
                    <List style={{ backgroundColor: 'none' }} className="picker-list">
                        <Picker extra="请选择区域"
                            data={this.state.permissionlist}
                            title="所属区域"
                            value={this.state.arealist}
                            onOk={e => console.log('ok', e)}
                            onDismiss={e => console.log('dismiss', e)}
                            onChange={this.areachange}
                        >
                            <List.Item arrow="horizontal">酒店所属区域</List.Item>
                        </Picker>
                    </List>
                </div>
                <div className="line">
                    <Input placeholder="请输入酒店具体地址"
                        value={this.state.hoteladdress}
                        onChange={this.hoteladdress}
                        autoComplete="off"
                        className="loginphone"
                    />
                </div>
                <div className="line">
                    <Input placeholder="请输入卫生管理员姓名"
                        value={this.state.adminName}
                        onChange={this.adminName}
                        autoComplete="off"
                        className="loginphone"
                    />
                </div>
                <div className="line">
                    <Input placeholder="请输入卫生管理员邮箱"
                        value={this.state.adminemail}
                        onChange={this.adminemail}
                        autoComplete="off"
                        className="loginphone"
                    />
                </div>
                <div className="line">
                    <Input placeholder="请输入管理员手机号"
                        value={this.state.phone}
                        onChange={this.phone}
                        autoComplete="off"
                        className="loginphone"
                    />
                </div>


                <div className="line">
                    <Search
                        placeholder="请输入验证码"
                        enterButton={this.state.codename}
                        value={this.state.codenum}
                        onChange={this.codenum}
                        autoComplete="off"
                        size="large"
                        onSearch={this.search}
                    />
                </div>
                <div className="line" style={{ position: 'relative' }}>
                    <Upload
                        action='http://iva.terabits.cn:9090/upload/certificate'
                        data={file => ({ // data里存放的是接口的请求参数
                            code: localStorage.getItem('erweimacode'),
                        })}
                        onChange={this.handleChange}
                        beforeUpload={this.beforeUpload}
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
                        <Link to="/cleanerinfo">
                            <span>下一步</span>
                        </Link>
                    </Button>
                </div>
                <div className="lines">
                    <Button type="primary" className="backbtn">
                        <Link to="/mobilelogin">
                            <span>上一步</span>
                        </Link>
                    </Button>
                </div>
                <div className="footer">
                    监管单位：浙江省卫生监督所  &nbsp;&nbsp;&nbsp;&nbsp;   技术支持：钛比科技
                </div>
                <Modal
                    title="审核失败"
                    visible={this.state.failvisible}
                    width="300px"
                    footer={null}
                    centered
                    onCancel={this.handleCancel}
                >
                    原因：{this.state.failreason}
                </Modal>
            </div >
        )
    }
}


export default App;