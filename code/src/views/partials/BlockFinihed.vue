<!--  -->
<template>
  <div class='block_finihed'>
    <!-- ref="ruleForm2" -->
    <div class="coming">
        <div class="page " id="page">
          <div class="info_art_box">
            <div class="intr_title">
              <div class="block_left block_b"><img v-bind:src="'http://'+info.artist_picture" alt=""></div>
              <div class="block_right block_b">
                <div><span>{{ info.artist_en_name }}</span></div>
                <div><span>{{ info.artist_name }}</span></div>
              </div>
            </div>
            <div class="artcle">{{ info.works_profile }}</div>
          </div>
          <div class="shelter"   @click="linkDeal(info.id)">
            <img v-bind:src="'http://'+info.works_picture" alt="">
          </div>

        </div>
    </div>
  </div>
</template>

<script>
  import { $utils } from '@helper'
  export default {
    props: {
      info: null
    },
    data() {
      return {
        isInProgress: '',
        percent: 0
      }
    },

    components: {},

    computed: {},

    methods: {
      linkDeal(data) {
        $utils.setsesStorage('setdealId', data)
        this.$router.push('/page/deal')
      }
    },

    mounted() {
      // console.log('indf====>', this.info)
    }
  }

</script>
<style lang='scss'>
  .block_finihed {
    // position: relative;

    *,
    *:before,
    *:after {
      box-sizing: border-box;
      outline: none;
    }


    .page {
      height: 534px;
      width: 330px;
      position: relative;
      //   top: 50%;
      //   left: 50%;
      //   -webkit-transform: translate(-50%, -50%);
      //   transform: translate(-50%, -50%);
      //   background: #1e384c;
      //   background:url('../../assets/images/timg.jpeg');
      border-radius: 6px;
      overflow: hidden;

    }

    .shelter {
      width: 100%;
      height: 100%;
      // background: hsla(0,0%,100%,.3);
      // filter: blur(20px);
      // overflow: hidden;
      // background: url('../../assets/images/demo.jpg');
    }

    .shelter::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: #ffffff;
      opacity: 0.05;
      //   filter: blur(20px);
      margin: -30px;
    }
    .artcle{
      position: absolute;
      bottom: 12px;
      height: 91px;
      padding: 10px 10px 20px 10px;
      color: #ffffff;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
    }
    .info_art_box {
      width: 100%;
      height: 175px;
      position: absolute;
      bottom: 0;
      z-index: 20;
      opacity: 0.8;
      background-color: #535353;
      .intr_title {
      margin-top: -33px;
      }

      img {
        width: 100px;
        height: 100px;
        border-radius: 100px;
      }

      .block_b {
        float: left;
      }
      .block_left {
        margin-left: 15px;
      }
      .block_right {
        width: 199px;
        height: 100px;
        font-size: 15px;
        color: #FFFFFF;
        margin-left: 15px;
        div:nth-child(1) {
        height: 32px;
        line-height: 32px;
        margin-top: 43px;
        font-weight: 500;
        }

        div:nth-child(2) {
        height: 22px;
        line-height: 22px;
        font-size: 13px;
        }
      }
    }
  }
</style>
