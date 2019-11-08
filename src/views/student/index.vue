<template>
    <div class="student-container">
        <el-row :gutter="15" class="content-wrapper">
            <el-col :span="14" class="left-container">
                <!--未读消息-->
                <el-card class="box-card not-header-border">
                    <div slot="header" class="clearfix ">
                        <span class="title">未读消息</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                        <router-link to="/" style="float: right; padding: 3px 0" class="moreBtn">更多</router-link>
                    </div>
                    <el-row v-for="o in infoList" :key="o.id" class="info-list-item">
                        <el-col :span="18" class="title">{{o.title}}</el-col>
                        <el-col :span="6" class="time">{{o.time}}</el-col>
                    </el-row>
                </el-card>
                <!--我的事务-->
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="title">我的事务</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                        <router-link to="/" style="float: right; padding: 3px 0" class="moreBtn">更多</router-link>
                        <el-menu :default-active="transactionActiveIndex" class="el-menu-demo fl-right" mode="horizontal" @select="transactionSelect">
                            <el-menu-item index="1">全部</el-menu-item>
                            <el-menu-item index="2">待办事项</el-menu-item>
                            <el-menu-item index="3">已办事项</el-menu-item>
                            <el-menu-item index="4">参与事项</el-menu-item>
                            <el-menu-item index="5">结办事项</el-menu-item>
                        </el-menu>
                    </div>
                    <el-table
                            :data="transactionData"
                            class="myTransactionTable"
                            style="width: 100%"
                    >
                        <el-table-column prop="title" label="事务名称" ></el-table-column>
                        <el-table-column label="申请人" width="150" align="center">
                            <template slot-scope="scope">
                                {{scope.row.name?scope.row.name:"--"}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="time" label="时间" width="150" align="center"></el-table-column>
                        <el-table-column prop="status" label="状态" width="150" align="center">
                            <template slot-scope="scope">
                                <i class="el-icon-time" :class="scope.row.status?'color-green':'color-orange'"></i>
                                <span  :class="scope.row.status?'color-green':'color-orange'">{{scope.row.status?"已完成":"未完成"}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column  label="操作" width="150"  align="center">
                            <template slot-scope="scope">
                                <i :class="scope.row.collection?'el-icon-star-on color-red':'el-icon-star-off'" class="font-size-25"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
                <!--我的申请-->
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span class="title">我的申请</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                        <router-link to="/" style="float: right; padding: 3px 0" class="moreBtn">更多</router-link>
                        <el-menu :default-active="applyActiveIndex" class="el-menu-demo fl-right" mode="horizontal" @select="applySelect">
                            <el-menu-item index="1">全部</el-menu-item>
                            <el-menu-item index="2">审核中</el-menu-item>
                            <el-menu-item index="3">已完成</el-menu-item>
                        </el-menu>
                    </div>
                    <el-table
                            :data="applyData"
                            class="myApplyTable"
                            style="width: 100%">
                        <el-table-column prop="title"  label="事务名称" > </el-table-column>
                        <el-table-column  label="审核人" width="150" align="center">
                            <template slot-scope="scope">
                                {{scope.row.name?scope.row.name:"--"}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="time" label="时间" width="150" align="center"></el-table-column>
                        <el-table-column  label="操作" width="150"  align="center">
                            <template slot-scope="scope">
                                <i :class="scope.row.collection?'el-icon-star-on color-red':'el-icon-star-off'" class="font-size-25"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="10" class="right-container">
                <!--登录信息-->
                <el-card class="box-card not-header-border">
                    <div slot="header" class="clearfix ">
                        <span class="title">上次登录信息</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                    </div>
                    <el-row class="login-list-item">
                        <el-col :span="6" class="lable">上次登录时间</el-col>
                        <el-col :span="18" class="text">{{loginInfo.time}}</el-col>
                    </el-row>
                    <el-row class="login-list-item">
                        <el-col :span="6" class="lable">上次登录IP</el-col>
                        <el-col :span="18" class="text">{{loginInfo.ip}}</el-col>
                    </el-row>
                </el-card>
                <!--一卡通消费记录-->
                <el-card class="box-card consumption">
                    <div slot="header" class="clearfix">
                        <span class="title">一卡通消费记录</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-close" class="closeBtn"></el-button>
                        <router-link to="/" style="float: right; padding: 3px 0" class="moreBtn">更多</router-link>
                    </div>
                    <el-row class="consumption-list">
                        <el-col class="consumption-item empty">暂无消费记录</el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "student",
        data(){
            return{
                infoList:[
                    {id:"1",title:"关于组织开展庆祝中华人民共和国成立70周年系列活动的通知",time:"2019/09/01"},
                    {id:"2",title:"关于举行南方科技大学2019年开学典礼的通知",time:"2019/09/01"},
                ],
                loginInfo:{
                    time:"2019-11-10 00:00:00",
                    ip:"119.12313213"
                },
                transactionActiveIndex:"1",
                transactionData:[
                    {title:"9月2日（周一）举行2019年开学典礼",name:"",time:"09/1 12:59",status:0,collection:false},
                    {title:"德国跨界创新实验室世锦赛",name:"张珊珊",time:"09/1 12:59",status:0,collection:true},
                    {title:"办公用品申请（文学社）",name:"李四喜",time:"09/1 12:59",status:1,collection:true},
                    {title:"9月1日12：00进行义工服务",name:"王静海",time:"09/1 12:59",status:0,collection:true},
                ],
                applyActiveIndex:"1",
                applyData:[
                    {title:"校园卡门禁开通",name:"李建军",time:"09/1 12:59",collection:false},
                    {title:"勤工助学申请书",name:"张珊珊",time:"09/1 12:59",collection:false},
                    {title:"办公用品申请（文学社）",name:"朱喜",time:"09/1 12:59",collection:true},
                    {title:"第一学期末奖学金申请",name:"陈志军",time:"09/1 12:59",collection:false},
                    {title:"9月1日12:00进行讲座申请",name:"王静海",time:"09/1 12:59",collection:false},
                ]
            }
        },
        methods:{
            // 事务菜单切换
            transactionSelect(key,keypath){
                console.log(key)
                console.log(keypath)
            },
            // 申请菜单切换
            applySelect(key,keypath){
                console.log(key)
                console.log(keypath)
            }
        }
    }
</script>

<style lang="scss" scoped>
.student-container{
    .content-wrapper{
        padding:30px;
    }
    /deep/ .el-card{
        margin-bottom:20px;
        &.not-header-border{
            .el-card__header{
                border:none;
            }
            .el-card__body{
                padding:10px 20px 20px;
            }
        }
        .el-card__header{
            padding:10px 20px;
            border-bottom:2px solid #cccccc;
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
    /deep/.myTransactionTable,
    /deep/.myApplyTable
    {
        th:first-child{padding-left:10px;}
        .el-table__body tr td:first-child{padding-left:10px;}
    }
    /*未读消息列表*/
    .info-list-item{
        padding:7.5px ;
        .title,.time{
            overflow: hidden;
            white-space: nowrap;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
        }
    }
    /*登录列表*/
    .login-list-item{
        padding:7.5px ;
        font-size: 14px;
        .label,.text{
            overflow: hidden;
            white-space: nowrap;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
        }
        .label{
            color: #d0ceca;
        }
    }
    /deep/ .el-menu{
        &.el-menu--horizontal{
            border:none;
            position: relative;
            top:10px;
            margin-right:15px;
            .el-menu-item{
                height: 25px;
                line-height: 8px;
                font-size: 16px;
                color: #303133;
            }
        }
    }
    /*消费记录列表*/
    .consumption-list{
        min-height:250px;
        .consumption-item{
            padding: 5px 0;
            &.empty{
                margin-top:25px;
                text-align: center;
                color: #000;
            }
        }
    }


}
</style>