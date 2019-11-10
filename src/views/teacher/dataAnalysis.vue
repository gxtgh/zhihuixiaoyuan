<template>
  <!--数据分析-->
  <div class="main">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="院系">
          <el-input v-model="formInline.yuanxi" placeholder="请输入院系" />

        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="formInline.banji" placeholder="请输入班级" />

        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div id="chart"></div>
    </div>

    <div class="studentDetail" v-show="showDetail">
      <el-row :gutter="15">
        <el-col :span="16">
          <el-card class="box-card card-1">
            <div slot="header" class="clearfix ">
              <span class="title">{{formInline.name}}</span>
            </div>
            <el-row class="infoList">
              <el-col :span="12">学号：2019221562153</el-col>
              <el-col :span="12">性别：男</el-col>
              <el-col :span="12">联系方式：136732842773</el-col>
              <el-col :span="12">生日：1998年9月1日</el-col>
              <el-col :span="12">证件号：44087664337897862345</el-col>
              <el-col :span="12">入学时间：2019年9月18日</el-col>
              <el-col :span="12">出生地：广东深圳</el-col>
            </el-row>
            <el-button-group>
              <el-button type="primary">个人履历</el-button>
              <el-button type="primary">教育背景</el-button>
              <el-button type="primary">社会活动</el-button>
              <el-button type="primary">主要著作</el-button>
            </el-button-group>
          </el-card>
          <el-card class="box-card card-2">
            <el-row>
              <el-col :span="24">
                <h4>个人履历</h4>
                <ul class="list">
                  <li>毕业于深圳外国语学校</li>
                  <li>2018年获得高中数学奥林匹克联赛一等奖</li>
                  <li>2017年获得全国高中数学竞赛一等奖</li>
                </ul>
              </el-col>
              <el-col :span="24">
                <h4>教育背景</h4>
                <ul class="list">
                  <li>2016-2019年：深圳外国语学校</li>
                  <li>2019-至今 深圳大学</li>
                </ul>
              </el-col>
              <el-col :span="24">
                <h4>社会活动</h4>
                <ul class="list">
                  <li>2017年获得全国高中数学竞赛一等奖</li>
                  <li>2018年获得高中数学奥林匹克联赛一等奖</li>
                  <li>2019年担任学生会成员</li>
                </ul>
              </el-col>
              <el-col :span="24">
                <h4>主要著作</h4>
                <ul class="list">
                  <li>暂无</li>
                </ul>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import VeBar from 'v-charts/lib/histogram.common.js' // v-charts
import echarts from 'echarts'
require('echarts/theme/macarons'); // echarts theme
var option = null;
export default {
  data() {
    return {
      formInline: {
        yuanxi: '经济学院',
        banji: '金融1班',
        name: ''
      },
      showDetail:true,
      chart:null,
      dataList:{
        list1:[
          [45, 50, 15, 100, 100, 50, 100],
          [55, 50, 85, 0, 0, 50, 0]
        ],
        list2:[
          [30, 35, 55, 100, 100, 60, 100],
          [70, 65, 45, 0, 0, 40, 0]
        ],
        list3:[
          [35, 64, 25, 100, 100, 60, 100],
          [65, 36, 75, 0, 0, 40, 0]
        ],
      }
    }
  },
  mounted(){
    this.initChart();
  },
  methods: {
    initChart(){
      echarts.dispose(document.getElementById('chart'));
      this.chart = echarts.init(document.getElementById('chart'));
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['完成', '未完成']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          // boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['社会背景','教育背景','个人经历','籍贯','证件号码','联系方式','姓名']
        },
        series: [
          {
            name: '完成',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            itemStyle:{
              normal:{
                //颜色
                color:'#57a2d7'
              }
            },
            data: this.dataList.list3[0]
          },
          {
            name: '未完成',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            itemStyle:{
              normal:{
                //颜色
                color:'#fada73'
              }
            },
            data: this.dataList.list3[1]
          },
        ]
      };
      this.chart.setOption(option);
    },
    onSubmit() {
      if(this.formInline.name!=''){
        option.series[0].data = this.dataList.list3[0];
        option.series[1].data = this.dataList.list3[1];
         this.showDetail = true;
      }else if(this.formInline.banji!=''){
        option.series[0].data = this.dataList.list2[0];
        option.series[1].data = this.dataList.list2[1];
         this.showDetail = false;
      }else{
        option.series[0].data = this.dataList.list1[0];
        option.series[1].data = this.dataList.list1[1];
        this.showDetail = false;

      }
      this.chart.setOption(option);
      console.log(this.showDetail)
      // console.log(this.chart.series[0].data)
      // console.log(this.chart.series[1].data)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 30px;
}
.content {
  padding-left: 30px;
}
  #chart{
    width:700px;
    height:600px;
  }
.studentDetail{
  padding:15px 25px;
  /*卡片*/
  /deep/ .el-card{
    border-color: rgba(220, 220, 220, 1);
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    .el-card__header{
      padding: 5px 10px;
      background: #f0f0f0;
      border-color: rgba(220, 220, 220, 1);
      .title{
        font-weight:700;
        line-height:25px;
      }
    }
  }
  .card-1{
    .infoList {
      .el-col{
        padding:10px 15px;
      }
    }
    /deep/.el-button-group{
      margin-top:30px;
      .el-button{
        padding:8px 15px;
        margin-right:15px;
        background:#0fa2ff;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        font-weight:500;
      }
    }
  }
  .card-2{
    margin-top:15px;
    h4{margin-bottom:0;}
    .list{
      margin-top:10px;
      li{
        line-height:25px;
      }
    }
  }
}
</style>
