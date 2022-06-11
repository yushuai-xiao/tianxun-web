<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="logo" class="img" />
      <span v-if="!collapse" class="title">清源考勤管理系统</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <!-- 根据登录用户返回的数据，动态加载菜单，从store中拿出数据 -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <!-- <el-sub-menu :index="item.id + ''">
            <template #title>
              <component
                :is="item.icon"
                color="#f9ca24"
                style="width: 1.5em; height: 1.5em; margin-right: 8px"
              ></component>
              <span>{{ item.name }}</span>
            </template> -->
        <!-- <template v-for="subitem in item.children" :key="subitem.id"> -->
        <el-menu-item :index="item.id + ''" @click="handleMenuItemClick(item)">
          <template #title>
            <el-icon>
              <component :is="item.icon" color="#f9ca24"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
        </el-menu-item>
        <!-- </template> -->
        <!-- </el-sub-menu> -->
      </template>
      <!-- 一级菜单 -->

      <!-- </template> -->
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // 从store中拿数据
    const store = useStore()

    const userMenus = computed(() => store.state.login.userMenus)
    // router操作
    const route = useRoute()

    // 动态选中当前的currentPath
    const currentPath = route.path
    // console.log(currentPath)

    // 判断当前选中的菜单
    const menu = pathMapToMenu(userMenus.value, currentPath)

    const defaultValue = ref(menu.id + '')
    // 控制单击时，路由的跳转
    const router = useRouter()
    const handleMenuItemClick = (item: { name: string; url?: string }) => {
      // console.log(item, 'item')
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    // console.log(userMenus)
    return {
      userMenus,
      defaultValue,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 5px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    // background-color: #2d3436;
    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0f7fe7 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
    span {
      font-size: 20px !important;
    }
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
