<template>
  <div class="container">
    <div class="header-1">
      <n-card>
        <h1>面向智慧出行的城市群智感知验证系统</h1>
      </n-card>
    </div>
    <div class="left-1">
      <Pie :data="pieData" title="当前流量情况"></Pie>
    </div>
    <div class="left-2">
      <Table :data="mapData.slice(0,5)" :title1="'过车量'" :geoCoordMap="he_fei"></Table>
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
     <div class="right-0">
      <n-card>卡口预测</n-card>
     
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
  { value: 160, name: "拥堵",itemStyle:{color:'#ee0e3b'} },
  { value: 483, name: "平衡",itemStyle:{color:'#f9d00b'} },
  { value: 961, name: "空闲" ,itemStyle:{color:'#06c674'}},
];
lineData.value = {
  categories: ["一", "二", "三", "四", "五", "六", "日"],
  value: [0.8, 0.88, 0.76, 0.7567, 0.8172, 0.69, 0.8390],
  title: "预测准确率",
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
    "header-1 header-1 header-1 header-1 header-1 header-1 header-1 header-1"
    "left-1 left-1 center center center center right-0 right-0"
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


.left-1 {
  grid-area: left-1;
}

.left-2 {
  grid-area: left-2;
}

.center {
  grid-area: center;
}
.right-0 {
  grid-area: right-0;
}

.right-1 {
  grid-area: right-1;
}

.right-2 {
  grid-area: right-2;
}
</style>
