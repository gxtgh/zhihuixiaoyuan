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
                       <el-col :span="12">生日：1964年9月1日</el-col>
                       <el-col :span="12">证件号：44087664337897862345</el-col>
                       <el-col :span="12">入学时间：2016年1月1日</el-col>
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
                                <li>北京大学国际关系学院法学博士学位，中国企业联合会管理咨询委员会执行委员、</li>
                                <li>北京大学MBA管理咨询协会高级顾问，担任北京大学、清华大学、中国人民大学、上海交通大学、</li>
                                <li>西安交通大学等高等院校企业家研修班和EMBA班特聘教授，曾任大型央企中远集团人力资源与企划处处长，建设机械等数家股份公司独立董事以及多家企业和地方政府的高级顾问。</li>
                            </ul>
                        </el-col>
                        <el-col :span="24">
                            <h4>教育背景</h4>
                            <ul class="list">
                                <li>河北大学 学士学位</li>
                                <li>中共中央党校 法学硕士</li>
                                <li>北京大学研究生院国际政治学院 博士学位</li>
                            </ul>
                        </el-col>
                        <el-col :span="24">
                            <h4>社会活动</h4>
                            <ul class="list">
                                <li>2004年被中国文化促进会等6机构联合评选为“首届中国十大咨询师”；</li>
                                <li>2005年被评选为“中国企业最具魅力的培训师”；</li>
                                <li>2006年网易TOP100品牌榜培训师排名第一；</li>
                                <li>2007年被授予“杰出管理专家”称号。</li>
                            </ul>
                        </el-col>
                        <el-col :span="24">
                            <h4>主要著作</h4>
                            <ul class="list">
                                <li>《本土化执行力模式》《GF06：组织执行力6项实务》《理念方太》《变革领导》</li>
                                <li>《中国企业前沿问题报告》、《中国经济前沿问题报告》、《名牌竞争战略》《矛攻还是盾守》、</li>
                                <li>《经营大失败》、《名牌竞争战略》、《华立突破》、《温州资本》、《巅峰执行》、</li>
                                <li>《工作就是责任》、《我是职业人：职业人10项行为准则》</li>
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
                        <el-timeline-item timestamp="2016年4月1日" placement="top" color="#73c7fe">
                            <el-card>
                                <div class="label-item">
                                    <h4>变动信息</h4>
                                    <p>留校查看</p>
                                </div>
                                <div class="label-item">
                                    <h4>原因</h4>
                                    <p>记大过</p>
                                </div>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2016年4月1日" placement="top">
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