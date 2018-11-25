<!--  -->
<template>
  <div class="Serial" @click="chooseSerial">
    <div class="grid-content bg-purple" v-if="info.intem.status=='Starting'">
      <div class="g-box-style dark_style">
        <div class="unlock_box1">
          <span>{{ info.intem.serial_no }}<i>#</i></span>
          <span>{{ info.intem.last_price }}BTO</span>
        </div>
      </div>
      <div class="shelter" ref='shelterbox'>
        <img v-bind:src="'http://'+info.intem.picture" alt="">
      </div>
      <div class="click_choose" v-if="info.intem.isChoose">
        <img src="../../assets/images/choose.jpg" alt="">
      </div>
    </div>
    <div class="grid-content bg-purple" v-if="info.intem.status=='protected'">
      <div class="g-box-style" v-bind:class="this.isOwn ? 'blue_style' : 'gray_style'">
        <div class="unlock_box2">
          <div class="unlock_box2_1">{{ info.intem.serial_no }}<i>#</i></div>
          <div class="unlock_box2_2">
            <count-down v-on:end_callback="countDownE_cb(1)" :startTime="info.intem.current_time" :endTime="info.intem.endtime" :tipText="''" :tipTextEnd="''" :endText="''" :dayTxt="''" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
          </div>
          <div class="unlock_box2_4">
            <img src="../../assets/images/shield.png" alt="" v-if="this.isOwn">
            <img src="../../assets/images/lock.png" alt="" v-else>
          </div>
          <div style="clear:both"></div>
          <div class="unlock_box2_3">{{ info.intem.last_price }} BTO</div>
        </div>
        <div class="countDown">
          <!-- {{ countDown }} -->
          <!-- <count-down v-on:end_callback="countDownE_cb(1)" :startTime="( new Date() ).getTime()" :endTime="info.intem.endtime" :tipText="''" :tipTextEnd="''" :endText="''" :dayTxt="''" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down> -->
        </div>
      </div>
      <div class="shelter" ref='shelterbox'>
        <img v-bind:src="'http://'+info.intem.picture" alt="">
      </div>
    </div>
    <div class="grid-content bg-purple" v-if="info.intem.status=='optional'">
        <!-- <img v-bind:src="'http://'+info.intem.picture" alt=""> -->
          <div class="g-box-style dark_style">
            <div class="unlock_box1">
              <span>{{ info.intem.serial_no }}<i>#</i></span>
              <span>{{ info.intem.last_price }}BTO</span>
            </div>
            <div class="unlock_box1_3" style="padding-right: 10px;">
              <count-down class="countClass" v-on:end_callback="countDownE_cb(1)" :startTime="info.intem.current_time" :endTime="info.intem.endtime" :tipText="''" :tipTextEnd="''" :endText="''" :dayTxt="''" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
              <div style="display:inline-block;margin-left: 10px;">
                <img src="../../assets/images/down.png" alt="">
              </div>
              <div style="display:inline-block;margin-left: 10px;">{{ info.intem.next_price | defaultText}} BTO</div>
            </div>
          </div>
          <div class="shelter" ref='shelterbox'>
            <img v-bind:src="'http://'+info.intem.picture" alt="">
          </div>
          <div class="click_choose" v-if="info.intem.isChoose">
            <img src="../../assets/images/choose.jpg" alt="">
          </div>
      </div>
  </div>
</template>

<script>
  // import dayjs from 'dayjs'
  import { $utils } from '@helper'
  import CountDown from '@views/partials/countdown'
  export default {
    props: {
      info: null
    },
    data() {
      return {
        isChoose: false,
        isOwn: false
      }
    },

    components: {
      CountDown
    },
    filters: {
      defaultText(val) {
          // if(typeof(val) == "undefined" || val == null || val == ""){
          //     return "暂无"
          // } else {
          //     return val
          // }
        // console.log('111', val)
        return val.toFixed(7)
      }
    },
    created () {
      // this.chooseSerial()
    },
    computed: {
      // countDown: function countDown() {
      //   console.log('add', dayjs.unix(this.info.intem.create_time).add(30, 'minute').diff(new Date(), 'second'))
      //   var time = dayjs.unix(this.info.intem.create_time).add(30, 'minute').diff(new Date(), 'second')
      //   if (time <= 0) {
      //     // console.log('111')
      //     return '00:00:00'
      //   } else {
      //     var result = []
      //     result.push(Math.floor(time / 3.6e+6))
      //     result.push(Math.floor(time % 3.6e+6 / 60000))
      //     result.push(Math.floor(time % 60000 / 1000))
      //     console.log('result', result)
      //     return result.map(function (x) {
      //       return x < 10 ? '0' + x : x
      //     }).join(':')
      //   }
      // }
    },
    beforeUpdate() {
      this.chooseSerial()
      this.changeBox()
    },
    methods: {
      changeBox () {
        this.info.intem.times <= 30 ? this.$refs.shelterbox.style.filter = 'blur(' + (15 - this.info.intem.times / 2) + 'px)' : this.$refs.shelterbox.style.filter = 'blur(0px)'
        // this.$refs.shelterbox.style.filter = 'blur(' + (15 - this.info.intem.times / 2) + 'px)'
        // console.log('$refs.shelterbox.style.filter', this.$refs.shelterbox.style)
      },
      chooseSerial() {
        // this.isChoose = !this.isChoose
        // this.$emit('chooseState', {
        //   'index': this.info.index,
        //   'status': this.isChoose,
        //   'info': this.info
        // })
        // console.log('pro', this.info.intem.status)
        // console.log('pro2', JSON.stringify(this.info.intem.user_id))
        // console.log('pro3', $utils.getStorage('useid'))
        if (this.info.intem.status === 'protected' && JSON.stringify(this.info.intem.user_id) === $utils.getStorage('useid')) {
          this.isOwn = true
        }
      },
      countDownE_cb: function (x) {
        console.log('结束啦')
      }
    },

    mounted() {
      // this.chooseSerial()
      // console.log('++++++++', this.info)
    }
  }

</script>
<style lang='scss'>
  .Serial {
    .shelter {
      position: absolute;
      top: 0;
      width: auto;
      height: 100%;
      filter: blur(15px);
      z-index: 1;
    }

    .shelter::before {
      // content: '';
      // position: absolute;
      // top: 0;
      // right: 0;
      // bottom: 0;
      // left: 0;
      // background: #ffffff;
      // opacity: 0.05;
      // margin: -30px;
    }

    .click_choose {
      z-index: 3;
      position: absolute;
      top: 85px;
    }

    .unlock_box1 {
      color: #ffffff;

      span {
        display: inline-block;
        padding-top: 6px;
        font-size: 17px;
      }

      span:nth-child(1) {
        width: 10%;
        padding-left: 6px;
        // padding-left: 10px;
      }

      i {
        font-size: 11px;
      }

      span:nth-child(2) {
        width: 80%;
        text-align: center;
        // padding-left: 76px;
      }
      
    }
    .unlock_box2{
      i {
        font-size: 11px;
      }
      .unlock_box2_1{
          float: left;
          padding: 7px;
      }
      .unlock_box2_2{
          float: left;
          padding: 7px 0 0 23px;
          width: 100px;
      }
      .unlock_box2_3{
          clear: both;
          text-align: right;
          padding-right: 40px;
          margin-top: 7px;
      }
      .unlock_box2_4{
        padding: 6px 0 0 0;
        float: left;
      }
    }
    .unlock_box1_3{
        color: #ffffff;
        text-align: right;
        margin-top: 14px;
        padding-right: 40px;
      }
      .countClass{
        display: inline-block
      }
  }

</style>
