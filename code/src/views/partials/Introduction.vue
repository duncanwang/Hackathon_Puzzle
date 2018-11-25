<!--  -->
<template>
  <div class='Introduction'>
    <div class="intr_header">
      <p class="header_title">ABOUT THE ARTWORK</p>
      <p class="header_content">关于艺术品</p>
    </div>
    <div class="intr_block_box">
      <div class="intr_title">
        <div class="block_left block_b"><img v-bind:src="'http://'+info.artist_picture" alt=""></div>
        <div class="block_right block_b">
          <div><span class="block_con">名称</span><span style="font-weight:600">{{ info.works_name }}</span></div>
          <div><span class="block_con">艺术家</span><span style="font-weight:600">{{ info.artist_en_name }}</span></div>
          <div><span class="block_con"></span><span>{{ info.artist_name }}</span></div>
        </div>
      </div>
    </div>
    <div class="intr_content">
      <div>
        <p class="pap_title">艺术家寄语</p>
        <p>{{ info.works_profile }}</p>
      </div>
      <div style="margin-top:30px">
        <p class="pap_title">艺术家简介</p>
        <p>{{ info.artist_profile }}</p>
      </div>
    </div>
    <div class="intr_header">
      <p class="header_title">SAMPLE REELS</p>
      <p class="header_content_2">作品集</p>
    </div>
    <div class="intr_img_box">
      <div class="grid_content_intr bg-purple" v-for="intem in info.other_works" :key="intem">
            <div class="intr_mask">
              <p>{{ intem.other_works_name }}</p>
              <p>{{ intem.other_works_profile }}</p>
            </div>
            <div class="photo_album">
              <img v-bind:src="'http://'+intem.other_works_picture" alt="">
            </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <!-- <div class="intr_header">
      <p class="header_title">AUTION RECORD</p>
      <p class="header_content_2">成交记录</p>
    </div>
    <div class="intr_tab_box">
      <div class="box-right-title" style="height:50px">
        <ul>
          <li>拍卖时间</li>
          <li>作品</li>
          <li>拍卖行</li>
          <li>成交价</li>
          <li>官方连接</li>
        </ul>
      </div>
      <ul v-for="(intem, index) in info.deal_works" :key="index">
        <li>{{ intem.deal_works_year }}</li>
        <li>{{ intem.deal_works_name }}</li>
        <li>{{ intem.deal_works_exchange }}</li>
        <li>{{ intem.deal_works_price }}</li>
        <li>
          <a target="_blank" v-bind:href=" 'https://'+intem.deal_works_url ">{{ intem.deal_works_url }}</a>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>

  export default {
    name: 'Introduction',
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
      // console.log('info===>', this.info)
    }
  }

</script>
<style lang="scss">
  .Introduction {
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

    .header_content {
      margin-left: 5px;
      margin-top: 10px;
      color: #b5b8ba;
      font-size: 13px;
    }

    .header_content_2 {
      margin-left: 5px;
      margin-top: 10px;
      color: #b5b8ba;
      font-size: 13px;
    }

    .intr_content {
      // height: 800px;
      background: #1B282D;
      color: #c3c3c3;
      padding: 120px 20px 54px 20px;
      font-size: 18px;
      line-height: 33px;
    }

    .intr_img_box {
      background: #1B282D;
      color: #c3c3c3;
      padding: 50px 20px 50px 20px;
      font-size: 18px;
    }

    .intr_tab_box {
      background: #1B282D;
      color: #c3c3c3;
      // padding: 0px 0px 18px 0px;
      font-size: 18px;
      border-bottom: 4px solid #08223d;

      ul {
        height: 50px;
        border-bottom: 1px solid #01365d;
      }

      li {
        float: left;
        width: 20%;
        text-align: center;
        line-height: 50px;
      }
    }

    .grid_content_intr {
      height: 455px;
      // background: url('../../assets/images/demo.jpg') no-repeat;
      background-size: cover;
      position: relative;
      float: left;
      width: 373.31px;
      margin: 8px 6.6px;
      .photo_album{
        position: absolute;
        width: 100%;
        height: 455px;
        top: 0;
        overflow: hidden;
        z-index: 1;
        text-align: center;
      }
      img{
        width: auto;
        height: 100%;
      }
      .intr_mask {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 86px;
        text-align: left;
        color: #ffffff;
        padding: 16px 16px 13px 16px;
        background: #3e3d3d;
        opacity: 0.75;
        visibility: hidden;
        z-index: 2;
        overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-line-clamp: 2;
        // -webkit-box-orient: vertical;

        p:nth-child(1) {
          font-size: 20px;
        }

        p:nth-child(2) {
          margin-top: 18px;
          font-size: 14px;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          // -webkit-line-clamp: 2;
          // -webkit-box-orient: vertical;
        }
      }
    }

    .grid_content_intr:hover .intr_mask {
      visibility: visible;
    }

    .intr_block_box {
      position: relative;
      height: 140px;

      .intr_title {
        position: absolute;
        left: 60px;
        top: 56px;
      }

      img {
        width: 160px;
        height: 160px;
        border-radius: 160px;
      }

      .block_b {
        float: left;
      }

      .block_right {
        width: 600px;
        height: 160px;
        font-size: 20px;
        color: #FFFFFF;

        div:nth-child(1) {
          height: 80px;
          line-height: 90px;
        }

        div:nth-child(2) {
          height: 60px;
          line-height: 65px;
        }
      }

      .block_con {
        display: inline-block;
        width: 150px;
        text-align: left;
        padding-left: 30px;
        font-weight: 600;
      }
    }

    .pap_title {
      font-weight: 600;
      color: #ffffff;
      margin: 10px 0;
    }
  }

</style>
