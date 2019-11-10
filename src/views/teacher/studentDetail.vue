<template>
    <div class="studentDetail">
        <el-row :gutter="15">
            <el-col :span="16">
                <el-card class="box-card card-1">
                    <div slot="header" class="clearfix ">
                        <span class="title">马小云</span>
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
            <el-col :span="8">
                <el-card class="box-card card-3">
                    <div slot="header" class="clearfix ">
                        <span class="title">学生生涯</span>
                    </div>
                    <el-timeline class="tileLineBox">
                        <!--<el-timeline-item timestamp="2019年10月1日" placement="top" color="#73c7fe">-->
                            <!--<el-card>-->
                                <!--<div class="label-item">-->
                                    <!--<h4>变动信息</h4>-->
                                    <!--<p>留校查看</p>-->
                                <!--</div>-->
                                <!--<div class="label-item">-->
                                    <!--<h4>原因</h4>-->
                                    <!--<p>记大过</p>-->
                                <!--</div>-->
                            <!--</el-card>-->
                        <!--</el-timeline-item>-->
                        <el-timeline-item timestamp="2019年9月18日" placement="top">
                            <el-card>
                                <p>入学</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "studentDetail",
        data(){
            return{
                //职业生涯
                careerList:[
                    {time:"",reason:"",change:"毕业于清华大学"}
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
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
    .card-3{
        /deep/.tileLineBox{
            .el-card{
                border:none;
                background: rgba(242, 242, 242, 1);
                box-shadow: none;
                .label-item{
                    margin-bottom:30px;
                    &:last-child{margin:0;}
                }
                h4{
                    margin:5px 0;
                }
                p{margin:0;}
            }

        }
    }
}
</style>