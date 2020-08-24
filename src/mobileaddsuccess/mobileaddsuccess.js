import React, { Component } from 'react';
import './mobileaddsuccess.css';



const nowTimeStamps = new Date();
const nowTimeStamp = new Date();
const nows = new Date(nowTimeStamps.getTime());

const now = new Date(nowTimeStamp.getTime());


export default class Devicedisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onlinecolor: 'green',
            date: now,
            dates: nows,
            time: now,
        };

    }



    componentWillMount = () => {
        document.title = "提交成功";
    }





    render() {
        return (
            <div id="mobilesuccess">
                <div style={{ textAlign: 'center' }}>
                    <img src={require('../images/success.png')} alt="" style={{ width: '40%' }} />
                </div>
                <div className="successtop">
                    提交成功!
                </div>
                <div className="successmid">
                    请等待审核!
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