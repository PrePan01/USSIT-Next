<template>
  <div class="container">
     <div class="header1" >
      <n-button type="primary"  icon="n-icon-edit" class="edit_btn"  block  size="large">
        <router-link to="/flow_2">交通路况感知</router-link></n-button
      >
    </div>
    <div class="header2">
      <n-button type="primary" icon="n-icon-edit" block class="edit_btn" size="large">
        <router-link to="/flow_2_1">实时路况感知</router-link>
      </n-button>
    </div>
    <div class="header3">
      <n-button type="primary" icon="n-icon-edit" class="edit_btn" block size="large">
        <router-link to="/flow_2_3">路口流量感知</router-link></n-button
      >
    </div>
    <div class="header4">
      <n-button type="primary" icon="n-icon-edit" class="edit_btn" block size="large">
        <router-link to="/flow_2_4">拥塞时空分析</router-link></n-button
      >
    </div>
    <div class="left">
      <Table :data="mapData" :title1="'过车量'"></Table>
    </div>
    <div class="center">
      <n-space>
        <n-button type="primary" size="large" icon="n-icon-edit" block class="edit_btn2" @click="clickMethod('today')"
          >今天</n-button
        >
        <n-button type="primary" size="large" icon="n-icon-edit" block class="edit_btn2" @click="clickMethod('yesterday')"
          >昨天</n-button
        >
        <n-button type="primary" size="large" icon="n-icon-edit" block class="edit_btn2" @click="clickMethod('sevenDays')"
          >近一周</n-button
        >
        <n-button type="primary" size="large" icon="n-icon-edit" block class="edit_btn2" @click="clickMethod('thirtyDays')"
          >近一个月</n-button
        >
      </n-space>
    </div>
    <div class="center2">
      <Line v-bind="lineData2"></Line>
    </div>
    <div class="center3">
      <Line v-bind="lineData1"></Line>
    </div>
    <div class="right1">
      <All :option="option"></All>
    </div>
    <div class="right2">
      <Line v-bind="lineData3"></Line>
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
import { onMounted, ref } from "vue";
import { NButton, NSpace } from "naive-ui";
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
const center = [117.280338325, 31.84974485];
const pieData = [
  { value: 1048, name: "拥堵" },
  { value: 735, name: "平衡" },
  { value: 580, name: "空闲" },
];
const randArray = (len, min, max) => {
  return Array.from({ length: len }, (v) => Math.random() * (max - min) + min);
};
let click = "today";
const lineTotal = {
  data1: {
    today: randArray(7, 0, 1),
    yesterday: randArray(7, 0, 1),
    sevenDays: randArray(7, 0, 1),
    thirtyDays: randArray(7, 0, 1),
  },
  data2: {
    today: randArray(7, 3, 5),
    yesterday: randArray(7, 3, 5),
    sevenDays: randArray(7, 3, 5),
    thirtyDays: randArray(7, 3, 5),
  },
  data3: {
    today: randArray(7, 80, 130),
    yesterday: randArray(7, 80, 130),
    sevenDays: randArray(7, 80, 130),
    thirtyDays: randArray(7, 80, 130),
  },
};
const refreshLine = () => {
  lineData1.value = {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    value: lineTotal["data1"][click].slice(),
    title: "拥堵指数图",
    title2: "拥堵指数",
  };
  lineData2.value = {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    value: lineTotal["data2"][click].slice(),
    title: "平均车速图",
    title2: "车速",
  };
  lineData3.value = {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    value: lineTotal["data3"][click].slice(),
    title: "BCI",
    title2: "value",
  };
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
// prettier-ignore
const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
];
// prettier-ignore
const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
});
const option = {
  tooltip: {
    position: "top",
  },
  grid: {
    height: "80%",
    top: "10%",
  },
  xAxis: {
    type: "category",
    data: hours,
    splitArea: {
      show: true,
    },
  },
  yAxis: {
    type: "category",
    data: days,
    splitArea: {
      show: true,
    },
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: "horizontal",
    left: "center",
    bottom: "15%",
  },
  series: [
    {
      name: "Punch Card",
      type: "heatmap",
      data: data,
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
const clickMethod = (val) => {
  click = val;
  refreshLine();
};
onMounted(async () => {
  let { data } = await utils.requestData("/mapData2_3");
  mapData.value = [...data.small, ...data.medium, ...data.large];
  refreshLine();
});
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.1fr 0.9fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "header1 header1 header2 header2 header3 header3 header4 header4"
    "left left center center center center center center"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center3 center3 center3 right2 right2 right2"
    "left left center3 center3 center3 right2 right2 right2";
}
.edit_btn {
  min-height: 100px;
  font-size: 30px;
  min-width: 150px;
  background:aquamarine 80%;
  border:#e6a23c;
}
.edit_btn2 {
  min-height: 70px;
  font-size: 30px;
  min-width: 90px;
  background:burlywood 80%;
  border:#e6a23c;
}
.header1 {
  grid-area: header1;
  background-color: red;
}

.header2 {
  grid-area: header2;
  background-color: blue;
}

.header3 {
  grid-area: header3;
  background-color: blue;
}

.header4 {
  grid-area: header4;
  background-color: pink;
}

.left {
  grid-area: left;
  background-color: pink;
}

.center {
  grid-area: center;

}

.center2 {
  grid-area: center2;
  background-color: brown;
}

.center3 {
  grid-area: center3;
  background-color: green;
}

.right1 {
  grid-area: right1;
  background-color: pink;
}

.right2 {
  grid-area: right2;
  background-color: pink;
}
</style>
