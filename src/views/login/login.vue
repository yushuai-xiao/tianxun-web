<template>
  <div class="login">
    <el-form ref="formRef" :model="loginForm" :rules="rules" class="login-form">
      <h3 class="title">清源考勤管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.account"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><user /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.="loginAction"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><unlock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="isKeepPassword" style="margin: 0px 0px 25px 0px"
        >记住密码</el-checkbox
      >
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click="loginAction"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<el-icon><Avatar /></el-icon>
<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
import { User, Unlock } from '@element-plus/icons-vue'
import { rules } from './config/account-config'
export default defineComponent({
  components: {
    User,
    Unlock
  },
  setup() {
    const store = useStore()
    const isKeepPassword = ref(true)
    const loading = ref(false)
    const loginForm = reactive({
      account: localCache.getCache('account') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          loading.value = true
          // 1.判断是否需要记住密码
          if (isKeepPassword.value) {
            // 本地缓存
            localCache.setCache('account', loginForm.account)
            localCache.setCache('password', loginForm.password)
          } else {
            localCache.deleteCache('account')
            localCache.deleteCache('password')
          }

          // 2.开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...loginForm })
          loading.value = false
        }
      })
    }
    return {
      loginForm,
      isKeepPassword,
      rules,
      loginAction,
      formRef,
      loading
    }
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('~@/assets/img/login-background.jpg');
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 300px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
</style>
