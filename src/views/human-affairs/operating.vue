<template>
    <div class="operating-container">
        <el-row :gutter="15">
            <el-col :span="12">
                <!--师资数据-->
                <el-card class="box-card visitors-number">
                    <div slot="header" class="clearfix">
                        <span class="title">近年资产统计</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                    </div>
                    <div id="chart1" ></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <!--科研数据-->
                <el-card class="box-card ">
                    <div slot="header" class="clearfix">
                        <span class="title">工资统计</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                    </div>
                    <div id="chart2" ></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <!--资产数据-->
                <el-card class="box-card ">
                    <div slot="header" class="clearfix">
                        <span class="title">教学质量分析</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                    </div>
                    <div id="chart3"  v-show="list3Type==0"></div>
                    <el-table
                            v-show="list3Type==1"
                            v-loading="listLoading3"
                            :data="list3"
                            border
                            fit
                            highlight-current-row
                            style="width: 100%;margin:15px;"
                            class="tableBox"
                    >
                        <el-table-column label="教工号" prop="id"  align="center"  >
                            <template slot-scope="scope">
                                {{scope.row.id}}
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" prop="name"  align="center" ></el-table-column>
                        <el-table-column label="参评人数" prop="number"  align="center" > </el-table-column>
                        <el-table-column label="平均积分"  prop="integral"  align="center"  ></el-table-column>
                    </el-table>
                    <div v-show="list3Type!=0" style="margin:15px;padding:10px;">
                        <span @click="list3Type = 0">教学质量分析</span> 》
                        <span @click="list3Type = 1">学科</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <!--人员情况-->
                <el-card class="box-card ">
                    <div slot="header" class="clearfix">
                        <span class="title">科研统计</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                    </div>
                    <div id="chart5"></div>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons'); // echarts theme
    // import resize from './mixins/resize'
    var __this = null ;
    export default {
        name: "operatingIndex",
        data(){
            return{
                chart1:null,//访问人数
                chart2:null,//浏览器
                showType1:0,//0:柱状图 1：柱状图
                showType2:0,//0:折线图 1：柱状图
                chart3:null,//终端设备统计
                chart5:null,//访问来源

                listLoading3:false,
                list3Type:0,//0 1 2
                list3:[
                    {id:"2019189247128472",name:"张志虎",number:58,integral:60.67},
                    {id:"2019189247128473",name:"韩分",number:58,integral:60.67},
                    {id:"2019189247128474",name:"张镜",number:58,integral:60.67},
                    {id:"2019189247128475",name:"张虎",number:58,integral:60.67},
                ],
            }
        },
        mounted() {
            __this = this;
            this.initChart1();
            this.initChart2();
            this.initChart3();
            this.initChart5();
            // this.$nextTick(() => {
            //     this.initChart()
            // })
        },
        beforeDestroy() {
            if (!this.chart2 && !this.chart2 && !this.chart3 && !this.chart5) {
                return
            }
            this.chart1.dispose();
            this.chart2.dispose();
            this.chart3.dispose();
            this.chart5.dispose();
            this.chart1 = this.chart2 = this.chart3  = this.chart5 =null;
        },
        methods:{
            // 访问人数
            initChart1(){
                // 柱状
                var option1 ={
                    title:{
                        show:true,
                        text:"近年资产统计",
                        textAlign:"left",
                        x:"center"
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} '
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['2013', '2014', '2015', '2016', '2017', '2018'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series: [
                        {
                            name:'工资统计',
                            type:'bar',
                            barWidth: '60%',
                            data:[5800, 6000, 5900, 6100, 6500,6400]
                        }
                    ]
                };
                // 销毁之前的echarts实例
                echarts.dispose(document.getElementById('chart1'));
                this.chart1 = echarts.init(document.getElementById('chart1'));
                this.chart1.setOption(option1,true);
                this.chart1.off('click');
                this.chart1.on('click',function(object){
                    // 销毁之前的echarts实例
                    echarts.dispose(document.getElementById('chart1'));
                    __this.initChart10();
                });
            },
            initChart10(){
                // 南丁格尔玫瑰图
                var option2 = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    // legend: {
                    //     left: 'center',
                    //     bottom: '10',
                    //     data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
                    // },
                    calculable : true,
                    series: [
                        {
                            name:'浏览器',
                            type:'pie',
                            radius : [30, 110],
                            center : ['50%', '50%'],
                            roseType : 'area',
                            data:[
                                {value:50, name:'谷歌 50% （14.1.0)'},
                                {value:10, name:'猎豹 10% (11.2.0)'},
                                {value:5, name:'QQ 5%'},
                                {value:5, name:'IE 5%'},
                                {value:20, name:'火狐 20%'},
                                {value:10, name:'其他 10%'}
                            ]
                        }
                    ]
                };
                // 初始化一个新的实例
                var myChart = echarts.init(document.getElementById('chart1'));
                myChart.setOption(option2, true);
                myChart.off('click');
                myChart.on('click',function(object){
                    // 销毁之前的echarts实例
                    echarts.dispose(document.getElementById('chart1'));
                    __this.initChart11();
                });
            },
            initChart11(){
                // 折线图
                var option3 ={
                    title:{
                        show:true,
                        text:"固定资产",
                        textAlign:"left",
                        x:"center",
                    },
                    legend: {
                        data:['办公用房','业务用房','校车','轿车','其他'],
                        bottom:10
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} '
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'办公用房',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'业务用房',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'校车',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'轿车',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'其他',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                    ]
                };
                // 初始化一个新的实例
                var myChart = echarts.init(document.getElementById('chart1'));
                myChart.setOption(option3, true);
                // this.chart1.on('click',function(object){
                //     // 销毁之前的echarts实例
                //     echarts.dispose(document.getElementById('chart1'));
                //     __this.initChart11();
                // });
            },
            // 浏览器
            initChart2() {
                var option1 ={
                    title:{
                        show:true,
                        text:"近年资产统计",
                        textAlign:"left",
                        x:"center"
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} '
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['2013', '2014', '2015', '2016', '2017', '2018'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series: [
                        {
                            name:'工资统计',
                            type:'bar',
                            barWidth: '60%',
                            data:[5800, 6000, 5900, 6100, 6500,6400]
                        }
                    ]
                };
                var option2 = {
                    title:{
                        show:true,
                        text:"近五年工资情况统计",
                        textAlign:"left",
                        x:"center"
                    },
                    tooltip: {
                        trigger: 'axis',
                        // formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        bottom: '10',
                        data: ['基础工资', '岗位工资', '工龄工资', '奖金']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2014','2015','2016','2017','2018']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'基础工资',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'岗位工资',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'工龄工资',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'奖金',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        }
                    ]
                };
                this.chart2 = echarts.init(document.getElementById('chart2'));
                this.chart2.setOption(option2);
                var __this = this;
                this.chart2.on('click',function(object){
                    // 销毁之前的echarts实例
                    echarts.dispose(document.getElementById('chart2'));
                    // 初始化一个新的实例
                    var myChart = echarts.init(document.getElementById('chart2'));
                    myChart.setOption(__this.showType2?option2:option1, true);
                });

            },
            // 终端设备统计
            initChart3() {
                this.chart3 = echarts.init(document.getElementById('chart3'));
                this.chart3.setOption({
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
                            name: '教学质量分析',
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '50%'],
                            selectedMode: 'single',
                            data: [
                                { value: 60, name: '英语学科' },
                                { value: 15, name: '大学语文' },
                                { value: 15, name: '高等数学' },
                                { value: 7, name: '经济学' },
                                { value: 3, name: '哲学' }
                            ],
                            animationEasing: 'cubicInOut',
                            animationDuration: 2600
                        }
                    ]
                });
                var __this =this;
                this.chart3.on('click',function(object){
                    __this.list3Type = 1;
                });

            },

            // 访问来源
            initChart5() {
                var option1 = {
                    title:{
                        show:true,
                        text:"近五年科研项目统计",
                        textAlign:"left",
                        x:"center"
                    },
                    tooltip: {
                        trigger: 'axis',
                        // formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        bottom: '10',
                        data: ['国家级', '省级', '部级', '校级']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2014','2015','2016','2017','2018']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name:'国家级',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'省级',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'部级',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'校级',
                            type:'line',
                            stack: '总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        }
                    ]
                };
                var option2 = { title:{
                    show:true,
                        text:"成果统计",
                        textAlign:"left",
                        x:"center"
                },
                tooltip: {
                    trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} '
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['论文', '著作', '研究报告', '专利', '著作权', '获奖'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                    yAxis : [
                    {
                        type : 'value'
                    }
                ],
                    series: [
                    {
                        name:'工资统计',
                        type:'bar',
                        barWidth: '60%',
                        data:[39, 50, 80, 20, 15,35]
                    }
                ]};
                this.chart5 = echarts.init(document.getElementById('chart5'));
                this.chart5.setOption(option1);
                this.chart5.on('click',function(object){
                    // 销毁之前的echarts实例
                    echarts.dispose(document.getElementById('chart5'));
                    // 初始化一个新的实例
                    var myChart = echarts.init(document.getElementById('chart5'));
                    // console.dir(object);
                    myChart.setOption(option2, true);
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
.operating-container{
    padding:15px 25px;
    /deep/ .el-card{
        margin-bottom:20px;
        .el-card__body{
            padding:10px 20px 20px;
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
        height:350px;
        margin:15px auto 0;
    }

    #chart2{
        width:100%;
        height:350px;
        margin:15px auto 0;
    }

    #chart3{
        width:100%;
        height:350px;
        margin:15px auto 0;
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
        height:350px;
        margin:15px auto 0;
    }
}
</style>