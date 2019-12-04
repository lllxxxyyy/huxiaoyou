// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import axios from './http'
Vue.use(vuex);


import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer)

// 引入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//vuex
import store from './store/index.js'

// 解决300ms 延迟
import fastClick from 'fastClick'
fastClick.attach(document.body)

// 初始css
import './assets/css/rest.css'
Vue.config.productionTip = false

// 页面自适应
import './assets/js/font.min.js'

// 引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )


import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
VueTouch.config.swipe = {
    threshold: 100 //手指左右滑动距离
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    axios,
    components: { App },
    template: '<App/>'
})