<template>
  <!--宿舍管理-->
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
          <el-button type="primary" class="searchBtn">查询</el-button>
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
    <div class="result-list">
      <el-row :gutter="15">
        <el-col v-for="item in lists" :span="4">
          <board :key="1" :list="item.list" :group="group" class="kanban todo" :header-text="item.room" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import board from './components/board'

export default {
  components: {
    board
  },
  data() {
    return {
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
      lists: [
        {
          room: '701',
          list: [
            { name: '张林海', id: 1 },
            { name: '', id: 2 },
            { name: '王雨陆', id: 3 },
            { name: '刘羽', id: 4 }
          ]
        },
        {
          room: '702',
          list: [
            { name: '韩静海', id: 5 },
            { name: '', id: 6 },
            { name: '吴柏羽', id: 7 }
          ]
        },
        {
          room: '703',
          list: [
            { name: '刘雨', id: 8 },
            { name: '', id: 9 },
            { name: '', id: 10 },
            { name: '柳雨生', id: 11 }
          ]
        },
        {
          room: '704',
          list: [
            { name: '', id: 12 },
            { name: '林尚则', id: 13 },
            { name: '林灵生', id: 14 }
          ]
        },
        {
          room: '705',
          list: [
            { name: '柳升莫', id: 15 },
            { name: '王月品', id: 16 },
            { name: '', id: 17 },
            { name: '李龚', id: 18 }
          ]
        },
        {
          room: '706',
          list: [
            { name: '', id: 19 },
            { name: '张增杰', id: 20 },
            { name: '林家方', id: 21 }
          ]
        }
      ]
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
    onSubmit() {

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
  /*.main{*/
    /*padding:15px 25px;*/
  /*}*/
/*.check-box {*/
       /*height: 162px;*/
    /*border: 1px solid #bdc0c4;*/
    /*.pay {*/
       /*display: inline-block;*/
       /*.el-input {*/
          /*display: inline-block;*/
          /*width: 90px;*/
           /*/deep/ input.el-input__inner {*/
          /*width: 90px;*/
       /*}*/

       /*}*/

    /*}*/
/*}*/
/*.check {*/
      /*padding: 10px;*/
    /*border-bottom: 1px solid #bdc0c4;*/
   /*.el-checkbox-group {*/
   /*display: inline-block;*/
   /*padding-bottom: 10px;*/
/*}*/
/*}*/

  /*.floor_son {*/
    /*display: flex;*/
    /*border: 1px solid #ab9898;*/
    /*padding: 5px 5px;*/
    /*height: 180px;*/
    /*.left {*/
      /*//   border: 1px solid black;*/
      /*width: 100px;*/
      /*text-align: center;*/
      /*line-height: 30px;*/
      /*flex-grow: 1;*/
      /*div {*/
        /*width: 100px;*/
      /*}*/
    /*}*/
    /*.right {*/
      /*text-align: center;*/
      /*line-height: 74px;*/
      /*display: flex;*/
      /*flex-grow: 6;*/
      /*flex-wrap: wrap;*/
      /*justify-content: space-around;*/
      /*align-content: space-between;*/
      /*.dorm {*/
        /*width: 225px;*/
        /*height: 75px;*/
        /*border: 1px solid #ab9898;*/

      /*}*/
    /*}*/
  /*}*/
  /*.position {*/
    /*position: relative;*/
    /*z-index: 1;*/
  /*}*/
  /*.floor{*/
    /*margin:25px 0;*/
    /*!*margin-bottom:400px;*!*/
  /*}*/
</style>
