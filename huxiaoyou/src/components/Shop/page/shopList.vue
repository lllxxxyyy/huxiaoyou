<!-- shop_list -->
<template>
  <div class="shopList">
      <ul class="bigShopList">
          <li class="bigShopList_li">
              <div class="shopList_title">
                  <i></i>
                  <span>平台自营</span>
              </div>
              <ul class="smallShopList">
                  <li class="smallShopList_li">
                      <i></i>
                      <img src="" alt="">
                        <div class="smallShop_des">
                            <span class="smallShop_Name">南极人被子冬被加厚保暖棉被褥单人宿舍春秋冬天被芯双人太空调被</span>
                            <span class="smallShop_gui">规格：黑色</span>
                            <div class="smallShop_bottom">
                                <span class="smallShop_price">￥1</span>
                                <div class="smallShop_num">
                                    <div class="smallShop_numLess">
                                        -
                                    </div>
                                    <div class="smallShop_number">
                                        1
                                    </div>
                                    <div class="smallShop_numAdd">
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                  </li>
              </ul>
          </li>
      </ul>
      <div class="shopBottom">
          <div class="shopBottom_left">
            <div class="sel"><i></i>全选</div>
            <span>总计：￥0</span>
            </div>
            <div class="Settlement" v-if="SettlementShow">
                <span class="Settlement_bian">编辑</span>
                <span class="Settlement_jie">结算</span>
            </div>
           <div class="del" v-if="delShow">
              <span class="del_wan">完成</span>
              <span class="del_del">删除</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'shopList',
  data () {
    return {
        SettlementShow:true,
        delShow:false
    };
  },

//   components: {},

//   computed: {},

//   mounted: {},

//   methods: {}
}

</script>
<style scoped lang="stylus">
.bigShopList{
    display :flex;
    flex-direction :column;
    >.bigShopList_li{
        display :flex;
        flex-direction :column;
        >.shopList_title{
            width:100%;
            height:1.102rem;
            font-size:0.347rem;
            color:#595959;
            display :flex;
            align-items :center;
            border-bottom:0.03rem solid #F1F1F1;
            >i{
                width:0.507rem;
                height:0.507rem;
                border:0.03rem solid #8f8f8f;
                margin-left:0.293rem;
                border-radius:50%;
            }
            >span{
                font-size:0.364rem;
                color:#585858;
                margin-left:0.328rem;
            }
        }
        >.smallShopList{
            >.smallShopList_li{
                display :flex;
                align-items :center;
                margin-top:0.4rem;
                margin-right:0.293rem;
                margin-bottom:0.293rem;
                >i{
                    width:0.507rem;
                    height:0.507rem;
                    border:0.03rem solid #8f8f8f;
                    margin-left:0.293rem;
                    border-radius:50%;
                }
                >img{
                    width:1.973rem;
                    height :1.973rem;
                    margin-left:0.293rem;
                    margin-right:0.258rem;
                    background :pink;
                }
                >.smallShop_des{
                    display:flex;
                    flex-direction :column;
                    
                    >.smallShop_Name{
                        width:5.973rem;
                        font-size:0.284rem;
                        color:#5a5a5a;
                        line-height :0.56rem;
                        margin-bottom:0.115rem;
                        overflow :hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;

                    }
                    >.smallShop_gui{
                        font-size:0.302rem;
                        color:#7f8488;
                        margin-bottom:0.329rem;
                    }
                    >.smallShop_bottom{
                        display :flex;
                        justify-content :space-between;
                        align-items :center;
                        >.smallShop_price{
                            font-size:0.293rem;
                            color:#d75a62;
                            
                        }
                        >.smallShop_num{
                            width:2.667rem;
                            height:0.747rem;
                            display :flex;
                            align-items :center;
                            background :#f8f8f8;
                            >.smallShop_numLess{
                                width:0.747rem;
                                height:0.747rem;
                                line-height :0.747rem;
                               text-align :center;
                                font-size:0.32rem;
                                color:#989898;

                            }
                            >.smallShop_numAdd{
                                width:0.747rem;
                                height:0.747rem;
                                line-height :0.747rem;
                                text-align :center;
                                font-size:0.32rem;
                                color:#989898;
                            }
                            >.smallShop_number{
                                width:1.173rem;
                                height:0.74rem;
                                text-align :center;
                                line-height :0.747rem;
                                font-size:0.284rem;
                                color:#2c2c2c;

                            }
                        
                            
                        }
                    }
                }
            }
        }
    }
}
.shopBottom{
    width:100%;
    height:1.227rem;
    position :fixed;
    bottom:1.458rem;
    left:0;
    display:flex;
    align-items :center;
    justify-content :space-between;
    border-top:rem solid #e2e2e4;
    >.shopBottom_left{
        display:flex;
        align-items :center;
         >.sel{
            display :flex;
            align-items :center;
            color:#5f5f5f;
            font-size:0.347rem;
            >i{
                width:0.507rem;
                height:0.507rem;
                border:0.03rem solid #8f8f8f;
                margin-left:0.293rem;
                border-radius:50%;
                margin-right:0.124rem;
            }
            
        }
        
        >span{
            font-size:0.355rem;
            color:#fa566e;
            margin-left:0.164rem;
        }
    }   
    >.Settlement{
        font-size:0.364rem;
        color:#fff;
        display:flex;
        >span{
            width:2.027rem;
            height:1.227rem;
            line-height :1.227rem;
            text-align :center;
        } 
        >.Settlement_bian{
            background :#4796e5;
        }  
        >.Settlement_jie{
            background :#fd4e4b;
        }
    }
     >.del{
         font-size:0.364rem;
        color:#fff;
        display:flex;
        >span{
            width:2.027rem;
            height:1.227rem;
            line-height :1.227rem;
            text-align :center;
        } 
        >.del_wan{
            background :#4796e5;
        }  
        >.del_del{
            background :#fd4e4b;
        }
    }
}
</style>