<template>
  <div class="app-main">
    <div id="searchContainer"></div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

import AMapLoader from '@amap/amap-jsapi-loader'
window._AMapSecurityConfig = {
  securityJsCode: '7f9ed47f3cba7749e3f501ea7bad5a02'
}

export default {
  props: {
    searchId: {
      type: String
    },
    locationInfo: {
      type: String
    }
  },
  data() {
    return {
      map: null,
      autoOptions: {
        input: ''
      },
      searchPlaceInput: '',
      auto: null,
      placeSearch: null,
      district: null,
      polygons: [],
      showHeatOrNot: false,
      heatmap: null,
      heatmapList: null,
      Amap: null,
      lat: null
    }
  },
  created() {
    this.autoOptions.input = this.searchId
    this.searchPlaceInput = this.localtionInfo
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: '19717c8758c5f457b13a1c5f5f6762c9', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          // 'AMap.ToolBar',
          'AMap.Scale',
          // 'AMap.HawkEye',
          'AMap.MapType',
          'AMap.Geolocation',
          'AMap.AutoComplete',
          'AMap.PlaceSearch'
        ] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then((AMap) => {
          console.log('lfaf')
          this.AMap = AMap
          this.map = new AMap.Map('searchContainer', {
            //设置地图容器id
            viewMode: '3D', //是否为3D地图模式
            zoom: 10, //初始化地图级别
            center: [117.283042, 31.86119] //初始化地图中心点位置
          })
          console.log('fdfd')
          // 比例尺
          this.map.addControl(new AMap.Scale())
          // 缩放工具条
          // this.map.addControl(new AMap.ToolBar())
          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          // this.map.addControl(new AMap.HawkEye())
          // 图层切换，用于几个常用图层切换显示
          this.map.addControl(new AMap.MapType())
          // 定位
          this.map.addControl(new AMap.Geolocation())
          // 输入提示
          this.auto = new AMap.AutoComplete(this.autoOptions)
          // POI搜索
          this.placeSearch = new AMap.PlaceSearch({
            map: this.map
          }) //构造地点查询类
          this.auto.on('select', this.select)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 查询回调
    select(e) {
      console.log(e, 'eee')
      this.lat = e.poi
      this.$emit('latInfo', this.lat)
      this.placeSearch.setCity(e.poi.adcode)
      this.placeSearch.search(e.poi.name) //关键字查询查询
      this.drawBounds(e.poi.name) // 绘制行政区边界
      this.map.setZoom(16, true, 1)
    },
    drawBounds(newValue) {
      //加载行政区划插件
      if (!this.district) {
        //实例化DistrictSearch
        console.log('test')
        var opts = {
          subdistrict: 1, //获取边界不需要返回下级行政区
          extensions: 'all', //返回行政区边界坐标组等具体信息
          level: 'district' //查询行政级别为 市
        }

        this.map.plugin(['AMap.DistrictSearch'], () => {
          this.district = new AMap.DistrictSearch(opts)
        })
        // this.district = new AMap.DistrictSearch(opts)
      }
      //行政区查询
      this.district.search(newValue, (status, result) => {
        console.log(result, 'result')
        if (result != null) {
          this.feedBack('区域搜索成功', 'success')
          if (this.polygons != null) {
            this.map.remove(this.polygons) //清除上次结果
            this.polygons = []
          }
          let bounds
          if (result && result.districtList && result.districtList[0]) {
            bounds = result.districtList[0].boundaries
          } else {
            bounds = null
          }
          if (bounds) {
            for (var i = 0, l = bounds.length; i < l; i++) {
              //生成行政区划polygon
              var polygon = new this.AMap.Polygon({
                strokeWeight: 1,
                path: bounds[i],
                fillOpacity: 0.4,
                fillColor: '#80d8ff',
                strokeColor: '#0091ea'
              })
              this.polygons.push(polygon)
            }
          }
          this.map.add(this.polygons)
          this.map.setFitView(this.polygons) //视口自适应
        } else {
          this.feedBack('区域搜索失败', 'error')
        }
      })
    },
    feedBack(msg, feedBackType) {
      ElMessage({
        showClose: true,
        message: msg,
        type: feedBackType
      })
    }
  },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap()
  },
  watch: {
    searchPlaceInput(newValue) {
      if (newValue != null) {
        console.log(newValue)
        this.placeSearch.search(newValue)
        this.drawBounds(newValue)
        this.map.setZoom(16, true, 1)
      }
    },
    searchId(newValue) {
      if (newValue !== null) {
        this.autoOptions.input = newValue
      }
    },
    localtionInfo(newValue) {
      if (newValue !== null) {
        console.log('lalal.ser')
        this.searchPlaceInput = newValue
        this.placeSearch.search(newValue)
        this.drawBounds(newValue)
        this.map.setZoom(16, true, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#searchContainer {
  border-radius: 5px;
  padding: 0px;
  margin: 0px;
  margin-top: 10px;
  width: 100%;
  height: 300px;
  background-color: #444;
}
</style>
