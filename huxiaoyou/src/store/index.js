import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    WpersonInfoH: JSON.parse(localStorage.getItem('WpersonInfoH')) || {},
    tokenH: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJodHRwczpcL1wvbG92eW91LnRvcCIsImF1ZCI6Imh0dHBzOlwvXC9sb3Z5b3UudG9wIiwiaWF0IjoxNTcxNTY0NDk4LCJuYmYiOjE1NzE1NjQ0OTgsImV4cCI6MTYwMzEwMDQ5OH0.rdIvz6Op71fQoygCztRay32bA-eI2qrN1Y-J-FFJ6Hc',
    userIdH: localStorage.getItem('userIdH'), //用户Id
    userIdHInterest: localStorage.getItem('userIdHInterest'), //分享出去的商品详情页需要得到利益的用户Id
    idxNowH: localStorage.getItem('idxNowH'),
    staticImgH: '../../static/mock/img/',
    apiH: 'http://app.aibebi.net',
    playerId: sessionStorage.getItem('playerId'), //选手编号
    addressId: sessionStorage.getItem('addressId'), //收货地址id
    addressIdIsSel: sessionStorage.getItem('addressIdIsSel'), //投助力票时判断是否选中了地址
    editAddressDes: sessionStorage.getItem('editAddressDes'), //编辑地址页面信息
    myOrderListPage: sessionStorage.getItem('myOrderListPage'), //订单列表页
    orderType: sessionStorage.getItem('orderType'), //订单类型
    orderNum: sessionStorage.getItem('orderNum'), //订单类型下标
    HomeSearchPage: sessionStorage.getItem('HomeSearchPage'), //  搜索页面返回
    PlayerDetailPage: sessionStorage.getItem('PlayerDetailPage'), //选手详情页面返回
    playDetailVoteDiv: sessionStorage.getItem('playDetailVoteDiv'), //选手详情的投票盒子的显示与消失
    ReceiptAddressPage: sessionStorage.getItem('ReceiptAddressPage'), //地址列表返回哪
    ReceiptAddressAddPage: sessionStorage.getItem('ReceiptAddressAddPage'), //添加地址列表返回哪
    playDetailShopDES: JSON.parse(sessionStorage.getItem('playDetailShopDES')) || {}, //选手详情 为goods_buyer接口保存参数对应数据(助力商品goodid，选手playerId),以及保存被选中商品的下标,
    specialInfo: JSON.parse(sessionStorage.getItem('specialInfo')) || {}, //专题列表 专题列表信息 为ad/comment_list接口保存参数字段（type，project_id）
    specialDetailInfo: JSON.parse(sessionStorage.getItem('specialDetailInfo')) || {}, //专题详情 专题详情信息  为/ad/comment_lis接口保存参数字段（type，project_id）
    shopgoodId: sessionStorage.getItem('shopgoodId'), //卡包详情商品的goodsid
    barcolorIndexShop: sessionStorage.getItem('barcolorIndexShop'), //卡包详情返回选手详情里被选中商品的下标
    shopDetatilshow: sessionStorage.getItem('shopDetatilshow'), //判断是不是从卡包返回到选手详情
    shopDetailReturn: sessionStorage.getItem('shopDetailReturn'), //卡包详情返回哪
    SpecialDetailsPage: sessionStorage.getItem('shopDetailReturn'), //专题详情页返回页面设置

    nickNamePerX: sessionStorage.getItem('ReceiptAddressAddPage'), //个人资料名字
    SignaturePerX: sessionStorage.getItem('ReceiptAddressAddPage'), //个人资料个性签名
    cityNamePerX: sessionStorage.getItem('cityNamePerX'), //个人资料城市
}
const mutations = {
    SpecialDetailsPages(state, SpecialDetailsPage) {
        sessionStorage.setItem('SpecialDetailsPage', SpecialDetailsPage);
        state.SpecialDetailsPage = SpecialDetailsPage
    },
    // 卡包详情返回哪
    shopDetailReturns(state, shopDetailReturn) {
        sessionStorage.setItem('shopDetailReturn', shopDetailReturn);
        state.shopDetailReturn = shopDetailReturn
    },
    shopDetatilshows(state, shopDetatilshow) {
        sessionStorage.setItem('shopDetatilshow', shopDetatilshow);
        state.shopDetatilshow = shopDetatilshow
    },
    //卡包详情返回选手详情里被选中商品的下标
    barcolorIndexShops(state, barcolorIndexShop) {
        sessionStorage.setItem('barcolorIndexShop', barcolorIndexShop);
        state.barcolorIndexShop = barcolorIndexShop
    },
    //卡包详情商品的goodsid
    shopgoodIds(state, shopgoodId) {
        sessionStorage.setItem('shopgoodId', shopgoodId);
        state.shopgoodId = shopgoodId
    },
    // 个人资料城市名
    cityNamePerXs(state, cityNamePerX) {
        sessionStorage.setItem('cityNamePerX', cityNamePerX);
        state.cityNamePerX = cityNamePerX
    },
    // 个人资料个性签名
    SignaturePerXs(state, SignaturePerX) {
        sessionStorage.setItem('SignaturePerX', SignaturePerX);
        state.SignaturePerX = SignaturePerX
    },
    // 个人资料名字
    nickNamePerXs(state, nickNamePerX) {
        sessionStorage.setItem('nickNamePerX', nickNamePerX);
        state.nickNamePerX = nickNamePerX
    },
    specialInfos(state, specialInfo) {
        sessionStorage.setItem('specialInfo', JSON.stringify(specialInfo));
        state.specialInfo = specialInfo
    },
    specialDetailInfos(state, specialDetailInfo) {
        sessionStorage.setItem('specialDetailInfo', JSON.stringify(specialDetailInfo));
        state.specialDetailInfo = specialDetailInfo
    },
    tokenHs(state, tokenH) {
        localStorage.setItem('tokenH', tokenH);
        state.tokenH = tokenH
    },
    WpersonInfoHs(state, WpersonInfoH) {
        localStorage.setItem('WpersonInfoH', JSON.stringify(WpersonInfoH));
        state.WpersonInfoH = WpersonInfoH
    },
    playDetailShopDESs(state, playDetailShopDES) {
        sessionStorage.setItem('playDetailShopDES', JSON.stringify(playDetailShopDES));
        state.playDetailShopDES = playDetailShopDES
    },
    idxNowHs(state, idxNowH) {
        localStorage.setItem('idxNowH', idxNowH);
        state.idxNowH = idxNowH
    },
    playerIds(state, playerId) {
        sessionStorage.setItem('playerId', playerId);
        state.playerId = playerId
    },
    userIdHs(state, userIdH) {
        localStorage.setItem('userIdH', userIdH);
        state.userIdH = userIdH
    },
    userIdHInterests(state, userIdHInterest) {
        localStorage.setItem('userIdHInterest', userIdHInterest);
        state.userIdHInterest = userIdHInterest
    },
    addressIds(state, addressId) {
        sessionStorage.setItem('addressId', addressId);
        state.addressId = addressId
    },
    addressIdIsSels(state, addressIdIsSel) {
        sessionStorage.setItem('addressIdIsSel', addressIdIsSel);
        state.addressIdIsSel = addressIdIsSel
    },
    editAddressDess(state, editAddressDes) {
        sessionStorage.setItem('editAddressDes', editAddressDes);
        state.editAddressDes = editAddressDes
    },
    myOrderListPages(state, myOrderListPage) {
        sessionStorage.setItem('myOrderListPage', myOrderListPage);
        state.myOrderListPage = myOrderListPage
    },
    orderTypes(state, orderType) {
        sessionStorage.setItem('orderType', orderType);
        state.orderType = orderType
    },
    orderNums(state, orderNum) {
        sessionStorage.setItem('orderNum', orderNum);
        state.orderNum = orderNum
    },
    HomeSearchPages(state, HomeSearchPage) {
        sessionStorage.setItem('HomeSearchPage', HomeSearchPage);
        state.HomeSearchPage = HomeSearchPage
    },
    PlayerDetailPages(state, PlayerDetailPage) {
        sessionStorage.setItem('PlayerDetailPage', PlayerDetailPage);
        state.PlayerDetailPage = PlayerDetailPage
    },
    playDetailVoteDivs(state, playDetailVoteDiv) {
        sessionStorage.setItem('playDetailVoteDiv', playDetailVoteDiv);
        state.playDetailVoteDiv = playDetailVoteDiv
    },
    ReceiptAddressPages(state, ReceiptAddressPage) {
        sessionStorage.setItem('ReceiptAddressPage', ReceiptAddressPage);
        state.ReceiptAddressPage = ReceiptAddressPage
    },
    ReceiptAddressAddPages(state, ReceiptAddressAddPage) {
        sessionStorage.setItem('ReceiptAddressAddPage', ReceiptAddressAddPage);
        state.ReceiptAddressAddPage = ReceiptAddressAddPage
    }
}
export default new Vuex.Store({
    state,
    mutations
})