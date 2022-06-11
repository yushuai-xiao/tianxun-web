<template>
  <div class="leave">
    <div class="card-content">
      <el-tabs type="border-card">
        <el-tab-pane label="请假记录">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>请假记录</span>
              </div>
            </template>
            <div class="search">
              <el-form :mode="formList" :inline="true">
                <el-form-item label="员工姓名:" v-if="queryAll">
                  <el-input
                    v-model="formList.user_name"
                    style="width: 160px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="部门:" v-if="queryAll">
                  <el-select
                    v-model="formList.department"
                    placeholder="请选择部门"
                    size="large"
                    style="width: 180px"
                  >
                    <el-option
                      v-for="item in departList"
                      :key="item.id"
                      :label="item.depName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="批准状态:">
                  <el-select
                    v-model="formList.status"
                    placeholder="请选择"
                    size="large"
                    style="width: 180px"
                  >
                    <el-option
                      v-for="item in hStatus"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    plain
                    @click="searchData"
                    style="margin-left: 10px"
                    >搜索
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="success"
                    plain
                    @click="resetSearch"
                    style="margin-left: 10px"
                    >重置
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="table-content">
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="department" label="部门" width="100" />
                <el-table-column prop="userName" label="员工姓名" />
                <el-table-column prop="reason" label="请假原因" />
                <el-table-column prop="start" label="开始时间" />
                <el-table-column prop="end" label="结束时间" />
                <el-table-column prop="status" label="状态">
                  <template #default="scope">
                    {{
                      scope.row.status === 0
                        ? '待批准'
                        : scope.row.status === 1
                        ? '已批准'
                        : '未批准'
                    }}
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template #default="scope">
                    <el-button
                      v-if="queryAll"
                      :disabled="scope.row.status === 1"
                      type="text"
                      @click="approval(scope.row.id)"
                      >批准</el-button
                    >
                    <el-button
                      v-if="queryAll"
                      :disabled="scope.row.status === 1"
                      type="text"
                      @click="disapproval(scope.row.id)"
                      >不批准</el-button
                    >
                    <el-button
                      v-if="!queryAll"
                      :disabled="scope.row.status !== 0"
                      type="text"
                      @click="remove(scope.row.id)"
                      >撤销申请</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="请假申请">
          <div class="setting-time">
            <el-form :model="applyTime">
              <el-form-item label="开始日期:">
                <el-date-picker
                  v-model="applyTime.start"
                  type="datetime"
                  placeholder="选择开始日期"
                />
              </el-form-item>
              <el-form-item label="结束日期:">
                <el-date-picker
                  v-model="applyTime.end"
                  type="datetime"
                  placeholder="选择结束日期"
                />
              </el-form-item>
              <el-form-item label="请假原因">
                <el-input
                  v-model="applyTime.reason"
                  style="width: 500px"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="applyCtime">申请</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="Task">Task</el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import {
  getHolidayList,
  addleave,
  leavaStatus,
  delLeave
} from '@/service/attendance/index'
import { getPageListData } from '@/service/main/system/system'
import { ElMessage } from 'element-plus'
import { formatToString } from '@/utils/date-format'

// 用户权限
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  name: 'leave',
  setup() {
    // 获取用户的id信息
    const store = useStore()
    const id = store.state.login.userInfo.id

    // 获取权限信息,是否可以查看全部信息
    const queryAll = ref()
    queryAll.value = usePermission('index', 'queryAll')

    const hStatus = ref([
      {
        name: '待批准',
        value: '0'
      },
      {
        name: '未批准',
        value: '1'
      },
      {
        name: '已批准',
        value: '2'
      }
    ])
    const statTool = (stat: number) => {
      if (stat !== undefined) {
        return hStatus.value[stat].name
      }
    }
    // 请假列表查询数据
    const formList = ref({
      department: '',
      user_name: '',
      reason: '',
      status: ''
    })
    // 表格数据
    let tableData = ref([
      {
        userName: '',
        department: '',
        season: '五一放假',
        start: '2022-05-01 08:00:00',
        end: '	2022-05-04 08:00:00',
        status: ''
      }
    ])

    // 获取请假列表
    const getList = async () => {
      if (queryAll.value) {
        // const listResult = await getHolidayList(formList.value)
        getHolidayList(formList.value).then((res) => {
          if (res.code === 200) {
            tableData.value = res.data
          }
        })
      } else {
        console.log('tes')
        getHolidayList({
          user_id: id,
          status: formList.value.status
        }).then((res) => {
          if (res.code === 200) {
            tableData.value = res.data
          }
        })
      }
    }
    // 部门列表
    const departList = ref([
      {
        id: '',
        depName: ''
      }
    ])
    async function init() {
      getList()

      // 获取部门列表
      const departmentList = await getPageListData('/department/list', {})
      departList.value = departmentList.data
    }
    init()
    // 搜索内容
    const searchData = () => {
      getList()
    }

    // 重置
    const resetSearch = () => {
      formList.value = {
        department: '',
        user_name: '',
        reason: '',
        status: '0'
      }
      getList()
    }

    // 提交申请

    // 管理员批准
    const approval = (id: string) => {
      if (queryAll.value) {
        leavaStatus({ id, status: '2' }).then((res) => {
          if (res.code === 200) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
          }
          getList()
        })
      }
    }
    const disapproval = (id: string) => {
      if (queryAll.value) {
        leavaStatus({ id, status: '1' }).then((res) => {
          if (res.code === 200) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
          }
          getList()
        })
      }
    }
    const remove = (id: string) => {
      delLeave(id).then((res) => {
        getList()

        if (res.code === 200) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
        }
      })
    }

    // 请假申请数据
    const applyTime = ref({
      user_id: id,
      start: '',
      end: '',
      reason: ''
    })

    const applyCtime = () => {
      // 1.处理传过去的数据
      const param = {
        user_id: id,
        start:
          applyTime.value.start !== ''
            ? formatToString(new Date(applyTime.value.start))
            : '',
        end:
          applyTime.value.end !== ''
            ? formatToString(new Date(applyTime.value.end))
            : '',
        reason: applyTime.value.reason
      }
      addleave(param).then((res) => {
        if (res.code === 200) {
          getList()
          ElMessage({
            message: res.message,
            type: 'success'
          })
        }
      })
    }
    return {
      formList,
      hStatus,
      queryAll,
      departList,
      searchData,
      resetSearch,
      statTool,
      // 表格
      tableData,
      approval,
      disapproval,
      remove,

      applyTime,
      applyCtime
    }
  }
})
</script>

<style scoped lang="less">
.leave {
  width: 100%;
  // height: 500px;
  background-color: #f0f2f5;

  .card-content {
    margin-top: 20px;
  }

  .box-card {
    .table-content {
      margin-top: 15px;
    }
  }

  ::v-deep .el-card {
    text-align: left;

    .el-card__header {
      background-color: #f5f7fa;
      height: 15px;
      display: flex;
      align-items: center;
    }

    .el-card__body {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      justify-items: center;
    }
  }

  ::v-deep .el-form {
    .el-form-item__content {
      flex: 0;

      .el-date-editor {
        align-self: flex-start;
      }
    }
  }
}
</style>
