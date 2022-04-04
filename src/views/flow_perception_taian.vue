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
        :geoCoordMap="taian"
        :data="mapData"
        :center="center"
        :zoom="2"
        @reportData="changeSelect"
      ></Map>
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
import * as echarts from 'echarts'
import utils from '/src/utils/index.js'
// Theme Config
import walden from '/src/assets/walden.json'
import taian from '/src/assets/tai_an.json'
import { onMounted, ref } from "vue"
echarts.registerTheme('walden', walden)
const nowChose = ref({})
const mapData = ref([])
const idData = ref({})
const zoomData = ref({})
const lineData = ref({})
const pieData = ref([])
const TotalData = [mapData, idData, zoomData, lineData, pieData]
const base = process.env.NODE_ENV === "development" ? "/api" : "http://101.200.207.137:8000";
const center = [117.18273050985574, 36.179513092993666]
const city = 'ta'
const changeSelect = (data) => utils.changeSelect(TotalData, base, `/${city}-flow-by-id/`, data)
onMounted(() => {
  utils.requestApi(TotalData, base, city, 1641914107, 10000)
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
</style>
