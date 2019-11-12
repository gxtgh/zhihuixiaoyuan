<template>
  <div class="main">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学号">
          <el-input v-model.trim="account" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setAccountData">查询</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="楼栋">
          <el-select v-model="formInline.building" placeholder="请选择宿舍楼栋">
            <el-option label="C1栋" :value="1" />
            <el-option label="C2栋" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="楼层">
          <el-select v-model="formInline.floor" placeholder="请选择楼层">
            <el-option label="1F" :value="1" />
            <el-option label="2F" :value="2" />
            <el-option label="3F" :value="3" />
            <el-option label="4F" :value="4" />
            <el-option label="5F" :value="5" />
            <el-option label="6F" :value="6" />
            <el-option label="7F" :value="7" />
          </el-select>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input v-model="formInline.room" placeholder="请输入房间号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="showType == 1 && (accountArr || newDormData)" class="board">
      <el-row :gutter="15">
        <el-col v-show="accountArr.title" :span="6">
          <Kanban
            :key="1"
            :list="accountArr.dorm"
            :accountValue="searchAccount"
            :group="group"
            class="kanban todo"
            :header-text="accountArr.title"
          />
        </el-col>
        <el-col v-show="newDormData.title" :span="6">
          <Kanban
            :key="2"
            :list="newDormData.dorm"
            :accountValue="searchAccount"
            :group="group"
            class="kanban todo header-green"
            :header-text="newDormData.title"
          />
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
          <!--<div class="dorm" >-->
            <!--<div class="num">710</div>-->

          <!--</div>-->
          <!--<div class="dorm" >-->
            <!--<div class="num">711</div>-->

          <!--</div>-->
          <!--<div class="dorm" >-->
            <!--<div class="num">712</div>-->

          <!--</div>-->

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
          <!--<div class="dorm" >-->
            <!--<div class="num">611</div>-->

          <!--</div>-->
          <!--<div class="dorm" >-->
            <!--<div class="num">612</div>-->

          <!--</div>-->

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
      </div>
      <div class="floor_son">
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
  </div>
</template>

<script>
import Kanban from '@/components/Kanban/index'
import { log } from 'util'
export default {
  components: {
    Kanban
  },
  data() {
    return {
      formInline: {
        building: 'C1栋',
        floor: '',
        room: ''
      },
      account: '201909877001', // 搜索框学号
      searchAccount:"",//查询的学号
      group: 'name',
      newDormData: [],
      dormData: [],
      kanbanArr: [],
      accountArr: [], // 学号搜索
      showType:0,// 0：显示楼层 1：楼层显示房间
      floor: {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        show10: false,
        show11: false,
        show12: false
      }
    }
  },
  created() {
    // this.setAccountData()
    // this.accountArr = this.searchData();
    // this.newDormData = this.searchData();
  },
  methods: {
    setAccountData() {
      if (!this.account) {
        this.$message({ message: '请输入学号', type: 'success' });
        this.accountArr = []
        return
      }
      const arr = this.$Mock.mock({
        'title': /[1-7]0[1-9]/,
        'dorm|6': [
          {
            'account': /(20110)\d{7}/,
            'name': '@cname()',
            'id|+1': 1
          }
        ]
      });
      arr.dorm[2] = {
        account: this.account || '21041042243',
        name: '张志杰',
        id: 8,
        active:true
      };
      this.searchAccount = this.account;
      this.accountArr = arr;
      this.showType = 1;
    },
    searchData() {
      if (!this.formInline.building || !this.formInline.floor || !this.formInline.room) {
        this.$message({ message: '请输入完整的查询条件！', type: 'success' })
        this.newDormData = [];
        return
      }
      const arr = this.$Mock.mock({
        'title': this.formInline.room || /[1-6]0[1-9]/,
        'dorm|3': [
          {
            'account': /(20110)\d{7}/,
            'name': '@cname()',
            'id|+1': 9
          }
        ]
      });
      this.newDormData = arr;
      this.showType = 1;
      return arr
    },
    toShowKan(val, str) {
      const bool = val

      // val = !val
      this[str] = !bool
      this.$set(this.floor, str.split('.')[1], this[str])
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    /*display:flex;*/
    /*flex-direction: column;*/
    padding: 30px 30px;
  }
.board {
  //   width: 1000px;
  //   margin-left: 20px;
  /*padding: 20px 0;*/
  /*display: flex;*/
  /*justify-content: space-around;*/
  /*flex-direction: row;*/
  /*align-items: flex-start;*/
  /*flex:1;*/
  min-height: 600px;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #cccccc;
}
/deep/ .kanban {
  width: 100%;
  min-width: 150px;
  &.header-green{
    .board-column-header{
      background: rgba(0,128,0,.6);
    }
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
</style>
