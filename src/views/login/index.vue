<!--登录-->
<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="header-logo">
        <router-link to="/home">
          <img src="@/assets/images/login_logo.png" alt="">
        </router-link>

      </div>
      <div class="contentBox">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

          <div class="title-container">
            <img src="@/assets/images/login_shenfen.png" alt="" width="45">
            <span class="title">统一身份认证</span>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="校园卡号、教工号或学号"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>
          <el-form-item class="checkBox no-border">
            <el-checkbox v-model="checked" class="mianLogin">一周内免登录</el-checkbox>
          </el-form-item>
          <router-link to="/login" class="forgetPasswordTip">不知道密码？请点击《使用说明》</router-link>

          <el-button :loading="loading" type="primary" class="loginBtn" @click.native.prevent="handleLogin">登录</el-button>
          <router-link to="/login" class="forgetPasswordLink">忘记密码</router-link>
          <!--<div style="position:relative">-->
          <!--<div class="tips">-->
          <!--<span>Username : admin</span>-->
          <!--<span>Password : any</span>-->
          <!--</div>-->
          <!--<div class="tips">-->
          <!--<span style="margin-right:18px;">Username : editor</span>-->
          <!--<span>Password : any</span>-->
          <!--</div>-->

          <!--<el-button class="thirdparty-button" type="primary" @click="showDialog=true">-->
          <!--Or connect with-->
          <!--</el-button>-->
          <!--</div>-->
        </el-form>

      </div>
      <el-dialog title="Or connect with" :visible.sync="showDialog">
        Can not be simulated on local, so please combine you own business simulation! ! !
        <br>
        <br>
        <br>
        <social-sign />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位数字'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      checked: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              // this.$router.push({ path: '/transaction' })
              this.loading = false
              const routeUrl = this.$router.resolve({ path: '/transaction' })
              window.open(routeUrl.href, '_blank')
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .svg-container{
    padding: 5px 10px !important;
    width: 35px !important;
    margin-top: -1px;
    border-right: 1px solid #cccccc;
  }
  .el-form-item--medium .el-form-item__content{
    line-height:25px;
  }
  .el-input {
    display: inline-block;
    height: 30px;
    width: 85%;

    input {
      background: transparent !important;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 5px 5px 5px 15px;
      height: 30px;
      caret-color: $cursor;
      color: #000;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #cccccc;
    /*background: rgba(0, 0, 0, 0.1);*/
    /*border-radius: 5px;*/
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/images/bg_2.jpg") no-repeat ;
  background-size: cover;
  overflow: hidden;
    /deep/input{caret-color:  #454545;}
  .login-wrapper{
    width:100%;
    max-width:992px;
    margin:0 auto;
  }
  .header-logo{
    padding:30px 0;
  }
  .contentBox{
    display: flex;
    justify-content: flex-end;
    padding: 180px 0 0;
  }
  .login-form {
    width: 100%;
    max-width: 350px;
    padding: 5px 35px 35px;
    background:#ffffff;
  }
   /deep/.el-form-item{
        /*height:35px;*/
        .el-form-item__content{
            line-height:25px !important;
        }
    }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 5px 5px 5px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    display:flex;
    justify-content:center;
    align-items: center;
    margin-bottom:10px;
    .title {
      font-size: 18px;
      margin-left: 15px;
      /*text-align: center;*/
      /*font-weight: bold;*/
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .forgetPasswordTip {
    margin-bottom: 15px;
    color: #4e89cc;
    font-size: 14px;
    text-decoration: underline;
  }
  .forgetPasswordLink{
    color:#676a6c ;
    font-size:14px;
  }
  .checkBox{
    height:25px;
    border:none;
  }
  /deep/ .mianLogin .el-checkbox__label{
    color:#676a6c !important;
    font-size:14px;
  }
  .loginBtn{
    width:100%;
    margin-top:22px;
    margin-bottom:22px;
    background:#3db394;
    border:none;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
    .header-logo{
      img{max-width:100%;}
    }
  }
}
</style>
