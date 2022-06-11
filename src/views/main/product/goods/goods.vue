<template>
  <div class="goods">
    <page-search
      pageName="goods"
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="goods"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.url"
          :preview-src-list="[scope.row.url]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">{{ '¥' + scope.row.currentPrice }}</template>
    </page-content>

    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="product"
      :modalConfig="modalConfigRef"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
export default defineComponent({
  name: 'goods',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // 添加编辑或新建对话框中，分类的下拉列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const categoryItem = modalConfig.formItems.find(
        (item) => item.field === 'categoryName'
      )
      categoryItem!.options = store.state.entireCategory.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })
    // 调用hook获取公共变量和函数
    const [pageModalRef, defaultInfo, handleEditData, handleNewData] =
      usePageModal()
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfigRef,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleEditData,
      handleNewData
    }
  }
})
</script>

<style scoped></style>
