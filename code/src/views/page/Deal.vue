<template>
  <section class="page-module page-index">
    <!-- <div class="module-header">
      本拼图总奖池：2347.1267 BTO≈USD＄469,425.3400
    </div> -->
    <div class="deal_box" v-if="isundone">
      <div class="deal_left_box">
        <div class="card-box">
          <div class="grid-content_box" v-for="(intem,index) in works_undone" :key="intem.user_id" @click="chooseSerial(intem, index)">
                <!-- <div class="grid-content bg-purple">
                  <img v-bind:src="'http://'+intem.picture" alt="">
                  <div class="g-box-style gray_style"></div>
                </div> -->
                <serial-component :info="{'index':index, intem}"></serial-component>
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
      <div class="deal_right_box">
        <div class="card-box-right">
          <div class="box-right-title">
            <span style="margin-left:20px" v-if="islogin">{{$utils.getStorage('mobile')}}</span>
            <span style="margin-left:20px" v-else></span>
          </div>
           <el-tabs v-model="activeName"  stretch="true" style="font-weight: 500;">
            <el-tab-pane label="已购碎片" name="first" v-if="islogin&&serialLIst!=null" class="my_serial">
              
              <div class="ser_first">
                <div class="sf_box" v-for="intem in serialLIst.list" :key="intem">
                  <div>{{ intem.serial_no }}#</div>
                  <div><img v-bind:src="'http://'+intem.debris_picture" alt=""></div>
                  <div>
                    <p>剩余保护时间</p>
                    <p>
                      <count-down class="countClass2" v-on:end_callback="countDownE_cb(2)"  :startTime="intem.current_time" :endTime="intem.create_time + 60" :tipText="''" :tipTextEnd="''" :endText="''" :dayTxt="''" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
                      <!-- <span v-if="islogin&&serialLIst!=null&&isDone" class="isDone">0</span> -->
                    </p>
                    <p>{{ intem.price | defaultText}}BTO</p>
                  </div>
                  <div style="clear:both"></div>
                </div>
              </div>
              <div class="ser_middle">
                <span>累计投入</span>
                <span>{{ serialLIst.total_input }}</span>
              </div>
              <div class="ser_middle">
                <span>累计奖励</span>
                <span>{{ serialLIst.total_reward }}</span>
              </div>
              <div class="ser_middle">
                <span>收集完成将获得</span>
                <span>{{ serialLIst.total_complete }}</span>
              </div>
              <div class="ser_last">
                <div>
                  <span><img src="../../assets/images/license_black.jpg" alt="" width="38px"></span>
                  <span>版权证明</span>
                </div>
                <div>
                  <span><img src="../../assets/images/finder_black.jpg" alt="" width="35px"></span>
                  <span>作品文件</span>
                </div>
                <div>
                  <span><img src="../../assets/images/server_black.jpg" alt="" width="30px"></span>
                  <span>区块高度</span>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="排行榜" name="second">
              <div v-for="(intem,index) in rankinglist" :key="index" class="rank_box">
                  <div class="tab-left">
                    <div v-if="index != 0" v-bind:class="index < 3 ? 'topStyle' : ''">{{ index +1 }}#</div>
                  </div>
                  <div class="tab-right">
                    <!-- <div>1#</div> -->
                    <div>{{ intem.mobile }}</div>
                    <div style="text-align:center;margin:10px 0;" v-if="index == 0">
                      <img src="../../assets/images/camp.png" alt="">
                    </div>
                    <div v-if="index==0">已收集碎片</div>
                    <div style="float:left">
                      
                      <div style="padding: 10px 0px;">{{ intem.serial_no }}</div>
                    </div>
                    <div style="text-align: right;float:right;margin-top:11px">共{{ intem.total_price | defaultText}}bto</div>
                  </div>
                  <div style="clear:both"></div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="choose_box" v-if="chooseList!==null">
      <div class="choose_box_one">已选择{{ chooseList.serial_no }}#碎片</div>
      <div class="choose_box_two">购买价格:{{ chooseList.last_price }}BTO</div>
      <!-- <div></div> -->
      <div class="choose_box_btn" @click="bugNow">
        <count-down class="countClass" v-on:end_callback="countDownE_cb(1)"  :startTime="staTime" :endTime="enTime" :tipText="''" :tipTextEnd="''" :endText="''" :dayTxt="''" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
        <div style="margin-left: 20px;">立即购买</div>
      </div>
    </div>
    <div class="complete_box" v-if="!isundone">
      <product-component :info="{'type':'who', works_complete}"></product-component>
      <div class="intr_header">
        <p class="header_title">POT DISTRIBUTION</p>
        <p class="header_content_2">奖池分配</p>
      </div>
       <div class="completion_tab_box">
        <el-table :data="tableData" :span-method="objectSpanMethod"  style="width: 100%; margin-top: 20px">
          <el-table-column prop="distribution" label="总分配额" width="180" >
          </el-table-column>
          <el-table-column prop="name" label="分配对象">
          </el-table-column>
          <el-table-column prop="ratio" label="分配比例">
          </el-table-column>
          <el-table-column prop="quoda" label="分配额">
          </el-table-column>
          <el-table-column prop="other" label="备注">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <intr-component class="int_content" :info="OtherDetail" v-if="OtherDetail!=null"></intr-component>
    <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
  </section>
</template>

<script>
import { $utils } from '@helper'
import IntrComponent from '@views/partials/Introduction'
import ProductComponent from '@views/partials/Product'
import SerialComponent from '@views/partials/Serial'
import dayjs from 'dayjs'
import CountDown from '@views/partials/countdown'
import sdk from '../../util/bottosSDK.js'
import { setTimeout } from 'timers'


export default {
  name: 'Deal',

  props: {
  },

  data () {
    return {
      isDone: false,
      staTime: new Date(),
      enTime: new Date(),
      t1: null,
      clock: null,
      // isChoose: true,
      user: {
        lock: false,
        done: false
      },
      proStatus: {
        count: '',
        first_buy: null
      },
      chooseKey: null,
      chooseStatus: false,
      chooseList: null,
      serialLIst: null,
      islogin: false,
      isundone: true,
      works_undone: '',
      works_complete: '',
      activeName: 'second',
      rankinglist: '',
      OtherDetail: null,
      tableData: [{
        distribution: '',
        name: '作品完成者',
        ratio: '',
        quoda: '',
        other: '由作品完成者独享本部分奖励'
      }, {
        distribution: '',
        name: '首发购买者',
        ratio: '',
        quoda: '',
        other: '由首发购买者按照持有首发碎片数量分享奖励'
      }, {
        distribution: '',
        name: '所有购买者',
        ratio: '',
        quoda: '',
        other: '由所有购买者按照累积投入金额分享本部分奖励'
      }]
    }
  },

  components: {
    IntrComponent,
    ProductComponent,
    SerialComponent,
    CountDown
  },

  computed: {
    // countDown: function countDown() {
    //   let time = this.totalTime
    //   if (time <= 0) {
    //     return '立即购买'
    //   } else {
    //     var result = []
    //     // result.push(Math.floor(time / 3.6e+6))
    //     result.push(Math.floor(time % 3.6e+6 / 60))
    //     result.push(Math.floor(time % 60 / 1))
    //     return result.map(function (x) {
    //       return x < 10 ? '0' + x : x
    //     }).join(':')
    //   }
    // }
  },

  watch: {},

  created () {
    this.$store.commit('$showLoading')
    // 获取碎片
    this.getSeral()
    // 获取排行榜
    this.$apis.user.rankinglist({
      'id': '1'
    }).then(reslut => {
      // console.log('排行榜=====>', reslut)
      this.rankinglist = reslut.data.ranking_list
    }).catch(err => {
      this.$message.error(err)
    })
    // 获取作品详情OtherDetail
    this.$apis.user.OtherDetail({
      'id': '1'
    }).then(reslut => {
      // console.log('OtherDetail===>', reslut.data)
      this.OtherDetail = reslut.data
    }).catch(err => {
      this.$message.error(err)
    })
    // 获取作品首发购买情况
    $utils.getStorage('Token') ? this.bugLimit() : ''

    // 判断用户登录
    this.mySerial()
  },
  mounted () {
    let that = this
    this.t1 = setInterval(() => {
      that.getSeral()
      this.$apis.user.rankinglist({
        'id': '1'
      }).then(reslut => {
        // console.log('排行榜=====>', reslut)
        this.rankinglist = reslut.data.ranking_list
      }).catch(err => {
        this.$message.error(err)
      })
      // that.mySerial()
    }, 5000)
    if (this.works_complete !== '') {
      window.clearInterval(this.t1)
    }
  },

  filters: {
    defaultText(val) {
      return val
    }
  },
  beforeDestroy() {
    window.clearInterval(this.t1)
  },
  methods: {
    countDownE_cb (x) {
      if (x === 1) {
        this.getSeral()
      }
    },
    // 获取作品首发购买情况
    bugLimit () {
      this.$apis.user.WorksDebrisFirst({
        'worksID': '1',
        'user_id': $utils.getStorage('useid')
      }).then(reslut => {
        console.log('WorksDebrisFirst===>', reslut.data)
        // this.OtherDetail = reslut.data
        this.proStatus.count = reslut.data.count
        this.proStatus.first_buy = reslut.data.first_buy
      }).catch(err => {
        this.$message.error(err)
      })
    },
    // 购买逻辑
    bugNow () {
      let { Wallet, Tool } = sdk
      if (!$utils.getStorage('Token')) {
        this.$parent.checkState(true)
        return
      }
      let PSW = {
        'crypto': {
          'cipher': 'aes-128-ctr',
          'cipherparams': {
            'iv': '13fb92a9dd9a581e5973976728d743d7'
          },
          'ciphertext': '6ff2ca3d6a40f570561f70a07897e119153a10257ca648a640f049919ab0b60a',
          'kdf': 'scrypt',
          'kdfparams': {
            'dklen': 32,
            'n': 65536,
            'p': 1,
            'r': 8,
            'salt': 'ceeb934724ef2c1275e619ac9a04bd95f93383a3fe58d79a1f96ad2938de9dd5'
          },
          'mac': '9271feffe5ecb89461275efb28115bfa726721a500429ceb085c1d5150c6ce33'
        },
        'id': '76e84db3-091c-464f-8757-648039fd5c24',
        'version': 3,
        'account': 'wangdenghui'
      }
      let privatekeyBuf = Wallet.recover('2015jusanban', PSW)
      let prStr = Tool.buf2hex(privatekeyBuf).toString()
      Wallet.sendTransaction({
        from: 'wangdenghui',
        to: 'ouyangxinming',
        value: this.chooseList.last_price,
        memo: 'send'
      }, prStr)
      .then(result => {
        console.log('result=======', result)
        setTimeout(() => {
          window.open('http://exblock.bottos.org:8888/#/blockchain/transactionsDetail/' + result.result.trx_hash)
        }, 3000)
        this.$apis.user.WorksTradingAdd({
          'worksID': this.chooseList.works_id,
          'debrisID': this.chooseList.serial_no,
          'dealPrice': this.chooseList.last_price,
          'fromAddress': 'wangdenghui',
          'toAddress': 'ouyangxinming',
          'time': Math.round(new Date().getTime() / 1000).toString(),
          'hash': result.result.trx_hash,
          'isown': 1,
          'user_id': $utils.getStorage('useid')
        }).then(result => {
          console.log(result)
          this.$message(result.msg)
          this.chooseList = null
          this.works_undone.map((n, key) => {
            n.isChoose = false
          })
          this.getSeral()
          this.mySerial()
          // 获取作品首发购买情况
          this.bugLimit()
        }).catch(err => {
          this.$message.error(err)
        })
      })
    .catch(e => {
      console.log('error =======', e)
    })
    },
    getSeral () {
      this.$apis.user.debriscomplete({
        'id': '1'
      }).then(reslut => {
        this.works_undone = null
        this.works_complete = null
        if (reslut.data.works_undone !== '') {
          this.isundone = true
          reslut.data.works_undone.map((n, index) => {
            if (n.create_time !== null) {
              if (dayjs.unix(n.create_time).add(1, 'minute').diff(dayjs.unix(n.current_time), 'second') > 0) {
                n.status = 'protected'
                n.endtime = dayjs.unix(n.create_time).add(60, 'second')
              } else {
                n.status = 'optional'
                n.endtime = dayjs.unix(n.last_time).add(600, 'second')
              }
            } else {
              n.status = 'Starting'
            }
            n.isChoose = false
            n.isShow = false
            if (index === this.chooseKey && this.chooseStatus && n.status !== 'protected') {
              n.isChoose = true
            }
          })
          this.works_undone = reslut.data.works_undone
          // console.log('works_undone==>', this.works_undone)
        } else if (reslut.data.works_complete !== '') {
          this.isundone = false
          this.works_complete = reslut.data.works_complete
          this.getpoolallocationLIst()
          console.log('works_complete', this.works_complete)
        } else {
          this.$message.error('暂无数据')
        }
      }).catch(err => {
        this.$message.error(err)
      }).fin(() => {
        this.$store.commit('$hideLoading')
      })
    },
    chooseSerial(intem, index) {
      console.log('intem', intem)
      if (intem.status === 'protected') {
        this.$alert('该碎片正在受到保护！', '提示', {
          confirmButtonText: '确定',
          confirmButtonClass: 'choose_box_btn',
          showConfirmButton: false
        })
        return
      }
      console.log('this.proStatus.count', this.proStatus.count)
      console.log('this.proStatus.first_buy', this.proStatus.first_buy)
      if (intem.status === 'Starting' && this.proStatus.count === this.proStatus.first_buy) {
        this.$alert('您已达到首发购买限制!', '提示', {
          confirmButtonText: '确定',
          confirmButtonClass: 'choose_box_btn',
          showConfirmButton: false
        })
        return
      }
      this.works_undone.map((n, key) => {
        if (index === key) {
          console.log('intem.status--', intem.status)
          intem.isChoose = !intem.isChoose
          if (intem.isChoose) {
            this.chooseList = intem
            this.chooseKey = key
            this.chooseStatus = true
          } else {
            this.chooseList = null
            this.chooseKey = null
            this.chooseStatus = false
          }
        } else {
          n.isChoose = false
          // this.$message.error('该碎片正在收到保护')
        }
      })
    },
    open() {
      console.log('关闭')
      this.$alert('您已经买过一个了哟，请三分钟后再次购买其他碎片', '提示', {
        confirmButtonText: '确定'
      })
    },
    getpoolallocationLIst() {
      this.$apis.user.poolallocation({
        'id': '1'
      }).then(reslut => {
        // console.log('poolallocation=====>', reslut)
        // this.poolallocation = reslut.data.ranking_list
        this.tableData = [{
          distribution: reslut.data.total_distribution,
          name: '作品完成者',
          ratio: reslut.data.works_complete_ratio,
          quoda: reslut.data.works_complete_quoda + ' BTO',
          other: '由作品完成者独享本部分奖励'
        }, {
          distribution: reslut.data.total_distribution,
          name: '首发购买者',
          ratio: reslut.data.works_first_ratio,
          quoda: reslut.data.works_first_quoda + ' BTO',
          other: '由首发购买者按照持有首发碎片数量分享奖励'
        }, {
          distribution: reslut.data.total_distribution,
          name: '所有购买者',
          ratio: reslut.data.works_all_ratio,
          quoda: reslut.data.works_all_quoda + ' BTO',
          other: '由所有购买者按照累积投入金额分享本部分奖励'
        }]
      }).catch(err => {
        this.$message.error(err)
      })
    },
    objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    mySerial () {
      // $utils.getStorage('useid') == null ?s
      if ($utils.getStorage('useid') == null) {
        return
      }
      this.islogin = true
      this.$apis.user.purchasedebris({
        'id': '1',
        'user_id': $utils.getStorage('useid')
      }).then(reslut => {
        if (reslut.data.list !== '') {
          // console.log('我的碎片=====>', reslut)
          // this.serialLIst.list = null
          // this.serialLIst = null
          this.serialLIst = reslut.data
        }
      }).catch(err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="scss">
@import './../../assets/scss/variables.scss';
@import './../../assets/scss/mixins.scss';

.page-index{
  .rank_box{
    padding: 10px 0 10px 10px;
    border-bottom: 1px solid #01365d;
  }
  // .click_choose{
  //   position: absolute;
  //   top: 90px;
  //   z-index: 3;
  //   left: 100px;
  // }
  .isDone{
    display: inline-block;
    float: left;
    margin-top: -15px;
  }
  a{
    color: #ffffff;
  }
  .countClass{
    margin-left: 15px;
  }
  .countClass2{
    // margin-left: 15px;
    float: none !important;
    width: 80px !important;
    height: 20px !important;
  }
  .choose_box{
    height: 57px;
    background-color: #ffffff;
    margin: 10px 0 0 70px;
    width: 800px;
    border-radius: 6px;
    position: fixed;
    bottom: 0px;
    z-index: 10;
    div{
      float: left;
    }
    .choose_box_one{
      height: 57px;
      width: 200px;
      text-align: center;
      line-height: 57px;
    }
    .choose_box_two{
      height: 57px;
      width: 400px;
      text-align: left;
      line-height: 57px;
    }
    .choose_box_btn {
      float: right;
      width: 100px;
      margin-top: 12px;
      color: #5ea0cf;
      background-color: #d5e8f5;
      border: none;
      height: 34px;
      text-align: center;
      line-height: 34px;
      margin-right: 40px;
      cursor: pointer;
    }

    .choose_box_btn:hover {
      background: #a8d3f1;
    }

    .choose_box_btn:active {
      box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
    }
  }
  .my_serial{
    .ser_first{
      width: 100%;
      height: 400px;
      border-bottom: 1px solid #01365d;
      // overflow:scroll;
      .sf_box{
        width: 230px;
        height: 80px;
        div:nth-child(1){
          // display: inline-block;
          float: left;
          width: 28px;
          height: 80px;
        }
        div:nth-child(2){
          // display: inline-block;
          float: left;
          width: 65px;
          height: 65px;
          background-color: #ffffff;
          display:flex;
          align-items:center; 
          justify-content:center;
          img{
             width: 63px;
             height: auto;
          }
        }
        div:nth-child(3){
          // display: inline-block;
          float: left;
          width: 130px;
          height: 80px;
          font-size: 12px;
          font-weight: 400;
          overflow: hidden;
          p{
            padding: 5px 0 0 15px;
          }
        }
      }
    }
    .ser_middle{
      padding: 0 8px;
      width: 100%;
      height: 30px;
      border-bottom: 1px solid #01365d;
      line-height: 30px;
      span:nth-child(1){
        display: inline-block;
        width: 45%;
      }
      span:nth-child(2){
        display: inline-block;
        width: 52%;
        text-align: right;
      }
    }
    .ser_last{
      width: 100%;
      height: 87px;
      div{
        display: inline-block;
        width: 32%;
        height: 87px;
        span{
          display: block;
          font-size: 12px;
          font-weight: 400;
          text-align: center;
          margin-top: 12px;
          // img{
          //   width: 20px;
          // }
        }
      }
    }
  }
  .topStyle{
    color: #83fff8;
  }
  .deal_left_box{
    float: left;
    width: 940px;
    padding: 60px 70px;
  }
  .deal_right_box{
    width: 260px;
    float: right;
  }
  .el-main{
    position: relative;
  }
  .g-box-style{
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    z-index: 2;

  }
  .choose_one{
        position: absolute;
    top: 85px;
    left: 98px;
  }
  .card-box{
    width: 800px;
    // height: 576px;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // margin-top: -288px;
    // margin-left: -400px;
    background: #ffffff;
    // padding: 12px 17px;
    padding: 10px 14px;
        padding: 2px 14px 12px 5px;
  }
  .el-row{
    
  }
  .el-col-8{
    margin: 4px 0px;
  }
  .card-box-right{
    height: 670px;
    background-color: #1B282D;
    color: #ffffff;
    border-bottom: 4px solid #08223d;
  }
  .box-right-title{
    height: 35px;
    background: linear-gradient(#092a42, #091e3b, #0a1133);
    color: #ffffff;
    line-height: 35px;
    font-weight: 800;
  }
  .is-active {
    color: #83fff8 !important;
    // border-bottom: 2px solid #83fff8 !important;
  }
  .el-tabs__item:hover{
    color: #83fff8;
    cursor: pointer;
  }
  .el-tabs__active-bar{
    background-color: #83fff8;
  }
  .el-tabs__nav-wrap::after{
    background-color:#252d2d;
  }
  .el-tabs__item{
    color:#ffffff;
  }
  .tab-left{
    float: left;
    width: 28px;
    text-align: center;
    font-size: 17px;
    padding: 0 0 3px 0;
  }
  .tab-right{
    float: left;
    width: 200px;
  }
  .grid-content_box{
    float: left;
    width: 33.33333%;
    padding-left: 8px;
    padding-top: 9px;
    position: relative;
    .click_choose{
    position: absolute;
    top: 90px;
    z-index: 3;
    left: 100px;
  }
  .click_choose_box{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 4;
  }
  }
  .grid-content{
    height: 270px;
    // background: url('../../assets/images/demo.jpg') no-repeat;
    background-size: cover;
    box-shadow: 0px 5px 19px -1px #888888;
    position: relative;
    overflow: hidden;
    display:flex;
    align-items:center; 
    justify-content:center;
    img{
      width: auto;
      height: 100%;
    }
  }
  .int_content{
    width: 1200px;
    margin: 0 auto;
  }
  .dark_style{
    background: #000000;
  }
  .gray_style{
    background: #909399;
  }
  .blue_style{
    background: #93C99D;
  }

  .intr_header {
      // width: 1200px;
      // margin: 0 auto;
      color: #FFFFFF;
      height: 80px;
      margin-top: 80px;
    }

    .header_title {
      font-size: 24px;
      font-weight: 600;

    }

    .header_content_2 {
      margin-left: 5px;
      margin-top: 10px;
      color: #b5b8ba;
      font-size: 13px;
    }

    .box-right-title {
      height: 35px;
      background: linear-gradient(#092a42, #091e3b, #0a1133);
      color: #ffffff;
      line-height: 35px;
      font-size: 15px;
      // font-weight: 800;
    }
    .el-table tr{
      background-color:#1b282d
    }
    .completion_tab_box {
      background: #1B282D;
      color: #c3c3c3;
      // padding: 0px 0px 18px 0px;
      font-size: 18px;
      border-bottom: 4px solid #08223d;
      .el-table,thead{
        color: #ffffff;
      }
      .el-table::before {
          content: '';
          position: absolute;
          /* background-color: #ebeef5; */
          z-index: 0;
      }
      th{
        background: linear-gradient(#092a42, #091e3b, #0a1133);
        border: none;
      }
      td{
        background: #1B282D;
        border-bottom: 1px solid #01365d;
      }
      ul {
        height: 50px;
      }

      li {
        float: left;
        width: 20%;
        text-align: center;
        line-height: 50px;
      }
    }
    tr {
        background-color: #1B282D !important;
      }
      tr:hover{
        background-color: #1B282D !important;
      }
      .el-table--enable-row-hover .el-table__body tr:hover>td{
        background-color:#1B282D !important;
      }
}
</style>
