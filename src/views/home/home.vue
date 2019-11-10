<!--首页-->
<template>
  <div class="home-container">
    <el-row>
      <el-col :xs="24" :md="24" :lg="24">
        <img src="@/assets/images/home_header.png" alt="">
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :md="24" :lg="24">
        <ul class="menuList">
          <li class="active">首页</li>
          <li>教育教学</li>
          <li>交流合作</li>
          <li>通知通告</li>
          <li>网上服务</li>
          <li>
            <a href="#/login" target="_blank"><i class="el-icon-edit avatar_user" />登录统一身份认证</a>
          </li>
          <!--<router-link tag="li" to="/login" >-->

          <!--</router-link>-->
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :md="12" :lg="16">
        <img src="@/assets/images/home_body_left.png" alt="" class="img-response">
      </el-col>
      <el-col :xs="24" :md="12" :lg="8">
        <img src="@/assets/images/home_body_right.png" alt="" class="img-response">
      </el-col>
    </el-row>
    <el-row class="margin-top-30">
      <el-col :xs="24" :md="24" :lg="24">
        <img src="@/assets/images/home_footer.png" alt="">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick: function(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
    .home-container{
        max-width:992px;
        margin:0 auto;
        .menuList{
            list-style: none;
            height:40px;
            padding: 0;
            margin:0;
            clear:both;
            zoom: 1;
            border-bottom: 1px solid #cccccc;
            li{
                float:left;
                padding:0 35px;
                margin-right:15px;
                line-height:40px;

                &:nth-last-child(1){
                    float:right;
                    width:auto;
                    padding:0;
                    cursor:pointer;
                    &:hover{
                        text-decoration: underline;
                    }
                }
                &.active{
                    background-color:#36acf7;
                    color:#ffffff;
                    font-weight:700;
                }
            }
        }
        .avatar_user{
            font-size:20px;
            margin-right:5px;
        }
        .img-response{
            width:100%;
        }
        .margin-top-30{
            margin-top:30px;
        }
    }
</style>
