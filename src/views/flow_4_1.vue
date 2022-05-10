<template>
  <!--<iframe src="http://charge.lawted.tech" width="100%" height="100%">
  </iframe>-->

  <!--左侧容器-->
  <div class="leftContainer">
    <!--左上-->
    <div class="charger-info">
      <div class="result-info-title" style="margin-top: 30px;">
        基础设施规划
      </div>
      <div class="charger-info-item">
        <span class="charger-info-title">当前充电桩ID</span><span class="charger-info-number" style="color: rgb(62,142,255)">3</span>
      </div>
      <div class="charger-info-item">
        <span class="charger-info-title">快充桩数</span><span class="charger-info-number"
                                                          style="color: rgb(39,174,96)">16</span>
      </div>
      <div class="charger-info-item">
        <span class="charger-info-title">慢充桩数</span><span class="charger-info-number"
                                                          style="color: rgb(255,66,66)">12</span>
      </div>
    </div>
    <!--关键指标-->
    <div>
      <div class="result-info-title">
        结果关键指标
      </div>
      <div class="result-key-info">
        <div class="result-key-info-detail">
          <div>日间营收</div>
          <span>215261</span><span>元</span>
        </div>
        <img src="../assets/icon-income.png" alt="">
      </div>
      <div class="result-key-info">
        <div class="result-key-info-detail">
          <div>慢桩利用率</div>
          <span>32.79</span><span>%</span>
        </div>
        <img src="../assets/icon-slowCharge.png" alt="">
      </div>
      <div class="result-key-info">
        <div class="result-key-info-detail">
          <div>快桩利用率</div>
          <span>31.06</span><span>%</span>
        </div>
        <img src="../assets/icon-fastCharge.png" alt="">
      </div>
      <div class="result-key-info">
        <div class="result-key-info-detail">
          <div>回报周期</div>
          <span>1.15</span><span>年</span>
        </div>
        <img src="../assets/icon-cycle.png" alt="">
      </div>
    </div>
  </div>

  <!--右侧容器-->
  <div class="rightContainer">
    <Map
        v-if="mapData.length"
        title="车流量"
        :geoCoordMap="hefei"
        :data="mapData"
        :center="center"
        :zoom="2"
        @reportData="changeSelect">
    </Map>
  </div>
</template>

<script setup>
//柱状图不太会画，换成了折线图。
import Pie from "/src/components/pie.vue"
import All from "/src/components/all.vue"
import Bar from "/src/components/bar.vue"
import Line from "/src/components/line.vue"
import Map from "/src/components/map.vue"
import Zoom from "/src/components/zoom.vue"
import Table from "/src/components/table.vue"
import Gauge from "/src/components/gauge.vue"
import Text from "/src/components/text.vue"
import * as echarts from 'echarts'
import utils from '/src/utils/index.js'
// Theme Config
import walden from '/src/assets/walden.json'
import hefei from '/src/assets/he_fei.json'
import {onMounted, ref} from "vue"
import {NButton, NSpace} from 'naive-ui'

echarts.registerTheme('walden', walden)
const clickData = ref({})
const idData = ref({})
const zoomData = ref({})
const lineData1 = ref({})
const lineData2 = ref({})
const lineData3 = ref({})
const lineData4 = ref({})
const gaugeDataPre = ref({})
const gaugeDataCur = ref({})
const mapData = ref([])
const center = [117.280338325, 31.84974485]
const pieData = [
  {value: 150, name: '拥堵', itemStyle: {color: '#ee0e3b'}},
  {value: 430, name: '平衡', itemStyle: {color: '#f9d00b'}},
  {value: 980, name: '空闲', itemStyle: {color: '#06c674'}},
]
mapData.value = [
  {
    "name": 74,
    "value": 36
  },
  {
    "name": 119,
    "value": 36
  },
  {
    "name": 91,
    "value": 35
  },
  {
    "name": 64,
    "value": 33
  },
  {
    "name": 72,
    "value": 28
  },
  {
    "name": 130,
    "value": 24
  },
  {
    "name": 29,
    "value": 23
  },
  {
    "name": 57,
    "value": 22
  },
  {
    "name": 50,
    "value": 21
  },
  {
    "name": 63,
    "value": 21
  },
  {
    "name": 99,
    "value": 21
  },
  {
    "name": 37,
    "value": 20
  },
  {
    "name": 20,
    "value": 19
  },
  {
    "name": 97,
    "value": 19
  },
  {
    "name": 122,
    "value": 19
  },
  {
    "name": 123,
    "value": 19
  },
  {
    "name": 28,
    "value": 18
  },
  {
    "name": 61,
    "value": 18
  },
  {
    "name": 82,
    "value": 18
  },
  {
    "name": 94,
    "value": 18
  },
  {
    "name": 221,
    "value": 17
  },
  {
    "name": 83,
    "value": 15
  },
  {
    "name": 149,
    "value": 15
  },
  {
    "name": 41,
    "value": 14
  },
  {
    "name": 214,
    "value": 14
  },
  {
    "name": 234,
    "value": 14
  },
  {
    "name": 78,
    "value": 13
  },
  {
    "name": 109,
    "value": 13
  },
  {
    "name": 111,
    "value": 13
  },
  {
    "name": 49,
    "value": 12
  },
  {
    "name": 170,
    "value": 12
  },
  {
    "name": 211,
    "value": 12
  },
  {
    "name": 53,
    "value": 11
  },
  {
    "name": 71,
    "value": 11
  },
  {
    "name": 150,
    "value": 11
  },
  {
    "name": 216,
    "value": 11
  },
  {
    "name": 67,
    "value": 10
  },
  {
    "name": 88,
    "value": 10
  },
  {
    "name": 107,
    "value": 10
  },
  {
    "name": 125,
    "value": 10
  },
  {
    "name": 230,
    "value": 10
  },
  {
    "name": 2,
    "value": 9
  },
  {
    "name": 31,
    "value": 9
  },
  {
    "name": 65,
    "value": 9
  },
  {
    "name": 87,
    "value": 9
  },
  {
    "name": 95,
    "value": 9
  },
  {
    "name": 135,
    "value": 9
  },
  {
    "name": 168,
    "value": 9
  },
  {
    "name": 169,
    "value": 9
  },
  {
    "name": 203,
    "value": 9
  },
  {
    "name": 55,
    "value": 8
  },
  {
    "name": 66,
    "value": 8
  },
  {
    "name": 89,
    "value": 8
  },
  {
    "name": 96,
    "value": 8
  },
  {
    "name": 110,
    "value": 8
  },
  {
    "name": 171,
    "value": 8
  },
  {
    "name": 172,
    "value": 8
  },
  {
    "name": 213,
    "value": 8
  },
  {
    "name": 23,
    "value": 7
  },
  {
    "name": 56,
    "value": 7
  },
  {
    "name": 81,
    "value": 7
  },
  {
    "name": 100,
    "value": 7
  },
  {
    "name": 108,
    "value": 7
  },
  {
    "name": 121,
    "value": 7
  },
  {
    "name": 139,
    "value": 7
  },
  {
    "name": 167,
    "value": 7
  },
  {
    "name": 176,
    "value": 7
  },
  {
    "name": 180,
    "value": 7
  },
  {
    "name": 200,
    "value": 7
  },
  {
    "name": 222,
    "value": 7
  },
  {
    "name": 9,
    "value": 6
  },
  {
    "name": 62,
    "value": 6
  },
  {
    "name": 102,
    "value": 6
  },
  {
    "name": 106,
    "value": 6
  },
  {
    "name": 112,
    "value": 6
  },
  {
    "name": 194,
    "value": 6
  },
  {
    "name": 196,
    "value": 6
  },
  {
    "name": 206,
    "value": 6
  },
  {
    "name": 14,
    "value": 5
  },
  {
    "name": 42,
    "value": 5
  },
  {
    "name": 47,
    "value": 5
  },
  {
    "name": 60,
    "value": 5
  },
  {
    "name": 80,
    "value": 5
  },
  {
    "name": 85,
    "value": 5
  },
  {
    "name": 93,
    "value": 5
  },
  {
    "name": 113,
    "value": 5
  },
  {
    "name": 115,
    "value": 5
  },
  {
    "name": 148,
    "value": 5
  },
  {
    "name": 163,
    "value": 5
  },
  {
    "name": 173,
    "value": 5
  },
  {
    "name": 188,
    "value": 5
  },
  {
    "name": 1,
    "value": 4
  },
  {
    "name": 8,
    "value": 4
  },
  {
    "name": 21,
    "value": 4
  },
  {
    "name": 32,
    "value": 4
  },
  {
    "name": 68,
    "value": 4
  },
  {
    "name": 70,
    "value": 4
  },
  {
    "name": 116,
    "value": 4
  },
  {
    "name": 118,
    "value": 4
  },
  {
    "name": 140,
    "value": 4
  },
  {
    "name": 142,
    "value": 4
  },
  {
    "name": 161,
    "value": 4
  },
  {
    "name": 175,
    "value": 4
  },
  {
    "name": 208,
    "value": 4
  },
  {
    "name": 220,
    "value": 4
  },
  {
    "name": 11,
    "value": 3
  },
  {
    "name": 15,
    "value": 3
  },
  {
    "name": 39,
    "value": 3
  },
  {
    "name": 51,
    "value": 3
  },
  {
    "name": 59,
    "value": 3
  },
  {
    "name": 77,
    "value": 3
  },
  {
    "name": 155,
    "value": 3
  },
  {
    "name": 162,
    "value": 3
  },
  {
    "name": 164,
    "value": 3
  },
  {
    "name": 179,
    "value": 3
  },
  {
    "name": 183,
    "value": 3
  },
  {
    "name": 190,
    "value": 3
  },
  {
    "name": 195,
    "value": 3
  },
  {
    "name": 197,
    "value": 3
  },
  {
    "name": 205,
    "value": 3
  },
  {
    "name": 227,
    "value": 3
  },
  {
    "name": 229,
    "value": 3
  },
  {
    "name": 233,
    "value": 3
  },
  {
    "name": 242,
    "value": 3
  },
  {
    "name": 18,
    "value": 2
  },
  {
    "name": 27,
    "value": 2
  },
  {
    "name": 48,
    "value": 2
  },
  {
    "name": 84,
    "value": 2
  },
  {
    "name": 128,
    "value": 2
  },
  {
    "name": 134,
    "value": 2
  },
  {
    "name": 153,
    "value": 2
  },
  {
    "name": 174,
    "value": 2
  },
  {
    "name": 182,
    "value": 2
  },
  {
    "name": 185,
    "value": 2
  },
  {
    "name": 186,
    "value": 2
  },
  {
    "name": 187,
    "value": 2
  },
  {
    "name": 192,
    "value": 2
  },
  {
    "name": 202,
    "value": 2
  },
  {
    "name": 212,
    "value": 2
  },
  {
    "name": 215,
    "value": 2
  },
  {
    "name": 217,
    "value": 2
  },
  {
    "name": 44,
    "value": 1
  },
  {
    "name": 92,
    "value": 1
  },
  {
    "name": 124,
    "value": 1
  },
  {
    "name": 165,
    "value": 1
  },
  {
    "name": 178,
    "value": 1
  },
  {
    "name": 181,
    "value": 1
  },
  {
    "name": 193,
    "value": 1
  },
  {
    "name": 198,
    "value": 1
  },
  {
    "name": 199,
    "value": 1
  },
  {
    "name": 210,
    "value": 1
  },
  {
    "name": 223,
    "value": 1
  },
  {
    "name": 225,
    "value": 1
  },
  {
    "name": 236,
    "value": 1
  },
  {
    "name": 237,
    "value": 1
  },
  {
    "name": 5,
    "value": 0
  },
  {
    "name": 10,
    "value": 0
  },
  {
    "name": 13,
    "value": 0
  },
  {
    "name": 24,
    "value": 0
  },
  {
    "name": 46,
    "value": 0
  },
  {
    "name": 52,
    "value": 0
  },
  {
    "name": 58,
    "value": 0
  },
  {
    "name": 79,
    "value": 0
  },
  {
    "name": 86,
    "value": 0
  },
  {
    "name": 98,
    "value": 0
  },
  {
    "name": 120,
    "value": 0
  },
  {
    "name": 127,
    "value": 0
  },
  {
    "name": 132,
    "value": 0
  },
  {
    "name": 133,
    "value": 0
  },
  {
    "name": 138,
    "value": 0
  },
  {
    "name": 141,
    "value": 0
  },
  {
    "name": 143,
    "value": 0
  },
  {
    "name": 147,
    "value": 0
  },
  {
    "name": 151,
    "value": 0
  },
  {
    "name": 154,
    "value": 0
  },
  {
    "name": 166,
    "value": 0
  },
  {
    "name": 177,
    "value": 0
  },
  {
    "name": 189,
    "value": 0
  },
  {
    "name": 204,
    "value": 0
  },
  {
    "name": 218,
    "value": 0
  },
  {
    "name": 219,
    "value": 0
  },
  {
    "name": 224,
    "value": 0
  },
  {
    "name": 226,
    "value": 0
  },
  {
    "name": 228,
    "value": 0
  },
  {
    "name": 231,
    "value": 0
  },
  {
    "name": 232,
    "value": 0
  },
  {
    "name": 238,
    "value": 0
  },
  {
    "name": 239,
    "value": 0
  },
  {
    "name": 240,
    "value": 0
  },
  {
    "name": 241,
    "value": 0
  }
]
lineData1.value = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  value: [1.4, 1.3, 2.2, 4.1, 3.3, 7.6, 7.9],
  title: '南山区占用指数图',
  title2: '南山区平均占用率'
}
lineData2.value = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  value: [1.5, 1.1, 3.3, 3.4, 6.0, 8.8, 8.2],
  title: '区块占用指数',
  title2: '区块占用率'
}
lineData3.value = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  value: [2.0, 2.2, 9.1, 3.4, 12.0, 3.0, 3.2],
  title: '区块BCU',
  title2: '区块BCU'
}
lineData4.value = {
  categories: ['Road1', 'Road2', 'Road3', 'Road4', 'Road5', 'Road6', 'Road7'],
  value: [9.5, 8.3, 8.1, 7.0, 5.5, 3.1, 1.2],
  title: '路段占用图',
  title2: '路段占用'
}

</script>

<style>

img {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}

/*左侧容器*/

.leftContainer {
  width: 20vw;
  height: 100%;
  float: left;
  display: flex;
  justify-content: center;
  border-radius: 18px;
  margin-right: 10px;
  flex-direction: column;
  align-items: center;
}

/*充电桩信息*/
.charger-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 5vh 0;
}

.charger-info-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.charger-info-title {
  color: white;
  font-size: 26px;
  margin-right: 15px;
  font-weight: bold;
}

.charger-info-number {
  font-size: 44px;
  font-weight: bold;
}

/*结果关键指标*/

.result-info-title {
  font-size: 36px;
  font-weight: bold;
  padding-bottom: 10px;
  text-align: center;
  color: white;
}

.result-key-info {
  display: flex;
  align-items: center;
  margin-top: 24px;
  color: white;
  margin-left: 20px;
  justify-content: space-between
}

.result-key-info img {
  width: 50px;
  margin-right: 30px;
}

.result-key-info-detail {
  display: inline-block;
  margin-right: 40px;

}

.result-key-info-detail div {
  font-size: 16px;
  font-weight: lighter;
  color: #A0AEC0;
}

.result-key-info-detail span:nth-of-type(1) {
  font-size: 34px;
  font-weight: bold;
  margin-right: 5px;
}

/*右侧容器*/

.rightContainer {
  height: 100%;
  background-color: rgb(32, 41, 52);
  border-radius: 18px;
  overflow: hidden;
}
</style>
