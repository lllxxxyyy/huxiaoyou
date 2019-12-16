<!--  -->
<template>
  <div>
       <div class="huHome_header">
            赛事专区
        </div>
        <ul class="Event_ul">
            <li>

            </li>
        </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style scoped lang="stylus">
.huHome_header{
    width:100%;
    height:1.23rem;
    text-align :center;
    line-height :1.23rem;
    font-size:0.48rem;
    border-bottom:0.03rem solid rgba(0, 0, 0, 0.1);
}
.Event_ul{
    display :flex;
    flex-direction :column;
    align-items :center;
    padding:0.32rem 0;
    >li{
        width:9.2rem;
        height:5.07rem;
        margin-bottom:0.27rem;
        background :pink;
    }
}
</style>