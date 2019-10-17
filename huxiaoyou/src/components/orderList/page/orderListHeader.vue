<!--  我的订单-->
<template>
  <div class="myOrderList"> 
      <!-- 隐形的盒子 -->
      <div class="hideOrder"></div>
        <!-- 头部 -->
            <div class="myOrderListHeader">
                <img @click="toMime" class="myOrderListHeaderLeft" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>我的订单</span>
                <span></span>
            </div>
        <!-- 导航 -->
            <ul class="myOrderLists">
                <li @click="dianNav(index)" v-for="(item,index) in orderNav" :key="index"><span :class="{'navStyle':num==index}">{{item.name}}</span></li>
            </ul>
        <!-- 订单列表 -->
            <div class="myOrderListShop" v-if="showkonghezi"> 
                <ul> 
                  
                        <div class="myOrderListShop_list"  v-for="(item,index) in listdata" :key="index">
                            <!-- 待支付 -->
                            <li class="waitPay" >
                                <div class="myOrderListShop_title">
                                    <span class="myOrderList_orderNumber">订单号：{{item.order_sn}}</span>
                                    <span class="myOrderList_transaction">待支付</span>
                                </div>
                                <div class="order_list">
                                    <div class="myOrderListShop_Des" >
                                        <img :src="item.original_img" alt="">
                                        <div class="myOrderListShop_info">
                                            <h5>{{item.goods_name}}</h5>
                                            <span class="myOrderListShop_feature">{{item.spec_key_name}}</span>
                                            <div class="myOrderListShop_money">
                                                <span>￥{{item.goods_price}}</span><img :src="staticImgH+'chenggrey.png'" alt="">{{item.goods_num}}
                                            </div>  
                                        </div>
                                    </div>
                                    <div class="myOrderListShop_num"><span>共{{item.goods_num}}件商品</span><span>合计：¥{{item.goods_total}}</span> </div>
                                </div>
                                <div class="myOrderListShop_btn" @click.stop>
                                    <span >取消订单</span>
                                    <span class="spanColor" @click="toPay(item.order_sn,item.order_amount)" >去付款</span>
                                </div>
                            </li>
                        </div>
                </ul> 
                
            </div>  
            <div class="konghezi" v-else>
                <!-- <img :src="staticImgH+'orderkong.png'" alt=""> -->
                <span>您还没有相关的订单</span>
            </div>
            <!-- 提示盒子 -->
            <transition name="fade">
                <div class="promptFather" v-if="showPrompt">
                    <div class="prompt" >
                        {{promptContent}}
                    </div>
                </div>
            </transition>

            <!-- 取消订单原因 -->
            <div class="cancelOrderReson" v-if="showCancelReson">
                <ul @click.stop>
                    <li v-for="(item,index) in cancelOrderReson" :key="index">{{item}}  <img v-if="resonNum!==index" :src="staticImgH+'noselect.png'" alt=""><img v-if="resonNum==index" :src="staticImgH+'select.png'" alt=""> </li>
                </ul>
                <div> 确定</div>
            </div>
             <!-- 用户确认取消订单 -->
            <div class="sureOrderList_wrapper" v-if="showSureOrder" >
                <div class="sureOrderList">
                    <p>
                        您确定要取消订单吗
                    </p>
                    <div class="sureOrderList_btn">
                        <span>取消</span><span>确定</span>
                    </div>
                </div>
            </div>
             <!-- 用户确认删除订单 -->
            <div class="delOrderList_wrapper" v-if="showDelOrder">
                <div class="sureDelOrderList">
                    <p>
                        您确定要删除订单吗
                    </p>
                    <div class="delOrderList_btn">
                        <span>取消</span><span>确定</span>
                    </div>
                </div>
            </div>
            <!-- 确认收货后 -->
             <div class="delOrderList_wrapper" v-if="showReceiptOrder">
                <div class="sureDelOrderList">
                    <p>
                        该商品在确认收货后会产生积分变动，将不退货
                    </p>
                    <div class="delOrderList_btn">
                        <span>取消</span><span>确定</span>
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
    name:"myOrderList",
  data () {
    return {
        orderNav:[
            {
                name:'全部'
            },{
                name:'待支付'
            },{
                name:'待发货'
            },{
                name:'待收货'
            }
        ],
        orderListData:'',//订单列表数据

        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示

        timer2:'',
        showkonghezi:true,
        num:0,
        userNote:'',//取消订单原因
        cancelOrderReson:[
            '订单不能按时送达',
            '操作有误(商品、地址等选错)',
            '重复下单/误下单',
            '其他渠道价格更低',
            '该商品降价了',
            '不想买了',
            '其他原因'
        ],
        resonNum:0,
        showCancelReson:false,

        cancelOrderId:'',
        cancelConsignee:'',
        cancelMobile:'',
        cancelPayStatus:'',
        showSureOrder:false,//取消订单按钮
        showDelOrder:false,//删除订单按钮
        showReceiptOrder:false,//确认收货

        goodId:'',//商品goodId(确认收货用到)
        recIds:'',//子订单商品recIds（确认收货用到）

        itemReson:'',//取消订单原因

        counter : 2, //默认已经显示出15条数据 count等于一是让从16条开始加载
        listdata: [], // 下拉更新数据存放数组
        downdata: []  // 上拉更多的数据存放数组

        
    }
    },
    computed:{
        ...mapState(['staticImgH','myOrderListPage','orderType','orderNum','tokenH'])
    },
    mounted() {
        console.log(this.orderType)
        console.log(this.orderNum)
        this.num=this.orderNum//分类下标
        this.getList()
    },
    methods: {
        // 上拉加载的数据
        getList(){
            var obj=qs.stringify({
                p:1,
                type:this.orderType
            })
             this.$http.post('api/order/order_list',obj,{
            headers: {
                    'authorization': this.tokenH
                }
        }).then((res)=>{
                if(res.data.code==200){
                    this.listdata=res.data.data.data
                }else{
                     var self=this
                    clearInterval(self.timer2);
                            this.promptContent=res.data.msg
                            this.showPrompt=true
                            self.timer2=setTimeout(function(){
                                self.showPrompt=false
                                clearInterval(self.timer2);
                            },2000)
                        return false;
                }
                    
                
            })
        },
        toPay(){

        },
        ...mapMutations([]),
        //   到 我的页面
        toMime(){
            this.$router.push(this.myOrderListPage)
        },
        // nav
        dianNav(index){
            this.num=index
            if(index==0){
                this.orderType('')
               this.getList()
            }else if(index==1){
                 this.orderType('WAITPAY')
                this.getList()
            }else if(index==2){
                this.orderType('WAITSEND')
                this.getList()
            }else if(index==3){
                this.orderType('WAITRECEIVE')
                this.getList()
            }else if(index==4){
                this.orderType('WAITCCOMMENT')
                this.getList()
            }
        },
    }
}
</script>
<style scoped lang="stylus">
.hideOrder{
    width:100%;
    height:2.06rem;
}
.myOrderList{
    width:100%;
    height:100%;
    background :#F0F3F4;
    letter-spacing :0.02rem;
}
.myOrderListHeader{
    width:100%;
    height:1.23rem;
    background :#fff;
    display :flex;
    justify-content :space-between;
    align-items :center;
    padding:0 0.27rem;
    border-bottom:0.03rem solid #F1F1F1;
    position:fixed;
    top:0;
    left:0;
    >.myOrderListHeaderLeft{
       width:0.32rem;
        height:0.56rem;
    }
    >span{
        font-size:0.53rem;
    }
    >.myOrderListHeaderRight{
        width:0.43rem;
        height:0.45rem;
    }
    
}
.myOrderLists{
    width:100%;
    height:0.83rem;
    display :flex;
    justify-content :space-between;
    padding:0 0.27rem;
    background :#fff;
    border-bottom:0.03rem solid #F1F1F1;
    position:fixed;
    top:1.23rem;
    left:0;
    >li{
        height:0.8rem;
        line-height: 0.8rem;
        font-size:0.32rem;
        text-align :center;
        >span{
            display:inline-block;
            width:100%;
            height:0.75rem;
            position :relative;
        }
        .navStyle{
            color:#FF3924;
            &:before{
                content:'';
                width:0.64rem;
                height :0.03rem;
                background :#FF3924;
                position :absolute;
                bottom:0;
                left:50%;
                margin-left:-0.32rem;
            }  
        }
    }
}
.myOrderListShop{
    background:#F0F3F4;
    >ul{
        &:last-child{
            margin-bottom:0.27rem;
        }
        .myOrderListShop_list{
            padding:0.27rem;
            padding-bottom:0;
        >li{
            display :flex;
            flex-direction :column;
            padding:0.27rem;
            padding-right:0;
            background :#fff;
            border-radius:0.2rem;
            >.myOrderListShop_title{
                height:0.45rem;
                display :flex;
                justify-content :space-between;
                margin-bottom:0.27rem;
                padding-right:0.27rem;
                letter-spacing :0.04rem;
                >.myOrderList_orderNumber{
                    font-size:0.27rem;
                    color:#999999;
                }
                >.myOrderList_transaction{
                    font-size:0.32rem;
                    color:#FF3924;

                }
            }
            .myOrderListShop_Des{
                display :flex;
                margin-bottom:0.27rem;
                &:last-child{
                    margin-bottom:0;
                }
                
                >img{
                    width:2.67rem;
                    height:2.67rem;
                    margin-right:0.27rem;
                }
                >.myOrderListShop_info{
                    flex:1;
                    display :flex;
                    flex-direction :column;
                    border-bottom:0.03rem solid #F0F3F4;
                    >h5{
                        width:5.47rem;
                        color:#000;
                        font-size:0.32rem;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        word-break:break-all;
                        overflow :hidden;
                        -webkit-line-clamp:2;
                        line-height :0.45rem;
                    }
                    >.myOrderListShop_feature{
                        font-size:0.32rem;
                        color:#CCCCCC;
                        margin-top:0.08rem;
                        line-height :0.45rem;
                        margin-bottom:0.64rem;
                        letter-spacing :0.04rem;
                    }
                    >.myOrderListShop_money{
                        font-size:0.27rem;
                        color:#999999;
                        display:flex;
                        align-item:center;
                        >span{
                            font-size:0.32rem;
                            color:#FF3924;
                        }
                        >img{
                            width:0.16rem;
                            height:0.3rem;
                            margin:0 0.05rem;
                            margin-left:0.27rem;
                        }
                    }
                }
                

            }
            .myOrderListShop_num{
                text-align :right;
                font-size:0.32rem;
                margin-top:0.29rem;
                margin-bottom:0.29rem;
                padding-right:0.27rem;
                letter-spacing :0.04rem;
            }
            .myOrderListShop_btn2{
                     display :flex;
                    justify-content :flex-end;
                    align-items :center;
                    padding-right:0.27rem;
                    letter-spacing :0.04rem;
                    margin-bottom:0.27rem;
                    >span{
                        width:2.24rem;
                        height:0.77rem;    
                        line-height 0.75rem;
                        text-align :center;
                        border-radius:0.5rem;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                        color:#999999;
                        border:0.03rem solid #999999;
                        font-size:0.32rem;
                        margin-right:0.27rem;
                        &:last-child{
                            margin-right:0;
                        }
                    }
                    >.spanColor{
                    color:#FF3924;
                    border:0.03rem solid #FF3924;
                }
                }
            .myOrderListShop_btn{
                display :flex;
                justify-content :flex-end;
                align-items :center;
                padding-right:0.27rem;
                letter-spacing :0.04rem;
                >span{
                    width:2.24rem;
                    height:0.77rem;    
                    line-height 0.75rem;
                    text-align :center;
                    border-radius:0.5rem;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                    color:#999999;
                    border:0.03rem solid #999999;
                    font-size:0.32rem;
                    margin-right:0.27rem;
                    &:last-child{
                        margin-right:0;
                    }
                }
                >.spanColor{
                    color:#FF3924;
                    border:0.03rem solid #FF3924;
                }
                
            }
        }
    }
    }
}


// 提示盒子
.promptFather{
    width:100%;
    position :fixed;
    bottom:0;
    left:0;
    top:0;
    bottom:0;
    right:0;
    margin:auto;
    display :flex;
    justify-content :center;
    align-items :center;
    z-index:999;
    >.prompt{
        padding:0.2rem 0.35rem;;
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



// 没数据时候
.konghezi{
    display:flex;
    flex-direction :column;
    // justify-content :flex-end;
    align-items :center;
    >img{
        width:5.63rem;
        height:3.84rem;
        margin-top:2.72rem;
        margin-bottom:0.53rem;
    }
    >span{
        font-size:0.4rem;
        color:#FF3924;
        line-height:0.56rem;
    }
}

// 取消订单列表的原因
.cancelOrderReson{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background :rgba(0,0,0,0.5);
    ul{
        width:100%;
        position :absolute;
        bottom:1.23rem;
        left:0;
        background :#fff;
        >li{
            width:100%;
            height:1rem;
            display:flex;
            justify-content :space-between;
            align-items :center;
            padding: 0 0.27rem;
            font-size:0.37rem;
            >img{
                width:0.37rem;
                height:0.37rem;
            }
        }
    }
    >div{
        width:100%;
        height:1.23rem;
        position :absolute;
        bottom:0;
        left:0;
        text-align:center;
        line-height:1.23rem;
        background :#fff;
        font-size:0.37rem;
        letter-spacing:0.03rem;
        background:#FF3924;
        color:#fff;
    }
    
}

// 用户确认取消订单按钮
.sureOrderList_wrapper{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5)
    position:fixed;
    top:0;
    left:0;
}
.sureOrderList{
    width:8rem;
    height:3.87rem;
    position:absolute;
    top:50%;
    margin-top:-1.93rem;
    left:50%;
    margin-left:-4rem;
    background:#fff;
    >p{
        height:2.61rem;
        text-align:center;
        line-height:2.61rem;
        border-bottom:0.03rem solid #F1F1F1;
        font-size:0.43rem;
    }
    >.sureOrderList_btn{
        height:1.25rem;
        display:flex;
        font-size:0.37rem;

        >span{
            height:1.25rem;
            width:50%;
            text-align:center;
            line-height:1.25rem;
            &:last-child{
                border-left:0.03rem solid #F1F1F1;
                color:#FF3924;
            }
        }
    }
}
// 用户确认删除订单按钮
.delOrderList_wrapper{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.5)
    position:fixed;
    top:0;
    left:0;
    z-index:888;
}
.sureDelOrderList{
    width:8rem;
    height:3.87rem;
    position:absolute;
    top:50%;
    margin-top:-1.93rem;
    left:50%;
    margin-left:-4rem;
    background:#fff;
    >p{
        height:2.61rem;
        line-height :0.48rem;
        display:flex;
        justify-content :center;
        align-items: center;
        padding:0.27rem;
        border-bottom:0.03rem solid #F1F1F1;
        font-size:0.43rem;
        
    }
    >.delOrderList_btn{
        height:1.25rem;
        display:flex;
        font-size:0.37rem;

        >span{
            height:1.25rem;
            width:50%;
            text-align:center;
            line-height:1.25rem;
            &:last-child{
                border-left:0.03rem solid #F1F1F1;
                color:#FF3924;
            }
        }
    }
}
.myOrderListShop .yo-scroll{
    top:2.03rem;
}
</style>