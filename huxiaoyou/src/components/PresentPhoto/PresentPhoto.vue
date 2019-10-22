<!--  -->
<template>
  <div class="PresentVideo">
       <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>添加照片</span>
		  <div class="PresentPhoto_admin">管理</div>
      </div>
      <ul class="videoList">
          <li v-for="(item,index) in photoDataList" :key="index"><img :src="item.src" alt=""><div class="gxuan">删除</div></li>
      </ul>
	  <div class="right">
         <span><img :src="staticImgH+'tianjia.png'" alt=""></span>
         <input type="file" class="upload" @change="uploadFile" ref="inputer" accept="image/*"/>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:'PresentPhoto',
  data () {
    return {
        formData:new FormData(),
        imgLen:0,
        fil:'',
        photoDataList:'',
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH','tokenH'])
    },

  mounted(){
      this.videoData()
  },

  methods: {
      videoData(){
           var obj=qs.stringify({

            })
            this.$http.post('api/user/info',obj,{
                headers: {
                    'authorization': this.tokenH
                }
            }).then((res)=>{
                this.photoDataList=res.data.data.photo_introduction
                
            })
      },
      toReturn(){
          this.$router.push('/MineInformation')
      },
       uploadFile(){
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        console.log(this.fil)
        let oldLen=this.imgLen;
        let len=this.fil.length+oldLen;
        if(len>4){
          alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
          return false;
        }
        
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5*1024*1024) {
            alert('请选择5M以内的图片！');
            return false
          }
          this.imgLen++;
          console.log(this.fil[i])
           this.formData.append('photo_introduction',this.fil[i])
        }
        
        this.$http.post('api/player/photo_introduction', this.formData,{
            headers: {
                    'authorization': this.tokenH
                }
            }).then(res => {
                 this.videoData()
            });
       
      },
  }
}

</script>
<style scoped lang="stylus">
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
	>.PresentPhoto_admin{ font-size:0.42rem;}
}
.right{
        position :relative;
		width:0.8rem;
		margin-top:0.3rem;
		margin-bottom:0.3rem;
		left:4.6rem;
        >span{
            font-size:0.4rem;
            color:rgba(0, 0, 0, 1);
			>img{ width:0.8rem;}
        }
        >input{
            width:0.8rem;
			height:0.8rem;
            opacity :0;
            position :absolute;
            top:0;
            left:0;
            z-index:999;
        }
    }
.videoList{
    width:100%;
	min-height:14.6rem;
    padding-left:0.4rem;
    margin-top:0.27rem;
    >li{
        width:4.44rem;
        height:4.44rem;
        margin-bottom:0.27rem;
		display:inline-block;
		margin-right:0.31rem;
        >img{
            width:4.44rem;
            height:4.44rem;
			border-radius:0.2rem;
			display:block;
        }
    }
}
.gxuan{ margin-top:-0.9rem; height:0.9rem; background:rgba(0,0,0,0.5); position:relative; width:4.44rem; color:#fff; text-align:center; line-height:0.9rem; font-size:0.48rem; border-radius:0 0 0.2rem 0.2rem;}
</style>
