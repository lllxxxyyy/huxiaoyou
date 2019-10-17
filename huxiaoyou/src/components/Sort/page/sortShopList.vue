<!--  -->
<template>
  <div class="sortShopList">
      <ul class="bar">
          <li @click="sortBarIndex(index)" :class="barIndex==index?'boutiqueNavColor':''" v-for="(item,index) in bar" :key="index">
              {{item.name}}
          </li>
      </ul>

       <ul class="shopLists_des">
          <li>
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
        bar:[
            {
                name:'潮牌工坊',
            },
            {
                name:'潮牌集会',
            },
            {
                name:'猛犸市集',
            },
            {
                name:'潮牌工坊',
            },
            {
                name:'潮牌集会',
            },
            {
                name:'猛犸市集',
            },
            {
                name:'潮牌工坊',
            },
            {
                name:'潮牌集会',
            },
            {
                name:'猛犸市集',
            },
        ],
        barIndex:0,
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {
      sortBarIndex(index){
          this.barIndex=index
      }
  }
}

</script>
<style scoped lang="stylus">
.bar{
    width:100%;
    height:1.27rem;
    display :flex;
    align-items :center;
    border-top:0.03rem solid #e5e4e9;
    border-bottom:0.03rem solid #e5e4e9;
    font-size:0.32rem;
    padding:0 0.27rem;
    overflow-x:scroll;
        display: -webkit-box;
        -webkit-box-align: center;
        align-items :center;
        z-index :-1;
    >li{
        font-size:0.32rem;
        color:#676767;
        padding:0.23rem 0.355rem;
        letter-spacing :0.04rem;
    }
    >.boutiqueNavColor{
        background :#fe4445;
        color:#fff;
        border-radius:0.45rem;
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
            color:#505052;
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