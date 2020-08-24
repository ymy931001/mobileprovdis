import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'antd-mobile/dist/antd-mobile.css';
import mobile from "./mobile/mobile";
import mobilenext from "./mobilenext/mobilenext";
import mobilesuccess from "./mobilesuccess/mobilesuccess";
import addcup from "./addcup/addcup";
import cuplist from "./cuplist/cuplist";
import mobilelogin from "./mobilelogin/mobilelogin";
import mobileuser from "./mobileuser/mobileuser";
import register from "./register/register";
import houseinfo from "./houseinfo/houseinfo";
import cupdispose from "./cupdispose/cupdispose";
import cleanerinfo from "./cleanerinfo/cleanerinfo";
import disinfectionroom from "./disinfectionroom/disinfectionroom";
import cuplistwork from "./cuplistwork/cuplistwork";
import explainroom from "./explainroom/explainroom";
import mobilesocket from "./mobilesocket/mobilesocket";
import cleanerinfoadd from "./cleanerinfoadd/cleanerinfoadd";
import cupchange from "./cupchange/cupchange";
import cleanerchange from "./cleanerchange/cleanerchange";
import cleanerchangeadd from "./cleanerchangeadd/cleanerchangeadd";
import housechange from "./housechange/housechange";
import housechangeadd from "./housechangeadd/housechangeadd";
import mobileaddsuccess from "./mobileaddsuccess/mobileaddsuccess";

import {
  ConfigProvider
} from "antd";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function requireAuthentication(Component) {
  // 组件有已登陆的模块 直接返回 (防止重新渲染)
  if (Component.AuthenticatedComponent) {
    return Component.AuthenticatedComponent;
  }

  // 创建验证组件
  class AuthenticatedComponent extends React.Component {
    state = {
      flag: false
    };
    componentWillMount() {
      this.checkAuth();

    }
    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }
    checkAuth() {
      //判断缓存是否有token
      const token = localStorage.getItem("token");
      const reg = token ? true : null;
      if (reg) {
        //有token，重置flag
        this.setState({ flag: true });
      } else {
        let platform = localStorage.getItem('platform')
        console.log(platform)
        if (platform) {
          window.location.href = "/?" + platform;
          localStorage.removeItem('platform')
        } else {
          window.location.href = "/";
        }
      }
    }
    render() {
      return this.state.flag ? <Component {...this.props} /> : null;
    }
  }
  return AuthenticatedComponent;
}
ReactDOM.render(
  <Router>
    <ConfigProvider locale={zhCN}>
      <Switch>
        <Route exact path="/" component={mobile} />
        <Route path="/mobile" component={mobile} />
        <Route path="/mobilenext" component={mobilenext} />
        <Route path="/mobilesuccess" component={mobilesuccess} />
        <Route path="/addcup" component={addcup} />
        <Route path="/cuplist" component={cuplist} />
        <Route path="/mobilelogin" component={mobilelogin} />
        <Route path="/mobileuser" component={mobileuser} />
        <Route path="/register" component={register} />
        <Route path="/houseinfo" component={houseinfo} />
        <Route path="/cupdispose" component={cupdispose} />
        <Route path="/cleanerinfo" component={cleanerinfo} />
        <Route path="/disinfectionroom" component={disinfectionroom} />
        <Route path="/cuplistwork" component={cuplistwork} />
        <Route path="/explainroom" component={explainroom} />
        <Route path="/mobilesocket" component={mobilesocket} />
        <Route path="/cleanerinfoadd" component={cleanerinfoadd} />
        <Route path="/cupchange" component={cupchange} />
        <Route path="/cleanerchange" component={cleanerchange} />
        <Route path="/cleanerchangeadd" component={cleanerchangeadd} />
        <Route path="/housechange" component={housechange} />
        <Route path="/housechangeadd" component={housechangeadd} />
        <Route path="/mobileaddsuccess" component={mobileaddsuccess} />
        <Route path="/app" component={requireAuthentication(App)} />
      </Switch>
    </ConfigProvider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
