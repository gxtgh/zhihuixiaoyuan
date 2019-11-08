<!--事务-->
<template>
    <div class="transaction">
        <div class="transaction-wrapper">
            <div class="transaction-header">
                <router-link to="/home">
                    <img src="@/assets/images/login_logo.png" alt="">
                </router-link>
                <div class="eventBox">
                    <div class="eventBox1">
                        <router-link to="/student/index" class="userInfo"><i class="el-icon-picture"></i>admin</router-link>
                        <a href="javascript:void(0)" class="loginOut">退出</a>
                    </div>
                </div>
            </div>
            <el-row>
                <el-col :span="24" class="personalDesktop">
                    <el-button type="info" plain @click="dialogVisible = true">个性桌面</el-button>
                </el-col>
            </el-row>
            <ul class="menuList">
                <li v-for="item in typeList" :class="{ 'active': item == currentType }" @click="currentType = item">{{item.name}}</li>
            </ul>
            <!--<el-row class="showList dragList" type="flex" :gutter="15">-->
                <!---->
                <!--<el-col :xs="24" :md="12" :lg="6" v-for="item in currentType.list" >-->
                    <!--<div class="list-content-item" draggable="true" ondragstart="drag(event)" :class="item.bg">-->
                        <!--<div class="item-header">-->
                            <!--<span class="color-block orange" @click="changeItem(item,'bg-orange')"></span>-->
                            <!--<span class="color-block blue"  @click="changeItem(item,'bg-blue')"></span>-->
                            <!--<span class="color-block green"  @click="changeItem(item,'bg-green')"></span>-->
                            <!--<span class="color-block red"  @click="changeItem(item,'bg-red')"></span>-->
                            <!--<i class="el-icon-delete fl-right margin-left-10" @click="deleteItem(item)"></i>-->
                            <!--<i class="el-icon-edit fl-right " @click="editItem($event)"></i>-->
                        <!--</div>-->
                        <!--<div class="item-content">-->
                            <!--<img src="@/assets/images/transctaion_1.png" alt="" width="50">-->
                            <!--<div class="textBox">-->
                                <!--<div class="title">{{item.title}}</div>-->
                                <!--<div class="description">{{item.description}}</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <el-row class="showList dragList" type="flex" :gutter="15">
                <draggable :set-data="setData" :list="currentType.list" group="article" class="dragArea">
                    <el-col :xs="24" :md="12" :lg="6" v-for="item in currentType.list" class="list-content-item-list">
                        <div class="list-content-item" :class="item.bg">
                            <div class="item-header">
                                <span class="color-block-box">
                                    <span class="color-block orange" @click="changeItem(item,'bg-orange')"></span>
                                    <span class="color-block blue"  @click="changeItem(item,'bg-blue')"></span>
                                    <span class="color-block green"  @click="changeItem(item,'bg-green')"></span>
                                    <span class="color-block red"  @click="changeItem(item,'bg-red')"></span>
                                </span>
                                <i class="el-icon-delete fl-right margin-left-10" @click="deleteItem(item)"></i>
                                <i class="el-icon-edit fl-right " @click="editItem($event)"></i>
                            </div>
                            <div class="item-content">
                                <img v-if="item.icon == ''" src="@/assets/images/transctaion_1.png" alt="" width="50">
                                <img v-else :src="require('@/assets/images/icon/'+item.icon)" alt="" width="50">
                                <div class="textBox">
                                    <div class="title">{{item.title}}</div>
                                    <div class="description">{{item.description}}</div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </draggable>
            </el-row>
            <el-row class="applicationsText">
                <el-col>
                    <span class="title">推荐应用</span>
                    <router-link to="/" class="more fl-right">更多...</router-link>
                </el-col>
            </el-row>
            <el-row class="showList" type="flex" :gutter="15">
                <el-col v-for="item in recommendList" :xs="24" :md="12" :lg="6">
                    <div class="list-content-item">
                        <div class="item-content">
                            <img src="@/assets/images/transctaion_1.png" alt="" width="50">
                            <div class="textBox">
                                <div class="title">{{item.text}}</div>
                                <div class="description">
                                    <el-rate v-model="item.score" disabled disabled-void-color="#999999"  style="font-size:16px;"></el-rate>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="15" class="panel-box">
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>热门排行</span>
                            <el-button style="float: right; padding: 3px 0;color: blue; font-size: 16px;" type="text">更多</el-button>
                        </div>
                        <ul class="topRankList">
                            <li>
                                <span>1.学生在校打印证明</span>
                                <span>
                                        <el-progress :percentage="100" status="exception" :show-text="false" :stroke-width="8"></el-progress>
                                    </span>
                            </li>
                            <li>
                                <span>2.教务系统密码查询</span>
                                <span>
                                        <el-progress :percentage="100" status="exception" :show-text="false" :stroke-width="8"></el-progress>
                                    </span>
                            </li>
                            <li>
                                <span>3.校园卡门禁开通</span>
                                <span>
                                        <el-progress :percentage="100" status="exception" :show-text="false" :stroke-width="8"></el-progress>
                                    </span>
                            </li>
                            <li>
                                <span>4.校园生活</span>
                                <span>
                                        <el-progress :percentage="100" status="exception" :show-text="false" :stroke-width="8"></el-progress>
                                    </span>
                            </li>
                            <li>
                                <span>5.研究生服务</span>
                                <span>
                                        <el-progress :percentage="100" status="exception" :show-text="false" :stroke-width="8"></el-progress>
                                    </span>
                            </li>
                        </ul>
                    </el-card>
                </el-col>
                <el-col :span="12" >
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>经验分享</span>
                            <el-button style="float: right; padding: 3px 0;color: blue; font-size: 16px;" type="text">更多</el-button>
                        </div>
                        <div class="text item experience-item">
                            <img src="@/assets/images/jingyan.jpeg" alt="" width="47">
                            <div class="content">
                                <div>
                                    <span>给师弟师妹们分享学习讲义</span>
                                    <span class="fl-right time">5:09PM</span>
                                </div>
                                <div class="description">
                                    Can't wait to see you
                                </div>
                            </div>
                        </div>
                        <div class="text item experience-item">
                            <img src="@/assets/images/jingyan.jpeg" alt="" width="47">
                            <div class="content">
                                <div>
                                    <span>针对办事效率提一点个人意见</span>
                                    <span class="fl-right time">5:09PM</span>
                                </div>
                                <div class="description">
                                    办事效率搞，能够迅速完成事务。
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <!--个性桌面-->
        <el-dialog
                title="个性桌面"
                :visible.sync="dialogVisible"
                width="50%"
                class="desktopDialog"
                :before-close="handleClose">
            <el-row>
                <el-col :span="24" class="showBox">
                    <div class="title">
                        <span class="titleText">自定义桌面</span>
                        <el-radio v-model="radioValue"  label="1">显示</el-radio>
                    </div>
                    <ul class="listBox">
                        <li v-for="item in selectList" @click="deleteSelect(item)">{{item.title}} <i class="el-icon-error fl-right"></i></li>
                    </ul>
                </el-col>
                <el-col :span="24" class="selectBox">
                    <div class="title">
                        <span class="titleText">学生事务</span>
                    </div>
                    <ul class="listBox">
                        <li v-for="item in currentType.list" :class="{'selected-item':item.status}" @click="changeSelect(item)">{{item.title}} <i class="el-icon-check fl-right"></i></li>
                    </ul>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-checkbox v-model="selectAll">全选显示</el-checkbox>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button class="confirmBtn" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import draggable from 'vuedraggable';
    export default {
        name: "transaction",
        components: { draggable },
        data(){
            return{
                //事务类型
                typeList:[
                    {type:"student",name:"学生事务",
                        list:[
                            {id:"1",icon:"zxzx.png",title:"资助中心",description:"帮助学生",bg:"",status:false},
                            {id:"2",icon:"wjcf.png",title:"违纪处分",description:"学生事务",bg:"",status:false},
                            {id:"3",icon:"sssq.png",title:"宿舍申请",description:"学生事务",bg:"",status:false},
                            {id:"4",icon:"zyfw.png",title:"志愿服务",description:"学生事务",bg:"",status:false},
                            {id:"5",icon:"lxgl.png",title:"离校管理",description:"学生事务",bg:"",status:false},
                            {id:"6",icon:"jxj.png",title:"奖学金",description:"学生事务",bg:"",status:false},
                            {id:"7",icon:"xxgl.png",title:"信息管理",description:"学生事务",bg:"",status:false},
                            {id:"8",icon:"xxst.png",title:"学生社团",description:"学生事务",bg:"",status:false},
                            {id:"9",icon:"xysh.png",title:"校园生活",description:"学生事务",bg:"",status:false},
                            {id:"10",icon:"dbgs.png",title:"答辩公示",description:"学生事务",bg:"",status:false},
                            {id:"11",icon:"xxkc.png",title:"选学课程",description:"学生事务",bg:"",status:false},
                            {id:"12",icon:"zgdw.png",title:"政工队伍",description:"学生事务",bg:"",status:false},
                            {id:"13",icon:"xwxx2.png",title:"校务信箱",description:"学生事务",bg:"",status:false},
                            {id:"15",icon:"yjsfw.png",title:"研究生服务",description:"学生事务",bg:"",status:false},
                            {id:"16",icon:"xysh2.png",title:"校园生活",description:"学生事务",bg:"",status:false},
                            {id:"17",icon:"qgjx.png",title:"勤工俭学",description:"学生事务",bg:"",status:false},
                        ]},
                    {type:"teacher",name:"教师事务",
                        list:[
                            {id:"1",icon:"",title:"校务信箱",description:"教师事务",bg:""},
                            {id:"2",icon:"",title:"国际交流",description:"教师事务",bg:""},
                            {id:"3",icon:"",title:"宿舍管理",description:"教师事务",bg:""},
                            {id:"4",icon:"",title:"校园网",description:"教师事务",bg:""},
                            {id:"5",icon:"",title:"教学管理",description:"教师事务",bg:""},
                            {id:"6",icon:"",title:"停薪留学",description:"教师事务",bg:""},
                            {id:"7",icon:"",title:"政工队伍",description:"教师事务",bg:""},
                            {id:"8",icon:"",title:"离校管理",description:"教师事务",bg:""},
                            {id:"9",icon:"",title:"学科竞赛",description:"教师事务",bg:""},
                            {id:"10",icon:"",title:"校园生活",description:"教师事务",bg:""},
                            {id:"11",icon:"",title:"科技管理",description:"教师事务",bg:""},
                            {id:"12",icon:"",title:"教师邮箱",description:"教师事务",bg:""},
                            {id:"13",icon:"",title:"研究生服务",description:"教师事务",bg:""}
                        ]},
                    {type:"personnel",name:"人事事务",
                        list:[
                            {id:"1",icon:"",title:"人事信息",description:"人事事务",bg:""},
                            {id:"2",icon:"",title:"入职管理",description:"人事事务",bg:""},
                            {id:"3",icon:"",title:"审核中心",description:"人事事务",bg:""},
                            {id:"4",icon:"",title:"人才库",description:"人事事务",bg:""},
                            {id:"5",icon:"",title:"人员薪资",description:"人事事务",bg:""},
                            {id:"6",icon:"",title:"编外人员",description:"人事事务",bg:""},
                            {id:"7",icon:"",title:"机构变更",description:"人事事务",bg:""},
                            {id:"8",icon:"",title:"合同管理",description:"人事事务",bg:""},
                            {id:"9",icon:"",title:"报告公示",description:"人事事务",bg:""},
                            {id:"10",icon:"",title:"离校流程",description:"人事事务",bg:""},
                            {id:"11",icon:"",title:"审核和中心",description:"人事事务",bg:""},
                            {id:"12",icon:"",title:"信息管理",description:"人事事务",bg:""},
                            {id:"13",icon:"",title:"经历记录",description:"人事事务",bg:""},
                            {id:"13",icon:"",title:"薪资标准",description:"人事事务",bg:""}
                        ]
                    },
                    {type:"management",name:"管理事务",
                        list:[
                            {id:"1",icon:"",title:"主数据管理",description:"管理事务",bg:""},
                            {id:"2",icon:"",title:"API管理工具",description:"管理事务",bg:""},
                            {id:"3",icon:"",title:"智能数据分析",description:"管理事务",bg:""},
                            {id:"4",icon:"",title:"身份管理平台",description:"管理事务",bg:""},
                            {id:"5",icon:"",title:"运行监控数据",description:"管理事务",bg:""}
                        ]
                    },
                ],
                //显示对应事务的相应列表
                currentType:{},
                selectList:[],//个性界面选择的数组
                // 推荐应用列表
                recommendList:[
                    {text:"学习异动申请","score":0},
                    {text:"课程补休重修","score":3},
                    {text:"校园卡开通","score":3},
                    {text:"在校证明打印","score":3},
                    {text:"教务系统密码","score":3},
                    {text:"学生证补办","score":4},
                    {text:"成绩证明打印","score":3},
                    {text:"英语等级测试","score":5},
                ],
                dialogVisible:false,//个性界面是否显示
                radioValue:"1",//自定义显示
                selectList:[],//选择的自定义列表
                //列表所有
                list:[
                    {id:1,text:"资助中心",show:true},
                    {id:2,text:"违纪处分",show:true},
                    {id:3,text:"宿舍申请",show:true},
                    {id:4,text:"学生社团",show:true},
                    {id:5,text:"答辩公示",show:true},
                    {id:6,text:"离校管理",show:true},
                    {id:7,text:"奖学金",show:true},
                    {id:8,text:"信息管理",show:true},
                    {id:9,text:"校园生活",show:true},
                    {id:10,text:"选学课程",show:true},
                    {id:11,text:"学生社团",show:true},
                    {id:12,text:"研究生服务",show:true},
                    {id:13,text:"勤工俭学",show:true},
                    {id:14,text:"义工服务",show:true},
                    {id:15,text:"医疗保险",show:true},
                    {id:16,text:"健康中心",show:true},
                    {id:17,text:"志愿服务",show:true}
                ],
                selectAll:false
            }
        },
        mounted(){
            this.currentType = this.typeList[0];
            for(var i = 0;i<4;i++){
                this.selectList.push(this.currentTyp[i])
            }
        },
        methods:{
            // 关闭个性桌面
            handleClose(){
                this.dialogVisible = false;
            },
            // 删除事务
            deleteItem(params){
                var len = this.currentType.list.length;
                for (let i=0;i<len-1;i++){
                    if(this.currentType.list[i] == params){
                        this.currentType.list.splice(i,1);
                    }
                }
            },
            //编辑事务
            editItem(e){
               console.log(e.target.parentNode.getElementsByClassName('color-block-box')[0].style.display)
            },
            // 颜色改变
            changeItem(params,color){
                params.bg = color;
            },
            setData(dataTransfer) {
                // to avoid Firefox bug
                // Detail see : https://github.com/RubaXa/Sortable/issues/1012
                dataTransfer.setData('Text', '')
            },
            // 个性桌面的所有列表项点击
            changeSelect(params){
                var flag = false;
                this.selectList.forEach(function(item, i){
                    if(item == params){
                        flag = true;
                    }
                });
                if(flag){
                    this.deleteSelect(params);
                }else{
                   this.addSelect(params);
                }
            },
            //个性桌面的添加
            addSelect(params){
                var flag = false;
                this.selectList.forEach(function(item, i){
                    if(item == params)flag = true;
                });
                if(!flag)this.selectList.push(params);
                params.status = true;
            },
            //个性桌面的删除
            deleteSelect(params){
                this.selectList.forEach(function(item, i, arr){
                    if(item == params){
                        arr.splice(i, 1);
                    }
                });
                params.status = false;
            },
        },
        filters:{
            isTrue(x){
                var flag = false;
                this.selectList.forEach(function(item,i){
                    if(item == x){
                        flag = true;
                    }
                });
                return flag;
            }
        }
    }
</script>

<style lang="scss" scoped>
.transaction{
    min-height: 100%;
    width: 100%;
    background: url("../../assets/images/bg_1.jpg") no-repeat ;
    background-size: cover;
    /*background: #e4e4e4;*/
    /*background: #5c5b58;*/
    /*background: -webkit-gradient(linear, 0 0, 0 100%, from(#e4e4e4), to(#5c5b58));*/
    overflow:hidden;
    .transaction-wrapper{
        /*border:1px solid red;*/
        width:100%;
        max-width:992px;
        margin:0 auto;
        .transaction-header{
            display: flex;
            padding-top:30px;
            .eventBox{
                flex:1;
                height:auto;
                .eventBox1{
                    padding:12px 0;
                    text-align:right;
                    border-bottom:1px solid #cccccc;
                }
                .userInfo{
                    i{margin-right:10px;}
                }
                .loginOut{
                    margin-left:45px;
                }
            }
        }
        .personalDesktop{
            margin-top:10px;
            text-align:right;
            button{
                background:#cccccc;
                color:#ffffff;
                padding:8px 35px;
                font-weight:700;
            }
        }
        .menuList{
            width:100%;
            margin:45px 0;
            padding:0;
            list-style:none;
            display: flex;
            justify-content: center;
            li{
                padding:13px 35px;
                margin:0 15px;
                border:1px solid #797979;
                background:#ffffff;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                cursor:pointer;
                &.active,&:hover{
                    border-color:transparent;
                    background:#309bd5;
                    color:#ffffff;
                    font-weight:700;
                }
            }
        }
        .showList{
            flex-wrap: wrap;
            .list-content-item-list{
                height:100px;
                position: relative;
                /*border:1px solid red;*/
                &:hover{
                    .list-content-item{
                        padding:8px 10px;
                        position: absolute;
                        width: 100%;
                        top: -7.5px;
                        left: 0;
                    }
                }
            }
        }
        .list-content-item{
            padding: 15px;
            margin:7.5px 0;
            border:1px solid rgb(220, 220, 220);
            color: #ffffff;
            background:rgba(0,0,0,.3);
            /*transition: all .5s;*/
            .item-header{
                display: none;
                /*transition: all .5s;*/
                margin-bottom:10px;
                clear: both;
                zoom:1;
                color: #ffffff;
                .color-block{
                    display: inline-block;
                    width:25px;
                    height:10px;
                    cursor: pointer;
                    &.green{background: #48cc71;}
                    &.red{background: #f04744;}
                    &.orange{background: #f8a747;}
                    &.blue{background: #3498da;}
                    i{cursor:pointer;}
                }
            }
            &:hover{
                /*transform: scale(1);*/
                .item-header{
                    display: block;
                }
            }
            &.bg-orange{
                background: rgba(248,167,71,.3);
            }
            &.bg-blue{
                background: rgba(52,152,218,.3);
            }
            &.bg-green{
                background: rgba(72,204,113,.3);
            }
            &.bg-red{
                background: rgba(240,71,68,.3);
            }
        }
        .applicationsText{
            padding: 15px;
            margin: 20px 0 15px;
            border-top: 1px solid #ffffff;
        }
        .item-content{
            display: flex;
            .textBox{
                flex:1;
                margin-left:15px;
                /*color: #60739d;*/
                line-height:25px;
                .title{
                    font-weight:700;
                }
            }
        }

        .margin-left-10{margin-left:10px;}
        .color-blue{color:blue;}
        .panel-box{margin-top:10px;margin-bottom:50px;}
        .topRankList{
            padding:0;
            margin:0;
            width:100%;
            list-style: none;
            li{
                display:flex;
                padding:7px 0;
                span{
                    display: inline-block;
                    width:50%;
                    &:nth-last-child(1){
                        padding-left:10px;
                    }
                }
            }
        }
        .experience-item{
            display: flex;
            padding:15px;
            margin-bottom:7.5px;
            background-color: rgba(250, 250, 250, 1);
            border-radius: 2px;
            -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.149019607843137);
            -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.149019607843137);
            box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.149019607843137);
            &:nth-last-child(1){
                margin:0;
            }
            >img{margin-right:25px;}
            .content{
                flex:1;
                line-height:24px;
                .time{
                    font-style: normal;
                    font-size: 12px;
                    color: #8A8A8A;
                }
                .description{
                    font-style: normal;
                    font-size: 14px;
                    color: #8A8A8A;
                }
            }
        }
    }
    .fl-right{
        float:right;
    }
     /deep/ .el-rate__icon{
        font-size:20px;
    }
     /deep/ .el-progress.is-exception .el-progress-bar__inner{
        background-color: rgba(0, 157, 218, 1);
    }
    /deep/ .el-card__header{
        padding:15px 20px;
        border-bottom:2px solid rgb(220, 220, 220);
    }
    /deep/ .desktopDialog{
        color:#333333;
        .el-dialog__header{
            padding:25px 20px;
            border-bottom:1px solid #cccccc
        }
        .el-dialog__headerbtn{top:25px;}
        .el-dialog__close{
            font-size: 22px;
            font-weight: 500;
            color: #303133;
        }
        .el-dialog__title{font-size:22px;font-weight:500;}
        .el-dialog__body{padding:15px 20px;color:#333333;}
        .el-dialog__footer{border-top: 1px solid #cccccc;}
        .dialog-footer{
            display: inline-block;
            width: 100%;
            clear: both;
            zoom: 1;
            .el-checkbox{
                float: left;
                margin-top: 15px;
                margin-left: 50px;
            }
            .confirmBtn{
                color: blue;
            }
        }
        .showBox{
            padding:25px 50px;
            background: #f5f6fa;
            .titleText{
                font-size: 18px;
                font-weight: 500;
                margin-right: 15px;
            }
            .el-radio__label{color:inherit;}
            .title{margin-bottom:20px;}
        }
        .selectBox{
            padding:25px 50px;
            .titleText{
                font-size: 18px;
                font-weight: 500;
                margin-right: 15px;
            }
            .title{margin-bottom:20px;}
        }
        .listBox{
            width:100%;
            padding:0;
            margin:0;
            list-style:none;
            display:flex;
            flex-wrap: wrap;
            li{
                width: calc((100% - 60px )/5);
                padding:10px;
                margin:7.5px;
                border:1px solid #cccccc;
                cursor: pointer;
                &:nth-child(5n+1){
                    margin-left:0;
                }
                &:nth-child(5n){
                    margin-right:0;
                }
            }
            .el-icon-error{color:red;}
            .el-icon-check{display: none;}
            .selected-item{
                color: #0033FF;
                border-color: rgb(16,163,255);
                .el-icon-check{display:inline-block;color:#5386ee;}
            }
        }
    }
}
</style>