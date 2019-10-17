<!-- 个性签名 -->
<template>
  <div class="Signature">
        <div class="Signature_header">
            <img @click="SignatureReturn" :src="staticImgH+'zuojiantou.png'" alt="">
            <span>个人资料</span>
            <span class="submit" @click="submit">提交</span>
      </div>
      <div class="Signature_des">
            <div class="Signature_title">
                给一个选择你的理由
            </div>
            <div class="Signature_text">
                <textarea rows="3" cols="20" maxlength="500" v-model="SignatureValue">
                </textarea>
            </div>
            <div class="Signature_length">
                长度限制：20-500个字
            </div>
            <div class="Signature_eg">
                <span class='Signature_egTitle'>示例：</span>
                <span>Hello我是lily，土生土长的上海人。平时喜欢吃美食、弹钢琴、打游戏，性格活波爽朗～我可以带你去吃最正宗的美食，去看最地道的风景。快来找我玩耍。</span>
            </div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:'Signature',
  data () {
    return {
        SignatureValue:'ssssssss',//个性签名内容
    };
  },

  components: {},

  computed:{
        ...mapState(['staticImgH','SignaturePerX'])
    },

  mounted(){
      this.SignatureValue=this.SignaturePerX
  },

  methods: {
    //   返回
      SignatureReturn(){
          this.$router.push('/MineInformation')
      },
    //   保存
    submit(){
        this.SignaturePerXs(this.SignatureValue)
        this.$router.push("/MineInformation")
    },
     ...mapMutations(['specialInfos','SignaturePerXs']),
  }
}

</script>
<style scoped lang="stylus">
.Signature{
    letter-spacing :0.04rem;
}
.Signature_header{
     width:100%;
   height:1.23rem;
  display :flex;
  align-items :center;
  justify-content :space-between;
  padding:0.4rem;
  >img{
    width:0.32rem;
    height:0.56rem;
  }
  >span{
      font-size:0.48rem;
      color:rgba(0, 0, 0, 1);
  }
  >.submit{
    font-size:0.427rem;
    color:rgba(0, 0, 0, 1);
  }
}
.Signature_des{
    padding:0.27rem 0.4rem;
}
.Signature_title{
    font-size:0.32rem;
    color:rgba(0, 0, 0, 0.6);
    margin-bottom:0.32rem;
}
.Signature_text{
    >textarea{
        width:9.173rem;
        height:3.55rem;
        border:0;
        border-radius:0.133rem;
        box-shadow :0 0.05rem 0.3rem rgba(241, 241, 241, 0.9);
        outline :none;
        font-size:0.32rem;
        color:rgba(0, 0, 0, 1);
        padding:0.27rem;
    }
}
.Signature_length{
    text-align :right;
    margin-top:0.32rem;
    font-size:0.32rem;
    color:rgba(0, 0, 0, 0.6);
    line-height :0.453rem;
}
.Signature_eg{
    display:flex;
    flex-direction :column;
    margin-top:0.4rem;
    >.Signature_egTitle{
        font-size :0.347rem;
        line-height :0.507rem;

    }
    >span{
        color:rgba(0, 0, 0, 0.6);
        font-size:0.32rem;
        line-height :0.427rem;
    }
}

</style>