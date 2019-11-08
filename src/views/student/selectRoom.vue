<template>
    <div class="selectRoom">
        <el-form class="filter-box" label-width="90px" :model="formInline">
            <el-card class="box-card ">
                <div slot="header" class="clearfix">
                    <span class="position-item">
                        <span>楼栋</span>
                        <el-select class="building" v-model="formInline.build" placeholder="请选择宿舍楼栋"></el-select>
                    </span>
                    <span class="position-item">
                        <span>楼层</span>
                        <el-select class="floor" v-model="formInline.floor" placeholder="请选择楼层"></el-select>
                    </span>
                    <span class="position-item">
                        <span>房间号</span>
                        <el-input class="room" v-model="formInline.room" placeholder="请输入房间号"></el-input>
                    </span>
                    <el-button type="primary" class="searchBtn">查询</el-button>
                </div>
                <el-form-item label="宿舍位置">
                    <div class="select-item">
                        <el-button type="text" class="all">不限</el-button>
                        <el-checkbox-group v-model="formInline.positions" @change="checkedPosition">
                            <el-checkbox v-for="item in positionList" :label="item" :key="item">{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
                <el-form-item label="价格区间">
                    <div class="select-item">
                        <el-button type="text" class="all">不限</el-button>
                        <el-input placeholder="最低价格" v-model="formInline.minPrice" class="minPrice"></el-input>
                        -
                        <el-input placeholder="最高价格" v-model="formInline.maxPrice" class="maxPrice"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="宿舍设施">
                    <div class="select-item">
                        <el-button type="text" class="all">不限</el-button>
                        <el-checkbox-group v-model="formInline.settings" @change="checkedSetting">
                            <el-checkbox v-for="item in settingList" :label="item" :key="item">{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-form-item>
                <p class="resultInfo"><span class="color-red">12+</span>间符合条件</p>
            </el-card>
        </el-form>
        <div class="result-list">
            <el-row  :gutter="15">
                <el-col :span="4" v-for="item in lists">
                    <board :key="1" :list="item.list" :group="group" class="kanban todo" :header-text="item.room" :dialogStatus="dialogVisible" @parentEvent="eventClick" />
                </el-col>
            </el-row>
        </div>
        <el-dialog
                title="入住提示"
                :visible.sync="dialogVisible"
                width="350px"
                class="tipDialog"
                :before-close="dialogClose">
            <i class="color-orange el-icon-warning font-size-20"></i>
            <div class="title">确定选择该宿舍吗？</div>
            <div class="tips">请到宿管员办理相关手续</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import board from './components/board'
    export default {
        name: "selectRoom",
        components: {
            board
        },
        data(){
            return{
                formInline:{
                    build:'',
                    floor:'',
                    room:'',
                    positions:[],
                    minPrice:"",
                    maxPrice:"",
                    settings:[]
                },
                positionList:["华南分校区","西乡分校区","车公庙分校区","坪山校区","宝安校区","横岗校区"],
                settingList:["书桌","椅子","书柜","空调","热水器","饮水机","晾衣间","烘干机","冰箱"],
                group: 'mission',
                lists:[
                    {
                        room:"701",
                        list:[
                            { name: 'Mission', id: 1 },
                            { name: 'Mission', id: 2 },
                            { name: 'Mission', id: 3 },
                            { name: 'Mission', id: 4 }
                        ]
                    },
                    {
                        room:"702",
                        list:[
                            { name: 'Mission', id: 5 },
                            { name: '', id: 6 },
                            { name: 'Mission', id: 7 }
                        ]
                    },
                    {
                        room:"703",
                        list:[
                            { name: 'Mission', id: 8 },
                            { name: 'Mission', id: 9 },
                            { name: '', id: 10 },
                            { name: 'Mission', id: 11 }
                        ],
                    },
                    {
                        room:"704",
                        list: [
                            { name: 'Mission', id: 12 },
                            { name: 'Mission', id: 13 },
                            { name: 'Mission', id: 14 }
                        ],
                    },
                    {
                        room:"705",
                        list:[
                            { name: 'Mission', id: 15 },
                            { name: '', id: 16 },
                            { name: 'Mission', id: 17 },
                            { name: 'Mission', id: 18 }
                        ],
                    },
                    {
                        room:"706",
                        list: [
                            { name: 'Mission', id: 19 },
                            { name: 'Mission', id: 20 },
                            { name: 'Mission', id: 21 }
                        ],
                    },




                    //
                    // [
                    //     { name: 'Mission', id: 22 },
                    //     { name: 'Mission', id: 23 },
                    //     { name: 'Mission', id: 24 }
                    // ],
                    // [
                    //     { name: 'Mission', id: 25 },
                    //     { name: 'Mission', id: 26 },
                    //     { name: 'Mission', id: 26 }
                    // ]
                ],
                dialogVisible:false
            }
        },
        methods:{
            // 宿舍位置
            checkedPosition(val){
                console.log(val);
            },
            // 宿舍位置
            checkedSetting(val){
                console.log(val);
            },
            eventClick(params){
                this.dialogVisible = true;
            },
            dialogClose(){
                this.dialogVisible = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
.selectRoom{
    padding:15px 25px;
    .filter-box{
        .position-item{
            display: inline-block;
            margin-right:20px;
            /deep/.el-input__inner{
                height:32px;
            }
        }
        .room{width:200px;}
        .searchBtn{
            min-width:100px;
            padding:8px 15px;
        }
        /deep/.el-form-item{
            margin-bottom:10px;
        }
        .select-item{
            border-bottom:1px solid #cccccc;
          .el-checkbox-group{
            display:inline-block;
              margin-left:15px;
          }
        }
        /deep/.el-button.all{
            color: #000;
        }
        /deep/ .el-form-item__label{
            text-align: center;
            font-weight:900;
        }
        /deep/.minPrice,/deep/.maxPrice{
            width:100px;
            margin:0 15px;
            .el-input__inner{
                height:30px;
                -webkit-border-radius: 15px;
                -moz-border-radius: 15px;
                border-radius: 15px;
                background: rgba(153, 153, 153,.4);
                caret-color:#ffffff;
            }
            ::-webkit-input-placeholder {
            color: rgb(153, 153, 153);
            font-weight: 400;
            }
            :-moz-placeholder {
            color: rgb(153, 153, 153);
            font-weight: 400;
            }
            ::-moz-placeholder {
            color: rgb(153, 153, 153);
            font-weight: 400;
            }
            :-ms-input-placeholder {
            color: rgb(153, 153, 153) !important;
            font-weight: 400 !important;
            }

            ::-ms-input-placeholder {
            color: rgb(153, 153, 153);
            font-weight: 400;
            }

        }
        .resultInfo{padding-left:30px;margin-bottom:0;}
    }
    .result-list{
        padding:15px 30px;
        margin-top:15px;
        border:1px solid #cccccc;
    }
    /deep/.kanban {
        &.todo {
            .board-column-header {
                background: #4A9FF9;
            }
        }
    }
    /deep/.tipDialog{
        .el-dialog__header{
            padding:10px 15px;
            background: rgba(81, 81, 81, 1);
            .el-dialog__title{
                color: #ffffff;
            }
            .el-dialog__headerbtn{
                top:13px;
                .el-dialog__close{
                    font-size:20px;
                }
            }
        }
        .el-dialog__body{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .title{
                margin:10px 0;
                font-weight: 700;
                font-size: 16px;
            }
        }
        .el-dialog__footer{
            background:rgba(240, 243, 250, 1);
            .el-button{padding:8px 20px;}
        }

    }
}

</style>