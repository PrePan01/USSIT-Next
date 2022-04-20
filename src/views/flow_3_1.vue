<template>
  <div class="container">
      <div class="header1">
      <n-card>
        <h1>面向智慧出行的城市群智感知验证系统</h1>
      </n-card>
    </div>
    <div class="left1">
      <Pie :data="pieData" title="车流量情况"></Pie>
    </div>
    <div class="left2">
      <Line v-bind="lineData1"></Line>
    </div>
    <div class="left3">
      <Table :data="mapData1" :title1="'预测拥堵占比'"></Table>
    </div>
    <div class="center1_1">
      <n-card hoverable title="平均车流量">
        <h1>{{ Math.floor(Math.random() * (90 - 50 + 1) + 50) }}</h1>
      </n-card>
    </div>
    <div class="center1_2">
      <n-card hoverable title="总卡口数">
        <h1>1735</h1>
      </n-card>
    </div>
    <div class="center1_3">
      <n-card hoverable title="最大车流量">
        <h1>{{ Math.floor(Math.random() * (70 - 30 + 1) + 30) }} %</h1>
      </n-card>
    </div>

    <div class="center2">
      <Map
        v-if="mapData.length"
        title="车流量"
        :geoCoordMap="taian"
        :data="mapData"
        :center="center"
        :zoom="100"
        @reportData="changeSelect"
      ></Map>
    </div>
    <div class="center3">
      <Line v-bind="lineData3"></Line>

    </div>
    <div class="right">
      <Table :data="flow31_right" :title1="'预测车流量'"></Table>
    </div>
  </div>
</template>

<script setup>
import Pie from "/src/components/pie.vue";
import All from "/src/components/all.vue";
import Bar from "/src/components/bar.vue";
import Line from "/src/components/line.vue";
import Map from "/src/components/map.vue";
import Zoom from "/src/components/zoom.vue";
import Table from "/src/components/table.vue";
import Gauge from "/src/components/gauge.vue";
import Text from "/src/components/text.vue";
import * as echarts from "echarts";
import utils from "/src/utils/index.js";
// Theme Config
import walden from "/src/assets/walden.json";
import hefei from "/src/assets/he_fei.json";
import taian from "/src/assets/tai_an.json";
import fake from "/src/assets/tai_an_fake.json"
import flow31_right from '/src/assets/flow31_right.json'
import { onMounted, ref } from "vue";
import { NButton, NSpace, NCard } from "naive-ui";
echarts.registerTheme("walden", walden);
const clickData = ref({});
const idData = ref({});
const zoomData = ref({});
const lineData1 = ref({});
const lineData2 = ref({});
const lineData3 = ref({});
const lineData4 = ref({});
const gaugeDataPre = ref({});
const gaugeDataCur = ref({});
const mapData = ref([]);
const mapData1 = ref([]);

const center = [117.12932143951308,36.19724062736381];
const pieData = [
  { value: 1048, name: "拥堵",itemStyle:{color:'#ee0e3b'} },
  { value: 735, name: "平衡", itemStyle:{color:'#f9d00b'} },
  { value: 580, name: "空闲", itemStyle:{color:'#06c674'} },
];
for (let item of fake) {
  item.value = Math.round(Math.random() * (500 - 30 + 1) + 30);
}
mapData.value = fake;
mapData1.value=[
  {
    name: 74,
    value: 32,
  },
  {
    name: 119,
    value: 32,
  },
  {
    name: 91,
    value: 31,
  },
]


lineData1.value = {
  categories: ["12:00","12:30","13:00",],
  value: [1.85, 1.63, ],
    value2: [, 1.63, 1.72],
  title: "预测拥堵趋势",
  title2: "实际拥堵指数",
     title3:"预测值",
};
lineData2.value = {
  categories: ["泰山区青年路07号", "泰山区望岳东路", "岱岳区高铁东路", "泰山区岱宗大街273号", "泰山区东湖路1"],
  value: [499, 492, 489, 484, 483],
  title: "预测热门拥堵路段",
  title2: "过车量",
};
lineData3.value = {
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  value: [80, 92, 91, 34, , , ],
  value2: [, , , 34, 290, 130, 132],
  title: "卡口车流",
  title2: "卡口真实值",
   title3:"预测值",
};

const hours = [
  "12a",
  "1a",
  "2a",
  "3a",
  "4a",
  "5a",
  "6a",
  "7a",
  "8a",
  "9a",
  "10a",
  "11a",
  "12p",
  "1p",
  "2p",
  "3p",
  "4p",
  "5p",
  "6p",
  "7p",
  "8p",
  "9p",
  "10p",
  "11p",
];
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.1fr 0.9fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "header1 header1 header1 header1 header1 header1 header1 header1 header1 header1 header1 header1"
    "left1 left1 left1 center1_1 center1_1 center1_2 center1_2 center1_3 center1_3 right right right"
    "left1 left1 left1 center2 center2 center2 center2 center2 center2 right right right"
    "left2 left2 left2 center2 center2 center2 center2 center2 center2 right right right"
    "left2 left2 left2 center2 center2 center2 center2 center2 center2 right right right"
    "left3 left3 left3 center3 center3 center3 center3 center3 center3 right right right"
    "left3 left3 left3 center3 center3 center3 center3 center3 center3 right right right";
}
.edit_btn {
  min-height: 70px;
  font-size: 20px;
  min-width: 70px;
  background: burlywood 80%;
  border: #e6a23c;
}
.header1 {
  grid-area: header1;
}


.left1 {
  grid-area: left1;
}

.left2 {
  grid-area: left2;
}

.left3 {
  grid-area: left3;
}

.center1_1 {
  grid-area: center1_1;
}
.center1_2 {
  grid-area: center1_2;
}
.center1_3 {
  grid-area: center1_3;
}

.center2 {
  grid-area: center2;
}

.center3 {
  grid-area: center3;
}

.right {
  grid-area: right;
}
</style>
