<template>
  <div class="container">
    <div class="header1">
      <n-button type="primary" size="large">交通状况感知</n-button>
    </div>
    <div class="header2">
      <n-button type="primary" size="large">交通状况感知</n-button>
    </div>
    <div class="header3">
      <n-button type="primary" size="large">交通状况感知</n-button>
    </div>
    <div class="header4">
      <n-button type="primary" size="large">交通状况感知</n-button>
    </div>
    <div class="left">
      <Table :data="mapData" :title1="'过车量'"></Table>
    </div>
    <div class="center">
      <n-space>
        <n-button type="primary" size="large">交通状况感知</n-button>
        <n-button type="primary" size="large">交通状况感知</n-button>
        <n-button type="primary" size="large">交通状况感知</n-button>
        <n-button type="primary" size="large">交通状况感知</n-button>
      </n-space>
    </div>
    <div class="center2">
      <Line v-bind="lineData2"></Line>
    </div>
    <div class="center3">
      <Line v-bind="lineData1"></Line>
    </div>
    <div class="right1">
      <All :option="option"></All>
    </div>
    <div class="right2">
      <Line v-bind="lineData3"></Line>
    </div>
  </div>
</template>

<script setup>
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
import { onMounted, ref } from "vue"
import { NButton, NSpace } from 'naive-ui'
echarts.registerTheme('walden', walden)
const clickData = ref({})
const idData = ref({})
const zoomData = ref({})
const lineData1 = ref({})
const lineData2 = ref({})
const lineData3 = ref({})
const gaugeDataPre = ref({})
const gaugeDataCur = ref({})
const mapData = ref([])
const center = [117.280338325, 31.84974485]
const pieData = [
  { value: 1048, name: '拥堵' },
  { value: 735, name: '平衡' },
  { value: 580, name: '空闲' },
]
mapData.value = [
  {
    "name": 74,
    "value": 32
  },
  {
    "name": 119,
    "value": 32
  },
  {
    "name": 91,
    "value": 31
  },
  {
    "name": 64,
    "value": 28
  },
  {
    "name": 72,
    "value": 25
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
  value: [2.0, 2.2, 9.1, 3.4, 12.0, 3.0, 3.2],
  title: '拥堵指数图',
  title2: '拥堵指数'
}
lineData2.value = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  value: [80, 92, 91, 34, 290, 130, 132],
  title: '平均车速图',
  title2: '车速'
}
lineData3.value = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  value: [80, 92, 91, 34, 290, 130, 132],
  title: '热门拥堵时段',
  title2: '拥堵时段'
}
const hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'
];
// prettier-ignore
const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];
// prettier-ignore
const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
const option = {
  tooltip: {
    position: 'top'
  },
  grid: {
    height: '80%',
    top: '10%'
  },
  xAxis: {
    type: 'category',
    data: hours,
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: days,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%'
  },
  series: [
    {
      name: 'Punch Card',
      type: 'heatmap',
      data: data,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.1fr 0.9fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "header1 header1 header2 header2 header3 header3 header4 header4"
    "left left center center center center center center"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center3 center3 center3 right2 right2 right2"
    "left left center3 center3 center3 right2 right2 right2";
}

.header1 {
  grid-area: header1;
  background-color: red;
}

.header2 {
  grid-area: header2;
  background-color: blue;
}

.header3 {
  grid-area: header3;
  background-color: blue;
}

.header4 {
  grid-area: header4;
  background-color: pink;
}

.left {
  grid-area: left;
  background-color: pink;
}

.center {
  grid-area: center;
  background-color: yellow;
}

.center2 {
  grid-area: center2;
  background-color: brown;
}

.center3 {
  grid-area: center3;
  background-color: green;
}

.right1 {
  grid-area: right1;
  background-color: pink;
}

.right2 {
  grid-area: right2;
  background-color: pink;
}
</style>
