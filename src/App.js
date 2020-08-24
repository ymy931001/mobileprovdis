import React, { Component } from 'react';
import { } from 'antd';
import './App.css';
import {
  ConfigProvider
} from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';


class App extends Component {
  state = {

  };

  componentwillMount = () => {


  }
  componentDidMount() {
  
  }




  render() {
    return (
      <ConfigProvider locale={zh_CN}>
        <div>
       
        </div>
      </ConfigProvider >



    )
  }
}

export default App;