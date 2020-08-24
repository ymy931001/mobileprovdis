import http from "./tools";
import * as config from "./config";



//登录

export const login = (params) => http.post(config.requestIp + '/auth/login/username', {
  username: params[0],
  password: params[1],
  // remember: true,
});



//获取酒店级联
export const getDeviceList = (params) => http.get(config.requestIp + "/directory/names", {

});


//获取设备列表
export const detectionService = (params) => http.get(config.requestIp + "/detection", {
  pageNum: params[0],
  pageSize: params[1],
  siteid: params[2],
  roomid: params[3],
  start: params[4],
  stop: params[5],
  sceneid: params[6],
});

//获取设备列表
export const newdetectionsearch = (params) => http.get(config.requestIp + "/detection", {
  pageNum: params[0],
  pageSize: params[1],
  city: params[2],
  area: params[3],
  siteid: params[4],
  start: params[5],
  stop: params[6],
  key: params[7],
});

//获取设备列表
export const detectionServices = (params) => http.post(config.requestIp + "/detection/list", {
  token: localStorage.getItem('token'),
  sitename: params[0],
  names: params[1],
  start: params[2],
  stop: params[3]
});

//获取设备参数修改封面
export const getcover = (params) => http.post(config.requestIp + "/device/cover", {
  token: localStorage.getItem('token'),
  id: params[0],
});





//获取视频列表
export const getVideoList = params =>
  http.post(config.requestIp + "/detection/video", {
    token: localStorage.getItem('token'),
    device_ip: params[0],
  });

//获取抓拍图片地址
export const getPictureAddress = params =>
  http.downget(config.requestIp + "/download/image", {
    // authorization: params[0],
    zipAddress: params[0],
    pictureAddress: params[1],
  });


//根据房间id获取一个
export const getroomdevice = params =>
  http.get(config.requestIp + "/camera/" + params[0], {

  });



//获取设备列表
export const devicelist = params =>
  http.get(config.requestIp + "/camera", {
    city: params[0],
    area: params[1],
    siteid: params[2],
    mode: params[3],
    key: params[4],
    roomid: params[5],
  });


//删除设备列表
export const deletecamera = params =>
  http.delete(config.requestIp + "/camera/" + params[0], {
  });


// //添加设备
// export const addcamera = params =>
//   http.post(config.requestIp + "/camera", {
//     type: params[0],
//     serial: params[1],
//     stream: params[2],
//     deviceIp: params[3],
//     port: params[4],
//     account: params[5],
//     password: params[6],
//     roomId: params[7],
//     iscid: params[8],
//     indexCode: params[9],
//     name: params[10],
//   });

//添加设备
export const addcamera = params =>
  http.post(config.requestIp + "/camera", {
    roomId: params[0],
    iscid: params[1],
    indexCode: params[2],
    name: params[3],
    siteId: params[4],
  });




//获取结果视频地址
export const getVideoAddress = params =>
  http.post(config.requestIp + "/detection/video", {
    token: localStorage.getItem('token'),
    id: params[0]
  });






//获取异常列表
export const getWarningList = params =>
  http.post(config.requestIp + "/error/list", {
    token: localStorage.getItem('token'),
  });



//获取用户列表
export const userlist = params =>
  http.get(config.requestIp + "/admin", {
    roleId: params[0],
    name: params[1],
  });



//添加用户
export const adduser = params =>
  http.post(config.requestIp + "/admin", {
    name: params[0],
    phone: params[1],
    username: params[2],
    password: params[3],
    siteId: params[4],
    rids: params[5],
    mail: params[6],
    adcodes: params[7],
    remark: params[8],
  });

//修改用户
export const putuser = params =>
  http.put(config.requestIp + "/admin", {
    id: params[0],
    name: params[1],
    phone: params[2],
    username: params[3],
    mail: params[4],
    remark: params[5],
  });


//修改用户
export const deleteuser = params =>
  http.delete(config.requestIp + "/admin/" + params[0], {
  });




//添加设备
export const adddevice = params =>
  http.post(config.requestIp + "/device/insert", {
    token: localStorage.getItem('token'),
    siteid: params[0],
    name: params[1],
    serial: params[2],
    type: params[3],
  });

//下载图片
export const downloadimg = params =>
  http.get(config.requestIp + "/download/image", {
    token: localStorage.getItem('token'),
    id: params[0],
  });


//添加网点
export const addsite = params =>
  http.post(config.requestIp + "/site", {
    sitename: params[0],
    address: params[1],
    adminName: params[2],
    phone: params[3],
    province: params[4],
    city: params[5],
    area: params[6],
    iscId: params[7],
    regionCode: params[8],
    ifHasCup: params[9],
    longitude: params[10],
    latitude: params[11],
    companyName: params[12],
    creditcode: params[13],
    faren: params[14],
    companyPhone: params[15],
    companyAddress: params[16],
    license: params[17],
  });

//修改网点
export const putsite = params =>
  http.put(config.requestIp + "/site", {
    sitename: params[0],
    adminName: params[1],
    phone: params[2],
    id: params[3],
  });



//网点列表
export const sitelist = params =>
  http.get(config.requestIp + "/site", {
    key: params[0],
  });

//网点列表
export const deletesite = params =>
  http.delete(config.requestIp + "/site/" + params[0], {
  });



//酒店列表
export const hotellist = params =>
  http.get(config.requestIp + "/site/names", {

    // token: localStorage.getItem('token'),
  });


//摄像头列表
export const allargs = params =>
  http.post(config.requestIp + "/args/all", {
    token: localStorage.getItem('token'),
  });


//添加插座
export const insertboard = params =>
  http.postss(config.requestIp + "/board", params,
  );


//删除插座
export const delectboard = params =>
  http.delete(config.requestIp + "/board/" + params[0], {
  });

//插座列表
export const boardlist = params =>
  http.get(config.requestIp + "/board", {
    // siteid: params[0],
    // roomid: params[1],
  });

export const boardlists = params =>
  http.get(config.requestIp + "/board", {
    city: params[0],
    area: params[1],
    siteid: params[2],
    key: params[3],
  });

//封面
export const devicecover = params =>
  http.imgget(config.requestIp + "/camera/cover", {
    id: params[0],
  });


//插座列表
export const argsget = params =>
  http.get(config.requestIp + "/args/" + localStorage.getItem('parameter'), {
    // roomid: params[0],
  });

// //参数列表
// export const argsget = params =>
//   http.get(config.requestIp + "/args", {
//     deviceid: params[0],
//   });

//区域全区统计
export const areaStatisticsByDate = params =>
  http.get(config.requestIp + "/statistics/areaStatisticsByDate", {
    start: params[0],
    stop: params[1],
  });

//网点全月统计
export const siteStatisticsByDate = params =>
  http.get(config.requestIp + "/statistics/siteStatisticsByDate", {
    start: params[0],
    stop: params[1],
  });


//设备开关
export const devicestatus = params =>
  http.post(config.requestIp + "/device/status", {
    token: localStorage.getItem('token'),
    id: params[0],
  });

//历史读数
export const readinglist = params =>
  http.get(config.requestIp + "/reading", {
    mac: params[0],
    start: params[1],
    stop: params[2],
  });



//扫描
export const scanboard = params =>
  http.post(config.requestIp + "/board/scan", {
    token: localStorage.getItem('token'),
  });


//设备模糊搜索
export const deviceserial = params =>
  http.post(config.requestIp + "/device/serial", {
    token: localStorage.getItem('token'),
  });


//mac模糊搜索
export const boardmac = params =>
  http.post(config.requestIp + "/board/mac", {
    token: localStorage.getItem('token'),
  });



//参数修改
export const insertargs = params =>
  http.patch(config.requestIp + "/camera", {
    id: params[0],
    xmin: params[1],
    xmax: params[2],
    ymin: params[3],
    ymax: params[4],
    bbox: params[5],
  });


//参数修改
export const detectionreading = params =>
  http.post(config.requestIp + "/detection/reading", {
    token: localStorage.getItem('token'),
    id: params[0],
  });


//所有摄像头参数
export const allargss = params =>
  http.post(config.requestIp + "/args/all", {
    token: localStorage.getItem('token'),
  });



//检测图片是否存在
export const imageExist = params =>
  http.get(config.requestIp + "/detection/imageExist", {
    id: params[0],
  });


//获取单个交易信息
export const getchaincode = params =>
  http.get(config.requestIp + "/chaincode/get", {
    token: localStorage.getItem('token'),
    id: params[0],
  });

//获取所有交易信息
export const getstatistical = params =>
  http.get(config.requestIp + "/chaincode/statistical", {
    token: localStorage.getItem('token'),
  });


//设备上下线记录
export const getonlinestatus = params =>
  http.get(config.requestIp + "/camera/onlinestatus", {
    serial: params[0],
    start: params[1],
    stop: params[2],
  });

//部门添加
export const insertarea = params =>
  http.post(config.requestIp + "/department", {
    name: params[0],
    phone: params[1],
    address: params[2],
    // provinceId: params[2],
    // cityId: params[3],
    // districtId: params[4],

  });

//区域列表
export const getAreaMap = params =>
  http.get(config.requestIp + "/department/all", {
  });

//区域统计
export const areaStatistics = params =>
  http.get(config.requestIp + "/statistics/areaStatisticsByDate", {
    siteid: params[0],
    start: params[1],
    stop: params[2],
  });

//网点统计
export const siteStatistics = params =>
  http.get(config.requestIp + "/statistics/siteStatistics", {
    siteid: params[0],
    start: params[1],
    stop: params[2],
  });




//添加用户报警
export const addUserAlarm = params =>
  http.post(config.requestIp + "/user/addUserAlarm", {
    token: localStorage.getItem('token'),
    userid: params[0],
  });

//删除用户报警
export const removeUserAlarm = params =>
  http.post(config.requestIp + "/user/removeUserAlarm", {
    token: localStorage.getItem('token'),
    userid: params[0],
  });

//获得截取图片
export const getImage = params =>
  http.get(config.requestIp + "/detection/getImage", {
    id: params[0],
    index: params[1],
  });

//二维码详情
export const timepairs = params =>
  http.post(config.requestIp + "/QRcode/timepairs", {
    roomid: params[0],
    openid: params[1],
    start: params[2],
    stop: params[3],
  });

//二维码获取图片
export const QRcodegetImage = params =>
  http.post(config.requestIp + "/QRcode/getImage", {
    id: params[0],
    index: params[1],
  });

//保洁员列表
export const cleanerlist = params =>
  http.get(config.requestIp + "/cleaner", {
    siteid: params[0],
  });

//修改保洁员
export const postcleaner = params =>
  http.put(config.requestIp + "/cleaner", {
    id: params[0],
    certificate: params[1],
    certificatecode: params[2],
    name: params[3],
    sex: params[4],
    phone: params[5],
    issueDate: params[6],
  });


//添加保洁员
export const mobileaddcleaner = params =>
  http.mobilepost(config.requestIp + "/cleaner", {
    siteid: params[0],
    certificate: params[1],
    certificatecode: params[2],
    name: params[3],
    sex: params[4],
    phone: params[5],
    issueDate: params[6],
  });






//添加保洁员
export const insertcleaner = params =>
  http.post(config.requestIp + "/cleaner", {
    siteid: params[0],
    certificate: params[1],
    certificatecode: params[2],
    name: params[3],
    sex: params[4],
    phone: params[5],
    issueDate: params[6],
    remark: params[7],
  });



//删除保洁员
export const deletecleaner = params =>
  http.delete(config.requestIp + "/cleaner/" + params[0], {
  });


//房间列表
export const roomlist = params =>
  http.get(config.requestIp + "/room", {
    siteid: params[0],
    name: params[1],
    sceneid: params[2],
  });


//添加房间
export const insertroom = params =>
  http.post(config.requestIp + "/room", {
    name: params[0],
    siteid: params[1],
    cleanerid: params[2],
    standard: params[3],
    remark: params[4],
    sceneid: params[5],
  });


//删除房间
export const deleteroom = params =>
  http.delete(config.requestIp + "/room/" + params[0], {
  });


//修改房间
export const putroom = params =>
  http.put(config.requestIp + "/room/", {
    id: params[0],
    name: params[1],
    cleanerid: params[2],
    standard: params[3],
    remark: params[4],
    siteid: params[5],
  });


//通过网点查找保洁员
export const findCleanerBySiteid = params =>
  http.mobileget(config.requestIp + "/cleaner", {
    siteid: params[0],
  });


//通过网点查找保洁员
export const CleanerlistBySiteid = params =>
  http.mobileget(config.requestIp + "/cleaner/" + params[0], {

  });

//添加医院
export const addhospital = params =>
  http.post(config.requestIp + "/hospital/addOrUpdate", {
    token: localStorage.getItem('token'),
    name: params[0],
    adminname: params[1],
    phone: params[2],
    address: params[3],
    remark: params[4],
  });

//修改医院数据
export const updatehospital = params =>
  http.post(config.requestIp + "/hospital/addOrUpdate", {
    token: localStorage.getItem('token'),
    name: params[0],
    adminname: params[1],
    phone: params[2],
    address: params[3],
    remark: params[4],
  });



//医院列表
export const allhospital = params =>
  http.post(config.requestIp + "/hospital/all", {
    token: localStorage.getItem('token'),
  });

//医院删除
export const deletehospital = params =>
  http.post(config.requestIp + "/hospital/delete", {
    token: localStorage.getItem('token'),
    id: params[0],
  });


//体温列表
export const alltemperature = params =>
  http.post(config.requestIp + "/hospital/alltemperature", {
    token: localStorage.getItem('token'),
    hospitalid: params[0],
    start: params[1],
    stop: params[2],
  });

//添加记录
export const addtemperature = params =>
  http.get(config.requestIp + "/temperature/add", {
    hospitalid: params[0],
    name: params[1],
    sex: params[2],
    phone: params[3],
    status: params[4],
    temperatureNum: params[5],
    idCard: params[6],
    address: params[7],
  });


//添加记录
export const alltemperaturemobile = params =>
  http.get(config.requestIp + "/temperature/alltemperature", {
    hospitalid: params[0],
    start: params[1],
    stop: params[2],
  });

//移动端所有医院
export const allHospital = params =>
  http.get(config.requestIp + "/temperature/allHospital", {
  });




//修改提交数据
export const updatetemperature = params =>
  http.get(config.requestIp + "/temperature/update", {
    hospitalid: params[0],
    name: params[1],
    sex: params[2],
    phone: params[3],
    status: params[4],
    temperatureNum: params[5],
    idCard: params[6],
    address: params[7],
  });


//温度统计
export const hospitalstatistics = params =>
  http.post(config.requestIp + "/hospital/statistics", {
    token: localStorage.getItem('token'),
    start: params[0],
    stop: params[1],
    hospitalid: params[2],
  });


//sessionid返回
export const accountsession = params =>
  http.post(config.requestIp + "/account/session", {
    token: localStorage.getItem('token'),
  });


//场景列表
export const getscene = params =>
  http.get(config.requestIp + "/scene", {
  });

//添加场景
export const addscene = params =>
  http.post(config.requestIp + "/scene", {
    name: params[0],
    strategy: params[1],
    level: params[2],
    remark: params[3],
  });

//修改场景
export const putscene = params =>
  http.put(config.requestIp + "/scene", {
    id: params[0],
    name: params[1],
    strategy: params[2],
    level: params[3],
    remark: params[4],
  });


//查看类型
export const getbasetype = params =>
  http.get(config.requestIp + "/base/type", {
    name: params[0],
  });

//角色列表
export const rolelist = params =>
  http.get(config.requestIp + "/role", {
  });


//删除角色
export const deleterole = params =>
  http.delete(config.requestIp + "/role/" + params[0], {
  });


//新增角色
export const addrole = params =>
  http.post(config.requestIp + "/role", {
    roleZh: params[0],
    role: params[1],
  });

//权限目录
export const getmenu = params =>
  http.get(config.requestIp + "/menu/" + params[0]);




//杯具目录
export const getcup = params =>
  http.get(config.requestIp + "/cup/record", {
    city: params[0],
    area: params[1],
    siteid: params[2],
    start: params[3],
    stop: params[4],
    key: params[5],
  });

//杯具目录
export const detectioncuprecord = params =>
  http.get(config.requestIp + "/cup/record", {
    detectionId: params[0],
  });




//添加消毒说明
export const addRemark = params =>
  http.patch(config.requestIp + "/cup/addRemark", {
    id: params[0],
    remark: params[1],
  });

//绑定摄像头
export const bindcamera = params =>
  http.patch(config.requestIp + "/room/bind", {
    roomId: params[0],
    cameraId: params[1],
  });

//绑定插座
export const addboard = params =>
  http.patch(config.requestIp + "/room/bind", {
    roomId: params[0],
    boardId: params[1],
  });

//未绑定插座列表
export const listWithoutSite = params =>
  http.get(config.requestIp + "/board/listWithoutSite", {

  });

//未绑定摄像头列表
export const findCameraWithoutSite = params =>
  http.get(config.requestIp + "/camera/findCameraWithoutSite", {

  });

//通用接口
export const basename = params =>
  http.get(config.requestIp + "/base/name", {

  });


//安防平台
export const isclist = params =>
  http.get(config.requestIp + "/isc", {

  });


//安防平台区域
export const iscarea = params =>
  http.get(config.requestIp + "/isc/area", {
    iscid: params[0],
  });

//安防设备列表
export const iscdevice = params =>
  http.get(config.requestIp + "/isc/device", {
    iscid: params[0],
    regionid: params[1],
  });


//安防设备列表
export const andsmartdevice = params =>
  http.get(config.requestIp + "/andsmart/device", {

  });


//安防设备列表
export const roomstatus = params =>
  http.patch(config.requestIp + "/room/status", {
    roomId: params[0],
  });



//修改报警阈值
export const patchboard = params =>
  http.patch(config.requestIp + "/board", {
    id: params[0],
    thresholdDown: params[1],
    thresholdUp: params[2],
  });


//参数列表
export const argslist = params =>
  http.get(config.requestIp + "/args/" + params[0], {

  });


//参数列表
export const changeargs = params =>
  http.post(config.requestIp + "/args", {
    roomid: params[0],
    running: params[1],
    working: params[2],
    start: params[3],
    stop: params[4],
    frequency: params[5],
    mintimepairsremove: params[6],
    mergetimepairsscale: params[7],
    mergeindexpiarsscale: params[8],
    minindexnumremove: params[9],
    grabsize: params[10],
    videoframerate: params[11],
    grabframerate: params[12],
    imgmat: params[13],
    videomat: params[14],
  });


//获取所有权限
export const allpowermenu = params =>
  http.get(config.requestIp + "/menu", {
    name: params[0],
    parentId: params[1],
    url: params[2],
  });



//添加权限
export const addmenu = params =>
  http.post(config.requestIp + "/menu", {
    url: params[0],
    path: params[1],
    component: params[2],
    name: params[3],
    iconcls: params[4],
    keepalive: params[5],
    requireauth: params[6],
    parentid: params[7],
    requestType: params[8],
  });


//修改权限
export const putmenu = params =>
  http.put(config.requestIp + "/menu", {
    url: params[0],
    path: params[1],
    component: params[2],
    name: params[3],
    iconcls: params[4],
    keepalive: params[5],
    requireauth: params[6],
    parentid: params[7],
    requestType: params[8],
    id: params[9],
  });


//修改角色权限
export const updateMenuRole = params =>
  http.put(config.requestIp + "/role/updateMenuRole", {
    rid: params[0],
    mids: params[1],
  });


//省市区级联
export const getallRegion = params =>
  http.get(config.requestIp + "/area/allRegion", {
    adcode: params[0],
  });

//获取当前用户拥有的权限
export const getsysmenu = params =>
  http.get(config.requestIp + "/menu/sysmenu", {

  });


//查看摄像头历史画面
export const getbackUrl = params =>
  http.get(config.requestIp + "/camera/backUrl", {
    id: params[0],
    start: params[1],
    stop: params[2],
  });

//修改用户管理区域
export const updateAdminAreas = params =>
  http.put(config.requestIp + "/admin/updateAdminAreas", {
    adminId: params[0],
    adcodes: params[1],
  });


//获取用户管理区域
export const getAdminAreas = params =>
  http.put(config.requestIp + "/admin/getAdminAreas", {
    adminId: params[0],
  });


//添加手持式设备
export const addhandheld = params =>
  http.post(config.requestIp + "/camera/handheld", {
    siteId: params[0],
    iscid: params[1],
    indexCode: params[2],
    name: params[3],
    remark: params[4],
  });

//手持式设备检测列表
export const gethandheld = params =>
  http.get(config.requestIp + "/handheld", {
    pageNum: params[0],
    pageSize: params[1],
    city: params[2],
    area: params[3],
    siteId: params[4],
    start: params[5],
    stop: params[6],
    key: params[7],
    cameraName: params[8],
  });

//获取摄像头历史画面
export const handheldbackUrl = params =>
  http.get(config.requestIp + "/handheld/backUrl", {
    detectionId: params[0],
  });





//所有安防平台列表
export const allisc = params =>
  http.get(config.requestIp + "/isc/all", {

  });


//添加安防平台
export const addisc = params =>
  http.post(config.requestIp + "/isc", {
    name: params[0],
    host: params[1],
    appSecret: params[2],
    appKey: params[3],
  });


//查询工商信息
export const findenterprise = params =>
  http.get(config.requestIp + "/site/enterprise", {
    company: params[0],
  });



//根据摄像头id获取一个
export const findById = params =>
  http.get(config.requestIp + "/camera/findById", {
    id: params[0],
  });




//报警列表
export const getalarm = params =>
  http.get(config.requestIp + "/alarm", {
    city: params[0],
    area: params[1],
    siteId: params[2],
    begin: params[3],
    end: params[4],
    roomId: params[5],
  });

//添加报警说明
export const addalarmRemark = params =>
  http.patch(config.requestIp + "/alarm/addRemark", {
    id: params[0],
    remark: params[1],
  });


//第三方接口列表
export const getthirdparty = params =>
  http.get(config.requestIp + "/thirdparty", {

  });



//添加第三方接口
export const addthirdparty = params =>
  http.post(config.requestIp + "/thirdparty", {
    pushRange: params[0],
    name: params[1],
    adcode: params[2],
    host: params[3],
    remark: params[4],
  });

//修改第三方接口
export const postthirdparty = params =>
  http.put(config.requestIp + "/thirdparty", {
    id: params[0],
    name: params[1],
    host: params[2],
    remark: params[3],
    pushRange: params[4],
  });

//修改推送状态
export const thirdpartystatus = params =>
  http.patch(config.requestIp + "/thirdparty/status", {
    thirdpartyId: params[0],
  });


//删除保洁员
export const deletethirdparty = params =>
  http.delete(config.requestIp + "/thirdparty/" + params[0], {
  });


//获取验证码
export const getcode = params =>
  http.post(config.requestIp + "/auth/sms/code", {
    phone: params[0],
  });




//移动端登录
export const mobilelogin = params =>
  http.post(config.requestIp + "/auth/login/mobile", {
    phone: params[0],
    code: params[1],
  });

//二维码发货
export const sendQRcode = params =>
  http.post(config.requestIp + "/QRcode", {
    batch: params[0],
    count: params[1],
    siteId: params[2],
    remark: params[3],
  });

//二维码发货记录
export const QRcodelist = params =>
  http.get(config.requestIp + "/QRcode", {
    batch: params[0],
    start: params[1],
    stop: params[2],
  });

//修改发货状态
export const changeQRcodestatus = params =>
  http.put(config.requestIp + "/QRcode", {
    id: params[0],
    status: params[1],
  });

//二维码发货列表
export const getQRcode = params =>
  http.get(config.requestIp + "/QRcode/" + params[0], {
  });

//信息码列表
export const bindQRcode = params =>
  http.get(config.requestIp + "/QRcode/bind", {
    siteId: params[0],
    type: params[1],
  });


//获取上级接口
export const allProvinceCityDistrict = params =>
  http.mobileget(config.requestIp + "/area/allProvinceCityDistrictUp", {
    adcode: params[0],
    // level: params[1],
  });


//注册酒店
export const addaudit = params =>
  http.posts(config.requestIp + "/QRcodeInput/register", {
    code: params[0],
    detail: params[1],
    qrcode: params[2],
  });


//审核列表
export const getaudit = params =>
  http.get(config.requestIp + "/audit", {
    status: params[0],
    siteName: params[1],
  });

//审核通过
export const checkaudit = params =>
  http.put(config.requestIp + "/audit/check", {
    id: params[0],
    status: params[1],
    iscId: params[2],
    iscName: params[3],
    auditor: params[4],
    regionCode: params[5],
    regionName: params[6],
    ifHasCup: params[7],
    remark: params[8],
  });



//审核不通过
export const failaudit = params =>
  http.put(config.requestIp + "/audit/check", {
    id: params[0],
    status: params[1],
    auditor: params[2],
    remark: params[3],
  });


//通过code获取二维码信息
export const getQRcodestatus = params =>
  http.mobileget(config.requestIp + "/QRcodeInfo/status", {
    code: params[0],
  });


//移动端获取对应酒店杯具类型列表
export const findCupTypeBySiteId = params =>
  http.mobileget(config.requestIp + "/cup/findCupTypeBySiteId", {
    siteId: params[0],
  });

//根据房间查询杯具种类
export const findCupTypeByRoomId = params =>
  http.mobileget(config.requestIp + "/cup/findCupTypeByRoomId", {
    roomId: params[0],
    code: params[1],
  });



//添加杯具种类
export const addCupType = params =>
  http.mobilepost(config.requestIp + "/cup/addCupType", {
    name: params[0],
    siteId: params[1],
    remark: params[2],
  });

//插座校验
export const checkboard = params =>
  http.mobileget(config.requestIp + "/board/check", {
    code: params[0],
    imei: params[1],
  });


//插座校验
export const deviceByAdmin = params =>
  http.mobileget(config.requestIp + "/isc/deviceByAdmin", {

  });


//注册房间
export const addroom = params =>
  http.posts(config.requestIp + "/QRcodeInput/room", {
    detail: params[0],
    qrcode: params[1],
  });



//二维码信息展示
export const QRcodeInfo = params =>
  http.mobileget(config.requestIp + "/QRcodeInfo/info", {
    code: params[0],
    start: params[1],
    stop: params[2],
  });


//获取保洁员列表
export const QRcodeInfofindBySite = params =>
  http.get(config.requestIp + "/QRcodeInfo/findBySite", {
    code: params[0],
  });


//添加杯具清洗记录
export const addCupRecordQRcodeInfo = params =>
  http.posts(config.requestIp + "/QRcodeInfo/addCupRecord", {
    code: params[0],
    cleanerId: params[1],
    checkOutCount: params[2],
    detail: params[3],
  });

//获取房间杯具列表
export const findCupTypeByCode = params =>
  http.mobileget(config.requestIp + "/QRcodeInfo/findCupTypeByCode", {
    code: params[0],
  });

//添加消毒说明
export const cupremark = params =>
  http.patch(config.requestIp + "/alarm/addRemark", {
    id: params[0],
    remark: params[1],
  });

//获取消毒柜列表
export const getsterilizer = params =>
  http.get(config.requestIp + "/sterilizer", {
    siteid: params[0],
  });

//根据房间获取消毒柜列表
export const getroomsterilizer = params =>
  http.mobileget(config.requestIp + "/sterilizer", {
    roomid: params[0],
  });

//修改消毒柜
export const changesterilizer = params =>
  http.put(config.requestIp + "/sterilizer", {
    id: params[0],
    brand: params[1],
    model: params[2],
    power: params[3],
    standartTime: params[4],
    capacity: params[5],
    photo: params[6],
  });

//添加消毒柜
export const addsterilizer = params =>
  http.mobilepost(config.requestIp + "/sterilizer", {
    roomId: params[0],
    brand: params[1],
    model: params[2],
    power: params[3],
    standartTime: params[4],
    capacity: params[5],
    photo: params[6],
  });



//获取当前用户信息
export const currentUser = params =>
  http.post(config.requestIp + "/auth/currentUser", {

  });


//当前用户省市区级联
export const getregion = params =>
  http.get(config.requestIp + "/directory/region", {
    // siteid: params[0],
  });

//获取所有父权限
export const allparentmenu = params => {
  http.get(config.requestIp + "/menu/parent", {
    // siteid: params[0],
  });
}

//修改杯具房间关联
export const modifyCupRoom = params =>
  http.mobilepost(config.requestIp + "/cup/modifyCupRoom", {
    roomId: params[0],
    cupId: params[1],
  });



// //上传证书文件
// export const uploadcertificate = params =>
//   http.imgpost(config.requestIp + "/upload/certificate", {
//     multipartFile: params[0],
//     code: params[1],
//   });


export const uploadcertificate = params => {
  const formData = new FormData();
  formData.append("multipartFile", params[0]);
  formData.append("code", params[1]);
  http.imgpost(config.requestIp + "/upload/certificate", formData
  );
}

//上传证书文件
export const pcuploadfile = params =>
  http.imgpost(config.requestIp + "/upload/file", {
    multipartFile: params[0],
  });






// //获取萤石云授权
// export const gettoken = params =>
//   http.post("https://open.ys7.com/api/lapp/token/get", {
//     AppKey: params[0],
//     Secret: params[1],
//   });

// //获取萤石云直播流地址
// export const getvideolist = params =>
//   http.post("https://open.ys7.com/api/lapp/live/video/list", {
//     accessToken: "at.7u7wrknzdmrwy13w79pq53063p3htk5k-708iabg0lm-1s8rzfq-oxy1pdutf",
//   });