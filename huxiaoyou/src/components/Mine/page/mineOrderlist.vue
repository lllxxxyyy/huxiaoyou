<!-- 我的订单列表 -->
<template>
  <div class="mineOrder">
      <div class="mineOrder_title" @click="toOrderList(' ',0)">
           <span class="mineOrder_titleLeft">我的订单</span>   <span>查看全部订单>></span>
      </div>
      <ul class="mineOrder_list">
        <li class="pendingPayment" @click="toOrderList('WAITPAY',1)">
            <div class="mineOrder_listImg">
                <div class="mineOrder_listImgBao">
                    <!-- <i></i> -->
                    <img :src="staticImgH+'MineDaiPay.png'" alt="">
                </div>
            </div>
            <span>待支付</span>
        </li>
        <li class="toDelivered">
            <div class="mineOrder_listImg" @click="toOrderList('WAITSEND',2)">
                <div class="mineOrder_listImgBao">
                    <!-- <i></i> -->
                    <img :src="staticImgH+'MineDaiFa.png'" alt="">
                </div>
            </div>
            <span>待发货</span>
        </li>
        <li class="pendingReceipt" @click="toOrderList('WAITRECEIVE	',3)">
            <div class="mineOrder_listImg">
                <div class="mineOrder_listImgBao">
                    <!-- <i></i> -->
                    <img :src="staticImgH+'MineDaishow.png'" alt="">
                </div>
            </div>
            <span>待收货</span>
        </li>
          
      </ul>
      <!-- 提示盒子 -->
         <transition name="fade">
            <div class="promptFather" v-if="showPrompt">
                <div class="prompt" >
                    {{promptContent}}
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
    name:"mineOrderlist",
  data () {
    return {
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },

//   components: {},

    computed:{
        ...mapState(['staticImgH','personInfo'])
    },
//   mounted: {},

  methods: {
    //   跳全部订单列表
      toOrderList(orderType,orderNum){
          this.myOrderListPages('/Mine')
          this.orderTypes(orderType)
          this.orderNums(orderNum)
          this.$router.push('/orderList')
      },
      ...mapMutations(['myOrderListPages','orderTypes','orderNums']),
  }
}
</script>
<style scoped lang="stylus">
.mineOrder{
    width:9.173rem;
    height:3.173rem;
    margin:0 auto;
    margin-top:0.32rem;
    margin-bottom:0.4rem;
    border-radius:0.133rem;
    box-shadow :0 0.05rem 0.3rem rgba(241, 241, 241, 0.9);
    padding:0 0.27rem;
    background :#fff;
}
.mineOrder_title{
    width:100%;
    font-size:0.356rem;
    color:#4a4c4b;
    display :flex;
    align-items :center;
    justify-content :space-between;
    padding-top:0.24rem;
    >span{
        font-size:0.32rem;
        color:rgba(153, 153, 153, 1);
    }
    >.mineOrder_titleLeft{
        line-height :0.53rem;
        font-size:0.373rem;
        color:rgba(51, 51, 51, 1);
    }
}
.mineOrder_list{
    width:100%;
    padding:0 0.4rem;
    display :flex;
    align-items :center;
    justify-content :space-between;
    background :#fff;
    margin-bottom:0.231rem;
    >li{
        display :flex;
        flex-direction :column;
        justify-content :space-between;
        align-items :center;
        margin-top:0.59rem;
        >span{
            font-size:0.35em;
            color:rgba(51, 51, 51, 1);
            line-height :0.51rem;
            margin-top:0.27rem;
        }
        .mineOrder_listImg{
            height:0.56rem;
            display :flex;
            align-items :center;
            justify-content :center;
            .mineOrder_listImgBao{
                display :flex;
                align-items :center;
                justify-content :center;
                position :relative;
                >i{
                    width:0.373rem;
                    height:0.373rem;
                    position :absolute;
                    right:-0.187rem;
                    top:-0.187rem;
                    background :skyblue;
                    border-radius:50%;
                }
            }
            
        }
        
    }
    >.pendingPayment{
        .mineOrder_listImg{
            .mineOrder_listImgBao{
                >img{
                    width:0.56rem;
                    height:0.56rem;
                }
            }
            
        }
        
    }
    >.toDelivered{
        .mineOrder_listImg{
            .mineOrder_listImgBao{
                img{
                    width:0.56rem;
                    height:0.56rem; 
                }
            }
            
        }
           
    }
    >.pendingReceipt{
        .mineOrder_listImg{
            .mineOrder_listImgBao{
                >img{
                    width:0.67rem;
                    height:0.51rem;
                }
            }
            
        }
        
    }
    
}
</style>