import axios from "axios";
import qs from "qs";


axios.interceptors.request.use(
  config => {
    // 发送请求之前做什么
    //如果有token给所有的headers加入token参数
    // if (config.method === "post") {
    config.headers.authorization = localStorage.getItem('authorization') === null || localStorage.getItem('authorization') === undefined ? "" : localStorage.getItem('authorization');
    // if (localStorage.getItem("token") && localStorage.getItem("userID")) {
    // config.headers.authorization = `Bearer ${localStorage.getItem(
    //   "token"
    // )}`;
    // config.headers.authorization = localStorage.getItem('authorization');
    // config.headers.authorization = "BearereyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1OTM3MDc3MTEsInVzZXIiOnsiaWQiOjMsIm5hbWUiOiLolpvlh68iLCJ1c2VybmFtZSI6InhrIiwicGFzc3dvcmQiOiIkMmEkMTAkVi5CL05peE93c0ZVaFQ0V0VtMU5idS5SQ2RIZDJFcDV4RjlPenl2NkJhalROSnM5SlBaUmUiLCJwaG9uZSI6IjE4NjM2MDMyMjg4IiwibWFpbCI6Ijc3Mjk4ODc1NkBxcS5jb20iLCJzaXRlSWQiOjE0LCJkZXBhcnRtZW50SWQiOm51bGwsImdtdGNyZWF0ZSI6MTU3NzUyMjgwNTAwMCwibm90aWZpZXIiOmZhbHNlLCJzdGF0dXMiOnRydWUsInJlbWFyayI6bnVsbCwidXNlcmZhY2UiOm51bGwsInRlbGVwaG9uZSI6bnVsbCwibGFzdExvZ2luIjoxNTkzNjU2NTYzMDAwLCJ0eXBlIjpudWxsLCJyZW1lbWJlciI6ZmFsc2UsImNvZGUiOm51bGwsInJvbGVzIjpbeyJpZCI6MSwibmFtZSI6IlJPTEVfU1VQRVIiLCJuYW1lemgiOiLns7vnu5_nrqHnkIblkZgifV0sImFyZWFzIjpbeyJhZGNvZGUiOiIzMzA0ODIiLCJuYW1lIjoi5bmz5rmW5biCIn0seyJhZGNvZGUiOiIzMzA0MDIiLCJuYW1lIjoi5Y2X5rmW5Yy6In1dLCJlbmFibGVkIjp0cnVlLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVVBFUiJ9XSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZX0sInN1YiI6InhrIn0.6kxC8OiELpRYPqMb8sg-ZTBfEpXIn3kFvPcZ0eBfhwIf_2pIGrCsDVL5usmFUIEo0YqiYOLoSNA7UhCL0V4yDQ"
    // }
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



axios.interceptors.response.use(
  response => {
    // axios.defaults.withCredentials = true;
    return response;
  },
  error => {
    return Promise.reject(error.response);
  }
);

function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }

  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}


function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {

    return;
  }
  if (res.data.code === 502) {
    window.location.href = "/";
  }
  //如果接口统一规范好成功失败的返回情况，则可以使用这个方法进行封装
  // if (res.data && (!res.data.success)) {
  //   message(res.data.status)
  // }
  return res;
}

function mobilecheckCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {

    return;
  }
  // if (res.data.code === 502) {
  //   window.location.href = "/mobile?deviced?=" + localStorage.getItem('erweimacode');
  // }
  //如果接口统一规范好成功失败的返回情况，则可以使用这个方法进行封装
  // if (res.data && (!res.data.success)) {
  //   message(res.data.status)
  // }
  return res;
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 50000,
    }).then(response => {
      return checkStatus(response);
    }).then(
      (res) => {
        return checkCode(res)
      }
    )
  },



  postss(url, data) {
    return axios({
      method: 'post',
      url,
      // xhrFields: {
      //   withCredentials: true
      // },
      // crossDomain: true,
      data: data,
      timeout: 50000,
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }).then(response => {
      return checkStatus(response);
    })
  },


  posts(url, data) {
    return axios({
      method: 'post',
      url,
      // xhrFields: {
      //   withCredentials: true
      // },
      // crossDomain: true,
      data: data,
      timeout: 50000,

    }).then(response => {
      return checkStatus(response);
    }).then(
      (res) => {
        return mobilecheckCode(res)
      }
    )
  },

  patch(url, data) {
    return axios({
      method: 'patch',
      url,
      // xhrFields: {
      //   withCredentials: true
      // },
      // crossDomain: true,
      data: qs.stringify(data),
      timeout: 50000,
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      // }
    }).then(response => {
      return checkStatus(response);
    })
  },

  put(url, data) {
    return axios({
      method: 'put',
      url,
      // xhrFields: {
      //   withCredentials: true
      // },
      // crossDomain: true,
      data: qs.stringify(data),
      timeout: 50000,
      // headers: {
      //   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      // }
    }).then(response => {
      return checkStatus(response);
    })
  },

  delete(url, data) {
    return axios({
      method: 'delete',
      url,
      data: qs.stringify(data),
      timeout: 50000,
    }).then(response => {
      return checkStatus(response);
    })
  },



  get(url, params) {
    // const user = JSON.parse(localStorage.getItem('user')).token;
    return axios({
      method: 'get',
      url,
      // xhrFields: {
      //   withCredentials: true
      // },
      // crossDomain: true,
      // params: { 'Authorization': user, ...params }, // get 请求时带的参数
      params: { ...params }, // get 请求时带的参数
      timeout: 10000,
    }).then(
      (response) => {
        return checkStatus(response)
      }).then(
        (res) => {
          return checkCode(res)
        }
      )
  },

  imgget(url, params) {
    // const user = JSON.parse(localStorage.getItem('user')).token;
    return axios({
      method: 'get',
      url,
      // xhrFields: {
      //   withCredentials: true
      // },
      // crossDomain: true,
      // params: { 'Authorization': user, ...params }, // get 请求时带的参数
      params: { ...params }, // get 请求时带的参数
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },

  mobileget(url, params) {
    return axios({
      method: 'get',
      url,
      params: { ...params }, // get 请求时带的参数
      timeout: 10000,
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return mobilecheckCode(res)
      }
    )
  },

  mobilepost(url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 50000,
    }).then(response => {
      return checkStatus(response);
    }).then(
      (res) => {
        return mobilecheckCode(res)
      }
    )
  },




  getcon(url, data, adata) {
    return axios({
      method: "get",
      url,
      // withCredentials: true,
      data: qs.stringify(data),
      timeout: 50000
    }).then(response => {
      return response;
    });
  },


  imgpost(url, data) {
    return axios({
      method: 'post',
      url,
      data: data,
      timeout: 50000,
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // }
    }).then(response => {
      return checkStatus(response);
    }).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
};
