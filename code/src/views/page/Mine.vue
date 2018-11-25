<!-- ` -->
<template>
  <section class='Completion'>
    <div class="intr_header">
      <p class="header_title">AUTION RECORD</p>
      <p class="header_content_2">成交记录</p>
    </div>
    <div class="box-right-title" style="height:50px"></div>
    <div>
      <div v-for="intem in this.works_whole_list" :key="intem">
        <product-component :info="{'type':'whole', intem}"></product-component>
      </div>
      <div v-for="intem in this.works_conduct_list" :key="intem">
        <product-component :info="{'type':'conduct', intem}"></product-component>
      </div>
    </div>
    <div style="height: 20px;background: linear-gradient(#092a42, #091e3b, #0a1133);"></div>
    <!-- <product-component :info="{'type':'whole',}"></product-component> -->
    <div class="intr_header">
      <p class="header_title">AUTION RECORD</p>
      <p class="header_content_2">成交记录</p>
    </div>
    <div class="completion_tab_box">
    <el-table :data="tradelist" style="width: 100%; margin-top: 20px">
            <el-table-column prop="works_name" label="作品" width="180" >
            </el-table-column>
            <el-table-column prop="create_time" label="交易时间">
            </el-table-column>
            <el-table-column prop="price" label="交易金额">
            </el-table-column>
            <el-table-column prop="is_first" label="交易类型">
            </el-table-column>
            <el-table-column prop="from_address" label="钱包地址">
            </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
  import { $utils } from '@helper'
  import IntrComponent from '@views/partials/Introduction'
  import ProductComponent from '@views/partials/Product'
  export default {
    data() {
      return {
        tradelist: null,
        works_conduct_list: null,
        works_whole_list: null
      }
    },

    components: {
      ProductComponent,
      IntrComponent
    },
    created() {
      this.$store.commit('$showLoading')
      // 交易记录
      this.$apis.user.tradelist({
        'id': $utils.getStorage('useid')
      }).then(result => {
        // console.log('result======', result)
        this.tradelist = result.data.tradelist
      }).catch((err) => {
        this.$message.error(err)
      })
      // 我的藏品
      this.$apis.user.mycollection({
        'id': $utils.getStorage('useid')
      }).then(result => {
        // console.log('result======', result)
        // this.tradelist = result.data.tradelist
        this.works_whole_list = result.data.works_whole_list
        this.works_conduct_list = result.data.works_conduct_list
      }).catch((err) => {
        this.$message.error(err)
      }).fin(() => {
        this.$store.commit('$hideLoading')
      })
    },

    computed: {},

    methods: {
      objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        // if (columnIndex === 0) {
        //   if (rowIndex % 3 === 0) {
        //     return {
        //       rowspan: 3,
        //       colspan: 1
        //     }
        //   } else {
        //     return {
        //       rowspan: 0,
        //       colspan: 0
        //     }
        //   }
        // }
      }
    },

    mounted() {}
  }

</script>
<style lang='scss'>
  .Completion {

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
      tr {
        background-color: #1B282D !important;
      }
      tr:hover{
        background-color: #1B282D !important;
      }
      .el-table--enable-row-hover .el-table__body tr:hover>td{
        background-color:#1B282D !important;
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
    .el-table_1_column_1  {
      border-right: 1px solid #01365d;
    }
    .tab_left {
      float: left;
      width: 160px;
      height: 150px;
    }

    .tab_right {
      float: left;
      width: 1039px;
      height: 150px;
    }
  }

</style>
