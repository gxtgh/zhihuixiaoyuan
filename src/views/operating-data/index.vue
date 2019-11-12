<template>
  <div class="operating-container">
    <el-row :gutter="15">
      <el-col :span="8">
        <!--访问人数-->
        <el-card class="box-card visitors-number">
          <div slot="header" class="clearfix">
            <span class="title">访问人数</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn" />
          </div>
          <div id="chart1" />
          <el-row class="chart1-info">
            <el-col :span="24" class="show-total">
              <i class="el-icon-user-solid" />
              <span>今日总人数: 22235</span>
            </el-col>
            <el-col :span="6" class="show-item">
              <p>8899</p>
              <p>学生访问量</p>
            </el-col>
            <el-col :span="6" class="show-item">
              <p>65</p>
              <p>团委访问量</p>
            </el-col>
            <el-col :span="6" class="show-item">
              <p>2366</p>
              <p>教师访问量</p>
            </el-col>
            <el-col :span="6" class="show-item">
              <p>123</p>
              <p>人事访问量</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8">
        <!--浏览器-->
        <el-card class="box-card ">
          <div slot="header" class="clearfix">
            <span class="title">浏览器</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn" />
          </div>
          <div id="chart2" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <!--终端设备统计-->
        <el-card class="box-card ">
          <div slot="header" class="clearfix">
            <span class="title">终端设备统计</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn" />
          </div>
          <div id="chart3" />
        </el-card>
      </el-col>
      <el-col :span="24">
        <!--访问量/点击量-->
        <el-card class="box-card clickCard">
          <el-row>
            <el-col :span="4">
              <p>总点击数</p>
              <p>198532</p>
            </el-col>
            <el-col :span="4">
              <p>主页点击数</p>
              <p>98532</p>
            </el-col>
            <el-col :span="4">
              <p>个人中心点击数</p>
              <p>28532</p>
            </el-col>
            <el-col :span="4">
              <p>主页停留时间（s）</p>
              <p>5.3</p>
            </el-col>
            <el-col :span="4">
              <p>个人中心页停留时间（s）</p>
              <p>10.3</p>
            </el-col>
            <el-col :span="4">
              <p>页面平均停留时间（s）</p>
              <p>6.8</p>
            </el-col>
          </el-row>
          <div id="chart4" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <!--访问来源-->
        <el-card class="box-card ">
          <div slot="header" class="clearfix">
            <span class="title">访问来源</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn" />
          </div>
          <div id="chart5" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import resize from './mixins/resize'

var colorList = ['#57a2d7', '#8adce4', '#fada73', '#f3a287', '#d26cad', '#e1bfee', '#817ce3', '#96bfff'] // echarts color
export default {
  name: 'OperatingIndex',
  data() {
    return {
      chart1: null, // 访问人数
      chart2: null, // 浏览器
      chart3: null, // 终端设备统计
      chart4: null, // 点击量
      chart5: null// 访问来源
    }
  },
  mounted() {
    this.initChart1()
    this.initChart2()
    this.initChart3()
    this.initChart4()
    this.initChart5()
    // this.$nextTick(() => {
    //     this.initChart()
    // })
  },
  beforeDestroy() {
    if (!this.chart2 && !this.chart2 && !this.chart3 && !this.chart4 && !this.chart5) {
      return
    }
    this.chart1.dispose()
    this.chart2.dispose()
    this.chart3.dispose()
    this.chart4.dispose()
    this.chart5.dispose()
    this.chart1 = this.chart2 = this.chart3 = this.chart4 = this.chart5 = null
  },
  methods: {
    // 访问人数
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
            name: '访问人数',
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
                  // fontSize: '30',
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
              { value: 8899, name: '学生访问量' },
              { value: 65, name: '团委访问量' },
              { value: 2366, name: '教师访问量' },
              { value: 123, name: '人事访问量' }

            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },
    // 浏览器
    initChart2() {
      this.chart2 = echarts.init(document.getElementById('chart2'))
      this.chart2.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}'
        },
        // legend: {
        //     left: 'center',
        //     bottom: '10',
        //     data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        // },
        calculable: true,
        series: [
          {
            name: '浏览器',
            type: 'pie',
            radius: [30, 110],
            center: ['50%', '50%'],
            roseType: 'area',
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
              { value: 50, name: '谷歌 50% （14.1.0)' },
              { value: 10, name: '猎豹 10% (6.04.1)' },
              { value: 5, name: 'QQ 5% (11.2.0)' },
              { value: 5, name: 'IE 5% (11.2.0)' },
              { value: 20, name: '火狐 20% (11.2.0)' },
              { value: 10, name: '其他 10% (11.2.0)' }
            ]
          }
        ]
      })
    },
    // 终端设备统计
    initChart3() {
      this.chart3 = echarts.init(document.getElementById('chart3'))
      this.chart3.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b})'
        },
        series: [
          {
            name: '终端设备统计',
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
              { value: 60, name: 'PC端 60%' },
              { value: 15, name: 'ipad 15%' },
              { value: 15, name: '手机端 15%' },
              { value: 10, name: '其他 10%' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    },
    // 点击数
    initChart4() {
      this.chart4 = echarts.init(document.getElementById('chart4'))
      this.chart4.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          left: 50,
          right: 50
        },
        xAxis: [
          {
            type: 'category',
            data: ['0：00', '2：00', '4：00', '6：00', '8：00', '10：00', '12：00', '14：00', '16：00', '18：00', '20：00', '22：00'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：万',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '单位：秒',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '主页停留时间',
            type: 'bar',
            itemStyle: {
              normal: {
                // 颜色
                color: colorList[0]
              }
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
          },
          {
            name: '个人中心停留时间',
            type: 'bar',
            itemStyle: {
              normal: {
                // 颜色
                color: colorList[1]
              }
            },
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
          },
          {
            name: '主页点击数',
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                // 颜色
                color: colorList[2]
              }
            },
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          },
          {
            name: '个人中心点击数',
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                // 颜色
                color: colorList[3]
              }
            },
            data: [2.0, 3, 5, 4.5, 7, 15, 20.3, 15, 23.0, 13, 5, 8]
          }
        ]
      })
    },
    // 访问来源
    initChart5() {
      this.chart5 = echarts.init(document.getElementById('chart5'))
      this.chart5.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              normal: {
                position: 'inner'
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
              { value: 335, name: '直达', selected: true },
              { value: 679, name: '营销广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          },
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              normal: {
                formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                backgroundColor: '#eee',
                borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: '#999',
                    lineHeight: 22,
                    align: 'center'
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: '#aaa',
                    width: '100%',
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 16,
                    lineHeight: 33
                  },
                  per: {
                    color: '#eee',
                    backgroundColor: '#334455',
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
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
              { value: 335, name: '山西' },
              { value: 310, name: '河南' },
              { value: 234, name: '山东' },
              { value: 135, name: '山西' },
              { value: 1048, name: '广东' },
              { value: 251, name: '广西' },
              { value: 147, name: '湖南' },
              { value: 102, name: '陕西' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.operating-container{
    padding:15px 25px;
    /deep/ .el-card{
        margin-bottom:20px;
        &.not-header-border{
            /*.el-card__header{*/
            /*border:none;*/
            /*}*/
            .el-card__body{
                padding:10px 20px 20px;
            }
        }
        .el-card__header{
            padding:10px 20px;
            .title{
                font-weight:500;
                line-height:25px;
            }
        }
        .moreBtn{
            color:blue;
            margin-right:15px;
        }
        .closeBtn{
            color: #d1d0d7;
            font-size: 16px;
            font-weight: 700;
        }
        .el-card__body{
            padding:0;
        }
    }

    .chart1-info{
        padding:15px;
        text-align: center;
        >div{padding:2.5px 0;}
        .show-total{
            font-weight:700;
        }
        .show-item{
            p{
                &:nth-child(1){font-weight:700;margin-bottom:5px;}
            }
        }
    }
    #chart1{
        width:100%;
        height:200px;
        margin:0 auto;
    }

    #chart2{
        width:100%;
        height:340px;
        margin:0 auto;
    }

    #chart3{
        width:100%;
        height:340px;
        margin:0 auto;
    }
    .clickCard{
        .el-col{
            text-align: center;
            border:1px solid #cccccc;
            p{
                margin:10px 0;
                &:nth-last-child(1){
                    font-weight:700;
                }
            }
        }
    }
    #chart4{
        width:100%;
        height:400px;
        /*margin:0 auto;*/
    }
    #chart5{
        width:100%;
        height:400px;
        margin:0 auto;
    }
}
</style>
