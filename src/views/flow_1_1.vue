<template>
  <div class="container">
    <div class="header-1">
      <n-card>
        <h1>面向智慧出行的城市群智感知验证系统</h1>
      </n-card>
    </div>
    <div class="left1"><Pie :data="pieData"></Pie></div>
    <div class="left2"><Line v-bind="lineData1"></Line></div>
    <div class="left3"><Table :data="mapData" :title1="'过车量'"></Table></div>
    <div class="center1">
      <n-space>
        <n-button type="primary" size="large">
          <router-link to="flow_2">交通状况感知</router-link>
        </n-button>
        <n-button type="primary" size="large">
          <router-link to="flow_3">交通实时预测</router-link>
        </n-button>
        <n-button type="primary" size="large">
          <router-link to="flow_4_1">交通调控引导</router-link>
        </n-button>
      </n-space>
    </div>
    <div class="center2">
      <Map
        v-if="mapData.length"
        title="车流量"
        :geoCoordMap="hefei"
        :data="mapData"
        :center="center"
        :zoom="2"
        @reportData="changeSelect"
      ></Map>
    </div>
    <div class="center3"><Pie :data="pieData2"></Pie></div>
    <div class="center4"></div>
    <div class="right1">
      <Table :data="mapData3" :title1="'数据接入'"></Table>
    </div>
    <div class="right2">
      <Table :data="mapData2" :title1="'数据共享'"></Table>
    </div>
    <div class="right3"><Pie :data="pieData3"></Pie></div>
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
const mapData2 = ref([]);
const mapData3 = ref([]);
const center = [117.280338325, 31.84974485];
const pieData = [
  { value: 1048, name: "拥堵" },
  { value: 735, name: "平衡" },
  { value: 580, name: "空闲" },
];
const pieData2 = [
  { value: 80, name: "东西" },
  { value: 123, name: "南北" },
  { value: 144, name: "东南向西北" },
  { value: 86, name: "东北向西南" },
];

const pieData3 = [
  { value: 0.13, name: "监控" },
  { value: 0.21, name: "云服务器" },
  { value: 0.28, name: "物理记录" },
  { value: 0.38, name: "实地调查" },
];
mapData.value = [
  {
    name: 74,
    value: 32,
  },
  {
    name: 119,
    value: 32,
  },
  {
    name: 91,
    value: 31,
  },
  {
    name: 64,
    value: 28,
  },
  {
    name: 72,
    value: 25,
  },
  {
    name: 130,
    value: 24,
  },
  {
    name: 29,
    value: 23,
  },
  {
    name: 57,
    value: 22,
  },
  {
    name: 50,
    value: 21,
  },
  {
    name: 63,
    value: 21,
  },
  {
    name: 99,
    value: 21,
  },
  {
    name: 37,
    value: 20,
  },
  {
    name: 20,
    value: 19,
  },
  {
    name: 97,
    value: 19,
  },
  {
    name: 122,
    value: 19,
  },
  {
    name: 123,
    value: 19,
  },
  {
    name: 28,
    value: 18,
  },
  {
    name: 61,
    value: 18,
  },
  {
    name: 82,
    value: 18,
  },
  {
    name: 94,
    value: 18,
  },
  {
    name: 221,
    value: 17,
  },
  {
    name: 83,
    value: 15,
  },
  {
    name: 149,
    value: 15,
  },
  {
    name: 41,
    value: 14,
  },
  {
    name: 214,
    value: 14,
  },
  {
    name: 234,
    value: 14,
  },
  {
    name: 78,
    value: 13,
  },
  {
    name: 109,
    value: 13,
  },
  {
    name: 111,
    value: 13,
  },
  {
    name: 49,
    value: 12,
  },
  {
    name: 170,
    value: 12,
  },
  {
    name: 211,
    value: 12,
  },
  {
    name: 53,
    value: 11,
  },
  {
    name: 71,
    value: 11,
  },
  {
    name: 150,
    value: 11,
  },
  {
    name: 216,
    value: 11,
  },
  {
    name: 67,
    value: 10,
  },
  {
    name: 88,
    value: 10,
  },
  {
    name: 107,
    value: 10,
  },
  {
    name: 125,
    value: 10,
  },
  {
    name: 230,
    value: 10,
  },
  {
    name: 2,
    value: 9,
  },
  {
    name: 31,
    value: 9,
  },
  {
    name: 65,
    value: 9,
  },
  {
    name: 87,
    value: 9,
  },
  {
    name: 95,
    value: 9,
  },
  {
    name: 135,
    value: 9,
  },
  {
    name: 168,
    value: 9,
  },
  {
    name: 169,
    value: 9,
  },
  {
    name: 203,
    value: 9,
  },
  {
    name: 55,
    value: 8,
  },
  {
    name: 66,
    value: 8,
  },
  {
    name: 89,
    value: 8,
  },
  {
    name: 96,
    value: 8,
  },
  {
    name: 110,
    value: 8,
  },
  {
    name: 171,
    value: 8,
  },
  {
    name: 172,
    value: 8,
  },
  {
    name: 213,
    value: 8,
  },
  {
    name: 23,
    value: 7,
  },
  {
    name: 56,
    value: 7,
  },
  {
    name: 81,
    value: 7,
  },
  {
    name: 100,
    value: 7,
  },
  {
    name: 108,
    value: 7,
  },
  {
    name: 121,
    value: 7,
  },
  {
    name: 139,
    value: 7,
  },
  {
    name: 167,
    value: 7,
  },
  {
    name: 176,
    value: 7,
  },
  {
    name: 180,
    value: 7,
  },
  {
    name: 200,
    value: 7,
  },
  {
    name: 222,
    value: 7,
  },
  {
    name: 9,
    value: 6,
  },
  {
    name: 62,
    value: 6,
  },
  {
    name: 102,
    value: 6,
  },
  {
    name: 106,
    value: 6,
  },
  {
    name: 112,
    value: 6,
  },
  {
    name: 194,
    value: 6,
  },
  {
    name: 196,
    value: 6,
  },
  {
    name: 206,
    value: 6,
  },
  {
    name: 14,
    value: 5,
  },
  {
    name: 42,
    value: 5,
  },
  {
    name: 47,
    value: 5,
  },
  {
    name: 60,
    value: 5,
  },
  {
    name: 80,
    value: 5,
  },
  {
    name: 85,
    value: 5,
  },
  {
    name: 93,
    value: 5,
  },
  {
    name: 113,
    value: 5,
  },
  {
    name: 115,
    value: 5,
  },
  {
    name: 148,
    value: 5,
  },
  {
    name: 163,
    value: 5,
  },
  {
    name: 173,
    value: 5,
  },
  {
    name: 188,
    value: 5,
  },
  {
    name: 1,
    value: 4,
  },
  {
    name: 8,
    value: 4,
  },
  {
    name: 21,
    value: 4,
  },
  {
    name: 32,
    value: 4,
  },
  {
    name: 68,
    value: 4,
  },
  {
    name: 70,
    value: 4,
  },
  {
    name: 116,
    value: 4,
  },
  {
    name: 118,
    value: 4,
  },
  {
    name: 140,
    value: 4,
  },
  {
    name: 142,
    value: 4,
  },
  {
    name: 161,
    value: 4,
  },
  {
    name: 175,
    value: 4,
  },
  {
    name: 208,
    value: 4,
  },
  {
    name: 220,
    value: 4,
  },
  {
    name: 11,
    value: 3,
  },
  {
    name: 15,
    value: 3,
  },
  {
    name: 39,
    value: 3,
  },
  {
    name: 51,
    value: 3,
  },
  {
    name: 59,
    value: 3,
  },
  {
    name: 77,
    value: 3,
  },
  {
    name: 155,
    value: 3,
  },
  {
    name: 162,
    value: 3,
  },
  {
    name: 164,
    value: 3,
  },
  {
    name: 179,
    value: 3,
  },
  {
    name: 183,
    value: 3,
  },
  {
    name: 190,
    value: 3,
  },
  {
    name: 195,
    value: 3,
  },
  {
    name: 197,
    value: 3,
  },
  {
    name: 205,
    value: 3,
  },
  {
    name: 227,
    value: 3,
  },
  {
    name: 229,
    value: 3,
  },
  {
    name: 233,
    value: 3,
  },
  {
    name: 242,
    value: 3,
  },
  {
    name: 18,
    value: 2,
  },
  {
    name: 27,
    value: 2,
  },
  {
    name: 48,
    value: 2,
  },
  {
    name: 84,
    value: 2,
  },
  {
    name: 128,
    value: 2,
  },
  {
    name: 134,
    value: 2,
  },
  {
    name: 153,
    value: 2,
  },
  {
    name: 174,
    value: 2,
  },
  {
    name: 182,
    value: 2,
  },
  {
    name: 185,
    value: 2,
  },
  {
    name: 186,
    value: 2,
  },
  {
    name: 187,
    value: 2,
  },
  {
    name: 192,
    value: 2,
  },
  {
    name: 202,
    value: 2,
  },
  {
    name: 212,
    value: 2,
  },
  {
    name: 215,
    value: 2,
  },
  {
    name: 217,
    value: 2,
  },
  {
    name: 44,
    value: 1,
  },
  {
    name: 92,
    value: 1,
  },
  {
    name: 124,
    value: 1,
  },
  {
    name: 165,
    value: 1,
  },
  {
    name: 178,
    value: 1,
  },
  {
    name: 181,
    value: 1,
  },
  {
    name: 193,
    value: 1,
  },
  {
    name: 198,
    value: 1,
  },
  {
    name: 199,
    value: 1,
  },
  {
    name: 210,
    value: 1,
  },
  {
    name: 223,
    value: 1,
  },
  {
    name: 225,
    value: 1,
  },
  {
    name: 236,
    value: 1,
  },
  {
    name: 237,
    value: 1,
  },
  {
    name: 5,
    value: 0,
  },
  {
    name: 10,
    value: 0,
  },
  {
    name: 13,
    value: 0,
  },
  {
    name: 24,
    value: 0,
  },
  {
    name: 46,
    value: 0,
  },
  {
    name: 52,
    value: 0,
  },
  {
    name: 58,
    value: 0,
  },
  {
    name: 79,
    value: 0,
  },
  {
    name: 86,
    value: 0,
  },
  {
    name: 98,
    value: 0,
  },
  {
    name: 120,
    value: 0,
  },
  {
    name: 127,
    value: 0,
  },
  {
    name: 132,
    value: 0,
  },
  {
    name: 133,
    value: 0,
  },
  {
    name: 138,
    value: 0,
  },
  {
    name: 141,
    value: 0,
  },
  {
    name: 143,
    value: 0,
  },
  {
    name: 147,
    value: 0,
  },
  {
    name: 151,
    value: 0,
  },
  {
    name: 154,
    value: 0,
  },
  {
    name: 166,
    value: 0,
  },
  {
    name: 177,
    value: 0,
  },
  {
    name: 189,
    value: 0,
  },
  {
    name: 204,
    value: 0,
  },
  {
    name: 218,
    value: 0,
  },
  {
    name: 219,
    value: 0,
  },
  {
    name: 224,
    value: 0,
  },
  {
    name: 226,
    value: 0,
  },
  {
    name: 228,
    value: 0,
  },
  {
    name: 231,
    value: 0,
  },
  {
    name: 232,
    value: 0,
  },
  {
    name: 238,
    value: 0,
  },
  {
    name: 239,
    value: 0,
  },
  {
    name: 240,
    value: 0,
  },
  {
    name: 241,
    value: 0,
  },
];
mapData2.value = [
  {
    name: "1",
    value: 145,
  },
  {
    name: "2",
    value: 143,
  },
  {
    name: "3",
    value: 143,
  },
  {
    name: "4",
    value: 140,
  },
  {
    name: "5",
    value: 140,
  },
  {
    name: "6",
    value: 135,
  },
  {
    name: "7",
    value: 135,
  },
  {
    name: "8",
    value: 135,
  },
  {
    name: "9",
    value: 130,
  },
  {
    name: "10",
    value: 121,
  },
  {
    name: "11",
    value: 120,
  },
  {
    name: "12",
    value: 118,
  },
  {
    name: "13",
    value: 105,
  },
  {
    name: "14",
    value: 101,
  },
  {
    name: "15",
    value: 92,
  },
  {
    name: "16",
    value: 79,
  },
  {
    name: "17",
    value: 63,
  },
  {
    name: "18",
    value: 50,
  },
  {
    name: "19",
    value: 21,
  },
  {
    name: "20",
    value: 9,
  },
  {
    name: "21",
    value: 0,
  },
  {
    name: "22",
    value: 0,
  },
];
mapData3.value = [
  {
    name: "1",
    value: "8.13万量",
  },
  {
    name: "2",
    value: "3168.8万套",
  },
  {
    name: "3",
    value: "81.25万套",
  },
  {
    name: "4",
    value: "1.03万条",
  },
  {
    name: "5",
    value: "9.43万套",
  },
  {
    name: "6",
    value: "1604.6万套",
  },
];
lineData1.value = {
  categories: [
    "00:00",
    "1:25",
    "2:50",
    "4:15",
    "5:40",
    "7:05",
    "8:30",
    "9:55",
    "11:20",
    "12:45",
    "14:10",
    "15:35",
    "17:00",
    "18:25",
    "19:50",
    "21:15",
    "22:40",
    "23:55",
  ],
  value: [
    2.0, 2.2, 3.1, 3.4, 3.0, 3.0, 3.2, 7.1, 8.8, 9.5, 11.5, 12.0, 10.9, 9.9,
    11.1, 7.5, 7.3, 6.8,
  ],
  title: "交通流量趋势图",
  title2: "交通流量趋势",
};
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.1fr 0.9fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "header-1 header-1 header-1 header-1 header-1 header-1 header-1 header-1"
    "left1 left1 center1 center1 center1 center1 right1 right1"
    "left1 left1 center2 center2 center2 center2 right1 right1"
    "left2 left2 center2 center2 center2 center2 right2 right2"
    "left2 left2 center2 center2 center2 center2 right2 right2"
    "left3 left3 center3 center3 center4 center4 right3 right3"
    "left3 left3 center3 center3 center4 center4 right3 right3";
}
.edit_btn {


font-size: 30px;



display: flex;

align-items: center;

justify-content: center;

height: 31px;
margin-left: 380px;
margin-top: 18px;

color: #87878a;

white-space: normal;
}
.header-1 {
  grid-area: header-1;
 background-color: bisque;
}

.left1 {
  grid-area: left1;
  background-color: blue;
}

.left2 {
  grid-area: left2;
  background-color: green;
}

.left3 {
  grid-area: left3;
  background-color: yellow;
}

.center1 {
  grid-area: center1;
  display:flex;
}

.center2 {
  grid-area: center2;

}

.center3 {
  grid-area: center3;
   background-color: gray;
}

.center4 {
  grid-area: center4;

}

.right1 {
  grid-area: right1;
   background-color: gray;
}

.right2 {
  grid-area: right2;
   background-color: gray;
}

.right3 {
  grid-area: right3;
   background-color: gray;
}
</style>
