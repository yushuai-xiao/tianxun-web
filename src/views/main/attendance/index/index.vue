<template>
  <div class="home">
    <!-- 上下班打卡时间提醒 -->
    <div class="time-alert">
      <el-alert type="error">
        <template #title>
          <span>上班时间:{{ startTime }}</span>
          <span class="endTime">下班时间：{{ endTime }}</span>
        </template>
      </el-alert>
    </div>
    <div class="map-container">
      <MainContainer @onComplete="onComplete" @onError="onError" />
      <div class="localtionInfo">
        <div class="title">{{ locInfo.title }}</div>
        <div class="content">
          <p>定位结果:{{ locInfo.result }}</p>
          <p>定位类别:{{ locInfo.type }}</p>
          <p>精度:{{ locInfo.accuracy }}</p>
          <p>是否经过偏移:{{ locInfo.isConverted }}</p>
        </div>
      </div>
    </div>
    <div class="adressInfo">
      <div class="office">
        <span v-if="addressInfo.isOffice">办公地点</span>
        <span v-else>非办公地点</span>
      </div>
      <div class="result">
        <span v-if="addressInfo.result">你已进入考勤范围</span>
        <span v-else
          >未进入考勤范围
          <a style="color: #29a6ff" @click="localReload">重新定位</a>
        </span>
      </div>
      <div class="address">
        <span>位置:{{ addressInfo.address }}</span>
      </div>
    </div>
    <div class="dkBtn">
      <div class="a btn" @click="onWork">
        <p class="icon">
          <Finished style="width: 20px; height: 20px; margin-right: 8px" />
        </p>
        <p class="btn-title">打卡上班</p>
      </div>
      <div class="b btn" @click="offWork">
        <p class="icon"></p>
        <SoldOut style="width: 20px; height: 20px; margin-right: 8px" />
        <p class="btn-title">打卡上班</p>
      </div>
    </div>
    <div class="card-content">
      <el-tabs type="border-card">
        <el-tab-pane label="出勤记录">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>出勤记录</span>
              </div>
            </template>
            <div class="search">
              <el-form :mode="formList" :inline="true">
                <el-form-item label="员工姓名:" v-if="queryAll">
                  <el-input
                    v-model="formList.userName"
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
                <el-form-item label="是否为工作日:" v-if="queryAll">
                  <el-select
                    v-model="formList.type"
                    placeholder="请选择"
                    size="large"
                    style="width: 180px"
                  >
                    <el-option
                      v-for="item in workType"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="工作状态:" v-if="queryAll">
                  <el-select
                    v-model="formList.remark"
                    placeholder="请选择"
                    size="large"
                    style="width: 180px"
                  >
                    <el-option
                      v-for="item in workStatuList"
                      :key="item.name"
                      :label="item.name"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="选择日期">
                  <el-date-picker
                    v-model="formList.time"
                    type="date"
                    placeholder="请选择日期"
                    format="YYYY-MM-DD"
                  />
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
                <el-table-column prop="date" label="日期" width="180" />
                <el-table-column prop="type" label="类型" width="180">
                  <template #default="scope">
                    <span v-if="scope.row">
                      {{ scope.row.type === 0 ? '工作日' : '非工作日' }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="department" label="部门" />
                <el-table-column prop="userName" label="员工姓名" />
                <el-table-column prop="start_check" label="上班时间" />
                <el-table-column prop="end_check" label="下班时间" />
                <el-table-column prop="work_time" label="工作时长" />
                <el-table-column prop="remark" label="备注" />
              </el-table>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="假期设置" v-if="queryAll">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>假期设置</span>
              </div>
            </template>
            <div class="search">
              <el-form :model="hFormInline" class="demo-form-inline">
                <el-form-item label="选择日期">
                  <el-date-picker
                    v-model="hFormInline.date"
                    type="date"
                    placeholder="请选择日期"
                  />
                </el-form-item>
                <el-form-item label="备注">
                  <el-input v-model="hFormInline.remark" style="width: 500px">
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="settingHoliday"
                    >设置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-card>
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>假期列表</span>
              </div>
            </template>
            <div class="search">
              日期：
              <el-date-picker
                v-model="hdateTime"
                type="date"
                placeholder="请选择日期"
              />
              <el-button
                type="primary"
                plain
                @click="searchData"
                style="margin-left: 150px"
                >搜索
              </el-button>
            </div>
            <div class="table-content">
              <el-table :data="hTableData" border style="width: 100%">
                <el-table-column prop="date" label="日期" width="180" />
                <el-table-column prop="remark" label="类型" width="180" />
                <el-table-column prop="start_check" label="开始时间" />
                <el-table-column prop="end_check" label="结束时间" />
                <el-table-column label="操作">
                  <template #default>
                    <el-button type="text" @click="removeHoloday"
                      >删除假期</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="上班时间设置" v-if="queryAll">
          <div class="setting-time">
            <el-form :model="settingTime">
              <el-form-item label="上班时间:">
                <el-time-picker
                  v-model="settingTime.start"
                  placeholder="选择上班时间"
                  format="HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="下班时间:">
                <el-time-picker
                  v-model="settingTime.end"
                  placeholder="选择上班时间"
                  format="HH:mm:ss"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="settingCtime">设置</el-button>
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
import { defineComponent, ref } from 'vue'
import { Finished, SoldOut } from '@element-plus/icons-vue'
import {
  requestWorkInfoById,
  getWorkConfig,
  setWorkConfig,
  addWork,
  updateWork
} from '@/service/attendance/index'
import { getPageListData } from '@/service/main/system/system'
import MainContainer from '@/components/map-container'

import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
// 用户权限
import { usePermission } from '@/hooks/use-permission'
import { formatToString } from '@/utils/date-format'
// 迟到早退

const workStatus = ['正常上班', '迟到', '早退']
export default defineComponent({
  name: 'index',
  components: {
    Finished,
    SoldOut,
    MainContainer
  },
  setup() {
    // 获取用户的id信息
    const store = useStore()
    const id = store.state.login.userInfo.id

    // 获取权限信息,是否可以查看全部信息
    const queryAll = ref()
    queryAll.value = usePermission('index', 'queryAll')

    // 工作列表查询数据
    const formList = ref({
      time: '',
      userName: '',
      department: '',
      type: '',
      remark: ''
    })
    const getWorkList = async () => {
      // 获取工作列表，管理员：查看全部，员工只能查看自己的
      if (formList.value.time !== '') {
        formList.value.time = formatToString(
          new Date(formList.value.time),
          'YYYY-MM-DD'
        )
      }
      if (queryAll.value) {
        const workListResult = await requestWorkInfoById(formList.value)
        tableData.value = workListResult.data
        tableData.value.map((item: { remark: string }) => {
          if (item.remark !== null) {
            item.remark = workStatus[item.remark]
          }
        })
      } else {
        console.log('test')
        const workListResult = await requestWorkInfoById({ user_id: id })
        console.log(workListResult)
        tableData.value = workListResult.data
        tableData.value.map((item: { remark: string }) => {
          if (item.remark !== null) {
            item.remark = workStatus[item.remark]
          }
        })
      }
    }

    const getWorkConfigSetting = async () => {
      // 获取工作时间配置
      const workConfig = await getWorkConfig()
      startTime.value = workConfig.data[0].start
      endTime.value = workConfig.data[0].end
    }
    const departList = ref([
      {
        id: '',
        depName: ''
      }
    ])

    // 上下班时间
    const startTime = ref('')
    const endTime = ref('')

    // 搜索
    const searchData = () => {
      getWorkList()
    }
    // 重置
    const resetSearch = () => {
      formList.value = {
        time: '',
        userName: '',
        department: '',
        type: '',
        remark: ''
      }
      getWorkList()
    }
    // 工作列表
    const tableData = ref([])
    async function init() {
      // 获取工作列表
      getWorkList()

      //获取工作时间配置
      getWorkConfigSetting()
      // 获取部门列表
      const departmentList = await getPageListData('/department/list', {})
      departList.value = departmentList.data
    }
    // 初始化，获取页面信息
    init()

    const workType = ref([
      {
        name: '工作日',
        value: 0
      },
      {
        name: '非工作日',
        value: 1
      }
    ])

    const workStatuList = ref([
      {
        name: '正常上班',
        value: 0
      },
      {
        name: '迟到',
        value: 1
      },
      {
        name: '早退',
        value: 2
      },
      {
        name: '迟到早退',
        value: 3
      }
    ])
    const holidayDateTime = ref(null)
    const hFormInline = ref({
      date: '',
      remark: ''
    })
    const settingHoliday = () => {
      console.log('sett')
    }

    // 假期查询日期
    const hdateTime = ref(null)

    // 假期表列表
    const hTableData = ref([
      {
        date: '2022-05-21',
        remark: '劳动节',
        start_check: '08:30:00',
        end_check: '17:30:00'
      },
      {
        date: '2022-05-21',
        remark: '劳动节',
        start_check: '08:30:00',
        end_check: '17:30:00'
      },
      {
        date: '2022-05-21',
        remark: '劳动节',
        start_check: '08:30:00',
        end_check: '17:30:00'
      }
    ])
    const removeHoloday = () => {
      console.log('remove')
    }

    // 上班时间
    const settingTime = ref({
      start: '',
      end: ''
    })
    // 设置上下班时间
    const settingCtime = () => {
      if (settingTime.value.start === '' && settingTime.value.end === '') {
        ElMessage({
          message: '时间设置不能为空',
          type: 'error'
        })
        // return
      }
      const startDate = new Date(settingTime.value.start)
      const endDate = new Date(settingTime.value.end)

      if (startDate.getTime() >= endDate.getTime()) {
        ElMessage({
          message: '错误的时间设置(下班时间早于上班时间)',
          type: 'error'
        })
        return
      }
      const setting = {
        start:
          startDate.getHours() +
          ':' +
          startDate.getMinutes() +
          ':' +
          startDate.getSeconds(),
        end:
          endDate.getHours() +
          ':' +
          endDate.getMinutes() +
          ':' +
          endDate.getSeconds()
      }
      setWorkConfig(setting).then((res) => {
        if (res.code === 200) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
        }
        //获取工作时间配置
        getWorkConfigSetting()
      })
    }
    const locInfo = ref({
      title: '定位成功',
      result: '',
      type: '',
      accuracy: '',
      isConverted: ''
    })

    const addressInfo = ref({
      address: '',
      isOffice: false,
      result: false
    })
    // 地图相关
    const onComplete = (data: any) => {
      console.log(data)
      console.log('定位成功')
      locInfo.value = {
        title: '定位成功',
        result: data.result.position,
        type: data.result.location_type,
        accuracy: data.result.accuracy ? data.result.accuracy : '无',
        isConverted: data.result.isConverted ? '是' : '否'
      }

      const getposition = [data.result.position.lng, data.result.position.lat] //获取当前位置的经纬度
      const location = data.formattedAddress //具体街道位置信息
      console.log(location)

      const locationZone = [117.29330062866211, 31.745131497253077] //设置的签到点
      // const locationZone = [117.29330062866211, 35.745131497253077] //设置的签到点

      const AMap = data.AMap
      //计算当前位置与考勤点距离
      const distance = AMap.GeometryUtil.distance(
        getposition,
        locationZone
      ).toFixed(0)

      const setDistance = 500 //设定打卡距离
      const distancestr = '仍距' + distance + '米'

      if (distance <= setDistance) {
        // 在范围内
        addressInfo.value.isOffice = true
        addressInfo.value.result = true
      } else {
        addressInfo.value.isOffice = false
        addressInfo.value.result = false
      }

      // 绘制签到范围
      const circle = new AMap.Circle({
        center: locationZone,
        radius: 300, //半径
        borderWeight: 1,
        // strokeOpacity: 1,
        strokeOpacity: 0.2,
        fillOpacity: 0.4
      })

      circle.setMap(data.map.value)
      data.map.value.setFitView([circle])
      // var circleEditor = new AMap.CircleEditor(data.map.value, circle)
    }
    const localReload = () => {
      window.location.reload()
    }
    const onError = (result: any) => {
      console.log(result, 'lla')
    }
    const pDate = new Date()
    const proxyTime =
      pDate.getFullYear() + '-' + (pDate.getMonth() + 1) + '-' + pDate.getDate()

    // 工具函数
    const DateTool = (time: number) => {
      return time < 10 ? '0' + time : time
    }

    const formatTool = (houer: number, minute: number, seconds: number) => {
      return DateTool(houer) + ':' + DateTool(minute) + ':' + DateTool(seconds)
    }

    // 上班打卡
    const onWork = async () => {
      const proxyDate = new Date()
      if (!addressInfo.value.isOffice) {
        ElMessage({
          message: '您不在打卡范围内,请进入范围内重新打卡',
          type: 'error'
        })
        return
      }
      console.log('上班打卡')

      console.log(proxyDate.getDay())
      const workParam = {
        date: proxyTime,
        type: [1, 2, 3, 4, 5].includes(proxyDate.getDay()) ? '0' : '1',
        start: startTime.value,
        end: endTime.value,
        start_check: formatTool(
          proxyDate.getHours(),
          proxyDate.getMinutes(),
          proxyDate.getSeconds()
        ),
        end_check: '',
        work_time: 0,
        remark: '0',
        user_id: id
      }
      console.log(workParam.type)
      /*
      remark{
        0:正常，
        1:迟到，
        2:早退，
        3:迟到早退
      }
      */
      console.log(new Date(proxyTime + ' ' + workParam.start_check).getTime())
      console.log(workParam.start_check, new Date(startTime.value).getTime())
      if (
        new Date(proxyTime + ' ' + workParam.start_check).getTime() >
        new Date(proxyTime + ' ' + startTime.value).getTime()
      ) {
        workParam.remark = '1'
      }

      const workResult = await addWork(workParam)
      if (workResult.code === 200) {
        ElMessage({
          message: workResult.message,
          type: 'success'
        })
        getWorkList()
      } else if (workResult.code === 204) {
        ElMessage({
          message: workResult.message,
          type: 'warning'
        })
      }
    }
    // 下班打卡
    const offWork = async () => {
      if (!addressInfo.value.isOffice) {
        ElMessage({
          message: '您不在打卡范围内,请进入范围内重新打卡',
          type: 'error'
        })
        return
      }
      const proxyDate = new Date()

      const workListResult = await requestWorkInfoById({
        user_id: id,
        time: proxyTime
      })
      console.log(workListResult)
      let workId, stratTime
      if (workListResult.data.length === 0) {
        ElMessage({
          message: '您还没有进行上班打卡，请先打卡上班',
          type: 'warning'
        })
        return
      } else {
        workId = workListResult.data[0].work_id
        stratTime = workListResult.data[0].start
      }
      const end = formatTool(
        proxyDate.getHours(),
        proxyDate.getMinutes(),
        proxyDate.getSeconds()
      )
      const offParam = {
        work_id: workId,
        end_check: end,
        work_time:
          new Date(proxyTime + ' ' + end).getHours() -
          new Date(proxyTime + ' ' + stratTime).getHours()
      }
      let offResult = await updateWork(offParam)
      if (offResult.code === 200) {
        ElMessage({
          message: offResult.message,
          type: 'success'
        })
      }
      console.log('下班打卡')
    }
    return {
      // 部门列表
      departList,
      // 查询权限

      queryAll,
      startTime,
      endTime,
      formList,
      workType,
      workStatuList,
      searchData,
      resetSearch,

      tableData,
      holidayDateTime,
      hFormInline,
      settingHoliday,
      hdateTime,

      hTableData,
      removeHoloday,

      settingTime,
      settingCtime,

      onComplete,
      onError,
      // 地图方面
      locInfo,
      addressInfo,
      localReload,
      onWork,
      offWork
    }
  }
})
</script>

<style scoped lang="less">
.home {
  width: 100%;
  // height: 500px;
  background-color: #f0f2f5;

  .time-alert {
    // width: 85%;
    margin: 0 auto;

    // background-color: #f0f2f5;
    .endTime {
      margin-left: 105px;
    }
  }

  .map-container {
    position: relative;
    margin-top: 5px;
    height: 300px;
    border: solid 1px;
    .localtionInfo {
      position: absolute;
      padding: 15px 10px;
      z-index: 99;
      top: 15px;
      right: 5px;
      background-color: #fff;
      width: 300px;
      height: 150px;
      .title {
        font-weight: 700;
        padding-bottom: 5px;
        border-bottom: solid 2px rgba(0, 0, 0, 0.3);
      }
      p {
        margin: 0;
        padding: 0;
        width: 1;
        text-align: left;
        height: 22px;
        font-size: 16px;
      }
      .content {
        padding: 10px 15px;
        border-bottom: solid 2px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .adressInfo {
    margin-top: 10px;
    background-color: #fff;
    border: solid 1px #28b779;
    display: flex;
    align-items: center;
    height: 50px;
    div {
      margin-left: 10px;
    }
    .office {
      span {
        display: inline-block;
        background-color: #5fb878;
        color: #fff;
        padding: 5px 15px;
        border-radius: 20px;
      }
    }
    .result {
      color: #5fb878;
    }
  }

  .dkBtn {
    margin-top: 30px;
    height: 50px;
    // display: inline-block;
    display: flex;
    color: #fff;
    font-size: 14px;

    .a {
      background-color: #28b779;
    }

    .b {
      background-color: #da542e;
      margin-left: 50px;
    }

    .btn-title {
      position: relative;
      top: -5px;
    }
  }

  .btn {
    width: 150px;
    height: 70px;
  }

  .btn:hover {
    background-color: #2e363f;
  }

  .card-content {
    margin-top: 50px;
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
