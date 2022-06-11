<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          class="avatar"
          size="small"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.huihua8.com%2Fuploads%2Fallimg%2F20190802kkk01%2F1531715080-WjJxDotcFZ.jpg&refer=http%3A%2F%2Fwww.huihua8.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642732967&t=9359037e8e2def3c098ecded24c46fbd"
        ></el-avatar>
        <span>{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
        <!-- <el-icon>
          <arrow-down />
        </el-icon> -->
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item divided></el-dropdown-item>
          <el-dropdown-item> 用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { ArrowDown } from '@element-plus/icons'

import localCache from '@/utils/cache'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: {
    ArrowDown
  },
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.userName)

    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/login')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #f9ca24;
  /* z-index: 10; */
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
