<template>
  <div class="selectRoom">
    <el-form class="filter-box" label-width="90px" :model="formInline">
      <el-card class="box-card ">
        <div slot="header" class="clearfix">
          <span class="position-item">
            <span>楼栋</span>
            <el-select v-model="formInline.build" class="building" placeholder="请选择宿舍楼栋">
              <el-option label="C1栋" value="c1" />
              <el-option label="C2栋" value="c2" />
              <el-option label="C3栋" value="c3" />
              <el-option label="C4栋" value="c4" />
            </el-select>
          </span>
          <span class="position-item">
            <span>楼层</span>
            <el-select v-model="formInline.floor" class="floor" placeholder="请选择楼层">
              <el-option label="1F" value="1f" />
              <el-option label="2F" value="2f" />
              <el-option label="3F" value="3f" />
              <el-option label="4F" value="4f" />
              <el-option label="5F" value="5f" />
              <el-option label="6F" value="6f" />
              <el-option label="7F" value="7f" />
              <el-option label="8F" value="8f" />
              <el-option label="9F" value="9f" />
            </el-select>
          </span>
          <span class="position-item">
            <span>房间号</span>
            <el-input v-model="formInline.room" class="room" placeholder="请输入房间号" />
          </span>
          <el-button type="primary" class="searchBtn" @click="searchData">查询</el-button>
        </div>
        <el-form-item label="宿舍位置">
          <div class="select-item">
            <el-button type="text" class="all">不限</el-button>
            <el-checkbox-group v-model="formInline.positions" @change="checkedPosition">
              <el-checkbox v-for="item in positionList" :key="item" :label="item">{{ item }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="价格区间">
          <div class="select-item">
            <el-button type="text" class="all">不限</el-button>
            <el-input v-model="formInline.minPrice" placeholder="最低价格" class="minPrice" />
            -
            <el-input v-model="formInline.maxPrice" placeholder="最高价格" class="maxPrice" />
          </div>
        </el-form-item>
        <el-form-item label="宿舍设施">
          <div class="select-item">
            <el-button type="text" class="all">不限</el-button>
            <el-checkbox-group v-model="formInline.settings" @change="checkedSetting">
              <el-checkbox v-for="item in settingList" :key="item" :label="item">{{ item }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <p class="resultInfo"><span class="color-red">12+</span>间符合条件</p>
      </el-card>
    </el-form>
    <div class="result-list" v-show="showType == 1">
      <el-row :gutter="15">
        <el-col v-for="item in lists" :span="4">
          <board :key="1" :list="item.list" :group="group" class="kanban todo" :header-text="item.room" :dialog-status="dialogVisible" @parentEvent="eventClick" />
        </el-col>
      </el-row>
    </div>
    <div class="floor" v-show="showType == 0">
      <div class="floor_son">
        <div class="left">
          <h3>7F</h3>
          <div> <span>已入驻:38</span> </div>
          <div> <span>空余床位:8</span> </div>
        </div>
        <div class="right">
          <div class="dorm full" >
            <div class="num">701</div>
          </div>
          <div class="dorm" >
            <div class="num">702</div>
          </div>
          <div class="dorm" >
            <div class="num">703</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">704</div>
            
          </div>
          <div class="dorm" >
            <div class="num">705</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">706</div>
            
          </div>
          <div class="dorm" >
            <div class="num">707</div>
           
          </div>
          <div class="dorm" >
            <div class="num">708</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">709</div>
            
          </div>
          <div class="dorm" >
            <div class="num">710</div>
            
          </div>
          <div class="dorm" >
            <div class="num">711</div>
            
          </div>
          <div class="dorm" >
            <div class="num">712</div>
            
          </div>

        </div>
      </div>
      <div class="floor_son">
        <div class="left">
          <h3>6F</h3>
          <div> <span>已入驻:42</span> </div>
          <div> <span>空余床位:4</span> </div>
        </div>
        <div class="right">
          <div class="dorm full" >
            <div class="num">601</div>
            
          </div>
          <div class="dorm" >
            <div class="num">602</div>
            
          </div>
          <div class="dorm" >
            <div class="num">603</div>
            
          </div>
          <div class="dorm" >
            <div class="num">604</div>
            
          </div>
          <div class="dorm" >
            <div class="num">605</div>
            
          </div>
          <div class="dorm" >
            <div class="num">606</div>
            
          </div>
          <div class="dorm" >
            <div class="num">607</div>
           
          </div>
          <div class="dorm" >
            <div class="num">608</div>
            
          </div>
          <div class="dorm" >
            <div class="num">609</div>
            
          </div>
          <div class="dorm" >
            <div class="num">610</div>
            
          </div>
          <div class="dorm" >
            <div class="num">611</div>
            
          </div>
          <div class="dorm" >
            <div class="num">612</div>
            
          </div>

        </div>
      </div>
      <div class="floor_son">
        <div class="left">
          <h3>5F</h3>
          <div> <span>已入驻:42</span> </div>
          <div> <span>空余床位:4</span> </div>
        </div>
        <div class="right">
          <div class="dorm full" >
            <div class="num">501</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">502</div>
            
          </div>
          <div class="dorm" >
            <div class="num">503</div>
            
          </div>
          <div class="dorm" >
            <div class="num">504</div>
            
          </div>
          <div class="dorm" >
            <div class="num">505</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">506</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">507</div>
           
          </div>
          <div class="dorm" >
            <div class="num">508</div>
            
          </div>
          <div class="dorm" >
            <div class="num">509</div>
            
          </div>
          <div class="dorm" >
            <div class="num">510</div>
            
          </div>
          <div class="dorm" >
            <div class="num">511</div>
            
          </div>
          <div class="dorm" >
            <div class="num">512</div>
            
          </div>

        </div>
      </div> <div class="floor_son">
        <div class="left">
          <h3>4F</h3>
          <div> <span>已入驻:42</span> </div>
          <div> <span>空余床位:4</span> </div>
        </div>
        <div class="right">
          <div class="dorm full" >
            <div class="num">401</div>
            
          </div>
          <div class="dorm" >
            <div class="num">402</div>
            
          </div>
          <div class="dorm" >
            <div class="num">403</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">404</div>
            
          </div>
          <div class="dorm" >
            <div class="num">405</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">406</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">407</div>
           
          </div>
          <div class="dorm" >
            <div class="num">408</div>
            
          </div>
          <div class="dorm" >
            <div class="num">409</div>
            
          </div>
          <div class="dorm" >
            <div class="num">410</div>
            
          </div>
          <div class="dorm" >
            <div class="num">411</div>
            
          </div>
          <div class="dorm" >
            <div class="num">412</div>
            
          </div>

        </div>
      </div> <div class="floor_son">
        <div class="left">
          <h3>3F</h3>
          <div> <span>已入驻:42</span> </div>
          <div> <span>空余床位:4</span> </div>
        </div>
        <div class="right">
          <div class="dorm " >
            <div class="num">301</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">302</div>
            
          </div>
          <div class="dorm" >
            <div class="num">303</div>
            
          </div>
          <div class="dorm" >
            <div class="num">304</div>
            
          </div>
          <div class="dorm" >
            <div class="num">305</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">306</div>
            
          </div>
          <div class="dorm" >
            <div class="num">307</div>
           
          </div>
          <div class="dorm" >
            <div class="num">308</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">309</div>
            
          </div>
          <div class="dorm" >
            <div class="num">310</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">311</div>
            
          </div>
          <div class="dorm" >
            <div class="num">312</div>
            
          </div>

        </div>
      </div> <div class="floor_son">
        <div class="left">
          <h3>2F</h3>
          <div> <span>已入驻:42</span> </div>
          <div> <span>空余床位:4</span> </div>
        </div>
        <div class="right">
          <div class="dorm full" >
            <div class="num">201</div>
            
          </div>
          <div class="dorm" >
            <div class="num">202</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">203</div>
            
          </div>
          <div class="dorm" >
            <div class="num">204</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">205</div>
            
          </div>
          <div class="dorm" >
            <div class="num">206</div>
            
          </div>
          <div class="dorm" >
            <div class="num">207</div>
           
          </div>
          <div class="dorm" >
            <div class="num">208</div>
            
          </div>
          <div class="dorm" >
            <div class="num full">209</div>
            
          </div>
          <div class="dorm" >
            <div class="num">210</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">211</div>
            
          </div>
          <div class="dorm" >
            <div class="num">212</div>
            
          </div>

        </div>
      </div> <div class="floor_son">
        <div class="left">
          <h3>1F</h3>
          <div> <span>已入驻:42</span> </div>
          <div> <span>空余床位:4</span> </div>
        </div>
        <div class="right">
          <div class="dorm full" >
            <div class="num">101</div>
            
          </div>
          <div class="dorm" >
            <div class="num">102</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">103</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">104</div>
            
          </div>
          <div class="dorm" >
            <div class="num">105</div>
            
          </div>
          <div class="dorm" >
            <div class="num">106</div>
            
          </div>
          <div class="dorm" >
            <div class="num">107</div>
           
          </div>
          <div class="dorm full" >
            <div class="num">108</div>
            
          </div>
          <div class="dorm" >
            <div class="num">109</div>
            
          </div>
          <div class="dorm" >
            <div class="num">110</div>
            
          </div>
          <div class="dorm" >
            <div class="num">111</div>
            
          </div>
          <div class="dorm full" >
            <div class="num">112</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="入住提示"
      :visible.sync="dialogVisible"
      width="350px"
      class="tipDialog"
      :before-close="dialogClose"
    >
      <i class="color-orange el-icon-warning font-size-20" />
      <div class="title">确定选择该宿舍吗？</div>
      <div class="tips">请到宿管员办理相关手续</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import board from './components/board'
export default {
  name: 'SelectRoom',
  components: {
    board
  },
  data() {
    return {
      status: false, // 状态：false：未选择 true：选择
      showType:0,// 0：显示楼层 1：楼层显示房间
      formInline: {
        build: '',
        floor: '',
        room: '',
        positions: [],
        minPrice: '',
        maxPrice: '',
        settings: []
      },
      positionList: ['华南分校区', '西乡分校区', '车公庙分校区', '坪山校区', '宝安校区', '横岗校区'],
      settingList: ['书桌', '椅子', '书柜', '空调', '热水器', '饮水机', '晾衣间', '烘干机', '冰箱'],
      group: 'mission',
      lists0:[
        {
          floor:'7F'
        }
      ],
      lists: [
        {
          room: '701',
          list: [
            { name: '张林海', id: 1, account: '2019565001' },
            { name: '', id: 2, account: '' },
            { name: '王雨陆', id: 3, account: '2019565003' },
            { name: '刘羽', id: 4, account: '2019565004' }
          ]
        },
        {
          room: '702',
          list: [
            { name: '韩静海', id: 5, account: '2019565005' },
            { name: '', id: 6, account: '' },
            { name: '吴柏羽', id: 7, account: '2019565007' }
          ]
        },
        {
          room: '703',
          list: [
            { name: '刘雨', id: 8, account: '2019565008' },
            { name: '', id: 9, account: '' },
            { name: '', id: 10, account: '' },
            { name: '柳雨生', id: 11, account: '20195650011' }
          ]
        },
        {
          room: '704',
          list: [
            { name: '', id: 12, account: '' },
            { name: '林尚则', id: 13, account: '20195650013' },
            { name: '林灵生', id: 14 }
          ]
        },
        {
          room: '705',
          list: [
            { name: '柳升莫', id: 15, account: '20195650014' },
            { name: '王月品', id: 16, account: '20195650015' },
            { name: '', id: 17, account: '' },
            { name: '李龚', id: 18 }
          ]
        },
        {
          room: '706',
          list: [
            { name: '', id: 19, account: '' },
            { name: '张增杰', id: 20, account: '20195650018' },
            { name: '林家方', id: 21, account: '20195650019' }
          ]
        }
      ],
      dialogVisible: false,
      roomInfo: {}// 选择的宿舍
    }
  },
  methods: {
    // 宿舍位置
    checkedPosition(val) {
      console.log(val)
    },
    // 宿舍位置
    checkedSetting(val) {
      console.log(val)
    },
    //查询
    searchData(){
      this.showType = 1;
    },
    // 点击宿舍
    eventClick(params) {
      this.roomInfo = params;
      this.dialogVisible = true
    },
    // 关闭选择宿舍
    dialogClose() {
      this.roomInfo = {}
      this.dialogVisible = false
    },
    // 确认选择宿舍
    confirmSelect() {
      if (!this.status) {
        this.status = true
        this.roomInfo.account = '20195650020'
        this.roomInfo.name = '张志杰（待审核）'
      } else {
        this.$message({
          message: '不能重复选择宿舍，请到宿管员办理相关手续',
          type: 'warning'
        })
      }
      this.dialogClose()
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


  .floor_son {
    display: flex;
    border: 1px solid #cccccc;
    padding: 5px 5px;
    margin-bottom:15px;
    /*height: 140px;*/
    .left {
      //   border: 1px solid black;
      width: 150px;
      text-align: center;
      line-height: 30px;
      /*flex-grow: 1;*/
      /*div {*/
        /*width: 100px;*/
      /*}*/
    }
    .right {
      text-align: center;
      line-height: 50px;
      display: flex;
      flex:1;
      /*flex-grow: 6;*/
      flex-wrap: wrap;
      /*justify-content: space-around;*/
      /*align-content: space-between;*/
      .dorm {
        width: calc((100% - 72px)/6);
        height: 50px;
        margin:5px;
        border: 1px solid #79cafe;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        &.full{
          background:#44c06c;
          color: #ffffff;
        }
      }
    }
  }
  /*.position {*/
    /*position: relative;*/
    /*z-index: 1;*/
  /*}*/
  .floor{
    margin:25px 0;
    /*margin-bottom:400px;*/
  }
}

</style>
