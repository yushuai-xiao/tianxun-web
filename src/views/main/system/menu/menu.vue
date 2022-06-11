<template>
  <div class="menu">
    <page-content
      ref="pageContentRefe"
      :contentTableConfig="contentTableConfig"
      pageName="menu"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="menu"
      :modalConfig="modalConfig"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
export default defineComponent({
  name: 'xs-menu',
  components: {
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef] = usePageSearch()
    // 调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal()
    return {
      contentTableConfig,
      modalConfig,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      handleEditData,
      handleNewData
    }
  }
})
</script>

<style scoped></style>
