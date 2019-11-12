<template>
  <div class="teacher-container">
    <ul class="menuList">
      <li :class="{active:menuIndex == 1}" @click="menuIndex = 1">艺术设计学</li>
      <li :class="{active:menuIndex == 2}" @click="menuIndex = 2">工商管理</li>
      <li :class="{active:menuIndex == 3}" @click="menuIndex = 3">工艺装潢班</li>
    </ul>
    <el-row class="infoTotal" :gutter="15">
      <el-col :span="14" class="classInfo">
        <!--班级情况-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">班级情况</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-close"
              class="closeBtn"
            />
          </div>

          <el-row type="flex" class="classRow">
            <el-col :span="12">
              <div id="chart1" />
            </el-col>
            <el-col :span="4">
              <ul class="show-info text-right">
                <li class="title">
                  <svg-icon icon-class="user" class="margin-right-10" />人数
                </li>
                <li>考勤签到</li>
                <li>请假</li>
                <li>缺勤</li>
              </ul>
            </el-col>
            <el-col :span="5">
              <ul class="show-info">
                <li class="title">60</li>
                <li>58</li>
                <li>0</li>
                <li>2</li>
              </ul>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="10" class="studentInfo">
        <!--学生信息比例分析-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="title">学生信息比例分析</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              icon="el-icon-close"
              class="closeBtn"
            />
          </div>
          <div id="chart2" />
        </el-card>
      </el-col>
    </el-row>
    <div class="filter-container">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="学号">
          <el-input v-model="formInline.account" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="籍贯">
          <el-select v-model="formInline.address" placeholder="--选择单选内容--">
            <el-option label="选择单选内容" value="" />
            <el-option v-for="item in dataList" :label="item.address" :value="item.address" />
            <!--<el-option label="广东深圳" value="广东深圳"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkSubmit">查询</el-button>
          <el-button @click="handleInputConfirm">保存</el-button>
        </el-form-item>
        <el-form-item class="fl-right">
          <el-button type="primary">新增</el-button>
        </el-form-item>
      </el-form>
      <el-row class="showBox1">
        <el-col :span="10">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="titleText">
                <i class="el-icon-time margin-right-10" />历史记录
              </span>
              <el-button style="float: right; padding: 3px 0;color:#303133;" type="text" @click="clearTag">清空</el-button>
            </div>
            <el-tag
              v-for="(tag,index) in tags"
              :key="index"
              closable
              @close="handleClose(tag)"
              @click="handleClick(tag)"
            >
              {{ (tag.name?tag.name:'')+(tag.name&&tag.address?'+':'')+(tag.address?tag.address:'') }}</el-tag>
          </el-card>
        </el-col>
        <el-col :span="14">
          <el-button type="primary" class="datAnalysis" @click="intoNewPage('/teacher/dataAnalysis')">数据填写分析</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      class="tableBox"
    >
      <el-table-column label="学号" prop="account" align="center" />
      <el-table-column label="姓名" prop="name" align="center" />
      <el-table-column label="联系方式" prop="phone" align="center" />
      <el-table-column label="证件号" prop="idCard" align="center" />
      <el-table-column label="籍贯" prop="address" align="center" />
      <el-table-column label="操作" prop="account" align="center">
        <template slot-scope="scope">
          <el-button type="text">修改</el-button>
          <el-button type="text" @click="intoNewPage('/teacher/studentDetail')">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons'); // echarts theme
// import resize from './mixins/resize'

import Pagination from '@/components/Pagination' // secondary package based on el-pagination
var colorList = ['#57a2d7', '#8adce4', '#fada73', '#f3a287', '#d26cad', '#e1bfee', '#817ce3', '#96bfff'] // echarts color

export default {
  name: 'Teacher',
  components: { Pagination },
  data() {
    return {
      menuIndex: 1,
      formInline: {
        account: '',
        num: '',
        address: ''
      },
      provinceList: [], // 籍贯列表
      tags: [
        // { name: "邓丽", address: "河北省" },
        // { name: "魏娜", address: "" },
        // { name: "乔军", address: "" }
      ],
      dataList: [
        {
          account: '2011002135452001',
          name: '王生安',
          phone: '1356667778',
          idCard: '4418212313142452',
          address: '广东深圳'
        }
      ],
      tableData: [],
      listLoading: false,
      total: 10, // 总数
      listQuery: {
        page: 1,
        limit: 10
      },
      chart1: null, // 班级分析echart
      chart2: null // 学生分析echart
    }
  },
  mounted() {
    this.initChart1();
    this.initChart2();
    this.checkSubmit();
    // this.$nextTick(() => {
    //     this.initChart()
    // })
  },
  created() {
    this.getMockData()
  },
  beforeDestroy() {
    if (!this.chart2 && !this.chart1) {
      return
    }
    this.chart1.dispose();
    this.chart1 = null;
    this.chart2.dispose();
    this.chart2 = null
  },
  methods: {
    // 设置假数据
    getMockData() {
      const obj = this.$Mock.mock({
        'list|12': [
          {
            account: /(201100)\d{10}/,
            name: '@cname()',
            phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            idCard: '@id()',
            address: '@province()'
          }
        ]
      });
      this.dataList = obj.list;
      // console.log(this.dataList)
    },
    handleClick(tag) { // 点击标签
      console.log(tag)
      for (const key in tag) {
        // this.formInline[key] = tag[key]
        this.$set(this.formInline, key, tag[key])
      }
    },
    // 清空标签
    clearTag() {
      this.tags = []
    },
    intoNewPage(params) { // 跳转新页面
      this.$intoNewPage(params);
    },
    handleInputConfirm() { // 添加新标签
      const arr = []
      for (const val in this.formInline) {
        arr.push(this.formInline[val])
      }
      if (arr.some(item => item !== '')) {
        const obj = {}
        for (const key in this.formInline) {
          obj[key] = this.formInline[key]
        }
        // this.tags.push(obj);
        this.$set(this.tags, this.tags.length, obj)
      }
      // this.inputVisible = false;
      // this.inputValue = '';
    },
    handleClose(tag) { // 删除标签
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    // 班级
    initChart1() {
      this.chart1 = echarts.init(document.getElementById('chart1'))
      this.chart1.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //     left: 'center',
        //     bottom: '10',
        //     data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        // },
        series: [
          {
            name: '班级情况',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }

            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                // 颜色
                color: function(params) {
                  return colorList[params.dataIndex]
                }
              }
            },
            data: [
              { value: 40, name: '考勤签到' },
              { value: 240, name: '请假' },
              { value: 149, name: '缺勤' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },
    // 学生信息分析echart
    initChart2() {
      this.chart2 = echarts.init(document.getElementById('chart2'))
      this.chart2.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //     left: 'center',
        //     bottom: '10',
        //     data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        // },
        series: [
          {
            name: '学生信息比例分析',
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            itemStyle: {
              normal: {
                // 颜色
                color: function(params) {
                  return colorList[params.dataIndex]
                }
              }
            },
            label: {
              color: '#000000',
              fontSize: 16
            },
            data: [
              { value: 320, name: '张志立' },
              { value: 240, name: '李力' },
              { value: 149, name: '王灵玲' },
              { value: 100, name: '刘生静' },
              { value: 59, name: '陆尧新' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },
    // 查询
    checkSubmit() {
      this.tableData = this.dataList.filter(item => {
        return Object.keys(this.formInline).every(key => {
          return String(item[key])
            .toLowerCase()
            .includes(
              String(this.formInline[key])
                .trim()
                .toLowerCase()
            )
        })
      })
    },
    // 保存
    saveSubmit() {},
    // 获取列表
    getList() {
      this.listLoading = true;
      setTimeout(() => {
        // this.dataList = this.dataList.concat(this.dataList);
        // this.total = 100;
        this.listLoading = false
      }, 1000)
      // fetchList(this.listQuery).then(response => {
      //     this.dataList = response.data.items
      //     this.total = response.data.total
      //
      //     // Just to simulate the time of the request
      //     setTimeout(() => {
      //         this.list = response.data.items
      //         this.total = response.data.total
      //         this.listLoading = false
      //     }, 1.5 * 1000)
      // });
    }
  }
}
</script>

<style lang="scss" scoped>
.teacher-container {
  padding: 15px 25px;
  ul,
  li {
    list-style: none;
  }
  .menuList {
    display: flex;
    border: 1px solid rgb(204, 204, 204);
    li {
      width: 150px;
      padding: 12.5px;
      border-right: 1px solid rgb(204, 204, 204);
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      &.active {
        color: #3aabfe;
        border-bottom: 2px solid #3aabfe;
      }
    }
  }
  .infoTotal {
    margin-top: 15px;
    .classInfo {
      /*height:100px;*/
      /*border:1px solid red;*/
      .classRow {
        align-items: center;
      }
      #chart1 {
        width: 300px;
        height: 300px;
        margin: 0 auto;
      }
      .show-info {
        width: 100%;
        padding: 0 10px;
        display: inline-block;
        &.text-right {
          text-align: right;
        }
        li {
          &.title {
            font-weight: 500;
            font-size: 18px;
          }
          padding: 10px 0;
        }
      }
    }
    .studentInfo {
      #chart2 {
        width: 100%;
        height: 300px;
        margin: 0 auto;
      }
    }
  }

  .filter-container {
    padding: 15px;
    margin-top: 15px;
    border: 1px solid rgb(204, 204, 204);
    .el-form-item {
      margin: 0;
      &:nth-child(1),
      &:nth-child(2) {
        margin-right: 35px;
      }
      &:nth-child(3) {
        margin-right: 15px;
      }
      .el-button {
        padding: 8px 15px;
        min-width: 115px;
      }
    }
    .showBox1 {
      margin-top: 15px;
      /deep/ .el-card {
        background: #f0f0f0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: none;
        .el-card__header {
          padding: 10px;
          border: none;
        }
        .titleText {
          font-size: 14px;
        }
        .el-card__body {
          padding: 0 15px 15px;
        }
      }
      .datAnalysis {
        float: right;
        margin-top: 25px;
      }
      /deep/.el-tag {
        margin-right: 10px;
        background: #ffffff;
        color: inherit;
        border-color: #cccccc;
        cursor: pointer;
        .el-icon-close {
          color: inherit;
          /*&:hover{*/
          /*background: inherit;*/
          /*}*/
        }
      }
    }
  }
  .tableBox {
    margin-top: 15px;
  }
  /deep/.pagination-container {
    margin: 0;
    border: 1px solid #dfe6ec;
    border-top: none;
  }
  /deep/ .el-card {
    margin-bottom: 20px;
    &.not-header-border {
      /*.el-card__header{*/
      /*border:none;*/
      /*}*/
      .el-card__body {
        padding: 10px 20px 20px;
      }
    }
    .el-card__header {
      padding: 10px 20px;
      /*border-bottom:2px solid #cccccc;*/
      .title {
        font-weight: 500;
        line-height: 25px;
      }
    }
    .moreBtn {
      color: blue;
      margin-right: 15px;
    }
    .closeBtn {
      color: #d1d0d7;
      font-size: 16px;
      font-weight: 700;
    }
    .el-card__body {
      padding: 0;
    }
  }
}
</style>
