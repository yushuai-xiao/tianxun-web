<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <nav-menu :collapse="isCollapse"></nav-menu>
      </el-aside>
      <!-- <el-aside></el-aside> -->
      <el-container class="page">
        <el-header class="page-header">
          <!-- 主体页面的头部分， -->
          <nav-header
            @foldChange="handleFoldChange"
            :breadItem="breadItem"
          ></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="content">
            <el-config-provider :locale="locale">
              <router-view></router-view>
              <!-- <User></User> -->
            </el-config-provider>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
// import User from './system/user/user.vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
    ElConfigProvider
    // User
  },
  setup() {
    const isCollapse = ref(false)
    const breadItem = ref()
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      handleFoldChange,
      locale: zhCn,
      breadItem
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
  .page-header {
    background-color: #2d3436;
    color: #fff;
  }
}
// /deep/.el-main {
//   padding: 20px 0px 20px 20px;
// }
.page-content {
  height: calc(100% - 48px);

  .content {
    background-color: #fff;
    border-radius: 8px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 60px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
