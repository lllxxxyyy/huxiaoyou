<!--  -->
<template>
  <div class="shopListBody">
      <ul class="shopListBar">
          <li @click="shopListBarBtn(index,item.id)" :class="shopListBarIndex==index?'shopListBar_color':''" v-for="(item,index) in shopListBar" :key="index">
              {{item.name}}
                 <span v-if="index==2 && item.id==3" :class="['priceTop',BarBtnColorIdx==1?'priceTopChange':''] "> </span>   
                 <span v-if="index==2 && item.id==3" :class="['priceBottom',BarBtnColorIdx==2?'priceBottomChange':'']"> </span> 
          </li>
      </ul>
      <ul class="shopLists_des">
          <li @click="toShopDetail">
                <img src="" alt="">
                <span class="shopLists_name">正好</span>
                <div class="shopLists_moneyNum">
                    <span class="shopLists_money">￥0.11</span>
                    <span class="shopLists_Num">已售0件</span>
                </div>
          </li>
          <li>
                <img src="" alt="">
                <span class="shopLists_name">正好</span>
                <div class="shopLists_moneyNum">
                    <span class="shopLists_money">￥0.11</span>
                    <span class="shopLists_Num">已售0件</span>
                </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
        shopListBar:[
            {
                name:'综合',
            },
            {
                name:'最新',
            },
            {
                name:'价格',
                id:3,
            },
            {
                name:'销量',
            },
        ],
        shopListBarIndex:0,
        BarBtnColorIdx:0,
    };
  },
  components: {},
  computed: {},
  mounted: {},
  methods: {
        shopListBarBtn(index,itemId){
            this.shopListBarIndex=index
            if(index==2 && itemId==3){
                if(this.BarBtnColorIdx==0){
                    this.BarBtnColorIdx=1
                }else{
                    
                    this.BarBtnColorIdx==1?this.BarBtnColorIdx=2:this.BarBtnColorIdx==1
                    // console.log(this.BarBtnColorIdx)
                }
            }else{
                this.BarBtnColorIdx=0
            }
        },
        //   跳商品详情
        toShopDetail(){
            this.$router.push('/ShopDetails')
        }
  }
}

</script>
<style scoped lang="stylus">
.shopListBar{
    display :flex;
    align-items :center;
    justify-content :space-between;
    background :#fff;
    >li{
        width:25%;
        height:1.28rem;
        font-size:0.37rem;
        line-height :1.28rem;
        text-align :center;
        position :relative;
        >span{
            width: 0; 
            height: 0;
            border-width: 0.15rem;
            border-style: solid;
            position :absolute;
            right:0.4rem;
        }
        >.priceTop{
           border-color:#FFCCCC transparent  transparent  transparent;
           top:0.44rem;
        }
        >.priceTopChange{
            border-color:#f6445c transparent  transparent  transparent;
        }
        >.priceBottom{
            border-color: transparent transparent #FFCCCC transparent ;
            bottom:0.44rem;
        }
        >.priceBottomChange{
            border-color: transparent transparent #f6445c transparent ;
            bottom:0.44rem;
        }
    }
    >.shopListBar_color{
        color:#ff4e73;
    }
}
.shopLists_des{
    display :flex;
    justify-content :space-between;
    flex-wrap:wrap;
    padding:0.27rem;
    >li{
        width:4.66rem;
        display :flex;
        flex-direction :column;
        background :#fff;
        >img{
            width:4.66rem;
            height:4.67rem;
            background :pink;
        }
        >.shopLists_name{
            width:90%;
            color:#5a5a5a;
            font-size:0.37rem;
            padding:0 0.2rem;
            margin-bottom:0.916rem;
            margin-top:0.25rem;
        }
        >.shopLists_moneyNum{
            display :flex;
            justify-content :space-between;
            font-size:0.32rem;
            padding:0 0.27rem;
            margin-bottom:0.27rem;
            >.shopLists_money{
                color:#fb3d6d;
            }
            >.shopLists_Num{
                color:#99999b;
            }
        }
    }
}
</style>