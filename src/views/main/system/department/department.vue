<template>
  <div class="user">
    <page-search
      pageName="department"
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
      class="search"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="department"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="department"
      :modalConfig="modalConfigRef"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

// import { useStore } from '@/store'
export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    //  handleEdite的回调函数
    const editCallback = () => {
      modalConfig.title = '编辑部门'
    }
    // pageModal相关的hook逻辑
    // 2.动态添加部门和角色列表
    const store = useStore()
    const searchFormConfigRef = computed(() => {
      const departmentItem = searchFormConfig.formItems.find(
        (item) => item.field === 'depName'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.depName, value: item.depName }
      })
      return searchFormConfig
    })
    // 动态的获取用户
    const modalConfigRef = computed(() => {
      const leaderItem = modalConfig.formItems.find(
        (item) => item.field === 'leaderId'
      )
      if (store.state.entireLeader) {
        leaderItem!.options = store.state.entireLeader.map((item) => {
          return { title: item.userName, value: item.id }
        })
      }

      return modalConfig
    })
    // 调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal(undefined, editCallback)
    return {
      searchFormConfigRef,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleEditData,
      handleNewData,
      modalConfigRef
    }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
