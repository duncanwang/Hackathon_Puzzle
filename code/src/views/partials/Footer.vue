<!--  -->
<template>
  <div >
    <div class='footer'>
      <el-row>
      <el-col :span="8">
        <div class="footer_grid footer_g_1">
          <div>
            <img src="../../assets/images/logo.jpg" alt="" width="190px">
          </div>
          <div>关于PuzzleBid</div>
          <div>Privacy</div>
          <div>Terms of Service</div>
        </div>
        </el-col>
      <el-col :span="8">
        <div class="footer_grid footer_g_2">
          <img src="../../assets/images/colorbay.png" alt="">
        </div>
      </el-col>
      <el-col :span="8">
        <div class="footer_grid footer_g_3">
          <img src="../../assets/images/Weibo.png" alt="">
        </div>
      </el-col>
    </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  mounted() {}
}

</script>
<style type="text/css" lang="scss">
.footer{
  width: 1200px;
  height: 312px;
  margin: 0 auto;
  .footer_grid{
  height: 312px;
  color: #ffffff;
}
.footer_g_1{
      padding: 36px 0px 0px 134px;
      div:nth-child(2){
        margin-top: 12px;
      }
      div:nth-child(3){
        margin-top: 42px;
      }
      div:nth-child(4){
        margin-top: 10px;
      }
  }
  .footer_g_2{
    padding: 37px 0px 0px 111px;
  }
  .footer_g_3{
    padding: 37px 0px 0px 101px;
  }
}
</style>
