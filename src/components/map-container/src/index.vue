<template>
  <div class="home_div">
    <div class="map-title">
      <!-- 地图组件 -->
      <div id="container"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
window._AMapSecurityConfig = {
  securityJsCode: '7f9ed47f3cba7749e3f501ea7bad5a02'
}
import { shallowRef } from 'vue'
export default defineComponent({
  name: 'mapcontainer',
  emits: ['onComplete', 'onError'],
  setup(props, { emit }) {
    let map = shallowRef(null)
    const initMap = () => {
      AMapLoader.load({
        key: '19717c8758c5f457b13a1c5f5f6762c9',
        version: '2.0',
        plugins: ['AMap.ToolBar', 'AMap.Driving', 'AMap.CircleEditor'],
        AMapUI: {
          version: '1.1',
          plugins: []
        },
        Loca: {
          version: '2.0.0'
        }
      }).then((AMap) => {
        map.value = new AMap.Map('container', {
          resizeEnable: true
        })
        AMap.plugin('AMap.Geolocation', () => {
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 1000000, //超过10秒后停止定位，默认：5s
            buttonPosition: 'RB', //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
          })
          map.value.addControl(geolocation)
          geolocation.getCurrentPosition(function (status, result) {
            if (status == 'complete') {
              console.log(result, 'map')
              emit('onComplete', { result, AMap, map })
            } else {
              emit('onError', result)
            }
          })
        })
      })
    }
    onMounted(() => {
      //DOM初始化完成进行地图初始化
      initMap()
    })
    return {
      map
    }
  }
})
</script>

<style scoped>
.home_div {
  height: 300px;
  width: 100%;
  padding: 0px;
  margin: 0px;
  position: relative;
}

#container {
  height: 300px;
  width: 100%;
  padding: 0px;
  margin: 0px;
}

.map-title {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 50px;
  background-color: rgba(27, 25, 27, 0.884);
}
</style>
