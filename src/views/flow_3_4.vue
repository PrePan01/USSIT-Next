<template>
  <div class="container">
    <div class="left1">
      <Table :data="mapData" :title1="'路段状态'"></Table>
    </div>
    <div class="center2">
      <Zoom v-bind="zoomData" ></Zoom>
    </div>
    <div class="center3">
      <Map
        v-if="mapData.length"
        title="车流量"
        :geoCoordMap="hefei"
        :data="mapData"
        :center="center"
        :zoom="50"
        @reportData="changeSelect"
      ></Map>
    </div>
  </div>
</template>

<script setup>
//3-4页面不太会设计，柱状图不会画，所以左侧设计成表格了，然后就是右侧的map采用了吴哥的map。
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
import { onMounted, ref } from "vue";
import { NButton, NSpace } from "naive-ui";
echarts.registerTheme("walden", walden);
const clickData = ref({});
const idData = ref({});
const zoomData = ref({});
const gaugeDataPre = ref({});
const gaugeDataCur = ref({});
const mapData = ref([]);
const center = [117.280338325, 31.84974485];

onMounted(async () => {
  let { data } = await utils.requestData("/mapData2_3");
  mapData.value = [...data.small, ...data.medium, ...data.large];
  let zoom = {
    categories: [],
    value: [],
    yTitle: "车流量",
    title: "当前时刻车流量分布",
  };
  for (let item of mapData.value) {
    zoom.categories.push(item.name);
    zoom.value.push(item.value);
  }
  zoomData.value = zoom
});
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.1fr 0.9fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "left1 left1 left1 left1 center2 center2 center2 center2 center2 center2 center2 center2"
    "left1 left1 left1 left1 center2 center2 center2 center2 center2 center2 center2 center2"
    "left1 left1 left1 left1 center2 center2 center2 center2 center2 center2 center2 center2"
    "left1 left1 left1 left1 center3 center3 center3 center3 center3 center3 center3 center3"
    "left1 left1 left1 left1 center3 center3 center3 center3 center3 center3 center3 center3"
    "left1 left1 left1 left1 center3 center3 center3 center3 center3 center3 center3 center3"
    "left1 left1 left1 left1 center3 center3 center3 center3 center3 center3 center3 center3";
}

.left1 {
  grid-area: left1;
}

.center2 {
  grid-area: center2;
}

.center3 {
  grid-area: center3;
}
</style>
