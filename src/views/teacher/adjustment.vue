<template>
  <div class="main">
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
    <div class=" board">
      <el-row :gutter="15">
        <el-col :span="4">
          <Kanban :key="1" :list="kanbanArr[1]" :group="group" class="kanban todo" header-text="701" />
        </el-col>
        <el-col :span="4">
          <Kanban :key="2" :list="kanbanArr[2]" :group="group" class="kanban working" header-text="102" />
        </el-col>
        <el-col :span="4">
          <Kanban :key="3" :list="kanbanArr[3]" :group="group" class="kanban done" header-text="703" />
        </el-col>
        <el-col :span="4">
          <Kanban :key="4" :list="kanbanArr[4]" :group="group" class="kanban done" header-text="704" />
        </el-col>
        <el-col :span="4">
          <Kanban :key="5" :list="kanbanArr[5]" :group="group" class="kanban done" header-text="705" />
        </el-col>
        <el-col :span="4">
          <Kanban :key="6" :list="kanbanArr[6]" :group="group" class="kanban done" header-text="706" />
        </el-col>
      </el-row>
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
            <Kanban v-show="floor.show1" :key="1" :list="kanbanArr[0]" :group="group" :class="['kanban','todo',{position:floor.show1}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show2,'floor.show2')">
            <div class="num">701</div>
            <Kanban v-show="floor.show2" :key="1" :list="kanbanArr[1]" :group="group" :class="['kanban','todo',{position:floor.show2}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show3,'floor.show3')">
            <div class="num">701</div>
            <Kanban v-show="floor.show3" :key="1" :list="kanbanArr[2]" :group="group" :class="['kanban','todo',{position:floor.show3}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show4,'floor.show4')">
            <div class="num">701</div>
            <Kanban v-show="floor.show4" :key="1" :list="kanbanArr[3]" :group="group" :class="['kanban','todo',{position:floor.show4}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show5,'floor.show5')">
            <div class="num">701</div>
            <Kanban v-show="floor.show5" :key="1" :list="kanbanArr[4]" :group="group" :class="['kanban','todo',{position:floor.show5}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show6,'floor.show6')">
            <div class="num">701</div>
            <Kanban v-show="floor.show6" :key="1" :list="kanbanArr[5]" :group="group" :class="['kanban','todo',{position:floor.show6}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show7,'floor.show7')">
            <div class="num">701</div>
            <Kanban v-show="floor.show7" :key="1" :list="kanbanArr[6]" :group="group" :class="['kanban','todo',{position:floor.show7}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show8,'floor.show8')">
            <div class="num">701</div>
            <Kanban v-show="floor.show8" :key="1" :list="kanbanArr[7]" :group="group" :class="['kanban','todo',{position:floor.show8}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show9,'floor.show9')">
            <div class="num">701</div>
            <Kanban v-show="floor.show9" :key="1" :list="kanbanArr[8]" :group="group" :class="['kanban','todo',{position:floor.show9}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show10,'floor.show10')">
            <div class="num">701</div>
            <Kanban v-show="floor.show10" :key="1" :list="kanbanArr[9]" :group="group" :class="['kanban','todo',{position:floor.show10}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show11,'floor.show11')">
            <div class="num">701</div>
            <Kanban v-show="floor.show11" :key="1" :list="kanbanArr[10]" :group="group" :class="['kanban','todo',{position:floor.show11}]" header-text="701" />
          </div>
          <div class="dorm" @click="toShowKan(floor.show12,'floor.show12')">
            <div class="num">701</div>
            <Kanban v-show="floor.show12" :key="1" :list="kanbanArr[11]" :group="group" :class="['kanban','todo',{position:floor.show12}]" header-text="701" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Kanban from '@/components/Kanban/index'
export default {
  components: {
    Kanban
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      group: 'mission',
      kanbanArr: [
        [
          { name: 'Mission', id: 1 },
          { name: 'Mission', id: 2 },
          { name: 'Mission', id: 3 },
          { name: 'Mission', id: 4 }
        ],
        [
          { name: 'Mission', id: 5 },
          { name: 'Mission', id: 6 },
          { name: 'Mission', id: 7 }
        ],
        [
          { name: 'Mission', id: 8 },
          { name: 'Mission', id: 9 },
          { name: 'Mission', id: 10 }
        ],
        [
          { name: 'Mission', id: 18 },
          { name: 'Mission', id: 19 },
          { name: 'Mission', id: 20 }
        ],
        [
          { name: 'Mission', id: 21 },
          { name: 'Mission', id: 22 },
          { name: 'Mission', id: 23 }
        ],
        [
          { name: 'Mission', id: 24 },
          { name: 'Mission', id: 25 },
          { name: 'Mission', id: 26 }
        ],
        [
          { name: 'Mission', id: 27 },
          { name: 'Mission', id: 28 },
          { name: 'Mission', id: 29 }
        ],
        [
          { name: 'Mission', id: 30 },
          { name: 'Mission', id: 31 },
          { name: 'Mission', id: 32 }
        ],
        [
          { name: 'Mission', id: 33 },
          { name: 'Mission', id: 34 },
          { name: 'Mission', id: 35 }
        ],
        [
          { name: 'Mission', id: 36 },
          { name: 'Mission', id: 37 },
          { name: 'Mission', id: 38 }
        ],
        [
          { name: 'Mission', id: 39 },
          { name: 'Mission', id: 40 },
          { name: 'Mission', id: 41 }
        ],
        [
          { name: 'Mission', id: 42 },
          { name: 'Mission', id: 43 },
          { name: 'Mission', id: 44 }
        ]
      ],
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
   .board {
//   width: 1000px;
//   margin-left: 20px;
  /*padding: 20px 0;*/
  /*display: flex;*/
  /*justify-content: space-around;*/
  /*flex-direction: row;*/
  /*align-items: flex-start;*/
     min-height: 400px;
     padding:15px;
     margin-bottom:15px;
     border:1px solid #cccccc;
}
.main {
   padding: 30px 30px;
}
/deep/ .kanban {
   /*background-color: #d4d4d4;*/

  width:100%;
  min-width:150px;

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
    margin-bottom:400px;
  }
</style>
