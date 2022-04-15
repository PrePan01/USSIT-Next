<template>
  <div class="container">
    <div class="header-1">
      <n-card hoverable>
        <router-link to="/flow_2">交通路况感知</router-link></n-card
      >
    </div>
    <div class="header-2">
      <n-card hoverable>
        <router-link to="/flow_2_1">实时路况感知</router-link>
      </n-card>
    </div>
    <div class="header-3">
      <n-card class="active">
        <router-link to="/flow_2_3">路口流量感知</router-link></n-card
      >
    </div>
    <div class="header-4">
      <n-card hoverable>
        <router-link to="/flow_2_4">拥塞时空分析</router-link></n-card
      >
    </div>
    <div class="left-1">
      <Pie :data="pieData" title="当前流量情况"></Pie>
    </div>
    <div class="left-2">
      <Table :data="mapData" :title1="'过车量'" :geoCoordMap="he_fei"></Table>
    </div>
    <div class="center">
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
    <div class="right-1">
      <Table :data="mapData" :title1="'过车量'"></Table>
    </div>
    <div class="right-2">
      <Line v-bind="lineData"></Line>
    </div>
  </div>
</template>

<script setup>
import Pie from "/src/components/pie.vue";
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
import { onMounted, ref } from "vue";
import { NButton, NCard } from "naive-ui";
import fake from "/src/assets/tai_an_fake.json";
echarts.registerTheme("walden", walden);
const clickData = ref({});
const idData = ref({});
const zoomData = ref({});
const lineData = ref({});
const gaugeDataPre = ref({});
const gaugeDataCur = ref({});
const mapData = ref([]);
const center = [117.12932143951308, 36.19724062736381];
const pieData = [
  { value: 160, name: "拥堵" },
  { value: 483, name: "平衡" },
  { value: 961, name: "空闲" },
];
lineData.value = {
  categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  value: [820, 932, 901, 934, 1290, 1330, 1320],
  title: "重构准确率",
  title2: "准确率",
};
for (let item of fake) {
  item.value = Math.floor(Math.random() * (1000 - 10 + 1) + 10)
}
mapData.value = fake;
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "header-1 header-1 header-2 header-2 header-3 header-3 header-4 header-4"
    "left-1 left-1 center center center center right-1 right-1"
    "left-1 left-1 center center center center right-1 right-1"
    "left-2 left-2 center center center center right-1 right-1"
    "left-2 left-2 center center center center right-2 right-2"
    "left-2 left-2 center center center center right-2 right-2";
}

.edit_btn {
  min-height: 100px;
  font-size: 30px;
  min-width: 150px;
  background: #e6a23c 80%;
  border: #e6a23c;
}
.header-1 {
  grid-area: header-1;
}

.header-2 {
  grid-area: header-2;
}

.header-3 {
  grid-area: header-3;
}

.header-4 {
  grid-area: header-4;
}

.left-1 {
  grid-area: left-1;
}

.left-2 {
  grid-area: left-2;
}

.center {
  grid-area: center;
}

.right-1 {
  grid-area: right-1;
}

.right-2 {
  grid-area: right-2;
}
</style>
