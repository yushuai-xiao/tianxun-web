<template>
  <div class="dashboard">
    <!-- 顶部的数据统计 -->
    <el-row :gutter="20">
      <template v-for="item in topPanelData" :key="item.title">
        <el-col :md="12" :lg="6" :xl="6">
          <statistical-panel :panelData="item" />
        </el-col>
      </template>
    </el-row>

    <!-- 中间的echarts -->
    <el-row :gutter="10">
      <el-col :span="7">
        <xs-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </xs-card>
      </el-col>
      <el-col :span="10">
        <xs-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </xs-card>
      </el-col>

      <el-col :span="7">
        <xs-card title="分类商品销量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart
        ></xs-card>
      </el-col>
    </el-row>
    <el-row :gutter="60" class="row">
      <el-col :span="12">
        <xs-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </xs-card>
      </el-col>
      <el-col :span="12">
        <xs-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </xs-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import XsCard from '@/base-ui/card'
import { useStore } from '@/store'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

import StatisticalPanel from '@/components/statistical-panel'

export default defineComponent({
  name: 'dashboard',
  components: {
    XsCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart,
    StatisticalPanel
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')

    // 2.获取顶部PanelData
    const topPanelData = computed(() => store.state.dashboard.topPanelDatas)
    // console.log(topPanelData)
    // 获取数据
    // pieEchart所需数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    // line-echart所需数据
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xLabels, values }
    })

    // bar-echar所需数据
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }
      return { xLabels, values }
    })

    // map-echart所需数据
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale,
      topPanelData
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  background-color: #f5f5f5;
  padding: 0;

  .row {
    margin-top: 15px;
  }
}
</style>
