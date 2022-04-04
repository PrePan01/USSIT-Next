<template>
  <div class="container">
    <div class="right1">
      <Line v-bind="lineData"></Line>
    </div>
    <div class="right2">
      <Pie :data="pieData"></Pie>
    </div>
    <div class="center">
      <Map
        v-if="mapData.length"
        title="车流量"
        :geoCoordMap="hefei"
        :data="mapData"
        :center="center"
        :zoom="100"
        @reportData="changeSelect"
      ></Map>

      <n-card hoverable closable  class="float-card" v-if="clickData.name" @close="handleClose">
        <Gauge v-bind="gaugeDataCur"></Gauge>
        <Text :text="`Road ${clickData.name}`"></Text>
        <Gauge v-bind="gaugeDataPre"></Gauge>
      </n-card>
    </div>
    <div class="right3">
      <Zoom v-bind="zoomData"></Zoom>
    </div>
    <div class="left2">
      <Bar v-bind="idData"></Bar>
    </div>
    <div class="left1">
      <Table :data="mapData" @reportData="changeSelect"></Table>
    </div>
  </div>
</template>

<script setup>
import Pie from "/src/components/pie.vue"
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
import { NCard } from 'naive-ui'
echarts.registerTheme('walden', walden)
const clickData = ref({})
const mapData = ref([])
const idData = ref({})
const zoomData = ref({})
const lineData = ref({})
const pieData = ref([])
const gaugeDataPre = ref({})
const gaugeDataCur = ref({})
const TotalData = [mapData, idData, zoomData, lineData, pieData, gaugeDataPre, gaugeDataCur, clickData]
const base = process.env.NODE_ENV === "development" ? "/api" : "http://101.200.207.137:8000";
const center = [117.280338325, 31.84974485]
const city = 'hf'
const changeSelect = (data) => utils.changeSelect(TotalData, base, city, data)
const handleClose = () => clickData.value = {}
onMounted(() => {
  utils.requestApi(TotalData, base, city, 1644659576, 10000)
})
</script>

<style>
body {
  margin: 0px;
  height: 100vh;
  box-sizing: border-box;
  padding: 10px;
}
.container {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "left1 left1 center center center center right1 right1"
    "left1 left1 center center center center right1 right1"
    "left1 left1 center center center center right2 right2"
    "left1 left1 center center center center right2 right2"
    "left2 left2 left2 left2 right3 right3 right3 right3"
    "left2 left2 left2 left2 right3 right3 right3 right3";
}

.right1 {
  grid-area: right1;
}

.right2 {
  grid-area: right2;
}

.center {
  grid-area: center;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  border: none;
}

.right3 {
  grid-area: right3;
}

.left2 {
  grid-area: left2;
}

.left1 {
  grid-area: left1;
}

.float-card {
  position: absolute;
  height: 40%;
  transform: translateY(45%);
  bottom: 0;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  border: none !important;
}
.float-card:hover {
  height: 40%;
  transform: translateY(0);
  transition: all 0.2s ease-in-out;
}
</style>
