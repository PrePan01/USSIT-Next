<template>
  <div class="container">
    <div class="right1">
      <Zoom></Zoom>
    </div>
    <div class="right2">
      <Pie></Pie>
    </div>
    <div class="center">
      <Map v-if="mapData.length" title="车流量" :geoCoordMap="heifei" :data="mapData"></Map>
    </div>
    <div class="right3">
      <Line></Line>
    </div>
    <div class="left2">
      <Bar
        title="当前车流量"
        yTitle="车流量"
        :categories="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
        :value="[10, 11, 11, 12, 13, 14, 21, 19, 10]"
      ></Bar>
    </div>
    <div class="left1">
      <Table :data="mapData"></Table>
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
import heifei from '/src/assets/hei_fei.json'
import { onMounted, ref } from "vue"
echarts.registerTheme('walden', walden)
const mapData = ref([])
const requestTimeData = (interval) => {
  let params = {
    bus_timestamp: 1644659598
  }
  const doOnce = async () => {
    let { data } = await utils.requestData('/api/get-flow-by-ts/', params)
    processTimeData(data.flow)
    params.bus_timestamp += 30
  }
  doOnce()
  setInterval(() => doOnce(), interval);
}
const processTimeData = (flow) => {
  let ret = []
  for (let bus of flow) {
    let tmp = { name: bus.flow_id, value: bus.bus_flow }
    ret.push(tmp)
  }
  mapData.value = ret
}
onMounted(() => {
  requestTimeData(10000)
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
  gap: 10px 20px;
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


