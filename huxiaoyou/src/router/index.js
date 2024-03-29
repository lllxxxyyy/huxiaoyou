import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
import Home from '@/components/Home/Home' //首页
import Foot from '@/components/Foot/Foot' //公共底部
import Sort from '@/components/Sort/Sort' //分类
import Mine from '@/components/Mine/Mine' //我
import Shop from '@/components/Shop/Shop' //购物车
import HomeSearch from '@/components/HomeSearch/HomeSearch' //从首页点搜索进去的搜索页面
import SpecialTopic from '@/components/SpecialTopic/SpecialTopic' //专题
import SpecialDetails from '@/components/SpecialDetails/SpecialDetails' //专题详情
import shopList from '@/components/shopList/shopList' //商品列表
import ShopDetails from '@/components/ShopDetails/ShopDetails' //商品详情
import orderList from '@/components/orderList/orderList' //订单列表
import PlayerRanking from '@/components/PlayerRanking/PlayerRanking' //选手排行
import PlayerRankingList from '@/components/PlayerRankingList/PlayerRankingList' //选手排行
import TopList from '@/components/TopList/TopList' //选手排行
import PlayerStyleDetailed from '@/components/PlayerStyleDetailed/PlayerStyleDetailed' //选手风采详情
import PlayerShow from '@/components/PlayerShow/PlayerShow' //选手展示
import AngelUnion from '@/components/AngelUnion/AngelUnion' //天使工会
import PresentVideo from '@/components/PresentVideo/PresentVideo' //视频介绍
import PresentPhoto from '@/components/PresentPhoto/PresentPhoto' //添加照片
import LivePlatform from '@/components/LivePlatform/LivePlatform' //直播平台

import PlayerStyle from '@/components/PlayerStyle/PlayerStyle' //选手风采
import SearchResult from '@/components/SearchResult/SearchResult' //选手风采
import ReceiptAddress from '@/components/ReceiptAddress/Address' //收货地址
import ReceiptAddressAdd from '@/components/ReceiptAddressAdd/AddressAdd' //收货地址添加
import AddressEdit from '@/components/AddressEdit/AddressEdit' //编辑收货地址

import PlayerDetails from '@/components/PlayerDetails/PlayerDetails' //选手详情

import SignUp from '@/components/SignUp/SignUp' //赛事报名

import AboutWe from '@/components/AboutWe/AboutWe' //关于我们
import AddUnion from '@/components/AddUnion/AddUnion' //加入公会

import MineInformation from '@/components/MineInformation/MineInformation' //个人资料
import changeName from '@/components/changeName/changeName' //修改昵称
import Signature from '@/components/Signature/Signature' //个性签名
import MineGuild from '@/components/MineGuild/MineGuild' //我的公会

import City from '@/components/City/City' //常驻城市
import ShortVideo from '@/components/ShortVideo/ShortVideo' //绑定短视频id

import shopDetail from '@/components/shopDetail/shopDetail' //卡包详情
import ConfirmOrder from '@/components/ConfirmOrder/ConfirmOrder' //确认订单
import AccountBalance from '@/components/AccountBalance/AccountBalance' //账户明细
import CustomerService from '@/components/CustomerService/CustomerService' //客服的
import LabourUnion from '@/components/LabourUnion/LabourUnion' //工会
import PowerPack from '@/components/PowerPack/PowerPack' //助力卡包

import login from '@/components/login/login' //登录
import videoDetail from '@/components/videoDetail/videoDetail' //登录
import playDetailStyle from '@/components/playDetailStyle/playDetailStyle' //选手详情风采
import comOrder from '@/components/comOrder/comOrder' //确认订单
import RaceCheats from '@/components/RaceCheats/RaceCheats' //赛事秘籍  最新通告
import changeAge from '@/components/changeAge/changeAge' //个人信息 修改年龄
import changeHeight from '@/components/changeHeight/changeHeight' //个人信息 修改年龄
import changeWeight from '@/components/changeWeight/changeWeight' //个人信息 修改年龄
import changeConstellation from '@/components/changeConstellation/changeConstellation' //个人信息 修改年龄
import unionDetail from '@/components/unionDetail/unionDetail' //公会详情
import MineVideo from '@/components/MineVideo/MineVideo' //个人信息 上传视频
import shiming from '@/components/shiming/shiming' //实名
import withdraw from '@/components/withdraw/withdraw' //实名
import SMS from '@/components/SMS/SMS' //短信验证
import MoneyDetail from '@/components/MoneyDetail/MoneyDetail' //明细
import swiper from '@/components/swiper/swiper' //明细
import attention from '@/components/attention/attention' //扫码关注
import inviteFriend from '@/components/inviteFriend/inviteFriend' //邀请朋友
import withdrawPlayer from '@/components/withdrawPlayer/withdrawPlayer'

import MineAttention from '@/components/MineAttention/MineAttention' //我的关注

import huxiaoyouHome from '@/components/huxiaoyouHome/huxiaoyouHome' //
import EventSpecific from '@/components/EventSpecific/EventSpecific'
const routes = [{ //首页
        path: '/',
        name: 'Home',
        component: Home
    },
    { //客服
        path: '/CustomerService',
        name: 'CustomerService',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: CustomerService
    }, { //助力卡包
        path: '/PowerPack',
        name: 'PowerPack',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: PowerPack
    }, { //工会
        path: '/LabourUnion',
        name: 'LabourUnion',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: LabourUnion
    },
    { //公共底部
        path: '/Foot',
        name: 'Foot',
        component: Foot
    },
    { //分类
        path: '/Sort',
        name: 'Sort',
        component: Sort,
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
    },
    { //我
        path: '/Mine',
        name: 'Mine',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Mine
    },
    { //购物车
        path: '/Shop',
        name: 'Shop',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Shop
    },
    { //从首页点搜索进去的搜索页面
        path: '/HomeSearch',
        name: 'HomeSearch',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: HomeSearch
    },
    { //专题
        path: '/SpecialTopic',
        name: 'SpecialTopic',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: SpecialTopic
    },
    { //专题详情
        path: '/SpecialDetails',
        name: 'SpecialDetails',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: SpecialDetails
    },
    { //商品列表
        path: '/shopList',
        name: 'shopList',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: shopList
    },
    { //商品详情
        path: '/ShopDetails',
        name: 'ShopDetails',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: ShopDetails
    },
    { //选手展示
        path: '/PlayerRanking',
        name: 'PlayerRanking',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: PlayerRanking
    },
    { //选手
        path: '/PlayerRankingList',
        name: 'PlayerRankingList',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: PlayerRankingList
    },
    { //top榜
        path: '/TopList',
        name: 'TopList',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: TopList
    },
    { //选手排行
        path: '/PlayerShow',
        name: 'PlayerShow',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: PlayerShow
    },
    { //天使工会
        path: '/AngelUnion',
        name: 'AngelUnion',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: AngelUnion
    },
    { //添加视频
        path: '/PresentVideo',
        name: 'PresentVideo',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: PresentVideo
    },
    { //添加照片
        path: '/PresentPhoto',
        name: 'PresentPhoto',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: PresentPhoto
    },
    { //添加照片
        path: '/LivePlatform',
        name: 'LivePlatform',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: LivePlatform
    },
    { //添加照片
        path: '/PlayerStyle',
        name: 'PlayerStyle',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: PlayerStyle
    },
    { //收货地址
        path: '/ReceiptAddress',
        name: 'ReceiptAddress',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: ReceiptAddress
    },
    { //收货地址添加
        path: '/ReceiptAddressAdd',
        name: 'ReceiptAddressAdd',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: ReceiptAddressAdd
    },
    { //收货地址添加
        path: '/PlayerDetails',
        name: 'PlayerDetails',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: PlayerDetails
    },
    { //赛事报名
        path: '/SignUp',
        name: 'SignUp',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: SignUp
    },
    { //订单列表
        path: '/orderList',
        name: 'orderList',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: orderList
    },
    { //订单列表
        path: '/AddressEdit',
        name: 'AddressEdit',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: AddressEdit
    },
    { // 关于我们
        path: '/AboutWe',
        name: 'AboutWe',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: AboutWe
    },
    { //加入公会
        path: '/AddUnion',
        name: 'AddUnion',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: AddUnion
    },
    { //个人资料
        path: '/MineInformation',
        name: 'MineInformation',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: MineInformation
    },
    { //修改昵称
        path: '/changeName',
        name: 'changeName',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: changeName
    },
    { //个性签名
        path: '/Signature',
        name: 'Signature',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Signature
    },
    { //我的公会
        path: '/MineGuild',
        name: 'MineGuild',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: MineGuild
    },
    { //常驻城市
        path: '/City',
        name: 'City',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: City
    },
    { //绑定短视频
        path: '/ShortVideo',
        name: 'ShortVideo',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: ShortVideo
    },
    { //卡包详情
        path: '/shopDetail',
        name: 'shopDetail',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: shopDetail
    },
    { //确认订单
        path: '/ConfirmOrder',
        name: 'ConfirmOrder',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: ConfirmOrder
    },
    { //选手风采详情
        path: '/PlayerStyleDetailed',
        name: 'PlayerStyleDetailed',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: PlayerStyleDetailed
    },
    { //搜索结果
        path: '/SearchResult',
        name: 'SearchResult',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: SearchResult
    },
    { //账户明细
        path: '/AccountBalance',
        name: 'AccountBalance',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: AccountBalance
    },
    { //登录
        path: '/login',
        name: 'login',
        component: login
    },
    { //登录
        path: '/videoDetail',
        name: 'videoDetail',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: videoDetail

    },
    { //选手详情风采
        path: '/playDetailStyle',
        name: 'playDetailStyle',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: playDetailStyle
    },

    { //确认订单
        path: '/comOrder',
        name: 'comOrder',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: comOrder
    },
    { //最新通告 赛事秘籍
        path: '/RaceCheats',
        name: 'RaceCheats',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: RaceCheats
    },
    { //个人信息，修改年龄
        path: '/changeAge',
        name: 'changeAge',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: changeAge
    },
    { //个人信息，修改身高
        path: '/changeHeight',
        name: 'changeHeight',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: changeHeight
    },
    { //个人信息，修改身高
        path: '/changeWeight',
        name: 'changeWeight',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: changeWeight
    },
    { //个人信息，修改身高
        path: '/changeConstellation',
        name: 'changeConstellation',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: changeConstellation
    },
    { //工会详情
        path: '/unionDetail',
        name: 'unionDetail',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: unionDetail
    },
    { //客服
        path: '/MineVideo',
        name: 'MineVideo',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: MineVideo
    },
    { //实名
        path: '/shiming',
        name: 'shiming',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: shiming
    },
    { //提现
        path: '/withdraw',
        name: 'withdraw',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: withdraw
    },
    { //短信
        path: '/SMS',
        name: 'SMS',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: SMS
    },
    { //短信
        path: '/MoneyDetail',
        name: 'MoneyDetail',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: MoneyDetail
    },
    { //短信
        path: '/swiper',
        name: 'swiper',
        component: swiper
    },
    { //扫码关注
        path: '/attention',
        name: 'attention',
        component: attention
    },
    { //扫码关注
        path: '/inviteFriend',
        name: 'inviteFriend',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: inviteFriend
    },
    { //扫码关注
        path: '/withdrawPlayer',
        name: 'withdrawPlayer',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: withdrawPlayer
    },
    { //扫码关注
        path: '/MineAttention',
        name: 'MineAttention',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: MineAttention
    },
    { //扫码关注
        path: '/EventSpecific',
        name: 'EventSpecific',
        meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        },
        component: EventSpecific
    },


]


// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem('tokenH')) {
    store.commit('tokenHs', window.sessionStorage.getItem('tokenH'))
}

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.tokenH) {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
})

export default router