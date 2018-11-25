<!--  -->
<template>
  <div class='product'>
    <div class="pro_block pro_whole" v-if="info.type=='whole'">
      <el-row>
        <el-col :span="14">
          <div class="product_grid" style="text-align:center">
            <img :src="'http://'+info.intem.works_whole_collect_picture" alt="" style="height: 402px;width: auto;">
          </div>
        </el-col>
        <el-col :span="10">
          <div class="product_grid">
            <div class="pro_name">
              <span>{{info.intem.works_whole_collect_name}}</span>
              <span></span>
            </div>
            <div class="pro_owner">
              <span style="font-size: 22px;font-weight: 600;">获得</span>
              <span style="font-size: 22px;font-weight: 600;">0.001 BTO<span style="font-size:12px">≈＄24,648,0200</span></span>
            </div>
            <div class="pro_icon" style="border: none;">
              <el-row class="pro_icon_box">
                <el-col :span="8" class="pro_icon_block1">
                  <a target="_blank" v-bind:href=" 'http://'+info.intem.works_whole_collect_copyright ">
                  <div><img src="../../assets/images/license.png" alt="" width="50px"></div>
                  <div style="margin-top: 18px;">数字版权证明</div>
                  </a>
                </el-col>
                <el-col :span="8" class="pro_icon_block2">
                  <a target="_blank" v-bind:href=" 'http://'+info.intem.works_whole_collect_copyright ">
                  <div><img src="../../assets/images/finder.png" alt="" width="45px"></div>
                  <div style="margin-top: 19px;">完整作品文件</div>
                  </a>
                </el-col>
                <el-col :span="8" class="pro_icon_block3">
                  <div><img src="../../assets/images/server.png" alt="" width="38px"></div>
                  <div style="margin-top: 14px;">区块高度</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="pro_block pro_conduct" v-if="info.type=='conduct'">
      <el-row>
        <el-col :span="14">
          <div class="product_grid">
            <div class="loading_box">
              <div class="loading-container">
                <div class="loding-animation-holder">
                  <div class="loading-animator"></div>
                  <div class="loading-animator"></div>
                  <div class="loading-animator"></div>
                  <div class="loading-animator"></div>
                  <div class="middle-circle"></div>
                </div>
              </div>
            </div>
          </div>

        </el-col>
        <el-col :span="10">
          <div class="product_grid">
            <div class="pro_name">
              <span>{{info.intem.works_conduct_name}}</span>
              <span></span> 
            </div>
            <div class="pro_owner">
              <span style="font-size: 22px;font-weight: 600;">完成将获得</span>
              <span style="font-size: 22px;font-weight: 600;">123,240.0001 BTO<span style="font-size:12px">≈＄24,648,0200</span></span>
            </div>
            <div class="pro_icon" style="border: none;">
              <el-row class="pro_icon_box">
                <el-col :span="8" class="pro_icon_block1">
                  <div><img src="../../assets/images/license_black.jpg" alt="" width="50px"></div>
                  <div style="margin-top: 18px;">数字版权证明</div>
                </el-col>
                <el-col :span="8" class="pro_icon_block2">
                  <div><img src="../../assets/images/finder_black.jpg" alt="" width="45px"></div>
                  <div style="margin-top: 19px;">完整作品文件</div>
                </el-col>
                <el-col :span="8" class="pro_icon_block3">
                  <div><img src="../../assets/images/server_black.jpg" alt="" width="38px"></div>
                  <div style="margin-top: 14px;">区块高度</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="pro_block pro_who" v-if="info.type=='who'">
      <el-row>
        <el-col :span="14">
          <div class="product_grid" style="text-align:center">
            <img :src="'http://'+info.works_complete.picture" alt="" style="height: 402px;width: auto;">
          </div>

        </el-col>
        <el-col :span="10">
          <div class="product_grid">
            <div class="pro_name">
              <span>{{info.works_complete.works_name}}</span>
              <span></span>
            </div>
            <div class="pro_owner">
              <span>{{ info.works_complete.works_all_mobile}}</span>
              <span>完成拼图</span>
            </div>
            <div class="pro_owner">
              <span>获得</span>
              <span>{{info.works_complete.works_total}} BTO≈＄24,648,0200</span>
            </div>
            <div class="pro_icon">
              <el-row class="pro_icon_box">
                <el-col :span="8" class="pro_icon_block1">
                  <a target="_blank" v-bind:href=" 'http://'+info.works_complete.copyright ">
                  <div>
                    <img src="../../assets/images/license.png" alt="" width="50px">
                  </div>
                  <div style="margin-top: 18px;">数字版权证明</div>
                  </a>
                </el-col>
                <el-col :span="8" class="pro_icon_block2">
                  <a target="_blank" v-bind:href=" 'http://'+info.works_complete.source_file ">
                  <div>
                    <img src="../../assets/images/finder.png" alt="" width="45px">
                  </div>
                  <div style="margin-top: 19px;">完整作品文件</div>
                  </a>
                </el-col>
                <el-col :span="8" class="pro_icon_block3">
                  <div>
                    <img src="../../assets/images/server.png" alt="" width="38px">
                  </div>
                  <div style="margin-top: 14px;">区块高度</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: null
    },
    data() {
      return {}
    },

    components: {},

    computed: {},

    methods: {},

    mounted() {
      // console.log('++++++++', this.info)
    }
  }

</script>
<style lang='scss'>
  .product {
    a{
    color: #ffffff;
  }
    .pro_block {
      margin: 55px 0 0 0;
      border-bottom: 1px solid #01365d;
      padding-bottom: 24px;
    }
    // .pro_whole{
    //   border-bottom: 1px solid #01365d;
    // }

    .product_grid {
      // width: 645px;
      position: relative;
      height: 402px;
    }

    .loading_box {
      width: 650px;
      height: 100%;
      position: absolute;


      /*LOADING*/
      .loading-container {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 100;
        background: #3c4a5c;
        opacity: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
        -moz-transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
        -ms-transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
        -o-transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
        transition: opacity 1s cubic-bezier(.83, .01, .75, .71);
      }

      .loding-animation-holder {
        width: 70px;
        height: 70px;
        transform: rotate(45deg);
        position: relative;
      }

      .loading-animator {
        width: 50%;
        height: 50%;
        float: left;
        background: #8A9498;
        transform: rotate(0deg);
        position: relative;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        opacity: 1;
        border-radius: 4px;
      }

      .loading-animator:nth-child(1) {
        transform-origin: bottom right;
        animation: loading 3s cubic-bezier(.46, -0.1, .2, 1.5) infinite;
      }

      .loading-animator:nth-child(2) {
        transform-origin: bottom left;
        animation: loading 3s 0.3s cubic-bezier(.46, -0.1, .2, 1.5) infinite;
      }

      .loading-animator:nth-child(3) {
        transform-origin: top right;
        animation: loading 3s 0.5s cubic-bezier(.46, -0.1, .2, 1.5) infinite;
      }

      .loading-animator:nth-child(4) {
        transform-origin: top left;
        animation: loading 3s 0.4s cubic-bezier(.46, -0.1, .2, 1.5) infinite;
      }

      @keyframes loading {
        0% {
          transform: rotate(0deg);
          opacity: 1;
        }

        25% {
          transform: rotate(90deg);
          opacity: 0;
        }

        35% {
          transform: rotate(-90deg);
          opacity: 0;
        }

        65% {
          transform: rotate(0deg);
          opacity: 1;
        }
      }

      .middle-circle {
        width: 5px;
        height: 5px;
        position: absolute;
        top: 32.5px;
        left: 32.5px;
        border-radius: 100%;
        border: 1px solid #8A9498;
        background: #8A9498;
      }
    }

    .pro_name {
      height: 29px;
      color: #ffffff;
      font-size: 25px;
      margin: 30px auto;
    }

    .pro_owner {
      color: #FFFFFF;
      padding: 16px 0;

      span:nth-child(1) {
        display: inline-block;
        width: 120px;
      }
    }
    .pro_wowner{
          height: 85px;
    }

    .pro_icon {
      height: 220px;
      border-top: 1px solid #ffffff;
      text-align: center;
      color: #FFFFFF;

      // line-height: 220px;
      img {
        // width: 20px;
      }

      .pro_icon_box {
        margin: 70px 0;
      }
    }
  }

</style>
