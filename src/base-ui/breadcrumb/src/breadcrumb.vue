<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path" class="breadItem">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { IBreadcrumb } from '../types'
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => [{ name: '考勤统计' }]
    }
  },
  setup() {
    return {
      ArrowRight
    }
  }
})
</script>

<style scoped lang="less">
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #f9ca24 !important;
}
</style>
