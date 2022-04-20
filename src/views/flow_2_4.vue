<template>
  <div v-if="loading" class="loading">
    <vue-loaders
      name="ball-spin-fade-loader"
      color="#6be6c1"
      scale="2"
    ></vue-loaders>
  </div>
  <div class="container" v-else>
    <div class="header1">
      <n-card>
        <h1>面向智慧出行的城市群智感知验证系统</h1>
      </n-card>
    </div>
    <div class="left">
      <Table :data="mapData" title1="拥堵指数"></Table>
    </div>
    <div class="center1_1">
      <n-card class="edit_btn2" hoverable @click="clickMethod('today')">
        <h2 class="edit_btn">今天</h2>
      </n-card>
    </div>

    <div class="center1_2">
      <n-card class="edit_btn2" hoverable @click="clickMethod('yesterday')">
        <h2 class="edit_btn">昨天</h2>
      </n-card>
    </div>

    <div class="center1_3">
      <n-card class="edit_btn2" hoverable @click="clickMethod('sevenDays')">
        <h2 class="edit_btn">近一周</h2>
      </n-card>
    </div>

    <div class="center1_4">
      <n-card class="edit_btn2" hoverable @click="clickMethod('thirtyDays')">
        <h2 class="edit_btn">近一个月</h2>
      </n-card>
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
import fake from "/src/assets/tai_an_fake.json";
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
const center = [117.280338325, 31.84974485];

const randArray = (len, min, max) => {
  return Array.from({ length: len }, (v) => Math.random() * (max - min) + min);
};
let click = "today";
const lineTotal = {
  data1: {
    today: randArray(7, 1, 2),
    yesterday: randArray(7, 1, 2),
    sevenDays: randArray(7, 1, 2),
    thirtyDays: randArray(7, 1, 2),
  },
  data2: {
    today: randArray(7, 70, 50),
    yesterday: randArray(7, 70, 50),
    sevenDays: randArray(7, 70, 50),
    thirtyDays: randArray(7, 70, 50),
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
    title: "拥堵指数",
    title2: "拥堵指数",
  };
  lineData2.value = {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    value: lineTotal["data2"][click].slice(),
    title: "平均车速",
    title2: "车速",
  };
  lineData3.value = {
    categories: ["8:30", "12:30", "17:30"],
    value: lineTotal["data3"][click].slice(),
    title: "热门拥堵时段",
    title2: "value",
  };
  for (let item of fake) {
    item.value = Math.random() * (2 - 1 + 1) + 1;
  }
  mapData.value = fake;
};
const hours = [
  "12a",
  "4a",
  "8a",
  "12p",
  "4p",
  "8p",
];
// prettier-ignore
const days = [
    '星期六', '星期五', '星期四',
    '星期三', '星期二', '星期一', '星期日'
];
const data = [[0, 0, 2.9], [0, 1, 2.0], [0, 2, 1.7], [0, 3, 2.5], [0, 4, 1.4], [0, 5, 1.2], [1, 0, 1.8], [1, 1, 2.8], [1, 2, 1.7], [1, 3, 2.2], [1, 4, 1.1], [1, 5, 1.5], [2, 0, 1.2], [2, 1, 2.8], [2, 2, 1.1], [2, 3, 2.6], [2, 4, 1.8], [2, 5, 2.0], [3, 0, 2.1], [3, 1, 2.3], [3, 2, 1.0], [3, 3, 2.2], [3, 4, 1.5], [3, 5, 2.4], [4, 0, 1.8], [4, 1, 2.6], [4, 2, 2.0], [4, 3, 2.1], [4, 4, 1.5], [4, 5, 1.2], [5, 0, 2.8], [5, 1, 1.9], [5, 2, 2.0], [5, 3, 2.3], [5, 4, 1.0], [5, 5, 2.0], [6, 0, 1.2], [6, 1, 2.0], [6, 2, 1.0], [6, 3, 2.0], [6, 4, 1.4], [6, 5, 2.3], ]
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

const loading = ref(true);
onMounted(async () => {
  // let { data } = await utils.requestData("/mapData2_3");
  // mapData.value = [...data.small, ...data.medium, ...data.large];
  // refreshLine();
  for (let item of fake) {
    item.value = Math.random() * (2 - 1 + 1) + 1;
  }
  mapData.value = fake;
  setTimeout(() => {
    loading.value = false;
    console.log(loading.value);
  }, 2000);
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
    "header1 header1 header1 header1 header1 header1 header1 header1"
    "left left center1_1 center1_2 center1_3 center1_4 center1_5 center1_6"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center3 center3 center3 right2 right2 right2"
    "left left center3 center3 center3 right2 right2 right2";
}
.edit_btn {
  font-size: 20px;
}
.edit_btn2 {
  min-height: 75%;
  height: 75%;
  font-size: 800px;

  min-width: 70%;
  width: 70%;
  background: rgb(16, 78, 193) 80%;
}

.header1 {
  grid-area: header1;
}

.left {
  grid-area: left;
}

.center {
  grid-area: center;
}

.center2 {
  grid-area: center2;
}

.center3 {
  grid-area: center3;
}

.right1 {
  grid-area: right1;
}

.right2 {
  grid-area: right2;
}
</style>
