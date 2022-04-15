<template>
  <div class="container">
    <div class="header1">
      <n-card hoverable
        ><router-link to="flow_3">交通实时预测</router-link></n-card
      >
    </div>
    <div class="header2">
      <n-card hoverable>
        <router-link to="flow_perception_hefei">路况预测</router-link>
      </n-card>
    </div>
    <div class="header3">
      <n-card hoverable class="active"
        ><router-link to="flow_3_1">路口流量预测</router-link></n-card
      >
    </div>
    <div class="header4">
      <n-card hoverable
        ><router-link to="flow_3_4">车辆轨迹预测</router-link></n-card
      >
    </div>
    <div class="header5">
      <n-card hoverable
        ><router-link to="flow_3_5">公交流量预测</router-link></n-card
      >
    </div>
    <div class="header6">
      <n-card hoverable
        ><router-link to="flow_3_2">事故预测</router-link></n-card
      >
    </div>
    <div class="left1">
      <Pie :data="pieData" title="车流量情况"></Pie>
    </div>
    <div class="left2">
      <Line v-bind="lineData1"></Line>
    </div>
    <div class="left3">
      <Line v-bind="lineData2"></Line>
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
      <Table :data="mapData" :title1="'过车量'"></Table>
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
import { onMounted, ref } from "vue";
import { NButton, NSpace, NCard } from "naive-ui";
echarts.registerTheme("walden", walden);
const clickData = ref({});
const idData = ref({});
const zoomData = ref({});
const lineData1 = ref({});
const lineData2 = ref({});
const lineData3 = ref({});
const gaugeDataPre = ref({});
const gaugeDataCur = ref({});
const mapData = ref([]);
const center = [117.12932143951308,36.19724062736381];
const pieData = [
  { value: 1048, name: "拥堵" },
  { value: 735, name: "平衡" },
  { value: 580, name: "空闲" },
];
for (let item of fake) {
  item.value = Math.round(Math.random() * (500 - 30 + 1) + 30);
}
mapData.value = fake;
lineData1.value = {
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  value: [2.0, 2.2, 9.1, 3.4, 12.0, 3.0, 3.2],
  title: "拥堵指数图",
  title2: "拥堵指数",
};
lineData2.value = {
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  value: [80, 92, 91, 34, 290, 130, 132],
  title: "平均车速图",
  title2: "车速",
};
lineData3.value = {
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  value: [80, 92, 91, 34, 290, 130, 132],
  title: "热门拥堵时段",
  title2: "拥堵时段",
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
    "header1 header1 header2 header2 header3 header3 header4 header4 header5 header5 header6 header6"
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

.header2 {
  grid-area: header2;
}

.header3 {
  grid-area: header3;
}

.header4 {
  grid-area: header4;
}

.header5 {
  grid-area: header5;
}

.header6 {
  grid-area: header6;
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
