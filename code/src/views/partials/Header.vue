<template>
  <header class="header">
    <div class="header_box">
      <h1 class="logo">
        <router-link to="/">
          <img src="../../assets/images/logo.jpg" alt="vue-boilerplate-template">
        </router-link>
      </h1>
      <div class="menuBlock">
        <div class="navLeft">
          <el-menu :default-active="activeIndex" class="el-menu-mine" mode="horizontal" @select="handleSelect"
            background-color="#000000" text-color="#fff">
            <el-menu-item index="deal">游戏</el-menu-item>
            <el-menu-item index="mine">
              <icon name="account"></icon>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { $utils } from '@helper'
import Vue from 'vue'
import Cookies from 'js-cookie'

export default {
  name: 'header',
  data () {
    return {
      user: {},
      activeIndex: '1'
    }
  },

  components: {
  },

  computed: {
  },

  methods: {
    handleSelect(key, keyPath) {
      if (key === 'mine') {
        if ($utils.getStorage('Token')) {
          this.$router.push(`/page/${key}`)
        } else {
          this.$emit('login-state', true)
        }
      } else {
        this.$router.push(`/page/${key}`)
      }
    },
    /* ----------------------------On Click Event---------------------------- */
    onLogoutClick () {
      this.$apis.user.logout().then(result => {
        Cookies.remove('isLogin')

        this.$store.commit('$vuexSetUserInfo', {})
        this.$router.push('/login')
      }).catch((err) => {
        this.$router.push('/')
        this.$message.error(err.msg)
      })
    },

    onSwitchClick () {
      let targetLang = this.$currentLang === 'zh' ? 'en' : 'zh'
      Cookies.set('lang', targetLang)
      Vue.config.lang = targetLang
    }
  }
}
</script>

<style type="text/css" lang="scss">
  @import './../../assets/scss/variables.scss';
  @import './../../assets/scss/mixins.scss';

  #app .header {
    position: fixed;
    height: $header-height;
    width: 100%;
    min-width: 320px;
    background-color: $black;
    z-index: 999;
    @include clearfix();
    .header_box{
        width: 1200px;
        height: 70px;
        margin: 0 auto;
    }

    a {
      &:hover,
      &:focus {
        text-decoration: none;

        span {
          text-decoration: none;
        }
      }
    }

    .logo {
      float: left;
      padding: 20px 0 8px 35px;

      img {
        display: inline-block;
        vertical-align: middle;
        width: 130px;
        height: auto;
        margin-right: 10px;
      }
    }

    .title {
      display: inline-block;
      vertical-align: middle;
      font-size: $font-large;
      color: #fff;
    }

    .notification {
      float: right;
      padding: 20px;

      &:hover {
        background-color: $header-bg;
      }
    }

    .operate {
      float: right;
      position: relative;
      margin-right: 15px;

      &:hover {
        .dropmenu {
          display: block;
          width: 100%;
          min-width: 150px !important;
        }

        .account {
          background-color: $header-bg;
        }
      }

      .account {
        height: $header-height;
        @include flex-box-center(row);
        color: #fff;
      }

      .icon-account {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }
  }

  .menu {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px 15px 10px;
    width: 70px;
    height: 70px;
  }

  .menu span:after,
  .menu span:before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
  }

  .menu span:after {
    top: 18px;
  }

  .menu span {
    position: relative;
    display: block;
  }

  .menu span,
  .menu span:after,
  .menu span:before {
    width: 100%;
    height: 3px;
    background-color: #fff;
    -webkit-transition: all 0.3s;
    backface-visibility: hidden;
  }

  .menu-expand .menu span {
    background-color: transparent;
  }

  .menu-expand .menu span:before {
    transform: rotate(45deg) translate(2px, 2px);
  }

  .menu-expand .menu span:after {
    transform: rotate(-45deg) translate(4px, -5px);
  }

  // .dropmenu{
  //   .icon{
  //     vertical-align: middle;
  //     margin: .1rem .5rem .1rem .1rem;
  //   }
  // }
  .navRight {
    float: right;
    height: 70px;
    line-height: 70px;
    margin-right: 20px;
    width: 30px;

    .icon {
      vertical-align: middle;
      margin: .1rem .5rem .1rem .1rem;
    }
  }

  .navLeft {
    float: left;
  }

  .dropStyle {
    float: right;
    height: 100%;
    line-height: 70px;
    color: #ffffff;
    margin-right: 30px;
    cursor: pointer;

  }

  .header .is-active {
    color: rgb(255, 255, 255) !important;
    border-bottom: 2px solid #83fff8 !important;
  }

  .menuBlock {
    float: right;
  }

  .el-menu-mine {
    border-bottom: 1px solid #3c3c3c !important;
  }

  .el-menu-item {
    height: 70px !important;
    line-height: 70px !important;
  }

  @media (max-width:768px) {
    #app .header {
      .menu {
        display: block;
      }

      .logo {
        text-align: center;
        @include absolute-center;
        float: none;
        padding: 0;

        img {
          margin-right: 5px;
        }
      }

      .operate {
        .account {
          max-width: 80px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }

</style>
