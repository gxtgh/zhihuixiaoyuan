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
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                    </div>

                    <el-row type="flex" class="classRow">
                        <el-col :span="12">
                            <div id="chart1"></div>
                        </el-col>
                        <el-col :span="4">
                            <ul class="show-info text-right">
                                <li class="title"><i class="el-icon-picture margin-right-10"></i>人数</li>
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
                <el-card class="box-card ">
                    <div slot="header" class="clearfix">
                        <span class="title">学生信息比例分析</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                    </div>
                    <div id="chart2"></div>
                </el-card>
            </el-col>
        </el-row>
        <div class="filter-container">
            <el-form :inline="true" :model="formInline">
                <el-form-item label="学号" >
                    <el-input v-model="formInline.user" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item label="姓名" >
                    <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="籍贯">
                    <el-select v-model="formInline.region" placeholder='--选择"单选内容"--'>
                        <el-option label="广东广州" ></el-option>
                        <el-option label="广东深圳" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="checkSubmit">查询</el-button>
                    <el-button  @click="saveSubmit">保存</el-button>
                </el-form-item>
                <el-form-item class="fl-right">
                    <el-button type="primary">新增</el-button>
                </el-form-item>
            </el-form>
            <el-row class="showBox1">
                <el-col :span="10">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span class="titleText"><i class="el-icon-time margin-right-10"></i>历史记录</span>
                            <el-button style="float: right; padding: 3px 0;color:#303133;" type="text">清空</el-button>
                        </div>
                        <el-tag
                                v-for="tag in tags"
                                closable
                        >
                            {{(tag.name?tag.name:'')+(tag.address?"+"+tag.address:'')}}
                        </el-tag>
                    </el-card>
                </el-col>
                <el-col :span="14">
                    <el-button type="primary" class="datAnalysis">数据填写分析</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table
                v-loading="listLoading"
                :data="dataList"
                border
                fit
                highlight-current-row
                style="width: 100%;"
                class="tableBox"
        >
            <el-table-column label="学号" prop="account"  align="center"  ></el-table-column>
            <el-table-column label="姓名" prop="name"  align="center" ></el-table-column>
            <el-table-column label="联系方式" prop="phone"  align="center" > </el-table-column>
            <el-table-column label="证件号" prop="idCard"  align="center"  >  </el-table-column>
            <el-table-column label="籍贯" prop="address"  align="center"  >  </el-table-column>
            <el-table-column label="操作" prop="account"  align="center"  >
                <template slot-scope="scope">
                    <el-button type="text">修改</el-button>
                    <el-button type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    </div>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts theme
    // import resize from './mixins/resize'

    import Pagination from '@/components/Pagination' // secondary package based on el-pagination
    export default {
        name: "teacher",
        components: { Pagination },
        data(){
            return{
                menuIndex:1,
                formInline:{
                    user:'',
                    region:''
                },
                tags:[
                    {name:"张三",address:"广东深圳"},
                    {name:"马小云",address:""},
                    {name:"马云",address:""}
                ],
                dataList:[
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"},
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"},
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"},
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"},
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"},
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"},
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"},
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"},
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"},
                    {account:"2011002135452001",name:"王生安",phone:"1356667778",idCard:'4418212313142452',address:"广东深圳"}
                ],
                listLoading:false,
                total:100,//总数
                listQuery:{
                    page:1,
                    limit:10,
                },
                chart1:null,//班级分析echart
                chart2:null,//学生分析echart
            }
        },
        mounted() {
            this.initChart1();
            this.initChart2();
            // this.$nextTick(() => {
            //     this.initChart()
            // })
        },
        beforeDestroy() {
            if (!this.chart2 && !this.chart1) {
                return
            }
            this.chart1.dispose();
            this.chart1 = null
            this.chart2.dispose();
            this.chart2 = null
        },
        methods:{
            // 班级
            initChart1() {
                this.chart1 = echarts.init(document.getElementById('chart1'));
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
                            name:'班级情况',
                            type:'pie',
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
                this.chart2 = echarts.init(document.getElementById('chart2'));
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
                            radius : '65%',
                            center: ['50%', '50%'],
                            selectedMode: 'single',
                            data: [
                                { value: 320, name: '张三' },
                                { value: 240, name: '李力' },
                                { value: 149, name: '王灵灵' },
                                { value: 100, name: '刘生静' },
                                { value: 59, name: '鲁班' }
                            ],
                            animationEasing: 'cubicInOut',
                            animationDuration: 2600
                        }
                    ]
                })
            },
            // 查询
            checkSubmit(){

            },
            // 保存
            saveSubmit(){

            },
            // 获取列表
            getList() {
                this.listLoading = true;
                setTimeout(() => {
                    // this.dataList = this.dataList.concat(this.dataList);
                    // this.total = 100;
                    this.listLoading = false;
                },  1000);
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
            },
        }
    }
</script>

<style lang="scss" scoped>
.teacher-container{
    padding:15px 25px;
    ul,li{list-style:none;}
    .menuList{
        display: flex;
        border:1px solid rgb(204, 204, 204);
        li{
            width:150px;
            padding:12.5px ;
            border-right:1px solid rgb(204, 204, 204);
            text-align: center;
            font-size:14px;
            cursor: pointer;
            &.active{
                color: #3aabfe;
                border-bottom:2px solid #3aabfe;
            }
        }
    }
    .infoTotal{
        margin-top:15px;
        .classInfo{
            /*height:100px;*/
            /*border:1px solid red;*/
            .classRow{
                align-items: center;
            }
            #chart1{
                width: 300px;
                height: 300px;
                margin: 0 auto ;
            }
            .show-info{
                width:100%;
                padding: 0 10px ;
                display: inline-block;
                &.text-right{
                    text-align: right;
                }
                li{
                    &.title{font-weight:500;font-size:18px;}
                    padding:10px 0;
                }
            }
        }
        .studentInfo{
            #chart2{
                width:300px;
                height:300px;
                margin:0 auto;
            }
        }
    }

    .filter-container{
        padding:15px;
        margin-top:15px;
        border:1px solid rgb(204, 204, 204);
        .el-form-item{
            margin:0;
            &:nth-child(1),
            &:nth-child(2){margin-right:35px;}
            &:nth-child(3){margin-right:15px;}
            .el-button{
                padding:8px 15px;
                min-width:115px;
            }
        }
        .showBox1{
            margin-top:15px;
            /deep/ .el-card{
                background:#f0f0f0;
                -webkit-box-shadow: none;
                -moz-box-shadow: none;
                box-shadow: none;
                border:none;
                .el-card__header{
                    padding:10px;
                    border:none;
                }
                .titleText{
                    font-size:14px;
                }
                .el-card__body{
                    padding: 0 15px 15px;
                }
            }
            .datAnalysis{
                float:right;
                margin-top:25px;
            }
            /deep/.el-tag{
                margin-right: 10px;
                background: #ffffff;
                color: inherit;
                border-color: #cccccc;
                cursor: pointer;
                .el-icon-close{
                    color: inherit;
                    /*&:hover{*/
                        /*background: inherit;*/
                    /*}*/
                }
            }
        }
    }
    .tableBox{
        margin-top:15px;
    }
    /deep/.pagination-container{
        margin: 0;
        border: 1px solid #dfe6ec;
        border-top: none;
    }
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
            /*border-bottom:2px solid #cccccc;*/
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

}
</style>