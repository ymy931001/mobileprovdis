import React from 'react';
import { Toast } from 'antd-mobile';
import { Checkbox, Modal } from 'antd';
import './cupdispose.css';
import { Link } from 'react-router-dom';

import {
    Input,
    Button,
} from "antd";

import {
    findCupTypeBySiteId,
    addCupType,
} from "../axios";




const { Search } = Input;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'money',
            cols: 1,
            cuplist: [],
            discup: 'none',
            cuparr: localStorage.getItem('cuparr') === undefined || localStorage.getItem('cuparr') === "undefined" || localStorage.getItem('cuparr') === null
                || localStorage.getItem('cuparr') === "" ? [] :
                JSON.parse(localStorage.getItem('cuparr'))
        };


    }



    componentWillMount = () => {
        document.title = "杯具配置";
        findCupTypeBySiteId([
            localStorage.getItem('siteId')
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                console.log(res.headers)
                var arr = []
                for (var i in res.data.data) {
                    arr.push({
                        'label': res.data.data[i].name,
                        "value": res.data.data[i].id,
                    })
                }
                this.setState({
                    cuplist: arr
                })
            }
        })
    }




    cupchange = (value, b) => {
        console.log(value)
        console.log(this.state.cuparr)
        this.setState({
            cuparr: value
        }
            , function () {
                // for (var i in this.state.cuparr) {
                //     this.state.cuparr[i] = parseInt(this.state.cuparr[i])
                // }
                localStorage.setItem('cuparr', JSON.stringify(this.state.cuparr))
            }
        )
    }

    //输入其他杯具
    addcup = (e) => {
        this.setState({
            addcup: e.target.value
        })
    }

    //其他杯具
    othercup = () => {
        this.setState({
            discup: 'block'
        })
    }

    //添加杯具
    addcuplist = () => {
        if (!this.state.addcup) {
            this.setState({
                discup: 'none'
            })
        } else {
            this.setState({
                cupvisible: true,
            })
        }
    }

    //取消添加
    handleCancel = () => {
        this.setState({
            cupvisible: false,
            discup: 'none'
        })
    }

    //确认添加
    addcupOk = () => {
        addCupType([
            this.state.addcup,
            localStorage.getItem('siteId')
        ]).then(res => {
            if (res.data && res.data.message === "success") {
                Toast.success('添加成功')
                this.setState({
                    cupvisible: false,
                    discup: 'none'
                })
                findCupTypeBySiteId([
                    localStorage.getItem('siteId')
                ]).then(res => {
                    if (res.data && res.data.message === "success") {
                        var arr = []
                        for (var i in res.data.data) {
                            arr.push({
                                'label': res.data.data[i].name,
                                "value": res.data.data[i].id,
                            })
                        }
                        this.setState({
                            cuplist: arr,
                        })
                    }
                })
            }
        })
    }

    render() {
        return (
            <div id="cupdispose">
                <div className="cupdispose">
                    <div className="header">
                        <div className="headertitle">
                            <div>
                                <img src={require('../images/border.png')} className="borderimg" alt="" />
                                客房杯具配置
                            </div>
                            <Button type="primary">
                                <Link to="/houseinfo">
                                    <span>返回</span>
                                </Link>
                            </Button>
                        </div>
                        <div className="content">
                            <div className="cupheader">
                                （ 请选择需要的杯具类型 ）
                            </div>
                            <div>
                                <Checkbox.Group options={this.state.cuplist}
                                    onChange={this.cupchange}
                                    value={this.state.cuparr}
                                // onChange={onChange} 
                                />
                            </div>
                            <Button type="primary" onClick={this.othercup} style={{ marginLeft: '.3rem' }}>
                                <span>其他</span>
                            </Button>
                            <div style={{ textAlign: 'center', paddingLeft: '.3rem', paddingRight: '.3rem', display: this.state.discup }}>
                                <Search
                                    placeholder="请输入其他杯具名称"
                                    enterButton="添加"
                                    size="middle"
                                    onSearch={this.addcuplist}
                                    value={this.state.addcup}
                                    onChange={this.addcup}
                                    style={{ width: '100%', marginBottom: "10px", marginTop: '20px', fontSize: '14px' }}
                                />
                            </div>
                            <div className="cupbotbtn">
                                <Button type="primary" className="loginbtn">
                                    <Link to="/mobilesocket">
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
                <Modal
                    title="添加杯具种类"
                    visible={this.state.cupvisible}
                    onOk={this.addcupOk}
                    width="300px"
                    okText="确认"
                    centered
                    onCancel={this.handleCancel}
                >
                    您确认要添加{this.state.addcup}吗？
                </Modal>
            </div>
        )
    }
}


export default App;