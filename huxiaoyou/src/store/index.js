import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    WpersonInfoH: JSON.parse(sessionStorage.getItem('WpersonInfoH')) || {},
    tokenH: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozNywiaXNzIjoiaHR0cHM6XC9cL2xvdnlvdS50b3AiLCJhdWQiOiJodHRwczpcL1wvbG92eW91LnRvcCIsImlhdCI6MTU3MzUyOTIxOSwibmJmIjoxNTczNTI5MjE5LCJleHAiOjE2MDUwNjUyMTl9._uqFtTFX4vXmQ99ru8Owr4zn2rAIPTckEdV1lCgnoPc',
    userIdH: '3', //用户Id
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

    nickNamePerX: sessionStorage.getItem('nickNamePerX'), //个人资料名字
    SignaturePerX: sessionStorage.getItem('SignaturePerX'), //个人资料个性签名
    cityNamePerX: sessionStorage.getItem('cityNamePerX'), //个人资料城市
    agePerX: sessionStorage.getItem('agePerX'), //个人资料年龄
    heightPerX: sessionStorage.getItem('heightPerX'), //个人资料身高
    weightPerX: sessionStorage.getItem('weightPerX'), //个人资料体重
    constellationPerX: sessionStorage.getItem('constellationPerX'), //个人资料星座
    playerStyleDetailedPlayer: sessionStorage.getItem('playerStyleDetailedPlayer'), //PlayerStyleDetailed页面，player的信息
    playerVideoPage: sessionStorage.getItem('playerVideoPage'), //选手视频返回页面
    playerName: sessionStorage.getItem('playerName'), //选手详情=》选手风采=》选手视频的标题
    AddunionPage: sessionStorage.getItem('AddunionPage'), //加入公会页面返回
    searchConditions: sessionStorage.getItem('searchConditions'), //搜索条件

    comOrder: JSON.parse(sessionStorage.getItem('comOrder')) || {},
    MineInformationPage: sessionStorage.getItem('MineInformationPage'), // 个人信息页面返回
    MineGuildPage: sessionStorage.getItem('MineGuildPage'), // 我的公会页面返回

    Shopvote: sessionStorage.getItem('Shopvote'), // 商品票数
    barIdINdex: sessionStorage.getItem('barIdINdex'), // 选手排行赛区id

    RaceCheatsId: sessionStorage.getItem('RaceCheatsId'), // 最新通告、赛事秘籍ID

    RaceCheatsPage: sessionStorage.getItem('RaceCheatsPage'), //报名通道上的四个按钮和 首页最新通告、秘籍的跳转页面

    unionDetailPage: sessionStorage.getItem('unionDetailPage'), //工会 和赛事商务里的赛事合作品牌跳转页面

    labourUnionIndexIdX: JSON.parse(sessionStorage.getItem('labourUnionIndexIdX')) || {}, //公会 索引和id

}

const mutations = {
    //公会 索引和id
    labourUnionIndexIdXs(state, labourUnionIndexIdX) {
        sessionStorage.setItem('labourUnionIndexIdX', JSON.stringify(labourUnionIndexIdX));
        state.labourUnionIndexIdX = labourUnionIndexIdX
    },
    //工会 和赛事商务里的赛事合作品牌跳转页面
    unionDetailPages(state, unionDetailPage) {
        sessionStorage.setItem('unionDetailPage', unionDetailPage);
        state.unionDetailPage = unionDetailPage
    },
    //报名通道上的四个按钮和 首页最新通告、秘籍的跳转页面
    RaceCheatsPages(state, RaceCheatsPage) {
        sessionStorage.setItem('RaceCheatsPage', RaceCheatsPage);
        state.RaceCheatsPage = RaceCheatsPage
    },
    // 最新通告、赛事秘籍ID
    RaceCheatsIds(state, RaceCheatsId) {
        sessionStorage.setItem('RaceCheatsId', RaceCheatsId);
        state.RaceCheatsId = RaceCheatsId
    },
    // 选手排行赛区id
    barIdINdexs(state, barIdINdex) {
        sessionStorage.setItem('barIdINdex', barIdINdex);
        state.barIdINdex = barIdINdex
    },
    // 商品票数
    Shopvotes(state, Shopvote) {
        sessionStorage.setItem('Shopvote', Shopvote);
        state.Shopvote = Shopvote
    },
    // 我的公会页面返回
    MineGuildPages(state, MineGuildPage) {
        sessionStorage.setItem('MineGuildPage', MineGuildPage);
        state.MineGuildPage = MineGuildPage
    },
    // 个人信息页面返回
    MineInformationPages(state, MineInformationPage) {
        sessionStorage.setItem('MineInformationPage', MineInformationPage);
        state.MineInformationPage = MineInformationPage
    },
    //加入公会页面返回
    SearchConditions(state, searchConditions) {
        sessionStorage.setItem('searchConditions', searchConditions);
        state.searchConditions = searchConditions
    },
    //确认清单信息
    comOrders(state, comOrder) {
        sessionStorage.setItem('comOrder', JSON.stringify(comOrder));
        state.comOrder = comOrder
    },
    //加入公会页面返回
    AddunionPages(state, AddunionPage) {
        sessionStorage.setItem('AddunionPage', AddunionPage);
        state.AddunionPage = AddunionPage
    },
    //选手详情=》选手风采=》选手视频的标题
    playerNames(state, playerName) {
        sessionStorage.setItem('playerName', playerName);
        state.playerName = playerName
    },
    //选手视频返回页面
    playerVideoPages(state, playerVideoPage) {
        sessionStorage.setItem('playerVideoPage', playerVideoPage);
        state.playerVideoPage = playerVideoPage
    },
    //PlayerStyleDetailed页面，player的信息
    PlayerStyleDetailedPlayer(state, playerStyleDetailedPlayer) {
        sessionStorage.setItem('playerStyleDetailedPlayer', playerStyleDetailedPlayer);
        state.playerStyleDetailedPlayer = playerStyleDetailedPlayer
    },
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
    // 个人资料年龄
    agePerXs(state, agePerX) {
        sessionStorage.setItem('agePerX', agePerX);
        state.agePerX = agePerX
    },
    //个人资料身高
    heightPerXs(state, heightPerX) {
        sessionStorage.setItem('heightPerX', heightPerX);
        state.heightPerX = heightPerX
    },
    // 个人资料体重
    weightPerXs(state, weightPerX) {
        sessionStorage.setItem('weightPerX', weightPerX);
        state.weightPerX = weightPerX
    },
    // 个人资料星座
    constellationPerXs(state, constellationPerX) {
        sessionStorage.setItem('constellationPerX', constellationPerX);
        state.constellationPerX = constellationPerX
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
        sessionStorage.setItem('tokenH', tokenH);
        state.tokenH = tokenH
    },
    WpersonInfoHs(state, WpersonInfoH) {
        sessionStorage.setItem('WpersonInfoH', JSON.stringify(WpersonInfoH));
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