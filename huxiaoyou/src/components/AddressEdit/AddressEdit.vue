<!--  -->
<template>
  <div class="addressAdd">
      <div class="addressAddHead">
          <img @click="returnHome" :src="staticImgH+'zuojiantou.png'" alt="">
          <span class="addressAddHeadCenter">收获地址</span>
          <span class="addressAddHeadAdd" @click="saveAddress">保存</span>
      </div>
      <div class="addressAddWrite">
          <ul>
              <li>
                  <span>收货人</span><input ref="consigneeInput" type="text" v-model="editAddressDes.consignee">
              </li>
              <li>
                  <span>手机号码</span><input  maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')" ref="mobile" type="text" v-model="editAddressDes.mobile">
              </li>
              <li class="Area" @click="Area">
                  <span>所在地区</span><span>{{editAddressDes.province_name}}/{{editAddressDes.city_name}}/{{editAddressDes.district_name}}</span>
                
              </li>
              <li class="fullAddress">
                  <span>详细地址：</span><input ref="fullAddressInput" type="text" v-model="editAddressDes.address" placeholder="如道路、问牌号、小区、楼栋号、单 元室等">
              </li>
              <li>
                   <div class="label">
                        <span class="labelTitle">标签</span>
                            <div class="labelList">
                            <span @click="labelListColor(index)" :class="{'labelListColor':labelNum==index}" v-for="(item,index) in labelList" :key="index">{{item.labelName}}</span>
                            </div>
                    </div>
              </li>
              <li>
                   <div class="setAddress">
                        <span class="setAddressTitle" >设置默认地址</span>
                        <div :class="[{'setAddressBtnOne':isDefault==0},{'setAddressBtnTwo':isDefault==1}]" @click="setAddressBtn"><span></span></div>
                    </div>
              </li>
          </ul>  
      </div>
      <div class="deladdress" @click="deladdress">
          删除收货地址
      </div>
      <div class="whereArea" v-if="showWhere" @click="hideWhere">
          <div class="whereAreaBox" @click.stop>
               <div class="whereAreaTitle">
                    配送至
                </div>
                <div class="whereAreaBtn" @click="whereAreaBtn">取消</div>
                <div class="swiperWrapper">
                    <div class="swiperWrapp">
                        <span class="provinceTitle">{{provinceTitle}}</span>
                        <swiper class="swiperList province"  :options="swiperOption" >
                            <swiper-slide class="provinceList"  v-for="(item,index) in provinceList" :key="index">
                                <span @click="provinceBox(item.id,item.name)">{{item.name}}</span>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class='swiperWrapp'>
                        <span class="cityTitle">{{cityTitle}}</span>
                        <swiper class="swiperList city" :options="swiperOption" >
                            <swiper-slide class="cityList"  v-for="(item,index) in cityList" :key="index">
                                <span @click="cityBox(item.id,item.name)">{{item.name}}</span>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="swiperWrapp">
                        <span class="countyTitle">{{countyTitle}}</span>
                        <swiper class="swiperList county" :options="swiperOption" >
                            <swiper-slide class="countyList" v-for="(item,index) in countyList" :key="index">
                                <span  @click="countyBox(item.id,item.name)">{{item.name}}</span>
                            </swiper-slide>
                        </swiper>
                    </div>
                </div>
          </div>
      </div>
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
import qs from 'qs'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
        labelList:[
            {labelName:"家"},
            {labelName:"公司"},
            {labelName:"学校"},
        ],
        labelNum:0,
        provinceList:[],
        cityList:[],
        countyList:[],
        showWhere:'',
        provinceId:'',
        cityId:'',
        countyId:'',
        provinceTitle:'省',
        cityTitle:'市',
        countyTitle:'区/县',
        timer3:'',
        timer2:'',
        isDefault:0,
        inArea:'',
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        swiperOption: {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.province'
          },
        },
         swiperOption: {
             direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.city'
          },
        },
         swiperOption: {
             direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.county'
          },
        },  
    };
  },
  mounted(){
      this.isDefault=this.editAddressDes.is_default
      this.provinceId=this.editAddressDes.province
      this.cityId=this.editAddressDes.city
      this.countyId=this.editAddressDes.district
  },
//   components: {},

computed:{
    ...mapState(['staticImgH','editAddressDes','tokenH'])
},
 
  methods: {
    //   删除收货地址
      deladdress(){
          var obj=qs.stringify({
              address_id:this.editAddressDes.address_id
          })
          this.$http.post('api/user/address_del',obj,{
            headers: {
                    'authorization': this.tokenH
                }
            }).then((res)=>{
                 if(res.data.code==200){
                   var self=this
                    clearInterval(self.timer2);
                    clearInterval(self.timer3);
                    self.promptContent='成功删除地址'
                    self.showPrompt=true
                    self.timer2=setTimeout(function(){
                        self.showPrompt=false
                        clearInterval(self.timer2);
                    },1000)
                    self.timer3=setTimeout(function(){
                            self.$router.push('/ReceiptAddress')
                            clearInterval(self.timer3);
                    },1500)
                        return false;
              }else{
                    var self=this
                    clearInterval(self.timer2);
                            self.promptContent=res.data.msg
                            self.showPrompt=true
                            self.timer2=setTimeout(function(){
                                self.showPrompt=false
                                clearInterval(self.timer2);
                            },2000)
                        return false;
              }
            })
      },
     //   获取省份列表数据
      Area(){
          this.showWhere=true
          var obj=qs.stringify({
              parent_id:0,
          })
          this.$http.post("api/user/get_region",obj,{
            headers: {
                    'authorization':this.tokenH
                }
        }).then((res)=>{
             if(res.data.code==200){
                var data=res.data.data
                this.provinceList=data
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
       //   点击省份列表
      provinceBox(provinceId,provinceName){
          this.provinceTitle=provinceName;
          this.provinceId=provinceId;
          this.countyList=[];
          //   获取城市列表
           var obj=qs.stringify({
              parent_id:this.provinceId,
          })
          this.$http.post('api/user/get_region',obj,{
            headers: {
                    'authorization':this.tokenH
                }
        }).then((res)=>{
              if(res.data.code==200){
                var data=res.data.data
                this.cityList=data
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
      // 点击城市列表
      cityBox(cityId,cityName){
          this.cityTitle=cityName
          this.cityId=cityId;
          // 获取区县数据
           var obj=qs.stringify({
              parent_id: this.cityId
          })
          this.$http.post('api/user/get_region',obj,{
                headers: {
                        'authorization': this.tokenH
                    }
            }).then((res)=>{
                if(res.data.code==200){
                        var data=res.data.data
                        this.countyList=data
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
      //   点击区县列表
       countyBox(countyId,countyName){
          this.countyTitle=countyName
          this.countyId=countyId
          this.inArea=this.provinceTitle+'/'+this.cityTitle+'/'+this.countyTitle
          this.showWhere=false;
      },
       //点击灰色区域   选择地址盒子消失
      hideWhere(){
          this.showWhere=false
      },
      // 点击取消  选择地址盒子消失
      whereAreaBtn(){
          this.showWhere=false
      },
      //   点击标签
      labelListColor(index){
          this.labelNum=index
      },
      //   点击保存
      saveAddress(){
          var  obj=qs.stringify({
              consignee:this.$refs.consigneeInput.value,
              province:this.provinceId,
              city: this.cityId,
              district:this.countyId,
              address :this.$refs.fullAddressInput.value,
              mobile:this.$refs.mobile.value,
              is_default:this.isDefault,
              label:this.labelList[this.labelNum].labelName,
              endit:'endit',
              address_id:this.editAddressDes.address_id
          })
          this.$http.post('api/user/address',obj,{
            headers: {
                    'authorization':this.tokenH
                }
        }).then((res)=>{
              if(res.data.code==200){
                   var self=this
                    clearInterval(self.timer2);
                    clearInterval(self.timer3);
                    self.promptContent='成功添加地址'
                    self.showPrompt=true
                    self.timer2=setTimeout(function(){
                        self.showPrompt=false
                        clearInterval(self.timer2);
                    },1000)
                    self.timer3=setTimeout(function(){
                            self.$router.push('/ReceiptAddress')
                            clearInterval(self.timer3);
                    },1500)
                        return false;
              }else{
                    var self=this
                    clearInterval(self.timer2);
                            self.promptContent=res.data.msg
                            self.showPrompt=true
                            self.timer2=setTimeout(function(){
                                self.showPrompt=false
                                clearInterval(self.timer2);
                            },2000)
                        return false;
              }
          })
      },
      //   设置默认地址
      setAddressBtn(){
          this.isDefault==1?this.isDefault=0:this.isDefault=1
      },
      //返回
      returnHome(){ 
          this.$router.push('/ReceiptAddress')
      },
  }
}
</script>
<style scoped lang="stylus">
.addressAdd{
    width:100%;
    height:100%;
    background :#fff;
}
.addressAddHead{
    height:1.23rem;
    width:100%;
    display:flex;
    align-items :center;
    justify-content :space-between;
    padding:0 0.27rem;
    // border-bottom:0.03rem solid #F1F1F1;
    background :#fff;
    img{
        width:0.32rem;
        height:0.56rem;
    }
    .addressAddHeadCenter{
        font-size:0.48rem;
        color:rgba(0, 0, 0, 1);
    }
    .addressAddHeadAdd{
        font-size:0.43rem;
    }
}
.addressAddWrite{
    background :#fff;
    padding:0.27rem 0.4rem;
    >ul{
        padding-left:0.27rem;
        box-shadow :0 0rem 0.3rem rgba(253, 229, 231, 0.6);
        border-radius:0.08rem;
        >li{
            height:1.253rem;
            display :flex;
            align-items :center;
            border-bottom:0.01rem solid rgba(0, 0, 0,0.2);
            line-height :1.12rem;
            font-size:0.32rem;
            color:rgba(0, 0, 0, 0.4);
            &:last-child{
                 border-bottom:0;
            }
            >input{
                height:0.5rem;
                border:0;
                outline :none;
                margin-left:0.27rem;
                 &::-webkit-input-placeholder{
                    color: rgba(0, 0, 0, 0.4);
                    font-size:0.32rem;
                }
            }
           
            
        }
        .Area{
            position :relative;
            >span{
                margin-right:0.27rem;
            }
            img{
                width:0.19rem;
                height:0.29rem;
                margin-right:0.27rem;
                position :absolute;
                top:50%;
                margin-top:-0.14rem;
                right:0.27rem;
            }
        }
        .fullAddress{
            // height:1.68rem;
            input{
                flex:1;
                margin-right:0.77rem;
            }
        }
    }
}
.label{
    height:1.253rem;
    display :flex;
    align-items :center;
    border-bottom:0.03rem solid #F1F1F1;
    background :#fff;
    .labelTitle{
        font-size :0.32rem;
        margin-right:0.72rem;
        color:rgba(0, 0, 0, 1);
    }
    .labelList{
        display:flex;
        align-items :center;
        >span{
            width:0.83rem;
            height:0.373rem;
            font-size:0.24rem;
            line-height :0.313rem;
            text-align :center;
            border:0.03rem solid rgba(255, 193, 203, 1);
            border-radius:0.3rem;
            margin-right:0.4rem;
            color:rgba(0, 0, 0, 1);

        }
        >.labelListColor{
            background:rgba(255, 193, 203, 1);
            color :#fff;
            border:0;
        }
    }
    
}

.setAddress{
    height:1.253rem;
    display :flex;
    align-items :center;
    justify-content :space-between;
    .setAddressTitle{
        font-size :0.32rem;
        margin-right:0.75rem;
        color:rgba(0, 0, 0, 1);
    }
    .setAddressBtnOne{
        width:1.253rem;
        height:0.48rem;
        border:0.03rem solid rgba(255, 193, 203, 1);
        display :flex;
        align-items :center;
        border-radius:3.5rem;
        margin-right:0.27rem;
        >span{
            width:0.373rem;
            height:0.373rem;
            border:0.03rem solid rgba(255, 193, 203, 1);
            margin-left:0.13rem;
            border-radius:50%;
             transform :translateX(0);
            transition :all 0.5s;
        }
    }
     .setAddressBtnTwo{
       width:1.253rem;
        height:0.48rem;
        background:rgba(255, 193, 203, 1);
        display :flex;
        align-items :center;
        border-radius:3.5rem;
        margin-right:0.27rem;
        >span{
            width:0.43rem;
            height:0.43rem;
            background :#fff;
            margin-left:0.13rem;
            border-radius:50%;
            transform :translateX(0.59rem);
            transition :all 0.5s;
        }
    }
}
.deladdress{
    width:9.2rem;
    height:1.07rem;
    line-height :1.07rem;
    box-shadow :0 0rem 0.3rem rgba(253, 229, 231, 0.6);
    border-radius:0.08rem;
    padding-left:0.27rem;
    margin:0 auto;
    margin-top:0.32rem;
    font-size:0.347rem;
    color:rgba(0, 0, 0, 1);
    letter-spacing :0.04rem;
}
.whereArea{
    width:100%;
    height:100%;
    position :absolute;
    top:0;
    left:0;
    background :rgba(0,0,0,0.5)
    
}
.whereAreaBox{
    width:100%;
    height:13.33rem;
    position :absolute;
    bottom:0;
    left:0;
    background :#fff;
   
    >.swiperWrapper{
        display:flex;
        justify-content :space-between;
        >.swiperWrapp{
            width:calc(100% / 3);
            height:13.33rem;
            overflow :hidden;
            >.swiperList{
                width:100%;
                height:13.33rem;
                overflow :hidden;
            }
        }
    }
    
    >.whereAreaTitle{
        font-size:0.4rem;
        width:100%;
        height:0.8rem;
        text-align :center;
        line-height :0.8rem;
    }
    >.whereAreaBtn{
        font-size:0.37rem;
        width:100%;
        // height:0.3rem;
        text-align :right;
        // line-height :0.5rem;
        padding:0 0.27rem;
    }
}
.provinceList,.cityList,.countyList{
    width:100%;
    font-size:0.32rem;
    height:0.8rem;
    line-height :0.8rem;
    text-align :center;
}
.provinceTitle,.cityTitle,.countyTitle{
    width:100%;
    height:0.8rem;
    display:inline-block;
    text-align:center;
    font-size:0.37rem;
    line-height :0.8rem;
    border-bottom:0.03rem solid #F1F1F1;
}

// 提示盒子
.promptFather{
    width:100%;
    position :absolute;
    bottom:4rem;
    left:0;
    z-index:10;
    display :flex;
    justify-content :center;
    align-items :center;
    
    >.prompt{
        padding:0.15rem 0.3rem;;
        background :#999;
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
</style>