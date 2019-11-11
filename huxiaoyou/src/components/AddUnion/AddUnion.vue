<!-- 加入工会 -->
<template>
  <div class="AddUnion_father"  @click="hideDiv">
      <div class="submit_c">
            <div class="PlayerRanking_header">
                <img @click.stop="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>加入公会</span>
            </div>
            <div class="AddUnion_Info">
                    <ul class="AddUnion_InfoList">
                        <li>
                            <div class="Info_name"><span>真实姓名</span>*</div>
                            <input type="text" v-model="nickname" placeholder="请填写您的真实姓名">
                        </li>
                        
                        <li>
                            <div class="Info_name"><span>手机号码</span>*</div>
                            <input type="text" maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')" v-model="phone" placeholder="请填写您的正确的手机号">
                        </li>
                        <li>
                            <div class="Info_name"><span>微信号</span></div>
                            <input type="text" oninput ="value=value.replace(/[^\w_]/g,'')" v-model="wechatId" placeholder="请填写您的微信号，例：hsdjjkdo">
                        </li>
                        <li>
                            <div class="Info_name"><span>身份证证件照</span>*</div>
                            <div class="form-groupWrap">
                                    <div class="form-group">
                                        <ul class="upload-imgs">
                                        <li :class="['uploadimgs_first',{'uploadimgs_opacity':uploadimgsOpacity}]">
                                            <input type="file" class="upload" id="upload_img" @change="addImg" ref="inputer" multiple accept="image/*"/>
                                            <a class="add"><span>身份证件</span><span>正面照片</span></a>
                                        </li>
                                            <li>
                                            <p class="img"><img  :src="img">
                                            <!-- <a class="close" @click="delImg(key)">×</a> -->
                                            </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="form-group">
                                        <ul class="upload-imgs">
                                        <li :class="['uploadimgs_first',{'uploadimgs_opacity':uploadimgsOpacityTwo}]">
                                            <input type="file" class="upload" id="upload_img" @change="addImgTwo" ref="inputerTwo" multiple accept="image/*"/>
                                            <a class="add"><span>身份证件</span><span>反面照片</span></a>
                                        </li>
                                            <li>
                                            <p class="img"><img  :src="imgTwo">
                                            <!-- <a class="close" @click="delImg(key)">×</a> -->
                                            </p>
                                            </li>
                                        </ul>
                                    </div>
                            </div>
                            <!-- <input type="text" maxlength="18" oninput="value=value.replace(/[\W]/g,'')" @change="cardNumber" v-model="isNumber" placeholder="请填写您身份证的证件号"> -->
                        </li>
                        <li>
                            <div class="Info_name"><span>性别</span></div>
                            <ul class="sex">
                                <li @click.stop="sexSelectC(index,item.id)" v-for="(item,index) in sexData" :key="index"> <img :src="index==sexImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item.name}}</span> </li>
                            </ul>
                        </li>
                        <li>
                            <div class="Info_name"><span>年龄</span></div>
                            <select v-model="age">
                                <option value ="">请选择您的真实年龄</option>
                                <option :value ="item" v-for="(item,index) in 60" :key="index" v-if="item>=18">{{item}}岁</option>
                            </select>
                        </li>
                        <li>
                            <div class="Info_name"><span>身高</span></div>
                            <select v-model="heightVal">
                                <option value ="">请选择您的身高</option>
                                <option :value ="item" v-for="(item,index) in 200" :key="index" v-if="item>=100">{{item}}cm</option>
                            </select>
                        </li>

                        <li>
                            <div class="Info_name"><span>体重</span></div>
                            <select v-model="weightVal">
                                <option value ="">请选择您的体重</option>
                                <option :value ="item" v-for="(item,index) in 200" :key="index" v-if="item>=30">{{item}}kg</option>
                            </select>
                        </li>
                        <li>
                            <div class="Info_name"><span>星座</span></div>
                            <select v-model="constellationVal">
                                <option value ="">请选择您的星座</option>
                                <option :value ="item.c_name" v-for="(item,index) in constellationData" :key="index">{{item.c_name}}</option>
                            </select>
                        </li>
                        <li>
                            <div class="Info_name"><span>特长</span></div>
                            <input type="text" v-model="SpecialtyVal"  placeholder="请填写您的特长">
                        </li>
                        <li>
                            <div class="Info_name"><span>职业</span></div>
                            <input type="text" v-model="CareerVal"  placeholder="请填写您的职业">
                        </li>
                        <li>
                            <div class="Info_name"><span>个性签名</span>*</div>
                            <textarea v-model="SignVal" placeholder="请编辑您的个人签名" name="" id="">

                            </textarea>
                        </li>
                        <!--  -->
                        <li>
                            <div class="Info_whether">
                                <div class="Info_whethername"><span>是否有常用直播软件</span>*</div>
                                <div :class="[{'setAddressBtnOne':WisDefault==0},{'setAddressBtnTwo':WisDefault==1}]" @click.stop="whetherBtnDefa"><span></span></div>
                            </div>
                            <ul class="Info_platform"  v-if="platformShow">
                                <li @click.stop="platfromSelC(index,item.name)" v-for="(item,index) in LivePlatformData" :key="index"> <img :src="index==platformImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item.name}}</span> </li>
                            </ul>
                            <div  class="Info_other" v-if="platformShow">
                                <div class="Info_otherRight" @click="platformotherC">
                                    <img :src="platformotherImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> 
                                    <span>其他</span>
                                </div>
                                <input v-if="showplatformotherinput" @change="zhiboChange" v-model="inputSoftware" type="text" placeholder="请填写您所用直播软件名称">
                            </div>
                            <input v-if="platformShow" type="text" v-model="softId" placeholder="请填写您所用直播软件的id号">
                        </li>
                        <li>
                            <div class="Info_whether">
                                <div  class="Info_whethername"><span>是否有常用短视频软件 </span>*</div>
                                <div :class="[{'setAddressBtnOne':DisDefault==0},{'setAddressBtnTwo':DisDefault==1}]" @click.stop="DuanBtnDefa"><span></span></div>
                            </div>
                            <ul class="Info_platform" v-if="duanShow">
                                <li @click.stop="shortVideoSelC(index,item.name)" v-for="(item,index) in ShortVideoData" :key="index"> <img :src="index==shortVodeoImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item.name}}</span> </li>
                            </ul>
                            <div class="Info_other" v-if="duanShow"><div class="Info_otherRight" @click.stop="shortVodeootherC"><img :src="shortVodeootherImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>其他</span></div>
                            <input v-model="inputduanValue" @change="videoChange" v-if="showshortVodeootherinput" type="text" placeholder="请填写您所用直播软件名称"></div>
                            <input type="text" v-if="duanShow" v-model="videoId" placeholder="请填写您所用短视频软件的id号">
                        </li>
                        <li>
                            <div class="Info_whether">
                                <div  class="Info_whethername"><span>是否有网店 </span>*</div>
                                <div :class="[{'setAddressBtnOne':WangisDefault==0},{'setAddressBtnTwo':WangisDefault==1}]" @click.stop="WangBtnDefa"><span></span></div>
                            </div>
                            <div class="onlineShop_wrap" v-if="isWang">
                                <div class="onlineShop" @click.stop="wangNameC"><span>{{shopNames}}</span> <img :src="staticImgH+'nojian.png'" alt=""></div> <input v-model="isShop" type="text" placeholder="请填写您的网店名">
                                <ul  v-if="onlineShopListxShow" >
                                    <li @click.stop="shopNameC(item.name)" v-for="(item,index) in onlineShopData"  :key="index">
                                        {{item.name}}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
            </div>
            <div class="Agree" @click="toAgree"> <img :src="IsAgree?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt="">已阅读且同意《公会条列条款》</div>
            <div class="ImmAdd" @click.stop="ImmAddC">立即加入</div>
            <div class="ImmAdds" ></div>
        </div>
      <!-- 提示盒子 -->
         <transition name="fade">
            <div class="promptFather" v-if="showPrompt">
                <div class="prompt" >
                    {{promptContent}}
                </div>
            </div>
        </transition>
        <!-- 加入公会成功  -->
        <div class="add_success_wrap" v-if="showAddSuccess">
            <div class="add_success">
                <div class="add_success_Cha"><img @click.stop="addSuccessCha"  :src="staticImgH+'cha.png'" alt=""></div>
                <img class="add_successImg" :src="staticImgH+'add_succedd.png'">
                <div class="add_successBtn" @click="tozhuan">去赚钱</div>
                <span class="add_successText">已提交申请</span>
            </div>
        </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
  data () {
    return {
        showAddSuccess:false,//默认不显示加入成功提示
        WisDefault:0,  //直播软件默认不选择中
        DisDefault:0,  // 短视频默认选中
        WangisDefault:0, //网店默认不选中
        sexSelImg:'nosel.png', //默认都显示不被选中图片
        submitAfterImg:'',//加入成功后的页面二维码
        IsAgree:false,//  '已阅读且同意《公会条列条款》' 默认不选中
        sexData:[//性别
            {
                name:'女',
                id:2,
            },
            {
                name:'男',
                id:1,
            }
        ],
        sexImgIndex:-1,  //默认都不别选中
        // 直播
        LivePlatformData:[  //常用直播软件列表
            {
                name:'花椒'
            },
            {
                name:'YY'
            },
            {
                name:'映客'
            },
            {
                name:'一直播'
            },
            {
                name:'斗鱼'
            },
            {
                name:'快手'
            },
            {
                name:'抖音'
            },
            {
                name:'全民直播'
            },
        ],
        platformImgIndex:-1, //常用直播软件列表默认显示都不被选中
        platformotherImgIndex:false,  //直播'其他'默认显示不被选中
        showplatformotherinput:false,  //直播'其他'input框默认不显示状态
        platformShow:false,  //  直播默认不被选中状态下直播列表，直播id号，其他，默认不显示
        // 短视频
        ShortVideoData:[  //常用短视频软件列表
            {
                name:'抖音'
            },
            {
                name:'快手'
            },
        ],
        shortVodeoImgIndex:-1, //常用短视频软件列表默认不被选中状态
        shortVodeootherImgIndex:false, // 短视频'其他'默认显示不被选中状态
        showshortVodeootherinput:false,  //短视频'其他'的input框默认不显示
        duanShow:false,   // 短视频默认不被选中状态下短视频列表，直播id号，其他，默认不显示状态
        
        // 网店
        onlineShopData:[  //网店
            {
                name:'淘宝'
            },{
                name:'京东'
            },{
                name:'快手'
            }
        ],
        isWang:false,
        onlineShopListxShow:false,


        nickname:'', //真实姓名
        phone:'',  //手机号码
        wechatId:'',  //微信号
        // isNumber:'',//身份证证号
        sex:'',//性别
        age:'',//年龄
        software:'',  //直播平台
        inputSoftware:'', //直播软件名称
        softId:'', //直播平台号码
        isVideo:'',//短视频平台
        inputduanValue:'', //  短视频软件名称
        videoId:'', //短视频号码
        shopName:'',  //网店平台名称
        shopNames:'淘宝',  //网店平台名称
        isShop:'',  //网店名称
        heightVal:'',//身高
        weightVal:'',//体重
        constellationVal:'',//星座
        SpecialtyVal:'',//特长
        CareerVal:'',//职业
        SignVal:'',//个签


        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示

        formData:new FormData(), 
        uploadimgsOpacity:false,  //  个人形象的显示与消失
        img:'',//证件照正面
        uploadimgsOpacityTwo:false,// 个人形象的显示与消失
        imgTwo:'',//证件照反面

        ifSignUpText:'',//报名成功的状态值

        constellationData:'',//星座数据
        
    };
  },
//   components: {},
   computed:{
        ...mapState(['staticImgH','tokenH','AddunionPage'])
    },
  mounted(){
      //   判断有没有报名成功
      this.ifSignUp()

       this.$http.post('/api/division/conste_List').then((res)=>{
          if(res.data.code==200){
              this.constellationData=res.data.data
          }
      })
  },
  methods: {
    //   判断有没有报名成功
    ifSignUp(){
        this.$http.post('/api/player/is_sign').then((res)=>{
                if(res.data.code==200){
                    this.ifSignUpText=res.data.data.result 
                }
            })
    },
    //   去赚钱
    tozhuan(){
        this.$router.push('/PowerPack')
    },
    //  点击'已阅读且同意《公会条列条款》'   
    toAgree(){
        this.IsAgree=!this.IsAgree
    },
      addSuccessCha(){
          if(this.AddunionPage=='/SignUp'){
              if(this.ifSignUpText==-1){
                    this.$router.push(this.AddunionPage)
                }else{
                    this.$router.push('/')
                }
          }else{
              this.$router.push(this.AddunionPage)
          }
          
          
      },
       // 上传身份证前图片 1
        addImg(event){
              if(event.target.files[0]){
                this.uploadimgsOpacity=true
                var size = Math.floor(event.target.files[0].size / 1024);
              }else{
                return false
              }
              if (size > 1*1024*1024) {
                  alert('请选择1M以内的图片！');
                  return false
              }
              var objurl = this.getObjectURL(event.target.files[0])
              this.img=objurl
          },
          // 上传图片 2
      getObjectURL(file) {  
          var url = null ;   
          // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已  
          if (window.createObjectURL!=undefined) { // basic  
              url = window.createObjectURL(file) ;  
          } else if (window.URL!=undefined) { // mozilla(firefox)  
              url = window.URL.createObjectURL(file) ;  
          } else if (window.webkitURL!=undefined) { // webkit or chrome  
              url = window.webkitURL.createObjectURL(file) ;  
          }  
          return url ; 
          },
         // 上传身份证后图片 1
        addImgTwo(event){
              if(event.target.files[0]){
                this.uploadimgsOpacityTwo=true
                var size = Math.floor(event.target.files[0].size / 1024);
              }else{
                return false
              }
              if (size > 1*1024*1024) {
                  alert('请选择1M以内的图片！');
                  return false
              }
              var objurl = this.getObjectURL(event.target.files[0])
              this.imgTwo=objurl
          },
    //  点击页面任意处隐藏 网店平台列表 
      hideDiv(){
          this.onlineShopListxShow=false
      },
      // 身份证验证
    cardNumber(){
         var idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
         iFlag = idCardReg.test(this.idNumber);
         if(!iFlag){
             var self=this
              clearInterval(self.timer2);
                  this.promptContent='您输入的身份证格式有误！'
                  this.showPrompt=true
                  self.timer2=setTimeout(function(){
                        self.showPrompt=false
                        clearInterval(self.timer2);
                  },2000)
              return false;
         }
    },
    //   点击网店平台列表
    shopNameC(name){
        this.shopName=name
        this.shopNames=name
        this.onlineShopListxShow=false
    },
    // 
      wangNameC(){
          this.onlineShopListxShow=true
      },
    //   立即加入
      ImmAddC(){
            if(!this.IsAgree){
                this.AlertText('加入即同意')
                return 
            }
            this.formData=new FormData()
            this.formData.append('just_number',this.$refs.inputer.files[0]);
            this.formData.append('over_number',this.$refs.inputerTwo.files[0]);
            this.formData.append('nickname',this.nickname);
            this.formData.append('phone',this.phone);
            this.formData.append('is_number',-1);
            this.formData.append('software',this.software);
            this.formData.append('wechat_id',this.wechatId);
            this.formData.append('sex',this.sex);
            this.formData.append('age',this.age);
            this.formData.append('soft_id',this.softId);
            this.formData.append('is_video',this.isVideo);
            this.formData.append('is_shop',this.isShop);
            this.formData.append('video_id',this.videoId);
            this.formData.append('shop_name',this.shopName);
            this.formData.append('signature1',this.SignVal);
            this.formData.append('weight1',this.weightVal);
            this.formData.append('height1',this.heightVal);
            this.formData.append('constellation1',this.constellationVal);
            this.formData.append('strong',this.SpecialtyVal);
            this.formData.append('career',this.CareerVal);
            this.$http.post('api/player/union_players',this.formData).then((res)=>{
                    if(res.data.code==200){
                        this.showAddSuccess=true
                        // this.submitAfterImg=res.data.data.img
                    }else{
                        this.AlertText(res.data.msg)
                    }
                })
            },
      zhiboChange(){
          this.software=this.inputSoftware
      },
      AlertText(text){
            var self=this
            clearInterval(self.timer2);
                this.promptContent=text
                this.showPrompt=true
                self.timer2=setTimeout(function(){
                        self.showPrompt=false
                        clearInterval(self.timer2);
                },2000)
            return false;
      },
    //   选择性别
      sexSelectC(index,name){
          this.sexImgIndex=index
          this.sex=name
      },
      whetherBtnDefa(){
          this.softId=''
          this.platformImgIndex=-1
          this.showplatformotherinput=false
          this.platformotherImgIndex=false
          this.software=''
            this.inputSoftware=''
            this.WisDefault==0?this.WisDefault=1:this.WisDefault=0
            if(this.WisDefault==0){
                this.platformShow=false
            }else if(this.WisDefault==1){
                    this.platformShow=true
            }
      },
      DuanBtnDefa(){
          this.shortVodeoImgIndex=-1
          this.shortVodeootherImgIndex=false
          this.duanShow=false
          this.inputduanValue=''
          this.isVideo=''
          this.videoId=''
           this.DisDefault==0?this.DisDefault=1:this.DisDefault=0
           if(this.DisDefault==0){
               this.duanShow=false
           }else if(this.DisDefault==1){
               this.duanShow=true
           }
      },
      WangBtnDefa(){
          
          this.isShop='',
          this.WangisDefault==0?this.WangisDefault=1:this.WangisDefault=0
          if(this.WangisDefault==0){
              this.shopName=''
              this.shopNames='淘宝'
              this.isWang=false
          }else if(this.WangisDefault==1){
              this.shopName=''
              this.shopNames='淘宝'
              this.isWang=true
          }
      },
    //   选择直播平台列表
      platfromSelC(index,name){
          this.platformImgIndex=index
          this.software=name
          this.platformotherImgIndex=false
          this.showplatformotherinput=false
      },
      shortVideoSelC(index,name){
          this.shortVodeoImgIndex=index
          this.isVideo=name
          this.shortVodeootherImgIndex=false
          this.showshortVodeootherinput=false
      },
      platformotherC(){
          this.platformImgIndex=-1;
          this.software='';
          this.inputSoftware=''
          this.platformotherImgIndex=!this.platformotherImgIndex
          if(this.platformotherImgIndex==true){
              this.showplatformotherinput=true
          }else{
              this.showplatformotherinput=false
          }
      },
      shortVodeootherC(){
          this.shortVodeoImgIndex=-1
          this.isVideo=''
          this.inputduanValue=''
          this.shortVodeootherImgIndex=!this.shortVodeootherImgIndex
          if(this.shortVodeootherImgIndex==true){
              this.showshortVodeootherinput=true
          }else{
               this.showshortVodeootherinput=false
          }
      },
      videoChange(){
          this.isVideo=this.inputduanValue
      },
    //   返回
      toReturn(){
          if(this.AddunionPage=='/SignUp'){
              if(this.ifSignUpText==-1){
                    this.$router.push(this.AddunionPage)
                }else{
                    this.$router.push('/')
                }
          }else{
              this.$router.push(this.AddunionPage)
          }
        
      },
      setAddressBtn(){
      },
       ...mapMutations(['AddunionPages'])
  }
}

</script>
<style scoped lang="stylus">
.AddUnion_father{
    background :#fff;
    letter-spacing :0.04rem;
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
.AddUnion_Info{
    margin:0.4rem;
    padding:0.32rem 0.32rem;
    border-radius:0.133rem;
    box-shadow :0 0.05rem 0.3rem rgba(254, 222, 227, 1);
}

.setAddressBtnOne{
        width:1.253rem;
        height:0.48rem;
        background:rgba(0, 0, 0, 0.1);
        display :flex;
        align-items :center;
        border-radius:3.5rem;
        margin-right:0.27rem;
        >span{
            width:0.373rem;
            height:0.373rem;
            background :rgba(255, 255, 255, 1);
            margin-left:0.13rem;
            border-radius:50%;
             transform :translateX(0);
            transition :all 0.5s;
            color:rgba(0, 0, 0, 0.38);
            font-size:0.27rem;
            line-height :0.373rem;
            text-align:center;
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
.AddUnion_InfoList{
    >li{
        padding-top:0.32rem;
        display :flex;
        flex-direction :column;
        >.Info_name{
            font-size:0.37rem;
            color:#FF0000;
            margin-bottom:0.27rem;
            >span{
                color:#000000;
            }
            
        }
        >select{
            border:0.03rem solid rgba(0, 0, 0, 0.3);
            outline:none;
            background:#fff;
        }
        >textarea{
            width:100%;
            height:1.867rem;
            border-radius:0.16rem;
            border:0.03rem solid rgba(0, 0, 0, 0.38);
            outline:none;
        }
        >input{
            width:100%;
            height:0.67rem;
            border:0.03rem solid rgba(0, 0, 0, 0.38);
            outline:none;
            border-radius:0.08rem;
            letter-spacing :0.04rem;
            padding-left:0.16rem;
            &::-webkit-input-placeholder { 
                font-size:0.32rem;
			    color: rgba(0, 0, 0, 0.38);
            }
            &::-moz-placeholder { 
                 font-size:0.32rem; 
                color: rgba(0, 0, 0, 0.38);
            }
            &:-ms-input-placeholder {
                 font-size:0.32rem;
                color:rgba(0, 0, 0, 0.38);
            }
            &:-moz-placeholder {
                 font-size:0.32rem;
                color: rgba(0, 0, 0, 0.38);
            }
        }
        >.sex{
            display :flex;
            margin-left:0.27rem;
            >li{
                display :flex;
                align-items :center;
                margin-right:1.2rem;
                >img{
                    width:0.24rem;
                    height:0.24rem;
                    margin-right:0.3rem;
                    background :pink;
                    border-radius:50%;
                }
                >span{
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38)
                    
                }
                >selSex{
                    color:#000;
                }
            }
        }
        >.Info_whether{
            display :flex;
            justify-content :space-between;
            .Info_whethername{
                font-size:0.37rem;
                color:#FF0000;
                margin-bottom:0.27rem;
                >span{
                    color:#000000;
                }
            }
        }
        >.Info_platform{

            display :flex;
            flex-wrap:wrap;
            margin-top:0.27rem;
            margin-left:0.27rem;
           >li{
                display :flex;
                align-items :center;
                margin-right:0.7rem;
                >img{
                    width:0.24rem;
                    height:0.24rem;
                    margin-right:0.18rem;
                    background :pink;
                    border-radius:50%;
                }
                >span{
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38)
                    
                }
                >selSex{
                    color:#000;
                }
            }
        }
        >.Info_other{
            display:flex;
             margin-top:0.2rem;
            margin-left:0.27rem;
            margin-bottom:0.27rem;
            >.Info_otherRight{
                display :flex;
                align-items :center;
                margin-right:0.3rem;
                >img{
                    width:0.24rem;
                    height:0.24rem;
                    margin-right:0.18rem;
                    background :pink;
                    border-radius:50%;
                }
                >span{
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38)
                    
                }
                >selSex{
                    color:#000;
                }
            }
            >input{
                border:0;
                border-bottom:0.03rem dotted  rgba(0, 0, 0, 0.2);
                outline :none;
                 &::-webkit-input-placeholder { 
                    font-size:0.32rem;
                    color: rgba(0, 0, 0, 0.38);
                }
                &::-moz-placeholder { 
                    font-size:0.32rem; 
                    color: rgba(0, 0, 0, 0.38);
                }
                &:-ms-input-placeholder {
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38);
                }
                &:-moz-placeholder {
                    font-size:0.32rem;
                    color: rgba(0, 0, 0, 0.38);
                }
            }
        }
        >.onlineShop_wrap{
            border:0.03rem solid rgba(112, 112, 112, 1);
            border-radius:0.08rem;
            height:0.67rem;
            margin-top:0.21rem;
            display :flex;
            align-items :center;
            position :relative;
            .onlineShop{
                display :flex;
                align-items :center;
                 position :relative;
                 margin-right:0.27rem;
                >span{
                    color:rgba(0, 0, 0, 1);
                    font-size:0.32rem;
                    margin-left:0.16rem;
                    margin-right:0.187rem;
                    
                }
                >img{
                    width:0.27rem;
                    height:0.16rem;
                    margin-right:0.24rem;

                }
                &:before{
                        content:'';
                        width:0.03rem;
                        height:0.48rem;
                        background :rgba(0, 0, 0, 0.38);
                        position :absolute;
                        right:0;
                        top:50%;
                        margin-top:-0.24rem;
                    }
                
            }
            >input{
                border:0;
                outline :none;
                letter-spacing :0.03rem;
                 &::-webkit-input-placeholder { 
                    font-size:0.32rem;
                    color: rgba(0, 0, 0, 0.38);
                }
                &::-moz-placeholder { 
                    font-size:0.32rem; 
                    color: rgba(0, 0, 0, 0.38);
                }
                &:-ms-input-placeholder {
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.38);
                }
                &:-moz-placeholder {
                    font-size:0.32rem;
                    color: rgba(0, 0, 0, 0.38);
                }
            }
            >ul{
                width:1.47rem;
                border:0.03rem solid rgba(112, 112, 112, 1);
                position :absolute;
                bottom:0;
                left:0;
                background :#fff;
                >li{
                    width:100%;
                    height:0.667rem;
                    border-bottom:0.03rem solid rgba(112, 112, 112, 1);
                    text-align:center;
                    line-height:0.667rem;
                    font-size:0.32rem;
                    color:rgba(0, 0, 0, 0.8);
                    &:last-child{
                        border-bottom:0;
                    }
                }
            }
            
        }
    }
}
.ImmAdd{
    width:100%;
    height:1.07rem;
    background :rgba(255, 193, 203, 1);
    font-size:0.347rem;
    color:rgba(255, 255, 255, 1);
    line-height :1.07rem;
    text-align :center;
    position:fixed;
    bottom:0;
}
.ImmAdds{
    width:100%;
    height:1.07rem;
}
// 提示盒子
.promptFather{
    width:100%;
    position :fixed;
    bottom:50%;
    left:0;
    z-index:999;
    display :flex;
    justify-content :center;
    align-items :center;
    >.prompt{
        padding:0.15rem 0.3rem;;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.32rem;
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

// 选择照片
.form-groupWrap{
    display:flex;
}
.form-group{
    width:2.4rem;
    height:2.4rem;
    margin-right:0.27rem;
    display:inline-block;
    &:last-child{
        margin-right:0;
    }
}
.upload-imgs{overflow: hidden;font-size: 0;position :relative;}
.uploadimgs_first{
  position :absolute;
  top:0;
  left:0;
  z-index:900;
}
.uploadimgs_opacity{
  opacity :0;
}
.upload-imgs li{
    width: 2.4rem;
    height: 2.4rem;
    font-size: 0.373rem;
    display: flex;
    align-items :center;
    justify-content :center;
    margin-right: 0.67rem;
    border: 0.053rem dashed rgba(0, 0, 0, 0.15);
    text-align: center;
    vertical-align: middle;
}

.upload-imgs .add{
    display: flex;
    flex-direction :column;
    align-items :center;
    justify-content :center;
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.38);
    width:2.053rem;
    height: 2.053rem;
    padding: 0.213rem 0;
    font-size:0.32rem;
    >span{
        line-height:0.4rem;
    }
}
.upload-imgs .add span{

}
.upload-imgs li .upload{opacity :0;position: absolute;top: 0;bottom: 0;left: 0;right: 0;width: 2.4rem;height:2.4rem;}
.upload-imgs .img img{width:100%;vertical-align: middle;}
.upload-imgs .img .close{display: none;}
.upload-imgs li:hover .img .close{display: block;position: absolute;right: -0.16rem;top: -0.27rem;line-height: 1rem;font-size: 0.6rem;}
// 加入公会成功
.add_success_wrap{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.9);
    position:fixed;
    top:0;
    left:0;
    z-index:999;
    >.add_success{
        display:flex;
        align-items :center;
        flex-direction :column;
        margin-top:2rem;
        >.add_success_Cha{
            width:7.91rem;
            text-align:right;

            >img{
                width:0.493rem;
                height:0.493rem;
                margin-right:0.187rem;
            }
        }
        >.add_successImg{
            width:5.91rem;
            height:5.65rem;
            margin-top:0.6rem;
             margin-bottom:0.6rem;
        }
        >.add_successBtn{
          width:3.95rem;
          height:0.8rem;
          border-radius:0.67rem;
          background:rgba(255, 157, 172, 1);
          font-size:0.48rem;
          color:rgba(255, 255, 255, 1);
          text-align :center;
          line-height:0.8rem;
        }
        >.add_successText{
            font-size:0.35rem;
            color:#fff;
            position:absolute;
            top:7rem;
            left:4.1rem;
        }
    }
}
.Agree{
    font-size:0.32rem;
    display:flex;
    align-items:center;
    margin-left:0.4rem;
    margin-bottom:0.4rem;
    >img{
        margin:0 0.27rem;
        width:0.27rem;
        height:0.27rem;
        
    }
}
</style>
