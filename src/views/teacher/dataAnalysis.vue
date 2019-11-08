<template>
  <!--数据分析-->
  <div class="main">
    <div class="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="院系">
          <el-input v-model="formInline.yuanxi" placeholder="请输入院系" />

        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="formInline.banji" placeholder="请输入班级" />

        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" placeholder="请输入姓名" />

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <div class="data">
        <Ve-bar style="width:1000px" :data="chartData" :settings="chartSettings" />
      </div>
    </div>
  </div>
</template>

<script>
import VeBar from 'v-charts/lib/histogram.common.js' // v-charts
export default {
  components: {
    VeBar
  },
  data() {
    this.chartSettings = {
      dimension: ['日期'],
      // metrics: ['访问用户'],
      itemStyle: {

      },
      stack: { '完成': ['已完成', '未完成'] }

    }
    return {
      formInline: {
        yuanxi: '',
        banji: '',
        name: ''
      },
      chartData: {
        columns: ['日期', '已完成', '未完成'],
        rows: [
          { 日期: '姓名', 已完成: 50, 未完成: 30, 下单率: 0.32 },
          { 日期: '联系方式', 已完成: 30, 未完成: 30, 下单率: 0.26 },
          { 日期: '证件号码', 已完成: 40, 未完成: 30, 下单率: 0.76 },
          { 日期: '籍贯', 已完成: 10, 未完成: 30, 下单率: 0.49 },
          { 日期: '个人经历', 已完成: 20, 未完成: 30, 下单率: 0.323 },
          { 日期: '社会经历', 已完成: 60, 未完成: 30, 下单率: 0.78 }
        ]
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
.main {
  padding: 30px;
}
.content {
  padding-left: 30px;
}

</style>
