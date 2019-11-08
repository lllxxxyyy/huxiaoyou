<!-- 加入工会 -->
<template>
  <div class="AddUnion_father"  @click="hideDiv">
      <div class="submit_c" >
            <div class="PlayerRanking_header">
                <img @click.stop="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>我的公会</span>
                 <span v-if="disabledXiu" @click="editYes">编辑</span>
                 <span v-else @click="saveYes">保存</span>
            </div>
            <div class="AddUnion_Info" v-if="guildData.is_show==1">
                    <ul class="AddUnion_InfoList">
                        <li>
                            <div class="Info_name"><span>真实姓名</span>*</div>
                            <input type="text" :disabled='true' v-model="nickname" placeholder="请填写您的真实姓名">
                        </li>
                        <li>
                            <div class="Info_name"><span>手机号码</span>*</div>
                            <input type="text" :disabled='disabledXiu' maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')" v-model="phone" placeholder="请填写您的正确的手机号">
                        </li>
                        <li>
                            <div class="Info_name"><span>微信号</span>*</div>
                            <input type="text" :disabled='disabledXiu' oninput ="value=value.replace(/[^\w_]/g,'')" v-model="wechatId" placeholder="请填写您的微信号，例：hsdjjkdo">
                        </li>
                        <li>
                            <div class="Info_name"><span>身份证证件照</span>*</div>
                            <div class="form-groupWrap">
                                    <div class="form-group">
                                        <ul class="upload-imgs">
                                        <li :class="['uploadimgs_first',{'uploadimgs_opacity':uploadimgsOpacity}]">
                                            <input :disabled='true' type="file" class="upload" id="upload_img" @change="addImg" ref="inputer" multiple accept="image/*"/>
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
                                            <input :disabled='true' type="file" class="upload" id="upload_img" @change="addImgTwo" ref="inputerTwo" multiple accept="image/*"/>
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
                                <li @click.stop="sexSelectC(item.id)" v-for="(item,index) in sexData" :key="index"> <img :src="item.id==sexImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item.name}}</span> </li>
                            </ul>
                        </li>
                        <li>
                            <div class="Info_name"><span>年龄</span>*</div>
                            <input type="text" :disabled='disabledXiu' oninput = "value=value.replace(/[^\d]/g,'')" v-model="age" placeholder="请填写您的年龄">
                        </li>
                         <li>
                            <div class="Info_name"><span>身高</span></div>
                            <input type="text" :disabled='disabledXiu' v-model="heightVal" oninput = "value=value.replace(/[^\d]/g,'')" placeholder="请填写您的身高">
                        </li>
                        <li>
                            <div class="Info_name"><span>体重</span></div>
                            <input type="text" :disabled='disabledXiu' v-model="weightVal" oninput = "value=value.replace(/[^\d]/g,'')" placeholder="请填写您的体重">
                        </li>
                        <li>
                            <div class="Info_name"><span>星座</span></div>
                            <input type="text" :disabled='disabledXiu' v-model="constellationVal"   placeholder="请填写您的星座">
                        </li>
                        <li>
                            <div class="Info_name"><span>特长</span></div>
                            <input type="text" :disabled='disabledXiu' v-model="SpecialtyVal"  placeholder="请填写您的特长">
                        </li>
                        <li>
                            <div class="Info_name"><span>职业</span></div>
                            <input type="text" :disabled='disabledXiu' v-model="CareerVal"  placeholder="请填写您的职业">
                        </li>
                        <li>
                            <div class="Info_name"><span>个性签名</span>*</div>
                            <textarea v-model="SignVal" :disabled='disabledXiu' placeholder="请编辑您的个人签名" name="" id="">

                            </textarea>
                        </li>
                        <!-- <li>
                            <div class="Info_name"><span>身份证号码</span>*</div>
                            <input type="text" :disabled='disabledXiu' maxlength="18" oninput="value=value.replace(/[\W]/g,'')" @change="cardNumber" v-model="isNumber" placeholder="请填写您身份证的证件号">
                        </li> -->
                        
                        
                        <!-- 直播 -->
                        <li>
                            <div class="Info_whether">
                                <div class="Info_whethername"><span>是否有常用直播软件</span>*</div>
                                <div :class="[{'setAddressBtnOne':WisDefault==0},{'setAddressBtnTwo':WisDefault==1}]" @click.stop="whetherBtnDefa"><span></span></div>
                            </div>
                            <ul class="Info_platform"  v-if="platformShow">
                                <li @click.stop="platfromSelC(index,item)" v-for="(item,index) in LivePlatformData" :key="index"> <img :src="index==platformImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item}}</span> </li>
                            </ul>
                            <div  class="Info_other" v-if="platformShow">
                                <div class="Info_otherRight" @click.stop="platformotherC">
                                    <img :src="platformotherImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> 
                                    <span>其他</span>
                                </div>
                                <input :disabled='disabledXiu' v-if="showplatformotherinput" @change="zhiboChange" v-model="inputSoftware" type="text" placeholder="请填写您所用直播软件名称">
                            </div>
                            <input :disabled='disabledXiu' v-if="platformShow" type="text" v-model="softId" placeholder="请填写您所用直播软件的id号">
                        </li>
                        <!-- 短视频 -->
                        <li>
                            <div class="Info_whether">
                                <div  class="Info_whethername"><span>是否有常用短视频 </span>*</div>
                                <div :class="[{'setAddressBtnOne':DisDefault==0},{'setAddressBtnTwo':DisDefault==1}]" @click.stop="DuanBtnDefa"><span></span></div>
                            </div>
                            <ul class="Info_platform" v-if="duanShow">
                                <li @click.stop="shortVideoSelC(index,item)" v-for="(item,index) in ShortVideoData" :key="index"> <img :src="index==shortVodeoImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>{{item}}</span> </li>
                            </ul>
                            <div class="Info_other" v-if="duanShow"><div class="Info_otherRight" @click.stop="shortVodeootherC"><img :src="shortVodeootherImgIndex?staticImgH+'noselYes.png':staticImgH+'nosel.png'" alt=""> <span>其他</span></div>
                            <input :disabled='disabledXiu' v-model="inputduanValue" @change="videoChange" v-if="showshortVodeootherinput" type="text" placeholder="请填写您所用直播软件名称"></div>
                            <input :disabled='disabledXiu' type="text" v-if="duanShow" v-model="videoId" placeholder="请填写您所用短视频软件的id号">
                        </li>
                        <li>
                            <div class="Info_whether">
                                <div  class="Info_whethername"><span>是否有网店 </span>*</div>
                                <div :class="[{'setAddressBtnOne':WangisDefault==0},{'setAddressBtnTwo':WangisDefault==1}]" @click.stop="WangBtnDefa"><span></span></div>
                            </div>
                            <div class="onlineShop_wrap" v-if="isWang">
                                <div class="onlineShop" @click.stop="wangNameC"><span>{{shopNames}}</span> <img :src="staticImgH+'nojian.png'" alt=""></div> <input :disabled='disabledXiu' v-model="isShop" type="text" placeholder="请填写您的网店名">
                                <ul  v-if="onlineShopListxShow" >
                                    <li @click.stop="shopNameC(item.name)" v-for="(item,index) in onlineShopData"  :key="index">
                                        {{item.name}}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
            </div>
            <div v-if="guildData.is_show==0">待审核</div>
            <div v-if="guildData.is_show==2">已拒绝</div>
            <!-- <div class="ImmAdd" @click.stop="ImmAddC">立即加入</div> -->
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
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
  data () {
    return {
        WisDefault:0,
        DisDefault:0,
        WangisDefault:0,
        sexSelImg:'nosel.png',
        disabledXiu:true,//动态修改可编辑状态，默认不能编辑
        sexData:[
            {
                name:'女',
                id:2,
            }
            ,
            {
                name:'男',
                id:1
            }
        ],
        sexImgIndex:2,
        LivePlatformData:[
            '花椒','YY','映客','一直播','斗鱼','快手','抖音','全民直播'
        ],
        platformImgIndex:-1,
        platformotherImgIndex:false,
        showplatformotherinput:false,
        platformShow:false,
        ShortVideoData:['抖音','快手'
        ],
        shortVodeoImgIndex:-1,
        shortVodeootherImgIndex:false,
        showshortVodeootherinput:false,
        duanShow:false,
        
        onlineShopData:[
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
        sex:2,//性别
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

        guildData:'',
    };
  },
//   components: {},
    computed:{
        ...mapState(['staticImgH','tokenH','MineGuildPage'])
    },
    mounted(){
            var obj=qs.stringify({
                type:1
            })
            this.$http.post('api/user/me_gong',obj,{
                headers: {
                    'authorization': this.tokenH
                }
            }).then((res)=>{
                    if(res.data.code==200){
                            var data=res.data.data.result
                            this.guildData=data
                            this.nickname=data.nickname
                            this.phone=data.phone
                            this.wechatId=data.wechat_id
                            this.isNumber=data.is_number
                            this.sex=data.sex
                            this.age=data.age
                            this.sexImgIndex=data.sex
                            this.heightVal=data.height1
                            this.weightVal=data.weight1
                            this.constellationVal=data.constellation1
                            this.SpecialtyVal=data.strong
                            this.CareerVal=data.datacareer
                            this.SignVal=data.signature1
                            this.img=data.just_number
                            this.imgTwo=data.over_number
                            this.uploadimgsOpacity=true
                            this.uploadimgsOpacityTwo=true
                            if(data.software){
                                this.WisDefault=1 
                                this.platformShow=true
                                this.softId=data.soft_id
                                if(this.LivePlatformData.indexOf(data.software)!==-1){
                                    this.platformImgIndex=this.LivePlatformData.indexOf(data.software)
                                    this.software=data.software
                                }else {
                                    this.platformotherImgIndex=true;
                                    this.showplatformotherinput=true
                                    this.inputSoftware=data.software
                                }
                            }
                            if(data.is_video){
                                this.DisDefault=1
                                this.duanShow=true
                                this.videoId=data.video_id
                                if(this.ShortVideoData.indexOf(data.is_video)!==-1){
                                    this.shortVodeoImgIndex=this.ShortVideoData.indexOf(data.is_video)
                                    this.isVideo=data.is_video
                                }else {
                                    this.shortVodeootherImgIndex=true;
                                    this.showshortVodeootherinput=true
                                    this.inputduanValue=data.is_video
                                }
                            }
                            if(data.shop_name){
                                this.WangisDefault=1
                                this.isWang=true
                                this.shopNames=data.shop_name
                                this.shopName=data.shop_name
                                this.isShop=data.is_shop
                            }else{
                                this.shopNames=data.shop_name
                                this.shopName=data.shop_name
                            }
                    }else{
                        this.alertText(res.data.msg)
                    }
            })
    },
    methods: {
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
            //   保存
                    saveYes(){
                        if(this.shopName=='' && this.isShop!==''){
                            this.shopName=this.shopNames
                        }
                        var obj=qs.stringify({
                                type:2,
                                nickname:this.nickname,
                                phone:this.phone,
                                wechat_id:this.wechatId,
                                // is_number:this.isNumber,
                                sex:this.sex,
                                age:this.age,
                                software:this.software,
                                soft_id:this.softId,
                                is_video:this.isVideo,
                                video_id:this.videoId,
                                shop_name:this.shopName,
                                is_shop:this.isShop,
                                signature1:this.SignVal,//签名
                                weight1:this.weightVal,
                                height1:this.heightVal,
                                constellation1:this.constellationVal,
                                strong:this.SpecialtyVal,
                                career:this.CareerVal
                        })
                        this.$http.post('api/user/me_gong',obj,{
                            headers: {
                                'authorization': this.tokenH
                            }
                        }).then((res)=>{
                            if(res.data.code==200){
                                    this.alertText('保存成功')
                                    this.disabledXiu=true
                            }else{
                                    this.alertText(res.data.msg)
                            }
                        })
                    },
            //   编辑
                    editYes(){
                        this.disabledXiu=false
                    },
            //  点击页面任意处  隐藏 网店平台列表 
                    hideDiv(){
                        this.onlineShopListxShow=false
                    },
            // 弹框提示
                    alertText(text){
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
            // 身份证验证
                    cardNumber(){
                        var idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                        iFlag = idCardReg.test(this.idNumber);
                        if(!iFlag){
                            this.alertText('您输入的身份证格式有误！')
                        }
                    },
            // 网店列表显示
                    wangNameC(){
                        if(!this.disabledXiu){
                            this.onlineShopListxShow=true
                        }
                    },
            //   点击网店平台列表
                    shopNameC(name){
                        if(!this.disabledXiu){
                            this.shopName=name
                            this.shopNames=name
                            this.onlineShopListxShow=false
                        }
                    },
            // 短视频其他的input输入
                    videoChange(){
                        this.isVideo=this.inputduanValue
                    },
            // 直播其他的input输入
                    zhiboChange(){
                        this.software=this.inputSoftware
                    },
            //   选择性别
                    sexSelectC(id){
                        if(!this.disabledXiu){
                                this.sexImgIndex=id
                                this.sex=id
                        }
                    },
            // 点击直播默认按钮
                    whetherBtnDefa(){
                        if(!this.disabledXiu){
                                this.WisDefault==0?this.WisDefault=1:this.WisDefault=0  //选中状态判断
                                if(this.WisDefault==0){ //如果直播未选中
                                    this.platformShow=false  //直播软件列表 ；直播软件其他；直播软件id 隐藏
                                }else if(this.WisDefault==1){ //如果直播选中
                                    this.platformShow=true  //直播软件列表 ；直播软件其他；直播软件id 显示
                                }
                                this.platformImgIndex=-1  //直播软件列表都重置为未选中
                                this.platformotherImgIndex=false  //重置 直播其他成未选中状态
                                this.showplatformotherinput=false //直播 其他的input框重置为隐藏
                                this.inputSoftware=''  //直播其他input值 重置为空
                                this.softId=''  //直播id重置为空
                                this.software=''  //直播平台value重置为空
                        }
                    },
            // 点击短视频默认按钮
                    DuanBtnDefa(){
                        if(!this.disabledXiu){
                                this.DisDefault==0?this.DisDefault=1:this.DisDefault=0 //选中状态判断
                                if(this.DisDefault==0){//如果短视频未选中
                                    this.duanShow=false  //短视频软件列表 ；短视频软件其他；短视频软件id 隐藏
                                }else if(this.DisDefault==1){//如果短视频选中
                                    this.duanShow=true   //短视频软件列表 ；短视频软件其他；短视频软件id 显示
                                }
                                this.shortVodeoImgIndex=-1  //短视频软件列表都重置为未选中
                                this.shortVodeootherImgIndex=false //重置 短视频其他成未选中状态
                                this.showshortVodeootherinput=false   //重置 短视频其他的input 隐藏
                                this.inputduanValue=''  // 重置 短视频其他的input值 为空
                                this.videoId=''  //短视频id重置为空
                                this.isVideo=''  //短视频平台重置为空
                        }
                        
                    },
            // 点击网店默认按钮
                        WangBtnDefa(){
                            if(!this.disabledXiu){
                                    this.WangisDefault==0?this.WangisDefault=1:this.WangisDefault=0  //选中状态判断
                                    if(this.WangisDefault==0){//如果网店未选中
                                        this.isWang=false 
                                    }else if(this.WangisDefault==1){//如果网店未选中
                                        this.isWang=true
                                    }
                                    this.shopNames='淘宝',  //网店平台名称
                                    this.shopName=''   //页面 网店重置为'淘宝'
                                    this.isShop=''  //网店input框 的value重置为空
                            }
                        },
            //   选择直播平台列表
                    platfromSelC(index,name){
                        if(!this.disabledXiu){
                                this.platformImgIndex=index  //设置直播列表中的某一个被选中
                                this.software=name   //直播名字赋值
                                this.platformotherImgIndex=false  //直播其他为未选中状态
                                this.showplatformotherinput=false //直播其他的input为''
                            }
                        
                    },
            //  选择短视频列表
                    shortVideoSelC(index,name){
                        if(!this.disabledXiu){
                                this.shortVodeoImgIndex=index
                                this.isVideo=name
                                this.shortVodeootherImgIndex=false
                                this.showshortVodeootherinput=false
                        }
                    },
            // 选择直播平台其他按钮
                    platformotherC(){
                        if(!this.disabledXiu){
                                this.platformotherImgIndex=!this.platformotherImgIndex // 直播其他成选中的状态
                                this.platformImgIndex=-1; //直播软件列表都重置为未选中
                                this.software='';    //直播平台值 重置为空
                                this.inputSoftware=''  //直播其他input值 重置为空
                                if(this.platformotherImgIndex==true){ // 直播其他成选中
                                    this.showplatformotherinput=true  //直播其他input显示
                                }else{ // 直播其他成不选中
                                    this.showplatformotherinput=false  ////直播其他input不显示
                                }
                        }
                    },
            // 短视频其他按钮
                shortVodeootherC(){
                    if(!this.disabledXiu){
                            this.shortVodeootherImgIndex=!this.shortVodeootherImgIndex
                            this.shortVodeoImgIndex=-1
                            this.isVideo=''
                            this.inputduanValue=''
                            if(this.shortVodeootherImgIndex==true){
                                this.showshortVodeootherinput=true
                            }else{
                                this.showshortVodeootherinput=false
                            }
                    }
                },
                toReturn(){
                    this.$router.push(this.MineGuildPage)
                },
    }
}

</script>
<style scoped lang="stylus">
.AddUnion_father{
    letter-spacing :0.04rem;
}
.PlayerRanking_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :space-between;
    position :relative;
    padding:0 0.4rem;
    >img{
        width:0.32rem;
        height:0.56rem;
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
        margin-top:0.32rem;
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
            border:0.02rem solid #707070;
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
    width:9.2rem;
    height:1.07rem;
    background :rgba(255, 193, 203, 1);
    font-size:0.347rem;
    color:rgba(255, 255, 255, 1);
    line-height :1.07rem;
    text-align :center;
    margin:0.4rem auto;
}

// 提示盒子
.promptFather{
    width:100%;
    position :absolute;
    bottom:50%;
    left:0;
    z-index:10;
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
</style>
