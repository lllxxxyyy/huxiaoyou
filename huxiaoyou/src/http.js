import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.prototype.$ajax = axios

import store from './store/index'
// import * as types from './store/types'
import router from './router'

// axios 配置
axios.defaults.timeout = 50000
let protocol = window.location.protocol; //协议
let host = window.location.host; //主机
let reg = /^localhost+/;
if (reg.test(host)) {
    //若本地项目调试使用
    axios.defaults.baseURL = 'http://localhost:8080';
} else {
    //动态请求地址             协议               主机
    axios.defaults.baseURL = protocol + "//" + host + ":5000";
}

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.tokenH) {
            config.headers.authorization = store.state.tokenH
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    sessionStorage.removeItem('tokenH');
                    // 只有在当前路由不是登录页面才跳转
                    router.currentRoute.path !== '/login' &&
                        router.replace({
                            path: '/login',
                            query: { redirect: router.currentRoute.path },
                        })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    },
)

export default axios