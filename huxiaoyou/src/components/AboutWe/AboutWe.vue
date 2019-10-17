<!--客服中心 -->
<template>
  <div class="customerService">
        <!-- header -->
       <div class="customer_header">
                <img @click="toMine" class="orderDetailsHeaderLeft" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>客服中心</span>
        </div>
        <!-- 服务列表 -->
        <ul class="customer_serviceList">
            <li class="logistics_inquiry">
                <img @click="toWaitShou" :src="staticImgH+'wuliuchaxun.png'" alt="">
                <span>物流查询</span>
            </li>
            <li class="return_goods">
                <img :src="staticImgH+'tuihuanhuo.png'" alt="">
                <span>退换货</span>
            </li>
            <li class="online_service" @click="onlineService">
                <img :src="staticImgH+'zaiziankefu.png'" alt="">
                <span>在线客服</span>
            </li>
            <li @click="onlineGrey" class="telephone_custome">
                <img :src="staticImgH+'phone.png'" alt="">
                <span>电话客服</span>
            </li>
        </ul>
        <!-- 常见问题 -->
        <div class="customer_problem">
            <div class="customer_problemTitle">
                常见问题
            </div>
            <div class="customer_problemEg">
                <ol class="customer_problemNav">
                    <li >
                        <span></span>
                    </li>
                </ol>
                 <ul class="customer_problemList">
                    <li>
                        <span></span>
                        <!-- <img :src="staticImgH+'youjiantou.png'" alt=""> -->
                    </li>
                </ul>
            </div>
           
        </div>
        <!-- 在线客服 -->
        <div class="customer_onlineGrey" v-if="showOnlineGrey" @click="noOnlineGrey">
            <div class="customer_onlineWhite" @click.stop>
                <span class="customer_onlineCall">是否拨打客服电话</span>
                <span class="customer_onlineNum">010-67725008</span>
                <div class="customer_onlineBtn">
                    <span class="customer_onlineCancel" @click="noOnlineGrey">取消</span>
                    <span class="customer_onlineSure">确定<a href="tel://010-67725008">拨打电话</a></span>
                </div>
            </div>
        </div>
        <!-- 客服 -->
        <div class="kefu_onlineGrey" v-if="showkefuOnlineGrey">
            <div class="kefu_onlineWhite" @click.stop>
                <span class="kefu_onlineCall">客服系统正在对接</span>
                <span class="kefu_onlineNum">请在微信上关注<span>艾贝网公众号</span>进行咨询</span>
                <div class="kefu_onlineBtn">
                    <span class="kefu_onlineSure" @click="kefuOnlineSure">确定</span>
                </div>
            </div>
        </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
var qs = require('qs');
export default {
    name:"CustomerService",
  data () {
    return {
        problemNav:[
            {title:'物流问题'},
            {title:'订单问题'},
            {title:'商品问题'},
            {title:'积分问题'},
        ],
        showOnlineGrey:false,
        type:1,
        customerData:'',
        num:0,
        showkefuOnlineGrey:false,

        showOnlineGrey:'',//是否拨打电话提示
    };
  },
    mounted(){
    },
//   components: {},

//   computed: {},

computed:{
    ...mapState(['staticImgH','apis'])
},

  methods: {
      onlineService(){
          this.showkefuOnlineGrey=true
      },
      kefuOnlineSure(){
          this.showkefuOnlineGrey=false
      },
    //   ->我的
      toMine(){
          this.$router.push("/Mine")
      },
    //   显示客服电话
    onlineGrey(){
        this.showOnlineGrey=true;
    },
    // 隐藏客服电话
    noOnlineGrey(){
        this.showOnlineGrey=false;
    },
    toWaitShou(){
        this.orderTypes('WAITRECEIVE')
        this.orderNums(3)
        this.myOrderListPage('/AboutWe')
        this.$router.push('/orderList')
    },
    ...mapMutations(['orderTypes','orderNums','myOrderListPages'])
  }
}

</script>
<style scoped lang="stylus">
.customerService{
    width:100%;
    height:100%;
    background :#F0F3F4;
}
.customer_header{
    height:1.23rem;
    display:flex;
    justify-content :center;
    align-items :center;
    position :relative;
    border-bottom:0.03rem solid #F1F1F1;
    background :#fff;
    >img{
        width:0.32rem;
        height:0.56rem;
        position :absolute;
        left:0.27rem;
    }
    span{
        font-size:0.53rem;
    }
}
.customer_serviceList{
    height:2.67rem;
    display:flex;
    align-items :center;
    justify-content :space-between;
    border-bottom:0.03rem solid #F1F1F1;
    background :#fff;
    >li{
        width:20%;
        height:2.67rem;
        display:flex;
        flex-direction :column;
        align-items :center;
        justify-content :center;
        >span{
            font-size:0.32rem;
            line-height :0.45rem;
            margin-top:0.27rem;
        }
    }
    >.logistics_inquiry{
        >img{
            width:0.99rem;
            height:0.72rem;
        }
    }
    >.return_goods{
        >span{
            margin-top:0.24rem;
        }
        >img{
            width:0.72rem;
            height:0.72rem;
        }
    }
    >.online_service{
        >img{
            width:0.85rem;
            height:0.75rem;
        }
    }
    >.telephone_custome{
        >span{
            margin-top:0.24rem;
        }
        >img{
            width:0.72rem;
            height:0.72rem;
        }
    }
}
// 问题列表
.customer_problem{
    .customer_problemTitle{
        height:0.75rem;
        line-height :0.75rem;
        font-size:0.32rem;
        color:#999999;
        padding-left:0.24rem;
        margin-top:0.16rem;
        
    }
}
.customer_problemEg{
    background :#fff;
    border-top:0.03rem solid #F1F1F1;
    border-bottom:0.03rem solid #F1F1F1;

    .customer_problemNav{
        width:100%;
        height:0.99rem;
        display:flex;
        align-content:center;
        border-bottom:0.03rem solid #F1F1F1;
        >li{
            width:25%;
            height:0.99rem;
            display:flex;
            justify-content :center;
           
            >span{
                height:0.91rem;
                line-height :0.91rem;
                font-size:0.37rem;
                text-align:center;

            }
              >.problemNavColor{
                color:#FF3924;
                border-bottom:0.03rem solid #FF3924 ;
                // &:before{
                //     content:'';
                //     width:
                // }
        }
        }
      
    }
    >.customer_problemList{
        >li{
            height:1.17rem;
            display:flex;
            justify-content :space-between;
            align-items :center;
            margin-left:0.27rem;
            border-bottom:0.03rem solid #F1F1F1;
             &:last-child{
                border-bottom:0;
            }
            >img{
                width:0.19rem;
                height:0.29rem;
                margin-right:0.27rem;
            }
            >span{
                font-size:0.37rem;
            }
        }
    }
}
.customer_onlineGrey{
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background :rgba(0,0,0,0.5);
    >.customer_onlineWhite{
        width:8rem;
        height:3.87rem;
        margin:0 auto;
        margin-top:6.93rem;
        display:flex;
        flex-direction :column;
        align-items :center;
        background :#fff;
        >.customer_onlineCall{
            font-size:0.43rem;
            line-height :0.61rem;
            margin-top:0.59rem;
            margin-bottom:0.13rem;

        }
        >.customer_onlineNum{
            width:100%;
            font-size:0.43rem;
            color:#FF3924;
            text-align:center;
            line-height :0.61rem;
            padding-bottom:0.69rem;
            border-bottom:0.03rem solid #F1F1F1;
        }
        >.customer_onlineBtn{
            width:100%;
            display:flex;
            >span{
                width:50%;
                height:1.25rem;
                text-align :center;
                line-height :1.25rem;
                font-size:0.37rem;
            }
            >.customer_onlineCancel{
                position :relative;
                &:before{
                    content:'';
                    width:0.03rem;
                    height:1.24rem;
                    background :#F1F1F1;
                    position :absolute;
                    top:0;
                    right:0;
                }
            }
            >.customer_onlineSure{
                position :relative;
                >a{
                    position:absolute;
                    width:100%;
                    height:1.25rem;
                    top:0;
                    left:0;
                    opacity :0;

                }
            }

        }
    }

}

// 客服提示
.kefu_onlineGrey{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background :rgba(0,0,0,0.5);
    >.kefu_onlineWhite{
        width:8rem;
        height:3.87rem;
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        display:flex;
        flex-direction :column;
        align-items :center;
        background :#fff;
        >.kefu_onlineCall{
            font-size:0.43rem;
            line-height :0.61rem;
            margin-top:0.59rem;
            margin-bottom:0.13rem;

        }
        >.kefu_onlineNum{
            width:100%;
            font-size:0.37rem;
            text-align:center;
            line-height :0.61rem;
            padding-bottom:0.69rem;
            border-bottom:0.03rem solid #F1F1F1;
            >span{
                color:0.4rem;
                color:#FF3924;
            }
        }
        >.kefu_onlineBtn{
            width:100%;
            display:flex;
            >span{
                width:100%;
                height:1.25rem;
                text-align :center;
                line-height :1.25rem;
                font-size:0.37rem;
            }
        }
    }

}

</style>