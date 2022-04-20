<template>
  <div v-if="loading" class="loading">
    <vue-loaders name="ball-spin-fade-loader" color="#6be6c1" scale="2"></vue-loaders>
  </div>
  <div class="container" v-else>
    <div class="header1">
      <n-card>
        <h1>面向智慧出行的城市群智感知验证系统</h1>
      </n-card>
    </div>
    <div class="left1"><Pie :data="pieData" title="当前流量情况"></Pie></div>
    <div class="left2"><Table :data="mapData" :title1="'过车量'"></Table></div>
    <div class="left3"><n-card><h1>路网拥堵态势</h1></n-card></div>
   
    <div class="left4"><n-card class="edtn1">
      <h1 class="edtn_2">
        路网拥堵里程总占比
          <h2 class="edtn_3">2.9%</h2> 
      </h1></n-card></div>

        <div class="left5"><n-card class="edtn2">
          <h1 class="edtn_4">路网平均车速
            <h2 class="edtn_5">29.6km/h</h2>
            </h1></n-card></div>
    <div class="center">
      <Map
        v-if="mapData.length"
        title="车流量"
        :geoCoordMap="taian"
        :data="mapData"
        :center="center"
        :zoom="2"
        :roadmap="roadmap"
        @reportData="changeSelect"
      ></Map>
    </div>
    <div class="right">
      <Table :data="mapData" :title1="'拥堵指数'"></Table>
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
import fake from "/src/assets/tai_an_fake.json";
import roadmap from "/src/assets/taian_roadnet_v3.json";
import { onMounted, ref } from "vue";
import { NButton, NSpace, NCard } from "naive-ui";
echarts.registerTheme("walden", walden);
const clickData = ref({});
const idData = ref({});
const zoomData = ref({});
const gaugeDataPre = ref({});
const gaugeDataCur = ref({});
const mapData = ref([]);
const center = [117.12932143951308, 36.19724062736381];
const pieData = [
  { value: 104, name: "拥堵", itemStyle: { color: "#ee0e3b" } },
  { value: 325, name: "繁忙", itemStyle: { color: "#f9d00b" } },
  { value: 999, name: "畅通", itemStyle: { color: "#06c674" } },
];
const loading = ref(true);
mapData.value = fake;
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
    console.log(loading.value);
  }, 2000);
});
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "header1 header1 header1 header1 header1 header1 header1 header1 header1 header1 header1"
    "left1 left1 left1 left1 center center center center right right right"
    "left1 left1 left1 left1 center center center center right right right"
    "left1 left1 left1 left1 center center center center right right right"
    "left3 left3 left3 left3 center center center center right right right"
    "left4 left4 left5 left5 center center center center right right right"
    "left2 left2 left2 left2 center center center center right right right"
    "left2 left2 left2 left2 center center center center right right right"
    "left2 left2 left2 left2 center center center center right right right"
    "left2 left2 left2 left2 center center center center right right right";
}
.edit_btn {
  min-height: 100px;
  font-size: 30px;
  min-width: 150px;
  background: burlywood 80%;
  border: #e6a23c;
}
.edtn1 {

  background: rgb(3, 67, 3);

}
.edtn2 {

  background: rgb(158, 117, 6);

}
.edtn_2 {
  min-height: 80px;
  font-size: 23px;
  min-width: 100px;
  color: aquamarine;
  margin-top: 20px;
}
.edtn_3 {

  font-size: 20px;
 
  color: aquamarine;
  margin-top: 10px;
  margin-left: 80px;
}
.edtn_4 {
  min-height: 80px;
  font-size: 23px;
  min-width: 100px;
  color: yellow;
  margin-top: 20px;
}
.edtn_5 {

  font-size: 20px;
 
  color: yellow;
  margin-top: 10px;
  margin-left: 20px;
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

.left4 {
  grid-area: left4;
}

.left5 {
  grid-area: left5;
}
.left3 {
  grid-area: left3;
}

.center {
  grid-area: center;
}

.right {
  grid-area: right;
}

</style>
