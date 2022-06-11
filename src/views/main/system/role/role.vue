<template>
  <div class="role">
    <page-search
      pageName="role"
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, computed, toRaw } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-page-modal'
import { usePageSearch } from '@/hooks/use-page-search'
import { ElTree } from 'element-plus'
import { menuMapLeafKeys, onlySecondMenus } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // 1.处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()

    //  从store中拿出menus,拿出整个菜单，显示所有的elTree的节点
    const store = useStore()
    // 拿到整个菜单树，在页面布局中，是根据menus中menu的id进行绑定的
    const menus = computed(() => store.state.entireMenu)

    // 处理编辑情况下，叶子节点的显示
    const editCallback = (item: any) => {
      const leaf: number[] = item.permissions.split(',')

      // console.log(userMenus, menus, 'nei')
      const secondMenus = onlySecondMenus(store.state.entireMenu)
      const leafKeys = menuMapLeafKeys(secondMenus, leaf)
      nextTick(() => {
        // console.log(elTreeRef.value)
        // 设置要选中的某些节点，根据处理过后的leafKeys，设置
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    // 2.调用usePageMOdal的hook
    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal(undefined, editCallback)

    // console.log(menus)
    const otherInfo = ref({})

    // 处理叶子
    /* 共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，
    包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性 */

    const handleCheckChange = (data1: any, data2: any) => {
      const chenckedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...chenckedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,

      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,

      pageContentRef,
      handleResetClick,
      handleQueryClick,

      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
