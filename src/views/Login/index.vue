<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="4" :lg="13" :xl="13">
        <div class="placeholder">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="10" :xl="10">
        <div class="login-form">
          <div class="vertical-center">
            <h1>Hello Mario!</h1>
            <p class="tips">
              欢迎来到Permission-Admin-Template！
              <br />
              基于Vue + Element开发
            </p>
            <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
              <el-form-item prop="username" class="form-item">
                <span class="icon user">
                  <i class="el-icon-user"></i>
                </span>
                <el-input v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <span class="icon password">
                  <svg-icon icon-class="password"></svg-icon>
                </span>
                <el-input v-model="loginForm.password" :type="passwordType"></el-input>
                <span class="icon eye" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
                </span>
              </el-form-item>
            </el-form>
            <el-button type="primary" class="login-btn" :loading="loading" @click="signIn">登录</el-button>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="4" :lg="1" :xl="1">
        <div class="placeholder">占位符</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      // 是否具有重定向属性
      redirect: '',
      // 控制加载状态
      loading: false,
      // 控制密码icon
      passwordType: 'password',
      // 登录表单
      loginForm: {
        username: 'editor',
        password: '111111'
      },
      // 登录表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 监听路由是否需要重定向到之前的页面
    $route: {
      handler(newRoute) {
        this.redirect = newRoute.query.redirect && newRoute.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    // 展示密码
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    // 登录
    signIn() {
      this.$refs.loginFormRef.validate(async valid => {
        if (valid) {
          try {
            this.loading = true
            await this.login(this.loginForm)
            this.loading = false
            //  - The url address may have or may not  `redirect` attribute
            //  - if the url have `redirect`, it takes precedence
            this.$router.push({ path: this.redirect || '/' })
          } catch (error) {
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url(~@/assets/images/login.jpg) center no-repeat;
  background-size: cover;
  .el-row {
    .el-col {
      .placeholder {
        color: transparent;
        background-color: transparent;
        // background-color: pink;
      }
      .login-form {
        position: relative;
        height: 100vh;
        // background-color: skyblue;
        .vertical-center {
          position: relative;
          top: 18%;
          left: 0;
          max-width: 100%;
          padding: 4.5vh;
          margin: 0 5vw 5vw;
          transition: all 0.3s;
          .icon {
            position: absolute;
            transform: translate(0, -50%);
            font-size: 16px;
            color: #d7dee3;
            cursor: pointer;
            user-select: none;
            z-index: 1;
            &.user {
              top: 50%;
              left: 12px;
            }
            &.password {
              top: 50%;
              left: 12px;
            }
            &.eye {
              top: 50%;
              right: 12px;
            }
          }
          .form-item {
            margin-top: 40px;
          }
          input {
            padding-left: 40px;
            height: 48px;
            border: 0;
            color: #75767b;
            background-color: #f5f2fb;
          }
          h1 {
            font-size: 54px;
            margin-top: 0;
            color: #475062;
          }
          .tips {
            font-size: 20px;
            font-weight: 400;
            color: #485163;
          }
          .login-btn {
            width: 220px;
            height: 50px;
          }
        }
      }
    }
  }
}
</style>
