<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <div v-for="(element,i) in list" :key="element.id" class="board-item" :class="{'actived':currentData == element,'empty':!element.name}" @click="clickItem(element)">
      <!--{{ i+1 +" "+( element.name?element.name:"空") }} <i class=" el-icon-circle-check font-size-20" v-if="currentData == element"></i>-->
      <div class="left">{{ i+1+". " }}</div>
      <div class="right info">
        <p>{{ element.account }}</p>
        <p>{{ element.name ?element.name:"空" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    dialogStatus: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      currentData: ''
    }
  },
  watch: {
    dialogStatus(newVal) {
      if (!newVal) this.currentData = ''
    }
  },
  methods: {
    clickItem(params) {
      if (params.name == '') {
        this.currentData = params
        this.$emit('parentEvent', params)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .board-column {
        min-width: 150px;
        width:100%;
        min-height: 100px;
        height: auto;
        overflow: hidden;
        background: #f0f0f0;
        border-radius: 3px;
        padding:8px;
        margin-bottom:15px;
        .board-column-header {
            height: 50px;
            line-height: 50px;
            overflow: hidden;
            padding: 0 20px;
            text-align: center;
            background: #333;
            color: #fff;
            border-radius: 3px 3px 0 0;
        }

        /*.board-column-content {*/
            /*height: auto;*/
            /*overflow: hidden;*/
            /*border: 10px solid transparent;*/
            /*min-height: 60px;*/
            /*display: flex;*/
            /*justify-content: flex-start;*/
            /*flex-direction: column;*/
            /*align-items: center;*/
            /*.board-item {*/
                /*cursor: pointer;*/
                /*width: 100%;*/
                /*height: 64px;*/
                /*margin: 5px 0;*/
                /*background-color: #fff;*/
                /*text-align: left;*/
                /*line-height: 54px;*/
                /*padding: 5px 10px;*/
                /*box-sizing: border-box;*/
                /*box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);*/
            /*}*/
        /*}*/
        .board-item {
            cursor: pointer;
            width: 100%;
            height: 64px;
            margin: 5px 0;
            background-color: #fff;
            text-align: left;
            line-height: 54px;
            padding: 5px 10px;
            box-sizing: border-box;
            box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
            display: flex;
            /*justify-content: space-between;*/
            /*align-items: center;*/
            &.actived{
                border:1px solid #4A9FF9;
                color: #4A9FF9;
            }
            &.empty{
                background:rgba(74,161,247,.3);
            }
            .left{
                width:50px;
                line-height:27px;
                text-align: right;
            }
            .right{
                flex:1;
                line-height:27px;
                padding-left:10px;
                p{margin:0;}
            }
        }
    }
</style>
