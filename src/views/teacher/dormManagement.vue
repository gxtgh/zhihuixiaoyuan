<template>
  <!--宿舍管理-->
  <div class="main">
    <div class="top">
      <div class="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="楼栋">
            <el-select v-model="formInline.region" placeholder="请选择宿舍楼栋">
              <el-option label="C1栋" value="shanghai" />
              <el-option label="C2栋" value="beijing" />
              <el-option label="C3栋" value="beijing" />
              <el-option label="C4栋" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="楼层">
            <el-select v-model="formInline.region" placeholder="请选择楼层">
              <el-option label="1F" value="shanghai" />
              <el-option label="2F" value="beijing" />
              <el-option label="3F" value="beijing" />
              <el-option label="4F" value="beijing" />
              <el-option label="5F" value="beijing" />
              <el-option label="6F" value="beijing" />
              <el-option label="7F" value="beijing" />
              <el-option label="8F" value="beijing" />
              <el-option label="9F" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="房间号">
            <el-input v-model="formInline.user" placeholder="请输入房间号" />

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="check-box">

        <div class="check">
          <span>宿舍位置</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="school in schools" :key="school" :label="school">{{ school }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="check">
          <span>宿舍设施</span>
          <div class="pay">
            <el-input placeholder="最低价格" />
            <el-input placeholder="最高价格" />
          </div>
        </div>
        <div class="check">
          <span>宿舍设施</span>
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="school in schools" :key="school" :label="school">{{ school }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="floor">
      <div class="floor_son">
        <div class="left">
          <h3>7F</h3>
          <div> <span>已入驻:38</span> </div>
          <div> <span>空余床位:8</span> </div>
        </div>
        <div class="right">
          <div class="dorm" @click="toShowKan(floor.show1,'floor.show1')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show1" :key="1" :list="kanbanArr[0]" :group="group" :class="['kanban','todo',{position:floor.show1}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show2,'floor.show2')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show2" :key="1" :list="kanbanArr[1]" :group="group" :class="['kanban','todo',{position:floor.show2}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show3,'floor.show3')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show3" :key="1" :list="kanbanArr[2]" :group="group" :class="['kanban','todo',{position:floor.show3}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show4,'floor.show4')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show4" :key="1" :list="kanbanArr[3]" :group="group" :class="['kanban','todo',{position:floor.show4}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show5,'floor.show5')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show5" :key="1" :list="kanbanArr[4]" :group="group" :class="['kanban','todo',{position:floor.show5}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show6,'floor.show6')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show6" :key="1" :list="kanbanArr[5]" :group="group" :class="['kanban','todo',{position:floor.show6}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show7,'floor.show7')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show7" :key="1" :list="kanbanArr[6]" :group="group" :class="['kanban','todo',{position:floor.show7}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show8,'floor.show8')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show8" :key="1" :list="kanbanArr[7]" :group="group" :class="['kanban','todo',{position:floor.show8}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show9,'floor.show9')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show9" :key="1" :list="kanbanArr[8]" :group="group" :class="['kanban','todo',{position:floor.show9}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show10,'floor.show10')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show10" :key="1" :list="kanbanArr[9]" :group="group" :class="['kanban','todo',{position:floor.show10}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show11,'floor.show11')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show11" :key="1" :list="kanbanArr[10]" :group="group" :class="['kanban','todo',{position:floor.show11}]" header-text="701" />-->
          </div>
          <div class="dorm" @click="toShowKan(floor.show12,'floor.show12')">
            <div class="num">701</div>
            <!--<Kanban v-show="floor.show12" :key="1" :list="kanbanArr[11]" :group="group" :class="['kanban','todo',{position:floor.show12}]" header-text="701" />-->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schools: ['华南分校区', '西乡分校区', '车公庙分校区', '坪山分校区', '宝安分校区', '横岗分校区'],
      formInline: {
        region: '',
        user: ''
      },
      checkList: [],
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
  methods: {
    onSubmit() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    padding:15px 25px;
  }
.check-box {
       height: 162px;
    border: 1px solid #bdc0c4;
    .pay {
       display: inline-block;
       .el-input {
          display: inline-block;
          width: 90px;
           /deep/ input.el-input__inner {
          width: 90px;
       }

       }

    }
}
.check {
      padding: 10px;
    border-bottom: 1px solid #bdc0c4;
   .el-checkbox-group {
   display: inline-block;
   padding-bottom: 10px;
}
}


  .floor_son {
    display: flex;
    border: 1px solid #ab9898;
    padding: 5px 5px;
    height: 180px;
    .left {
      //   border: 1px solid black;
      width: 100px;
      text-align: center;
      line-height: 30px;
      flex-grow: 1;
      div {
        width: 100px;
      }
    }
    .right {
      text-align: center;
      line-height: 74px;
      display: flex;
      flex-grow: 6;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: space-between;
      .dorm {
        width: 225px;
        height: 75px;
        border: 1px solid #ab9898;

      }
    }
  }
  .position {
    position: relative;
    z-index: 1;
  }
  .floor{
    margin:25px 0;
    /*margin-bottom:400px;*/
  }
</style>
