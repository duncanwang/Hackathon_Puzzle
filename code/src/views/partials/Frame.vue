<template>
  <div class="page-frame">
    <header-component @login-state='checkState'></header-component>
    <!-- <div class="frame-content"> -->
    <!-- <side-nav></side-nav> -->
    <div class="module-header">
      {{ indexTitle }}
    </div>
    <main @click="onHideMenuClick">
      <router-view class="module_block"></router-view>
    </main>
    <loading v-if="LOADING"></loading>
    <!-- </div> -->
    <footer-component class="frame_footer"></footer-component>
    <el-dialog :title="title" :visible.sync="isdialog" width="500px" :before-close="handleClose" class="login_dialog" @close="dialogClose">
      <div class="dialog_box" v-show="dialogStatus==1">
        <!-- 登录 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item label="" prop="tal">
            <div class="phone_num_box">
              <phone-input :phone='phone' placeholder="请输入号码"></phone-input>
            </div>
            <el-input class="phone_num_input" v-model.number="ruleForm.tal" autocomplete="off" placeholder="请输入号码"
              @change='talChange'></el-input>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm','loginIn')" class="comfim_btn">立即登录</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
          <div class="other_choose">
            <div @click="forgetPsw">忘记密码</div>
            <div @click="registerNow">立即注册</div>
          </div>
        </el-form>
      </div>
      <div class="dialog_box" v-show="dialogStatus==2">
        <!-- 忘记密码 -->
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0px" class="demo-ruleForm">
          <el-form-item label="" prop="tal">
            <div class="phone_num_box">
              <phone-input :phone='phone' placeholder="请输入号码"></phone-input>
            </div>
            <el-input class="phone_num_input" v-model.number="ruleForm2.tal" autocomplete="off" placeholder="请输入号码"
              @change='talChange'></el-input>
          </el-form-item>
          <el-form-item label="" prop="verifyCode">
            <div class="getcode" @click="getregCode('ruleForm2')" v-show="regShow" style="z-index:2;">{{ this.regCode }}</div>
            <div class="getcode" v-show="!regShow">{{ this.regCount }}</div>
            <el-input v-model="ruleForm2.verifyCode" autocomplete="off" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" placeholder="再次确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2','forgetIn')" class="comfim_btn">立即登录</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
          <!-- <div class="other_choose">
            <div>忘记密码</div>
            <div>立即注册</div>
          </div> -->
        </el-form>
      </div>
      <div class="dialog_box" v-show="dialogStatus==3">
        <!-- 立即注册 -->
        <el-form :model="ruleForm3" status-icon :rules="rules3" ref="ruleForm3" label-width="0px" class="demo-ruleForm">
          <el-form-item label="" prop="tal">
            <div class="phone_num_box">
              <phone-input :phone='phone' placeholder="请输入号码"></phone-input>
            </div>
            <el-input class="phone_num_input" v-model.number="ruleForm3.tal" autocomplete="off" placeholder="请输入号码"
              @change='talChange'></el-input>
          </el-form-item>
          <el-form-item label="" prop="verifyCode">
            <div class="getcode" @click="getregCode('ruleForm3')" v-show="regShow" style="z-index:2;">{{ this.regCode }}</div>
            <div class="getcode" v-show="!regShow">{{ this.regCount }}</div>
            <el-input v-model="ruleForm3.verifyCode" autocomplete="off" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="pass">
            <el-input type="password" v-model="ruleForm3.pass" autocomplete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input type="password" v-model="ruleForm3.checkPass" autocomplete="off" placeholder="再次确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm3','registerIn')" class="comfim_btn">立即登录</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
          <!-- <div class="other_choose">
            <div>忘记密码</div>
            <div>立即注册</div>
          </div> -->
        </el-form>
      </div>
    </el-dialog>
    <!-- 账号登录提示 -->
    <el-dialog title="登录" :visible.sync="noActivate" width="500px" :before-close="handleClose" class="center_box">
      <span>请打开您的metamask并点击“login”(登录)将要求您在钱包中进行数字签名，并将其与puzzlebid链接</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="noActivate=false" class="comfim_btn">去打开</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  // import SideNav from '@views/partials/SideNav'
  // import Web3 from 'web3'
  import HeaderComponent from '@views/partials/Header'
  import RoutesMapConfig from '@router/routes'
  import FooterComponent from '@views/partials/Footer'
  import PhoneInput from '@views/partials/PhoneInput'
  import Loading from '@views/partials/Loading'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'Frame',

    props: {},

    data() {
      var checkTal1 = (rule, value, callback) => {
        console.log(rule)
        console.log(value)
        if (!value) {
          return callback(new Error('号码不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            console.log('value====', value)
            console.log(typeof value)
            console.log('q====', Number.isInteger(value))
            callback(new Error('请输入电话号码'))
          } else {
            callback()
          }
        }, 1000)
      }
      var checkTal2 = (rule, value, callback) => {
        console.log(rule)
        console.log(value)
        if (!value) {
          return callback(new Error('号码不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            console.log('value====', value)
            console.log(typeof value)
            console.log('q====', Number.isInteger(value))
            callback(new Error('请输入电话号码'))
          } else {
            callback()
          }
        }, 1000)
      }
      var checkTal3 = (rule, value, callback) => {
        console.log(rule)
        console.log(value)
        if (!value) {
          return callback(new Error('号码不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            console.log('value====', value)
            console.log(typeof value)
            console.log('q====', Number.isInteger(value))
            callback(new Error('请输入电话号码'))
          } else {
            callback()
          }
        }, 1000)
      }
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm3.checkPass !== '') {
            this.$refs.ruleForm3.validateField('checkPass')
          }
          callback()
        }
      }
      // var LogValidatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'))
      //   } else {
      //     if (this.ruleForm2.checkPass !== '') {
      //       this.$refs.ruleForm.validateField('checkPass')
      //     }
      //     callback()
      //   }
      // }
      var LogValidatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var LogValidatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm3.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      var checkverifyCode = (rule, value, callback) => {
        console.log()
        if (!value) {
          return callback(new Error('验证码不能为空'))
        } else {
          // if (this.ruleForm3.verifyCode !== '') {
          //   this.$refs.ruleForm3.validateField('verifyCode')
          // }
          callback()
        }
      }
      return {
        // regtime: 60,
        indexTitle: '累计交易额：2347.1267 BTO≈USD＄469,425.3400',
        regShow: true,
        regCount: 0,
        regCode: '获取验证码',
        dialogStatus: 1,
        noActivate: false,
        errorMask: false,
        showMask: false,
        title: '登录您的账户',
        isdialog: false,
        dialogVisible: false,
        phone: {
          code: '86',
          number: ''
        },
        // tal: '',
        ruleForm: {
          pass: '',
          checkPass: '',
          tal: ''
        },
        rules: {
          pass: [{
            validator: validatePass1,
            trigger: 'blur'
          }],
          tal: [{
            validator: checkTal1,
            trigger: 'blur'
          }]
        },
        ruleForm2: {
          pass: '',
          checkPass: '',
          tal: '',
          verifyCode: ''
        },
        rules2: {
          pass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: LogValidatePass2,
            trigger: 'blur'
          }],
          verifyCode: [{
            validator: checkverifyCode,
            trigger: 'blur'
          }],
          tal: [{
            validator: checkTal2,
            trigger: 'blur'
          }]
        },
        ruleForm3: {
          pass: '',
          checkPass: '',
          tal: '',
          verifyCode: ''
        },
        rules3: {
          pass: [{
            validator: validatePass3,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: LogValidatePass3,
            trigger: 'blur'
          }],
          verifyCode: [{
            validator: checkverifyCode,
            trigger: 'blur'
          }],
          tal: [{
            validator: checkTal3,
            trigger: 'blur'
          }]
        }
      }
    },
    watch: {
      islogin(newVal) {
        // console.log('laile', newVal)
        this.isdialog = newVal
      },
      ruleForm(newVal) {
        console.log(newVal)
      }
    },
    created() {
      /*
        Desc: 请求用户信息;当然，如果你在登录时候返回，可删除此行。
      */
      this.$gameConfigInfo()
      // this.checkMetamask()
      // this.$store.dispatch('$gameConfigInfo')
      // this.initMenuList()
      // if (!window.web3) {
      //   window.alert('Please install MetaMask first.')
      //   return
      // }
      console.log('我进来啦!')
      // this.$store.dispatch('$registerWeb3')
    },
    computed: {
      islogin() {
        return !this.$store.state.islogin
      },
      // noActivate() {
      //   return !this.$store.state.noActivate
      // },
      ...mapState({
        // noActivate: state => state.web3.noActivate,
        LOADING: state => state.LOADING
      })
    },
    components: {
      // SideNav,
      HeaderComponent,
      FooterComponent,
      PhoneInput,
      Loading
    },

    methods: {
      dialogClose() {
        this.dialogStatus = 1
        this.$refs['ruleForm'].resetFields()
        this.$refs['ruleForm2'].resetFields()
        this.$refs['ruleForm3'].resetFields()
      },
      regtimer() {
        const TIME_COUNT = 10
        if (!this.timer) {
          this.regCount = TIME_COUNT
          this.regShow = false
          let timer = setInterval(() => {
            if (this.regCount > 0) {
              this.regCount--
            } else {
              this.regShow = true
              clearInterval(timer)
              timer = null
              this.regCode = '重新获取'
            }
          }, 1000)
        }
      },
      getregCode(formName) {
        console.log(this.$refs[formName])
        console.log('3', formName)
        this.$refs[formName].validateField('tal', (reslut) => {
          console.log(reslut)
          if (reslut) {
            console.log('成功')
          } else {
            this.regtimer()
            let that = this
            this.$apis.user.SendMobile({
              'type': formName === 'ruleForm2' ? 1 : 0,
              'area_code': this.phone.code,
              'mobile': formName === 'ruleForm2' ? this.ruleForm2.tal : this.ruleForm3.tal
            }).then(result => {
              console.log('result======', result)
            }).catch((err) => {
              that.$message.error(err)
            })
          }
        })
      },
      registerNow() {
        this.title = '创建一个账户'
        this.dialogStatus = 3
        this.resetForm('ruleForm2')
      },
      forgetPsw() {
        this.title = '找回密码'
        this.dialogStatus = 2
        this.resetForm('ruleForm')
      },
      // // 检查metamask插件情况
      // checkMetamask() {
      //   let that = this
      //   new Promise(function (resolve, reject) {
      //     var web3js = window.web3
      //       // 检查是否安装插件
      //     if (typeof web3js !== 'undefined') {
      //       var web3 = new Web3(web3js.currentProvider)
      //       resolve(web3)
      //     } else {
      //       that.showMask = true
      //     }
      //   })
      //     .then(result => {
      //       // 检查是否登录
      //       return new Promise(function (resolve, reject) {
      //         result.eth.getAccounts((err, accounts) => {
      //           if (err) {
      //             reject(new Error('Unable to retrieve balance for address: ' + accounts))
      //           } else {
      //             if (accounts.length === 0) {
      //               that.noActivate = true
      //             } else {
      //               resolve(result)
      //             }
      //           }
      //         })
      //       })
      //     })
      //     .then(result => {
      //       return new Promise(function (resolve, reject) {
      //         // 检查 network ID
      //         result.version.getNetwork((err, networkId) => {
      //           if (err) {
      //             reject(new Error('Unable to retrieve network ID'))
      //           } else {
      //             if (networkId !== '4') {
      //               that.errorMask = true
      //             }
      //             console.log('networkId------', networkId)
      //             resolve(result)
      //           }
      //         })
      //       })
      //     })
      //     .then(result => {
      //       return new Promise(function (resolve, reject) {
      //         // 检查 network ID
      //         result.eth.getBlockNumber((err, number) => {
      //           if (err) {
      //             reject(new Error('Unable to retrieve network ID'))
      //           } else {
      //             console.log('number------', number)
      //             resolve(result)
      //           }
      //         })
      //       })
      //     })
      // },
      checknetwork() {
        console.log('!!!!!!!!!!!!!!!!', this.network)
      },
      showwatMask() {
        this.showMask = false
      },
      // checkoukMask() {
      //   if (!window.web3) {
      //     this.showMask = true
      //     return
      //   }
      //   // this.$store.dispatch('$registerWeb3')
      // },
      openMatemask() {
        // this.noActivate = true
        // this.$store.commit('$isLogin', false)
        // this.$store.commit('$noActivate', true)
        console.log('noActivate----', this.noActivate)
        console.log('accounts----', this.accounts)
      },
      loginIn() {
        let that = this
        this.$apis.user.login({
          'area_code': this.phone.code,
          'mobile': this.ruleForm.tal,
          'password': this.ruleForm.pass
        }).then(result => {
          console.log('result======', result)
          // if (result.status === 200) {
          that.$store.commit('$vuexSetUserInfo', result.data)
          that.$store.commit('$setToken', result.data.api_token)
          location.reload()
          // }
        }).catch((err) => {
          console.log('err=======', err)
          that.$message.error(err)
        }).fin(() => {
          that.isdialog = false
        })
      },
      forgetIn() {
        let that = this
        this.$apis.user.reset({
          'area_code': this.phone.code,
          'mobile': this.ruleForm2.tal,
          'password': this.ruleForm2.pass,
          'repassword': this.ruleForm2.checkPass,
          'verify_code': this.ruleForm2.verifyCode
        }).then(result => {
          console.log('result======', result)
          this.title = '登录'
          this.dialogStatus = 1
          this.$message({
            message: '修改成功，请重新登录',
            type: 'success'
          })
        }).catch((err) => {
          console.log('err=======', err)
          that.$message.error(err)
        }).fin(() => {
          // that.isdialog = true
        })
      },
      registerIn() {
        let that = this
        // that.$message.error('errrrrrrrrr!!!!')
        // console.log('jiuhhh', )
        this.$apis.user.register({
          'area_code': this.phone.code,
          'mobile': this.ruleForm3.tal,
          'password': this.ruleForm3.pass,
          'repassword': this.ruleForm3.checkPass,
          'verify_code': this.ruleForm3.verifyCode
        }).then(result => {
          console.log('asasasas', result)
          this.$message({
            message: '注册成功，请登录',
            type: 'success'
          })
          this.title = '登录'
          this.dialogStatus = 1
        }).catch((err) => {
          console.log('err=======', err)
          that.$message.error(err)
        }).fin(() => {
          // that.isdialog = false
        })
      },
      submitForm(formName, evenName) {
        // console.log(this.phone)
        // this.isdialog = false
        // this.checkMetamask()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            switch (evenName) {
              case 'loginIn':
                this.loginIn()
                break
              case 'registerIn':
                this.registerIn()
                break
              case 'forgetIn':
                this.forgetIn()
                break
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
        // console.log(this.$store.state.contractInstance())
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      getCode() {
        console.log(this.phone)
      },
      checkState(data) {
        this.isdialog = data
        console.log('======', data)
      },
      initMenuList() {
        /*
          Desc:
            初始化侧边栏；当然，侧边栏配置一般由前后端共同作用;
            如果你的需求也是如此，那么，在 vuex 的 action 发起请求，是一个不错的选择；
            为了避免每次刷新界面都发起请求，应将 menuList 持久化存储（localStorage）
            鉴于没个项目有所区别，这部分实现，在现有代码中已省略，相信您会处理的更好。
          Date: update@2017-10-20
        */
        const routesConf = this.$_.cloneDeep(RoutesMapConfig)
        const menuList = this.filterNodeByName(routesConf, 'isHideInMenu')
        this.$setMenuList(menuList)
      },

      filterNodeByName(source, name) {
        let result = source.filter(function cFilter(item) {
          if (!item[name]) {
            item.children && (item.children = item.children.filter(cFilter))
            return true
          } else {
            return false
          }
        })
        return result
      },

      onHideMenuClick() {
        document.getElementById('app').className = ''
      }
    },
    mounted() {
      // this.$message.error('jijihihihi')
      this.isdialog = !this.$store.state.islogin
      // this.$store.dispatch('$getContractInstance')
      // console.log(this.$store.contractInstance())
    }
  }

</script>

<style lang="scss">
  .page-frame {
    // height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

    a {
      display: block;
      text-decoration: none;
      // color: $black;

      // padding: 10px 10px 10px 20px;
      &:hover,
      &:focus {
        text-decoration: none;
        // color: $brand;
      }
    }

    .el-dialog__title {
      border-bottom: 3px solid #d5e8f5;
    }

    .frame-content {
      flex: 1;
      display: flex;
    }

    main {
      flex: 1;
      width: 100%
    }

    .getcode {
    position: absolute;
    right: 0;
    z-index: 1;
    color: #5ea0cf;
    background-color: #d5e8f5;
    font-size: 12px;
    /* padding: 0 10px; */
    cursor: pointer;
    width: 100px;
    text-align: center;
    }

    .module_block {
      padding: 0 0 48px 0;
      width: 1200px;
      margin: 0 auto 0px auto;
    }

    .frame_footer {
      background: #000000;
    }

    .el-dialog {
      // width: 500px;
      // height: 360px;
    }

    .el-dialog__body {
      padding: 30px 20px 50px 20px;
    }

    .el-input__inner {
      border-radius: 0;
      border: none;
      border-bottom: 1px solid #dcdfe6;
    }

    .dialog_box {
      padding: 0px 80px;
    }

    .phone_num_box {
      position: absolute;
    }

    .phone_num_input {
      input {
        padding-left: 111px;
      }
    }

    .comfim_btn {
      width: 300px;
      font-size: 20px;
      margin-top: 12px;
      color: #5ea0cf;
      background-color: #d5e8f5;
      border: none;
    }

    .comfim_btn:hover {
      background: #a8d3f1;
      // border-color: #66b1ff;
      // color: #fff;
      // box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
    }

    .comfim_btn:active {
      // border:1px solid #66b1ff;
      // border-color: #66b1ff;
      box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2);
    }

    .other_choose {
      font-size: 13px;
      color: #5ea0cf;
      cursor: pointer;

      div:nth-child(1) {
        float: left;
      }

      div:nth-child(2) {
        float: right;
      }
    }

    .center_box {
      .el-dialog__footer {
        text-align: center
      }
    }
  }

</style>
