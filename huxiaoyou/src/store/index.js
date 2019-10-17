import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    WpersonInfoH: JSON.parse(localStorage.getItem('WpersonInfoH')) || {},
    tokenH: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJodHRwczpcL1wvbG92eW91LnRvcCIsImF1ZCI6Imh0dHBzOlwvXC9sb3Z5b3UudG9wIiwiaWF0IjoxNTcxMTk0MDA3LCJuYmYiOjE1NzExOTQwMDcsImV4cCI6MTYwMjczMDAwN30.YZ6rMMqtIg7FCFrfe94jgAc0w9Do-FfsI7zCa9OsMXA',
    idxNowH: localStorage.getItem('idxNowH'),
    staticImgH: '../../static/mock/img/',
    apiH: 'http://app.aibebi.net',
    playerId: localStorage.getItem('playerId'),
    addressId: localStorage.getItem('addressId'),
    addressIdIsSel: localStorage.getItem('addressIdIsSel'), //投助力票时判断是否选中了地址
    editAddressDes: localStorage.getItem('editAddressDes'), //编辑地址页面信息
    myOrderListPage: localStorage.getItem('myOrderListPage'), //订单列表页
    orderType: localStorage.getItem('orderType'), //订单类型
    orderNum: localStorage.getItem('orderNum'), //订单类型下标
    HomeSearchPage: localStorage.getItem('HomeSearchPage'), //  搜索页面返回
    PlayerDetailPage: localStorage.getItem('PlayerDetailPage'), //选手详情页面返回
    playDetailVoteDiv: localStorage.getItem('playDetailVoteDiv'), //选手详情的投票盒子的显示与消失
    ReceiptAddressPage: localStorage.getItem('ReceiptAddressPage'), //地址列表盒子返回哪
    ReceiptAddressAddPage: localStorage.getItem('ReceiptAddressAddPage'), //添加地址列表盒子返回哪
    playDetailShopDES: JSON.parse(localStorage.getItem('playDetailShopDES')) || {}, //选手详情  助力商品id
    specialInfo: JSON.parse(localStorage.getItem('specialInfo')) || {}, //专题列表 专题详情信息
    specialDetailInfo: JSON.parse(localStorage.getItem('specialDetailInfo')) || {}, //专题详情 专题详情信息

    nickNamePerX: localStorage.getItem('ReceiptAddressAddPage'), //个人资料名字
    SignaturePerX: localStorage.getItem('ReceiptAddressAddPage'), //个人资料个性签名
    cityNamePerX: localStorage.getItem('cityNamePerX'), //个人资料城市
}
const mutations = {
    // 个人资料城市名
    cityNamePerXs(state, cityNamePerX) {
        localStorage.setItem('cityNamePerX', cityNamePerX);
        state.cityNamePerX = cityNamePerX
    },
    // 个人资料个性签名
    SignaturePerXs(state, SignaturePerX) {
        localStorage.setItem('SignaturePerX', SignaturePerX);
        state.SignaturePerX = SignaturePerX
    },
    // 个人资料名字
    nickNamePerXs(state, nickNamePerX) {
        localStorage.setItem('nickNamePerX', JSON.stringify(nickNamePerX));
        state.nickNamePerX = nickNamePerX
    },
    specialInfos(state, specialInfo) {
        localStorage.setItem('specialInfo', JSON.stringify(specialInfo));
        state.specialInfo = specialInfo
    },
    specialDetailInfos(state, specialDetailInfo) {
        localStorage.setItem('specialDetailInfo', JSON.stringify(specialDetailInfo));
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
        localStorage.setItem('playDetailShopDES', JSON.stringify(playDetailShopDES));
        state.playDetailShopDES = playDetailShopDES
    },
    idxNowHs(state, idxNowH) {
        localStorage.setItem('idxNowH', idxNowH);
        state.idxNowH = idxNowH
    },
    playerIds(state, playerId) {
        localStorage.setItem('playerId', playerId);
        state.playerId = playerId
    },
    addressIds(state, addressId) {
        localStorage.setItem('addressId', addressId);
        state.addressId = addressId
    },
    addressIdIsSels(state, addressIdIsSel) {
        localStorage.setItem('addressIdIsSel', addressIdIsSel);
        state.addressIdIsSel = addressIdIsSel
    },
    editAddressDess(state, editAddressDes) {
        localStorage.setItem('editAddressDes', editAddressDes);
        state.editAddressDes = editAddressDes
    },
    myOrderListPages(state, myOrderListPage) {
        localStorage.setItem('myOrderListPage', myOrderListPage);
        state.myOrderListPage = myOrderListPage
    },
    orderTypes(state, orderType) {
        localStorage.setItem('orderType', orderType);
        state.orderType = orderType
    },
    orderNums(state, orderNum) {
        localStorage.setItem('orderNum', orderNum);
        state.orderNum = orderNum
    },
    HomeSearchPages(state, HomeSearchPage) {
        localStorage.setItem('HomeSearchPage', HomeSearchPage);
        state.HomeSearchPage = HomeSearchPage
    },
    PlayerDetailPages(state, PlayerDetailPage) {
        localStorage.setItem('PlayerDetailPage', PlayerDetailPage);
        state.PlayerDetailPage = PlayerDetailPage
    },
    playDetailVoteDivs(state, playDetailVoteDiv) {
        localStorage.setItem('playDetailVoteDiv', playDetailVoteDiv);
        state.playDetailVoteDiv = playDetailVoteDiv
    },
    ReceiptAddressPages(state, ReceiptAddressPage) {
        localStorage.setItem('ReceiptAddressPage', ReceiptAddressPage);
        state.ReceiptAddressPage = ReceiptAddressPage
    },
    ReceiptAddressAddPages(state, ReceiptAddressAddPage) {
        localStorage.setItem('ReceiptAddressAddPage', ReceiptAddressAddPage);
        state.ReceiptAddressAddPage = ReceiptAddressAddPage
    }
}
export default new Vuex.Store({
    state,
    mutations
})