<template>
  <div class="human-container">
    <ul class="menuList">
      <li :class="{active:menuIndex == 1}" @click="menuIndex = 1">在校教职工</li>
      <li :class="{active:menuIndex == 2}" @click="menuIndex = 2">合同管理</li>
      <li :class="{active:menuIndex == 3}" @click="menuIndex = 3">人事变更</li>
    </ul>
    <div class="filter-container">
      <el-form :inline="true" :model="formInline">
        <el-form-item label="教工号">
          <el-input v-model="formInline.account" placeholder="请输入教工号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="入职日期">
          <div class="block">
            <!--<span class="demonstration">默认</span>-->
            <el-date-picker
              v-model="selectTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkSubmit">查询</el-button>
          <el-button @click="handleInputConfirm">保存</el-button>
        </el-form-item>
        <el-form-item class="fl-right">
          <el-button type="primary">新增</el-button>
        </el-form-item>
      </el-form>
      <el-row class="showBox1">
        <el-col :span="10">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span class="titleText">
                <i class="el-icon-time margin-right-10"></i>历史记录
              </span>
              <el-button
                style="float: right; padding: 3px 0;color:#303133;"
                @click="clearTags"
                type="text"
              >清空</el-button>
            </div>
            <el-tag
              v-for="(tag,index) in tags"
              :key="index"
              closable
              @close="handleClose(tag)"
              @click="handleClick(tag)"
            >{{tag.name?tag.name:''}}</el-tag>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      class="tableBox"
    >
      <el-table-column label="教工号" prop="account" align="center"></el-table-column>
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <el-table-column label="联系方式" prop="phone" align="center"></el-table-column>
      <el-table-column label="证件号" prop="idCard" align="center"></el-table-column>
      <el-table-column label="入职时间" prop="time" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text">修改</el-button>
          <el-button type="text" @click="$router.push('/humanAffairs/detail')">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"
import {parseTime} from '@/utils/index'
export default {
  name: "humanAffairs",
  components: { Pagination },
  data() {
    return {
      menuIndex: 1,
      formInline: {
        account: "",
        name: "",
        time:[]
      },
      selectTime:null,
      tags: [
        // { name: "张三", time: "" },
        { name: "马小云", time: [] },
        // { name: "马云", time: "" }
      ],
      tableData: [],
      dataList: [
        // {
        //   account: "2011002135452001",
        //   name: "王生安",
        //   phone: "1356667778",
        //   idCard: "4418212313142452",
        //   time: "2017-9-1 10:30:00"
        // },
      ],
      listLoading: false,
      total: 10, //总数
      listQuery: {
        page: 1,
        limit: 12
      }
    };
  },
  watch:{
    'selectTime':function(val){
      if(val == null){
        this.formInline.time =[];
      }else{
        // var time1 = parseTime(new Date(val[0]).getTime(),'{y}-{m}-{d}');
        // var time2 = parseTime(new Date(val[1]).getTime(),'{y}-{m}-{d}');
        var time1 = new Date(val[0]).getTime();
        var time2 = new Date(val[1]).getTime();
        this.formInline.time.push(time1);
        this.formInline.time.push(time2);
      }
    }
  },
  mounted() {
    this.getMockData();
    this.checkSubmit();
  },
  beforeDestroy() {},
  methods: {
    getMockData() {
      const obj = this.$Mock.mock({
        'list|12':[
          {
            'account': /(201100)\d{10}/,
            'name': '@cname()',
            'phone': /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            'idCard': '@id()',
            'time':' @datetime()'
          }
        ]
      });
      this.dataList = obj.list
    },
    handleClick(tag) {
      // 点击标签
      // console.log(tag);
      for (let key in tag) {
        // this.formInline[key] = tag[key]
        this.$set(this.formInline, key, tag[key]);
      }
    },
    clearTags() {
      // 1清空tags
      this.tags = [];
    },
    handleClose(tag) {
      // 删除标签
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    //添加新标签
    handleInputConfirm() {
      // 添加新标签
      let arr = [];
      for (let val in this.formInline) {
        arr.push(this.formInline[val]);
      }
      if (arr.some(item => item !== "")) {
        let obj = {};
        for (let key in this.formInline) {
          obj[key] = this.formInline[key];
        }
        // this.tags.push(obj);
        this.$set(this.tags, this.tags.length, obj);
        console.log(this.tags);
      }
      // this.inputVisible = false;
      // this.inputValue = '';
    },

    // 查询 多条件筛选
    checkSubmit() {
      // let time = new Date('2017-9-1 10:30:00').getTime()
      // if(this.formInline.time.length>0) {
      //     return new Date('2017-9-1 10:30:00').getTime()
      // }
      this.tableData = this.dataList.filter(item => {
        return Object.keys(this.formInline).every(key => {
          return String(item[key])
            .toLowerCase()
            .includes(
              String(this.formInline[key])
                .trim()
                .toLowerCase()
            );
        });
      });
    },
    // 保存
    saveSubmit() {},
    // 获取列表
    getList() {
      this.listLoading = true;
      setTimeout(() => {
        // this.dataList = this.dataList.concat(this.dataList);
        // this.total = 100;
        this.listLoading = false;
      }, 1000);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.human-container {
  padding: 15px 25px;
  ul,
  li {
    list-style: none;
  }
  .menuList {
    display: flex;
    border: 1px solid rgb(204, 204, 204);
    li {
      width: 150px;
      padding: 12.5px;
      border-right: 1px solid rgb(204, 204, 204);
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      &.active {
        color: #3aabfe;
        border-bottom: 2px solid #3aabfe;
      }
    }
  }
  .infoTotal {
    margin-top: 15px;
    .classInfo {
      /*height:100px;*/
      /*border:1px solid red;*/
      .classRow {
        align-items: center;
      }
      #chart1 {
        width: 300px;
        height: 300px;
        margin: 0 auto;
      }
      .show-info {
        width: 100%;
        padding: 0 10px;
        display: inline-block;
        &.text-right {
          text-align: right;
        }
        li {
          &.title {
            font-weight: 500;
            font-size: 18px;
          }
          padding: 10px 0;
        }
      }
    }
    .studentInfo {
      #chart2 {
        width: 300px;
        height: 300px;
        margin: 0 auto;
      }
    }
  }

  .filter-container {
    padding: 15px;
    margin-top: 15px;
    border: 1px solid rgb(204, 204, 204);
    .el-form-item {
      margin: 0;
      &:nth-child(1),
      &:nth-child(2) {
        margin-right: 35px;
      }
      &:nth-child(3) {
        margin-right: 15px;
      }
      .el-button {
        padding: 8px 15px;
        min-width: 115px;
      }
    }
    .showBox1 {
      margin-top: 15px;
      /deep/ .el-card {
        background: #f0f0f0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border: none;
        .el-card__header {
          padding: 10px;
          border: none;
        }
        .titleText {
          font-size: 14px;
        }
        .el-card__body {
          padding: 0 15px 15px;
        }
      }
      .datAnalysis {
        float: right;
        margin-top: 25px;
      }
      /deep/.el-tag {
        margin-right: 10px;
        background: #ffffff;
        color: inherit;
        border-color: #cccccc;
        cursor: pointer;
        .el-icon-close {
          color: inherit;
          /*&:hover{*/
          /*background: inherit;*/
          /*}*/
        }
      }
    }
  }
  .tableBox {
    margin-top: 15px;
  }
  /deep/.pagination-container {
    margin: 0;
    border: 1px solid #dfe6ec;
    border-top: none;
  }
  /deep/ .el-card {
    margin-bottom: 20px;
    &.not-header-border {
      /*.el-card__header{*/
      /*border:none;*/
      /*}*/
      .el-card__body {
        padding: 10px 20px 20px;
      }
    }
    .el-card__header {
      padding: 10px 20px;
      /*border-bottom:2px solid #cccccc;*/
      .title {
        font-weight: 500;
        line-height: 25px;
      }
    }
    .moreBtn {
      color: blue;
      margin-right: 15px;
    }
    .closeBtn {
      color: #d1d0d7;
      font-size: 16px;
      font-weight: 700;
    }
    .el-card__body {
      padding: 0;
    }
  }
}

</style>