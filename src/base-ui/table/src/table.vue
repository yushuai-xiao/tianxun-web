<template>
  <div class="xs-table">
    <!-- main的头部内容区渲染 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handle">
          <slot name="headerHandle"></slot>
        </div>
      </slot>
    </div>
    <!-- main中的数据渲染 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 表格的选择框列 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
      ></el-table-column>
      <!-- 表格的序号列 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
        min-width="110px"
      ></el-table-column>
      <!-- 动态渲染的 -->
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column
          v-bind="propItem"
          align="center"
          min-width="150px"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    // 标题插槽
    title: {
      type: String,
      default: ''
    },
    // 数据信息
    listData: {
      type: Array,
      required: true
    },
    // 数据总数
    listCount: {
      type: Number,
      default: 0
    },
    // 属性信息
    propList: {
      type: Array,
      required: true
    },
    // 是否显示序号列
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否显示选择框列
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // 获取page,为分页器做准备
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    // 是否还有子属性
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    // 是否显示footer：主要是分页内容
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 处理选择框
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    // 分页器操作
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 5px;
    border-bottom: 2px solid #409eff;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
