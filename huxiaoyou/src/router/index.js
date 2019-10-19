import Vue from 'vue'
import Router from 'vue-router'
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
import PlayerShow from '@/components/PlayerShow/PlayerShow' //选手展示
import AngelUnion from '@/components/AngelUnion/AngelUnion' //天使工会
import PresentVideo from '@/components/PresentVideo/PresentVideo' //视频介绍
import PresentPhoto from '@/components/PresentPhoto/PresentPhoto' //添加照片
import LivePlatform from '@/components/LivePlatform/LivePlatform' //直播平台

import PlayerStyle from '@/components/PlayerStyle/PlayerStyle' //选手风采
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
Vue.use(Router)

export default new Router({
    routes: [{ //首页
            path: '/',
            name: 'Home',
            component: Home
        },
        { //公共底部
            path: '/Foot',
            name: 'Foot',
            component: Foot
        },
        { //分类
            path: '/Sort',
            name: 'Sort',
            component: Sort
        },
        { //我
            path: '/Mine',
            name: 'Mine',
            component: Mine
        },
        { //购物车
            path: '/Shop',
            name: 'Shop',
            component: Shop
        },
        { //从首页点搜索进去的搜索页面
            path: '/HomeSearch',
            name: 'HomeSearch',
            component: HomeSearch
        },
        { //专题
            path: '/SpecialTopic',
            name: 'SpecialTopic',
            component: SpecialTopic
        },
        { //专题详情
            path: '/SpecialDetails',
            name: 'SpecialDetails',
            component: SpecialDetails
        },
        { //商品列表
            path: '/shopList',
            name: 'shopList',
            component: shopList
        },
        { //商品详情
            path: '/ShopDetails',
            name: 'ShopDetails',
            component: ShopDetails
        },
        { //选手展示
            path: '/PlayerRanking',
            name: 'PlayerRanking',
            component: PlayerRanking
        },
        { //选手排行
            path: '/PlayerShow',
            name: 'PlayerShow',
            component: PlayerShow
        },
        { //天使工会
            path: '/AngelUnion',
            name: 'AngelUnion',
            component: AngelUnion
        },
        { //添加视频
            path: '/PresentVideo',
            name: 'PresentVideo',
            component: PresentVideo
        },
        { //添加照片
            path: '/PresentPhoto',
            name: 'PresentPhoto',
            component: PresentPhoto
        },
        { //添加照片
            path: '/LivePlatform',
            name: 'LivePlatform',
            component: LivePlatform
        },
        { //添加照片
            path: '/PlayerStyle',
            name: 'PlayerStyle',
            component: PlayerStyle
        },
        { //收货地址
            path: '/ReceiptAddress',
            name: 'ReceiptAddress',
            component: ReceiptAddress
        },
        { //收货地址添加
            path: '/ReceiptAddressAdd',
            name: 'ReceiptAddressAdd',
            component: ReceiptAddressAdd
        },
        { //收货地址添加
            path: '/PlayerDetails',
            name: 'PlayerDetails',
            component: PlayerDetails
        },
        { //赛事报名
            path: '/SignUp',
            name: 'SignUp',
            component: SignUp
        },
        { //订单列表
            path: '/orderList',
            name: 'orderList',
            component: orderList
        },
        { //订单列表
            path: '/AddressEdit',
            name: 'AddressEdit',
            component: AddressEdit
        },
        { // 关于我们
            path: '/AboutWe',
            name: 'AboutWe',
            component: AboutWe
        },
        { //加入公会
            path: '/AddUnion',
            name: 'AddUnion',
            component: AddUnion
        },
        { //个人资料
            path: '/MineInformation',
            name: 'MineInformation',
            component: MineInformation
        },
        { //修改昵称
            path: '/changeName',
            name: 'changeName',
            component: changeName
        },
        { //个性签名
            path: '/Signature',
            name: 'Signature',
            component: Signature
        },
        { //我的公会
            path: '/MineGuild',
            name: 'MineGuild',
            component: MineGuild
        },
        { //常驻城市
            path: '/City',
            name: 'City',
            component: City
        },
        { //绑定短视频
            path: '/ShortVideo',
            name: 'ShortVideo',
            component: ShortVideo
        },
        { //卡包详情
            path: '/shopDetail',
            name: 'shopDetail',
            component: shopDetail
        },
        { //确认订单
            path: '/ConfirmOrder',
            name: 'ConfirmOrder',
            component: ConfirmOrder
        },
    ]
})