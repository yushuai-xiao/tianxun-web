<template>
  <div class="page-search">
    <xs-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header"><span>搜索内容</span></h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick"
            ><el-icon>
              <refresh-right />
            </el-icon>
            重置</el-button
          >
          <el-button
            type="primary"
            @click="handleQueryClick"
            :disabled="!isQuery"
            ><el-icon>
              <search />
            </el-icon>
            搜索</el-button
          >
        </div>
      </template>
    </xs-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import XsForm from '@/base-ui/form'
import { Search, RefreshRight } from '@element-plus/icons'
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  components: {
    XsForm,
    Search,
    RefreshRight
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 搜索按钮权限
    // console.log(props.pageName)
    const isQuery = usePermission(props.pageName, 'query')
    // console.log(isQuery, 'xs')
    // 双向绑定的属性应该时由配置文件的field来决定的
    // 1.优化一：formData中的属性应该动态来决定
    const formItem = props.searchFormConfig?.formItems ?? []

    const formOriginData: any = {}
    // 遍历时拿到的是key
    for (const item of formItem) {
      formOriginData[item.field] = ''
    }
    // formOriginData中的数据形式{id: '', name: '', realname: '', cellphone: '', enable: ' '}
    // console.log(formOriginData)
    const formData = ref(formOriginData)

    // 2.优化二：当用户点击重置
    const handleResetClick = () => {
      // console.log('充值按钮')
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    // 3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      // console.log(formData.value)
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick,
      isQuery
    }
  }
})
</script>

<style scoped lang="less">
.header {
  color: #333;
  text-align: left;
  padding-left: 15px;
  padding-top: 10px;
  span {
    display: inline;
    padding-bottom: 5px;
    border-bottom: 2px solid #409eff;
  }
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
