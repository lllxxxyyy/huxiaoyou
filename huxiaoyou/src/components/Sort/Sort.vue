<!-- 选手暂时 -->
<template>
  <div class="PlayerRankingHome">
    <div class="PlayerRanking_header">
      <span>赛事商务</span>
    </div>
    <div class="CoOperative">
      <span>合作商</span>
      <ul class="brandList">
        <li class="brand" v-for="(item,index) in brandList" :key="index">
          <img :src="item.logo" alt="">
        </li>
      </ul>
    </div>
    <div class="kabao">
      <span>卡包</span>
      <ul>
        <li v-for="(item, index) in cardList" @click.stop="toshopdetail(item.goods_id)" v-if=" Number(index+1)" :key="index">
          <img :src="item.original_img" alt=""><span>{{item.goods_name}}</span>
        </li>
      </ul>
    </div>
    <!-- 提示盒子 -->
    <transition name="fade">
      <div class="promptFather" v-if="showPrompt">
        <div class="prompt">
          {{promptContent}}
        </div>
      </div>
    </transition>
    <Foot class="PublicFoot"/>
    <div class="footer">

    </div>
  </div>
</template>

<script>
  import Foot from './../Foot/Foot'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'

  import qs from 'qs'

  export default {
    name: 'Sort',
    data() {
      return {
        // 提示盒子
        promptContent: '', //提示盒子的内容
        showPrompt: false,//提示盒子的吸收和显示

        brandList: [],
        cardList: [],
      };
    },
    components: {
      Foot
    },

    computed: {
      ...mapState(['staticImgH',])
    },

    mounted() {
      this.getListData();

    },

    methods: {
       //   到商品id
            toshopdetail(goodid){
                this.addressIdIsSels('false') //商品页默认地址不选中
                this.shopDetailReturns('/Sort')//商品页返回哪
                this.shopgoodIds(goodid)  //给商品页传gooid
                this.$router.push('/shopDetail')  
            },
      //   获取数据
      getListData() {
        // 合作商
        this.$http.post('api/goods/brand_list', {}, {
          headers: {
            'authorization': this.tokenH
          }
        }).then((res) => {
          if (res.data.code===200) {
            this.brandList = res.data.data.result
          }
        })
        // 卡包
        this.$http.post('api/goods/goods_list', {}, {
          headers: {
            'authorization': this.tokenH
          }
        }).then((res) => {
          if (res.data.code===200) {
            this.cardList = res.data.data.result
          }
        })

      },// 弹框提示
      alertText(text) {
        var self = this
        clearInterval(self.timer2);
        this.promptContent = text
        this.showPrompt = true
        self.timer2 = setTimeout(function () {
          self.showPrompt = false
          clearInterval(self.timer2);
        }, 2000)
        return false;
      },
      ...mapMutations(['playerIds', 'PlayerDetailPages', 'addressIdIsSels', 'playDetailVoteDivs','shopDetailReturns','shopgoodIds']),
    }
  }

</script>
<style scoped lang='stylus'>
.PlayerRankingHome{
    width:100%;
    background :#fff;
}
.PlayerRanking_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :center;
    position :relative;
    >img{
        width:0.32rem;
        height:0.56rem;
        position :absolute;
        top:50%;
        margin-top:-0.28rem;
        left:0.27rem;
    }
    >span{
        font-size:0.48rem;
        color:rgba(0, 0, 0, 1);
    }
}
.CoOperative{
		padding:0 0.4rem;
		>span{ padding-bottom:0.1rem; border-bottom:0.053rem solid #ffccd4; color:#000; font-size:0.48rem;}
		>ul{display:-webkit-box; display:-ms-flexbox; display:flex; -webkit-box-pack:justify; -ms-flex-pack:justify; justify-content:space-between; -ms-flex-wrap:wrap; flex-wrap:wrap; margin-top:0.7rem;
		>li{ width:2.6rem; height:5.4rem; background:rgba(0,0,0,0.1); width:100%;}
		}
}
.kabao{
        padding:0 0.4rem;
		margin-bottom:0.4rem;
        border-radius:0.133rem;
		padding-top:0.12rem;
		padding-bottom:0.1rem;
		>span{
    padding-bottom: 0.1rem;
    border-bottom: 0.053rem solid #ffccd4;
    color: #000;
	font-size:0.48rem;
		}
		>ul{
		display: -webkit-box;
    	display: -ms-flexbox;
    	display: flex;
    	-webkit-box-pack: justify;
    	-ms-flex-pack: justify;
    	justify-content: space-between;
    	-ms-flex-wrap: wrap;
	margin-top:0.5rem;
    	flex-wrap: wrap;
        >li{
            font-size:0.32rem;
            color:rgba(0, 0, 0, 1);
			margin-bottom:0.36rem;
			position: relative;
			width:2.9rem;
			text-align:center;
			font-size:0.37rem;
			>img{ width:2.9rem; margin-bottom:0.2rem;}
      >span{
                width:100%;
                display:-webkit-box;
                -webkit-box-orient:vertical;
                word-break:break-all;
                overflow:hidden;
                -webkit-line-clamp:2;
                padding:0 0.2rem;
            }
        }
         
		}
    }

// 提示盒子
.promptFather{
    width:100%;
    position :fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    display :flex;
    justify-content :center;
    align-items :center;
    z-index:999;
    >.prompt{
        padding:0.2rem 0.35rem;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.37rem;
    }
}
.fade-enter-active, .fade-leave-active {
//   transition: opacity .5s;
    transition: all .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
   transform: translateY(0.32rem);
  opacity: 0;
}

.PublicFoot{
    position :fixed;
    bottom:0;
    left:0;
}
.footer{
   width:100%;
   height:1.458rem;
   background :#fff;
}
.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
  background-color red;
}
  .brandList{
    width: 100%;
    height: 200px;
    overflow:hidden;
    >img{
      width: 100%;
      height: 100%;
    }
  }
</style>
