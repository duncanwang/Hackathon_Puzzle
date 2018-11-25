<!--  -->
<template>
  <div class='block_coming'>
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
        <div class="shelter">
          <img v-bind:src="'http://'+info.works_picture" alt="">
        </div>
        <div class="countdown_box">
          <div class="count_block">
            <div class="bg_box"></div>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" :width="width" :height="width">
              <circle cx="100" cy="100" :r="100 - border / 2" fill="none" transform="rotate(270,100,100)" :stroke="color"
                :stroke-width="border" :stroke-dasharray="dashLen" :stroke-dashoffset="dashOffset" style="transition: stroke-dashoffset 1s" />
              <text x="100" y="100" text-anchor="middle" :font-size="fontSize + 5" :fill="Textcolor" style="text-shadow: 3px 3px 6px #808a7b;">
                {{ countDown }}
              </text>
              <text x="100" y="130" text-anchor="middle" :font-size="13" fill="#d4d4d4" style="text-shadow: 3px 3px 3px #616367;">
                距开售还剩
              </text>
            </svg>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    // propsData: {
    //   setTimer: 20 * 1000
    // },
    props: {
      info: null,
      // setTimer: {
      //   type: Number,
      //   required: true
      // },

      width: {
        type: Number,
        default: 180
      },

      border: {
        type: Number,
        default: 15
      },

      color: {
        type: String,
        default: '#85c7ce'
      },
      Textcolor: {
        type: String,
        default: '#35b8a4'
      },
      fontSize: {
        type: Number,
        default: 30
      }
    },
    data() {
      return {
        isInProgress: '',
        percent: 0,
        setTimer: null,
        timeLeft: null,
        dashLen: (100 - this.border / 2) * Math.PI * 2
      }
    },

    components: {

    },

    computed: {
      countDown: function countDown() {
        var time = this.timeLeft
        if (time <= 0) {
          return '00:00:00'
        } else {
          var result = []
          result.push(Math.floor(time / 3.6e+6))
          result.push(Math.floor(time % 3.6e+6 / 60000))
          result.push(Math.floor(time % 60000 / 1000))
          return result.map(function (x) {
            return x < 10 ? '0' + x : x
          }).join(':')
        }
      },
      dashOffset: function dashOffset() {
        return this.timeLeft / this.setTimer * this.dashLen - this.dashLen
      }
    },

    methods: {

    },

    mounted() {
      this.setTimer = this.timeLeft = dayjs.unix(this.info.begin_time).diff(dayjs.unix(this.info.current_time), 'second') * 1000
      // this.setTimer = this.timeLeft = 10 * 1000
      this.lastDate = Date.now()
      let that = this
      this.interval = setInterval(() => {
        let curDate = Date.now()
        let diff = Math.round((curDate - that.lastDate) / 1000) * 1000
        that.timeLeft -= diff
        if (that.timeLeft <= 0) {
          this.$emit('timeUp', 'timeIsUp')
          clearInterval(that.interval)
        }
        if (diff >= 1000) {
          that.lastDate = curDate
        }
      }, 1000)
    }
  }

</script>
<style lang='scss'>
  .block_coming {

    .countdown_box {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .count_block {
      width: 196px;
      height: 196px;
      border-radius: 98px;
      // padding: 8px;
      margin: 80px auto;
      position: relative;

      .bg_box {
        width: 200px;
        height: 200px;
        position: absolute;
        background: #a1bad4;
        opacity: 0.4;
        border-radius: 100px;
        z-index: 1;
      }

      svg {
        position: absolute;
        left: 10px;
        top: 9px;
        z-index: 3;
      }
    }

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
      //   filter: blur(20px);
      margin: -30px;
    }

    .artcle {
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
