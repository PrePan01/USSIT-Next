<template>
  <div class="container">
    <div class="right1">
      <Line></Line>
    </div>
    <div class="right2">
      <Pie></Pie>
    </div>
    <div class="center">
      <Map v-if="mapData.length" title="车流量" :geoCoordMap="heifei" :data="mapData"></Map>
    </div>
    <div class="right3">

      <Zoom v-bind="zoomData"></Zoom>
    </div>
    <div class="left2">
      <Bar v-bind="idData"></Bar>
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
const idData = ref({})
const zoomData = ref({})
const baseTs = process.env.NODE_ENV === "development" ? "/api/get-flow-by-ts/" : "http://101.200.207.137:8000/get-flow-by-ts/";
const baseId = process.env.NODE_ENV === "development" ? "/api/get-flow-by-id/" : "http://101.200.207.137:8000/get-flow-by-id/";
const roll = (interval) => {
  let ts = {
    bus_timestamp: 1644659598
  }
  let id = {
    flow_id: 4
  }
  const requestByTs = async () => {
    let { data } = await utils.requestData(baseTs, ts)
    ts.bus_timestamp += 30
    if (!data.flow) return
    processTimeData(data.flow, ts.bus_timestamp)
  }
  const requestById = async () => {
    let { data } = await utils.requestData(baseId, id)
    id.flow_id += 1
    if (!data.flow) return
    processIdData(data.flow, id.flow_id)
  }
  requestById()
  requestByTs()
  setInterval(() => {
    requestById()
    requestByTs()
  }, interval);
}
const processTimeData = (flow) => {
  let ret = []
  let zoom = {
    categories: [],
    value: [],
    yTitle: '车流量',
    title: '当前时刻车流量分布'
  }
  for (let bus of flow) {
    let tmp = { name: bus.flow_id, value: bus.bus_flow }
    zoom.categories.push(bus.flow_id)
    zoom.value.push(bus.bus_flow)
    ret.push(tmp)
  }
  zoomData.value = zoom
  mapData.value = ret
}
const processIdData = (flow, flow_id) => {
  let ret = {
    categories: [],
    categories2: [],
    value: [],
    value2: [],
    yTitle: '',
    yTitle2: '车流量',
    title: ''
  }
  ret.title = `Road ${flow_id} 历史车流量`
  for (let bus of flow) {
    let tmp = new Date(parseInt(bus.bus_timestamp) * 1000)
    ret.categories.push(tmp.toLocaleString())
    ret.value.push(bus.bus_flow)
  }
  idData.value = ret
}
onMounted(() => {
  roll(10000)
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


