<!--  -->
<template>
  <div class='block'>
    <!-- ref="ruleForm2" -->
    <div class="bidding">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" style="display: none;">
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
          </symbol>
        </svg>
        <div class="page" id="page">
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
          <div class="shelter">
            <img v-bind:src="'http://'+info.works_picture" alt="">
          </div>
          <div class="percent"  @click="linkDeal(info.id)">
            <div class="percent_pools">
              <div>奖池</div>
              <div class="percent_pools_info"><span>{{ info.works_bonus_pools }}BTO</span><span>≈USD12321313123</span></div>
            </div>
            <div class="percent__inner">
              <div class="percent__num" id="count">{{ percent }}</div>
              <div class="percent__sign">%</div>
            </div>
            <div class="percent_user" v-if="info.works_ratio != 0">
              <span>{{ info.mobile }}</span>
              <span style="margin-left: 30px;">已收集</span>
            </div>
          </div>
          <div class="water" id="water" ref="water">
            <svg class="water__wave water__wave_back" viewBox="0 0 560 20">
              <use xlink:href="#wave"></use>
            </svg>
            <svg class="water__wave water__wave_front" viewBox="0 0 560 20">
              <use xlink:href="#wave"></use>
            </svg>
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
      },
      update() {
        let diff = this.percent - this.info.works_ratio
        this.info.works_ratio = Math.abs(this.info.works_ratio)
        let that = this
        let interval = setInterval(function () {
          if (diff === 0 || that.percent === that.info.works_ratio) {
            clearInterval(interval)
            that.isInProgress = false
            return
          }

          if (diff < 0) {
            that.percent++
          } else {
            that.percent--
          }

          that.$refs.water.style.transform = 'translate(0, ' + (100 - that.percent) + '%)'

          that.isInProgress = false
        }, 16)
      }
    },

    mounted() {
      this.update()
    }
  }

</script>
<style lang='scss'>
  .block {
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
      border-radius: 6px;
      overflow: hidden;

    }

    .shelter {
      width: 100%;
      height: 100%;
      filter: blur(12px);
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

    .percent {
      color: #35b8a4;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      font-weight: lighter;
      z-index: 10;
      cursor: pointer;
    }

    .percent__inner {
      // display: inline-block;
          margin-top: 86px;
    }
    .percent_user{
          margin-top: 29px;
    font-size: 20px;
    color: #DFFEF4;
    }

    .percent__num {
      display: inline-block;
      font-size: 6rem;
    }

    .percent__sign {
      display: inline-block;
      font-size: 2rem;
    }
    .percent_pools{
      text-align: left;
      padding: 20px 0 0 20px;
      color: #ffffff;
      .percent_pools_info{
        margin-top: 15px;
        span:nth-child(1){
          font-size: 18px;
          font-weight: 600;
        }
      }
    }

    .water {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 5;
      bottom: 0;
      left: 0;
      opacity: 0.4;
      background: #9fa2a5;
      -webkit-transform: translate(0, 110%);
      transform: translate(0, 110%);
    }

    .water__dot {
      -webkit-animation: wave-up 0.4s 0.4s infinite linear;
      animation-direction: alternate;
    }

    .water__wave {
      width: 200%;
      position: absolute;
      bottom: 100%;
    }

    .water__wave_back {
      right: 0;
      fill: #717477;
      -webkit-animation: wave-back 1.4s infinite linear;
      animation: wave-back 1.4s infinite linear;
    }

    .water__wave_front {
      left: 0;
      fill: #9fa2a5;
      margin-bottom: -1px;
      -webkit-animation: wave-front .7s infinite linear;
      animation: wave-front .7s infinite linear;
    }



    @-webkit-keyframes wave-front {
      100% {
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
      }
    }

    @keyframes wave-front {
      100% {
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
      }
    }

    @-webkit-keyframes wave-back {
      100% {
        -webkit-transform: translate(50%, 0);
        transform: translate(50%, 0);
      }
    }

    @keyframes wave-back {
      100% {
        -webkit-transform: translate(50%, 0);
        transform: translate(50%, 0);
      }
    }

    @-webkit-keyframes wave-up {
      100% {
        -webkit-transform: translate(0, -5%);
        transform: translate(0, -5%);
      }
    }

    @keyframes wave-up {
      100% {
        -webkit-transform: translate(0, -5%);
        transform: translate(0, -5%);
      }
    }
  }

</style>
