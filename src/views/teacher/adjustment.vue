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
    <div class="board" v-show="accountArr || newDormData">
      <el-row :gutter="15">
        <el-col :span="6" v-show="accountArr.title">
          <Kanban
            :key="1"
            :list="accountArr.dorm"
            :group="group"
            class="kanban todo"
            :header-text="accountArr.title"
          />
        </el-col>
        <el-col :span="6" v-show="newDormData.title">
          <Kanban
            :key="2"
            :list="newDormData.dorm"
            :group="group"
            class="kanban todo header-green"
            :header-text="newDormData.title"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Kanban from "@/components/Kanban/index";
import { log } from "util";
export default {
  components: {
    Kanban
  },
  data() {
    return {
      formInline: {
        building: "C1栋",
        floor: "1F",
        room: "601",
      },
      account: "201909877001", // 学号
      group: "name",
      newDormData: [],
      dormData: [
        {
          building: 1,
          floor: [
            {
              floor: 1,
              room: [
                {
                  room: 1,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 2,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 3,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 4,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 5,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 6,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 7,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                }
              ]
            },
            {
              floor: 2,
              room: [
                {
                  room: 1,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 2,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 3,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 4,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 5,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 6,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 7,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                }
              ]
            }
          ]
        },
        {
          building: 2,
          floor: [
            {
              floor: 1,
              room: [
                {
                  room: 1,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 2,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 3,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 4,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 5,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 6,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 7,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                }
              ]
            },
            {
              floor: 2,
              room: [
                {
                  room: 1,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 2,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 3,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 4,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 5,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 6,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                },
                {
                  room: 7,
                  student: [
                    { name: "李白" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" },
                    { name: "杜甫" }
                  ]
                }
              ]
            }
          ]
        }
      ],
      kanbanArr: [
        [
          { name: "Mission", id: 1 },
          { name: "Mission", id: 2 },
          { name: "Mission", id: 3 },
          { name: "Mission", id: 4 }
        ],
        [
          { name: "Mission", id: 5 },
          { name: "Mission", id: 6 },
          { name: "Mission", id: 7 }
        ],
        [
          { name: "Mission", id: 8 },
          { name: "Mission", id: 9 },
          { name: "Mission", id: 10 }
        ],
        [
          { name: "Mission", id: 18 },
          { name: "Mission", id: 19 },
          { name: "Mission", id: 20 }
        ],
        [
          { name: "Mission", id: 21 },
          { name: "Mission", id: 22 },
          { name: "Mission", id: 23 }
        ],
        [
          { name: "Mission", id: 24 },
          { name: "Mission", id: 25 },
          { name: "Mission", id: 26 }
        ],
        [
          { name: "Mission", id: 27 },
          { name: "Mission", id: 28 },
          { name: "Mission", id: 29 }
        ],
        [
          { name: "Mission", id: 30 },
          { name: "Mission", id: 31 },
          { name: "Mission", id: 32 }
        ],
        [
          { name: "Mission", id: 33 },
          { name: "Mission", id: 34 },
          { name: "Mission", id: 35 }
        ],
        [
          { name: "Mission", id: 36 },
          { name: "Mission", id: 37 },
          { name: "Mission", id: 38 }
        ],
        [
          { name: "Mission", id: 39 },
          { name: "Mission", id: 40 },
          { name: "Mission", id: 41 }
        ],
        [
          { name: "Mission", id: 42 },
          { name: "Mission", id: 43 },
          { name: "Mission", id: 44 }
        ]
      ],
      accountArr: [],//学号搜索
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
    };
  },
  created(){
    // this.setAccountData()
    // this.accountArr = this.searchData();
    // this.newDormData = this.searchData();
  },
  methods: {
    setAccountData() {
      if(!this.account){
        this.$message({message:"请输入学号",type:"success"});
        this.accountArr = [];
        return
      }
        let arr = this.$Mock.mock({
          'title': /[1-7]0[1-9]/,
          'dorm|6':[
              {
              'account':  /(20110)\d{7}/,
              'name':'@cname()',
              'id|+1': 1 
           },
          ]
        });
        arr.dorm[arr.dorm.length] =  {
             account: this.account||'21041042243',
             name: '张志杰',
             'id':7
        };
      this.accountArr = arr;
    },
    searchData() {
      if(!this.formInline.building|| !this.formInline.floor || !this.formInline.room ){
        this.$message({message:"请输入完整的查询条件！",type:"success"});
        this.newDormData = [];
        return
      }
      let arr = this.$Mock.mock({
          'title': this.formInline.room||/[1-6]0[1-9]/,
          'dorm|6':[
              {
              'account':  /(20110)\d{7}/,
              'name':'@cname()',
              'id|+1': 8
           },
          ]
        });
      this.newDormData = arr;
      return arr;
    },
    toShowKan(val, str) {
      const bool = val;

      // val = !val
      this[str] = !bool;
      this.$set(this.floor, str.split(".")[1], this[str]);
    }
  }
};
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
.floor {
  margin-bottom: 400px;
}
</style>
