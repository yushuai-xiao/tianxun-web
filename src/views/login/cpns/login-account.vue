<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="login" ref="formRef">
      <el-form-item label="账号" prop="account">
        <el-input v-model="login.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="login.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'

import { rules } from '../config/account-config'
export default defineComponent({
  setup() {
    const store = useStore()

    const login = reactive({
      account: localCache.getCache('account') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('account', login.account)
            localCache.setCache('password', login.password)
          } else {
            localCache.deleteCache('account')
            localCache.deleteCache('password')
          }

          console.log({ ...login })
          // 2.开始进行登录验证
          store.dispatch('login/accountLoginAction', { ...login })
        }
      })
    }
    return {
      login,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped lang="less"></style>
