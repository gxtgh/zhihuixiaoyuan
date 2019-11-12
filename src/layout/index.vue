<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!--<sidebar class="sidebar-container" />-->
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}" class="headerStyle">
        <navbar />
        <!--<tags-view v-if="needTagsView" />-->
        <div class="cooperation-box">
          <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
          <div class="right-box">
            <el-input placeholder="请输入内容" class="searchInput">
              <i slot="prefix" class="el-input__icon el-icon-search" />
            </el-input>
            <div class="collectionBox">
              <el-popover
                ref="popover4"
                class="showCollect"
                placement="bottom"
                width="400"
                trigger="click"
              >
                <el-table :data="collection" :show-header="false">
                  <el-table-column width="45" property="date">
                    <template slot-scope="scope">
                      <i class="el-icon-star-on color-red font-size-25" @click="changeCollection(scope.row)" />
                    </template>
                  </el-table-column>
                  <el-table-column property="title" class="collect-item-text" />
                </el-table>
              </el-popover>
              <el-button v-popover:popover4><img src="@/assets/images/list1.png">快速收藏</el-button>
            </div>
          </div>
        </div>
      </div>
      <app-main />
      <!--<right-panel v-if="showSettings">-->
      <!--设置-->
      <!--<settings />-->
      <!--</right-panel>-->
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    Breadcrumb
  },
  mixins: [ResizeMixin],
  data() {
    return {
      // 收藏列表
      collectionData: [
        { id: 1, title: '德国跨界创新实验室世锦赛' },
        { id: 2, title: '办公用品申请（文学社)' },
        { id: 3, title: '9月1日12：00进行义工服务' }
      ]
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      collection: state => state.user.collection
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    // 收藏切换
    changeCollection(param) {
      this.$store.commit('user/POP_COLLECTION', param)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
    /*.hasTagsView{margin:0 !important;}*/
  }
  .main-container{
    margin:0 !important;
  }
  .headerStyle{
    border:1px solid #cccccc;
  }
  #breadcrumb-container{
    margin-left:30px;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .cooperation-box{
    clear: both;
    zoom: 1;
  }
  .right-box{
    float: right;
    padding-right:30px;
  }
  /deep/.searchInput{
    width:250px;
    margin-right:40px;
    .el-input__inner{
      height:35px;
      border:none;
      background: rgba(238, 238, 238, 1);
    }
    .el-input__icon{
      color: #303133;
      font-weight: 700;
      font-size: 14px;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #999;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #999;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #999;
    }

  }
  .collectionBox{
    display: inline-block;
    .el-button{
      padding: 5px 0;
      color: inherit;
      font-size: 16px;
      position: relative;
      top: 2px;
      border: none;
      background: transparent;
      img{
        position: relative;
        top: 5px;
        margin-right:5px;
      }
    }
  }

  /deep/ .showCollect {
    color: red;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: flex;
        span:nth-child(1) {
          width: 40px;
        }
        span:nth-child(1) {
          flex: 1;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
