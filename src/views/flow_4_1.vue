<template>
  <!--<iframe src="http://charge.lawted.tech" width="100%" height="100%">
  </iframe>-->

  <!--左侧容器-->

  <div class="leftContainer">
    <!--标题-->
    <div class="mainTitle">
      基础设施规划
    </div>
    <!--充电桩配置信息-->
    <div class="result-info-title">
      充电桩配置信息
    </div>
    <div>
      <div class="chargerConfig">
        <span class="chargerConfig-title">城市</span>
        <n-dropdown trigger="hover" :options="cityOptions" @select="changeCity">
          <n-button class="chargerConfig-options">
            <div style="display: flex;margin-top: 5px">
              <span style="display: inline-block;width: 110px">{{ city }}</span>
              <img src="../assets/options.png" alt="" style="width: 18px">
            </div>
          </n-button>
        </n-dropdown>
      </div>
      <div class="chargerConfig">
        <span class="chargerConfig-title">预算档位</span>
        <n-dropdown trigger="hover" :options="budgetOptions" @select="changeBudget">
          <n-button class="chargerConfig-options">
            <div style="display: flex;margin-top: 5px">
              <span style="display: inline-block;width: 110px">{{ budget }}</span>
              <img src="../assets/options.png" alt="" style="width: 18px">
            </div>
          </n-button>
        </n-dropdown>
      </div>
      <div class="chargerConfig">
        <span class="chargerConfig-title">方法</span>
        <n-dropdown trigger="hover" :options="wayOptions" @select="changeWay">
          <n-button class="chargerConfig-options">
            <div style="display: flex;margin-top: 5px">
              <span style="display: inline-block;width: 110px">{{ way }}</span>
              <img src="../assets/options.png" alt="" style="width: 18px">
            </div>
          </n-button>
        </n-dropdown>
      </div>
    </div>

    <!--当前节点信息-->
    <div class="result-info-title">
      当前节点信息
    </div>
    <div class="charger-info" v-if="chargerId">
      <div class="charger-info-item">
        <span class="charger-info-title">充电桩ID</span>
        <span class="charger-info-number" style="color: rgb(62,142,255)">#{{ chargerId }}</span>
      </div>
      <div class="charger-info-item">
        <span class="charger-info-title">快充桩数</span>
        <span class="charger-info-number" style="color: rgb(39,174,96)">{{ fastCharger }}</span>
      </div>
      <div class="charger-info-item">
        <span class="charger-info-title">慢充桩数</span>
        <span class="charger-info-number" style="color: rgb(255,66,66)">{{ slowCharger }}</span>
      </div>
      <div class="charger-info-item">
        <span class="charger-info-title">路段名称</span>
        <span class="charger-info-number roadName" style="color: rgb(84,81,224)">{{roadName}}</span>
      </div>
    </div>
    <!--关键指标-->
    <div class="result-info-title">
    结果关键指标
    </div>
    <div>
      <div class="result-key">
        <div class="result-key-info">
          <div class="result-key-info-detail">
            <div>日间营收</div>
            <span>{{ dayIncome }}</span><span>元</span>
          </div>
          <img src="../assets/icon-income.png" alt="">
        </div>
        <div class="result-key-info">
          <div class="result-key-info-detail">
            <div>回报周期</div>
            <span>{{ cycle }}</span><span>年</span>
          </div>
          <img src="../assets/icon-cycle.png" alt="">
        </div>
      </div>

      <div class="result-key">
        <div class="result-key-info">
          <div class="result-key-info-detail">
            <div>慢桩利用率</div>
            <span>{{ slowUse }}</span><span>%</span>
          </div>
          <img src="../assets/icon-slowCharge.png" alt="">
        </div>
        <div class="result-key-info">
          <div class="result-key-info-detail">
            <div>快桩利用率</div>
            <span>{{ fastUse }}</span><span>%</span>
          </div>
          <img src="../assets/icon-fastCharge.png" alt="">
        </div>
      </div>
      </div>
  </div>

  <!--右侧容器-->
  <div class="rightContainer">
    <Line4_1 class="curSum-chart" v-show="showLineChart" :city="city" :budget="budget" :way="way"></Line4_1>
    <Map4_1
        v-if="mapData.length"
        title="车流量"
        :geoCoordMap="hefei"
        :data="mapData"
        :center="center"
        :cityOption="city"
        :zoom="2"
        @idIndex="idIndex"
        @getRoadName="getRoadName"
        @reportData="changeSelect">
    </Map4_1>
  </div>

  <n-button strong secondary @click="showLineChart = !showLineChart" type="primary" style="position: absolute;bottom: 10px;left: 40px">
    显示/隐藏LineChart
  </n-button>

</template>

<script setup>
//柱状图不太会画，换成了折线图。
import Pie from "/src/components/pie.vue"
import All from "/src/components/all.vue"
import Bar from "/src/components/bar.vue"
import Line from "/src/components/line.vue"
import Map4_1 from "/src/components/map4_1.vue"
import Line4_1 from "/src/components/line4_1.vue"
import Zoom from "/src/components/zoom.vue"
import Table from "/src/components/table.vue"
import Gauge from "/src/components/gauge.vue"
import Text from "/src/components/text.vue"
import * as echarts from 'echarts'
import utils from '/src/utils/index.js'
// Theme Config
import walden from '/src/assets/walden.json'
import hefei from '/src/assets/he_fei.json'
import {defineComponent, inject, onBeforeUpdate, onMounted, reactive, ref, watch} from "vue"
import {NButton, NSpace, NDropdown} from 'naive-ui'
// 结果关键指标
import beijingKey from "/src/assets/chargerInfo/keys/beijing_key_metrics.json"
import tianjinKey from "/src/assets/chargerInfo/keys/tianjin_key_metrics.json"
import guangzhouKey from "/src/assets/chargerInfo/keys/guangzhou_key_metrics.json"
import beijingPlan from "/src/assets/chargerInfo/plan/beijing_plan.json"
import guangzhouPlan from "/src/assets/chargerInfo/plan/guangzhou_plan.json"
import tianjinPlan from "/src/assets/chargerInfo/plan/tianjing_plan.json"

echarts.registerTheme('walden', walden)

const chargerId = ref('1')
const roadName = ref('北京市通州区曹园南街')
function idIndex(data){
  chargerId.value = data
}
function getRoadName(data){
  roadName.value = data
}

const showLineChart = ref(false)

const clickData = ref({})
const idData = ref({})
const zoomData = ref({})
const gaugeDataPre = ref({})
const gaugeDataCur = ref({})
const mapData = ref([])
// 最初地图聚焦中心点坐标
const center = ref([116.66342052947668, 39.866526542896786])
mapData.value = [
  {
    "name": 74,
    "value": 36
  },
  {
    "name": 119,
    "value": 36
  },
  {
    "name": 91,
    "value": 35
  },
  {
    "name": 64,
    "value": 33
  },
  {
    "name": 72,
    "value": 28
  },
  {
    "name": 130,
    "value": 24
  },
  {
    "name": 29,
    "value": 23
  },
  {
    "name": 57,
    "value": 22
  },
  {
    "name": 50,
    "value": 21
  },
  {
    "name": 63,
    "value": 21
  },
  {
    "name": 99,
    "value": 21
  },
  {
    "name": 37,
    "value": 20
  },
  {
    "name": 20,
    "value": 19
  },
  {
    "name": 97,
    "value": 19
  },
  {
    "name": 122,
    "value": 19
  },
  {
    "name": 123,
    "value": 19
  },
  {
    "name": 28,
    "value": 18
  },
  {
    "name": 61,
    "value": 18
  },
  {
    "name": 82,
    "value": 18
  },
  {
    "name": 94,
    "value": 18
  },
  {
    "name": 221,
    "value": 17
  },
  {
    "name": 83,
    "value": 15
  },
  {
    "name": 149,
    "value": 15
  },
  {
    "name": 41,
    "value": 14
  },
  {
    "name": 214,
    "value": 14
  },
  {
    "name": 234,
    "value": 14
  },
  {
    "name": 78,
    "value": 13
  },
  {
    "name": 109,
    "value": 13
  },
  {
    "name": 111,
    "value": 13
  },
  {
    "name": 49,
    "value": 12
  },
  {
    "name": 170,
    "value": 12
  },
  {
    "name": 211,
    "value": 12
  },
  {
    "name": 53,
    "value": 11
  },
  {
    "name": 71,
    "value": 11
  },
  {
    "name": 150,
    "value": 11
  },
  {
    "name": 216,
    "value": 11
  },
  {
    "name": 67,
    "value": 10
  },
  {
    "name": 88,
    "value": 10
  },
  {
    "name": 107,
    "value": 10
  },
  {
    "name": 125,
    "value": 10
  },
  {
    "name": 230,
    "value": 10
  },
  {
    "name": 2,
    "value": 9
  },
  {
    "name": 31,
    "value": 9
  },
  {
    "name": 65,
    "value": 9
  },
  {
    "name": 87,
    "value": 9
  },
  {
    "name": 95,
    "value": 9
  },
  {
    "name": 135,
    "value": 9
  },
  {
    "name": 168,
    "value": 9
  },
  {
    "name": 169,
    "value": 9
  },
  {
    "name": 203,
    "value": 9
  },
  {
    "name": 55,
    "value": 8
  },
  {
    "name": 66,
    "value": 8
  },
  {
    "name": 89,
    "value": 8
  },
  {
    "name": 96,
    "value": 8
  },
  {
    "name": 110,
    "value": 8
  },
  {
    "name": 171,
    "value": 8
  },
  {
    "name": 172,
    "value": 8
  },
  {
    "name": 213,
    "value": 8
  },
  {
    "name": 23,
    "value": 7
  },
  {
    "name": 56,
    "value": 7
  },
  {
    "name": 81,
    "value": 7
  },
  {
    "name": 100,
    "value": 7
  },
  {
    "name": 108,
    "value": 7
  },
  {
    "name": 121,
    "value": 7
  },
  {
    "name": 139,
    "value": 7
  },
  {
    "name": 167,
    "value": 7
  },
  {
    "name": 176,
    "value": 7
  },
  {
    "name": 180,
    "value": 7
  },
  {
    "name": 200,
    "value": 7
  },
  {
    "name": 222,
    "value": 7
  },
  {
    "name": 9,
    "value": 6
  },
  {
    "name": 62,
    "value": 6
  },
  {
    "name": 102,
    "value": 6
  },
  {
    "name": 106,
    "value": 6
  },
  {
    "name": 112,
    "value": 6
  },
  {
    "name": 194,
    "value": 6
  },
  {
    "name": 196,
    "value": 6
  },
  {
    "name": 206,
    "value": 6
  },
  {
    "name": 14,
    "value": 5
  },
  {
    "name": 42,
    "value": 5
  },
  {
    "name": 47,
    "value": 5
  },
  {
    "name": 60,
    "value": 5
  },
  {
    "name": 80,
    "value": 5
  },
  {
    "name": 85,
    "value": 5
  },
  {
    "name": 93,
    "value": 5
  },
  {
    "name": 113,
    "value": 5
  },
  {
    "name": 115,
    "value": 5
  },
  {
    "name": 148,
    "value": 5
  },
  {
    "name": 163,
    "value": 5
  },
  {
    "name": 173,
    "value": 5
  },
  {
    "name": 188,
    "value": 5
  },
  {
    "name": 1,
    "value": 4
  },
  {
    "name": 8,
    "value": 4
  },
  {
    "name": 21,
    "value": 4
  },
  {
    "name": 32,
    "value": 4
  },
  {
    "name": 68,
    "value": 4
  },
  {
    "name": 70,
    "value": 4
  },
  {
    "name": 116,
    "value": 4
  },
  {
    "name": 118,
    "value": 4
  },
  {
    "name": 140,
    "value": 4
  },
  {
    "name": 142,
    "value": 4
  },
  {
    "name": 161,
    "value": 4
  },
  {
    "name": 175,
    "value": 4
  },
  {
    "name": 208,
    "value": 4
  },
  {
    "name": 220,
    "value": 4
  },
  {
    "name": 11,
    "value": 3
  },
  {
    "name": 15,
    "value": 3
  },
  {
    "name": 39,
    "value": 3
  },
  {
    "name": 51,
    "value": 3
  },
  {
    "name": 59,
    "value": 3
  },
  {
    "name": 77,
    "value": 3
  },
  {
    "name": 155,
    "value": 3
  },
  {
    "name": 162,
    "value": 3
  },
  {
    "name": 164,
    "value": 3
  },
  {
    "name": 179,
    "value": 3
  },
  {
    "name": 183,
    "value": 3
  },
  {
    "name": 190,
    "value": 3
  },
  {
    "name": 195,
    "value": 3
  },
  {
    "name": 197,
    "value": 3
  },
  {
    "name": 205,
    "value": 3
  },
  {
    "name": 227,
    "value": 3
  },
  {
    "name": 229,
    "value": 3
  },
  {
    "name": 233,
    "value": 3
  },
  {
    "name": 242,
    "value": 3
  },
  {
    "name": 18,
    "value": 2
  },
  {
    "name": 27,
    "value": 2
  },
  {
    "name": 48,
    "value": 2
  },
  {
    "name": 84,
    "value": 2
  },
  {
    "name": 128,
    "value": 2
  },
  {
    "name": 134,
    "value": 2
  },
  {
    "name": 153,
    "value": 2
  },
  {
    "name": 174,
    "value": 2
  },
  {
    "name": 182,
    "value": 2
  },
  {
    "name": 185,
    "value": 2
  },
  {
    "name": 186,
    "value": 2
  },
  {
    "name": 187,
    "value": 2
  },
  {
    "name": 192,
    "value": 2
  },
  {
    "name": 202,
    "value": 2
  },
  {
    "name": 212,
    "value": 2
  },
  {
    "name": 215,
    "value": 2
  },
  {
    "name": 217,
    "value": 2
  },
  {
    "name": 44,
    "value": 1
  },
  {
    "name": 92,
    "value": 1
  },
  {
    "name": 124,
    "value": 1
  },
  {
    "name": 165,
    "value": 1
  },
  {
    "name": 178,
    "value": 1
  },
  {
    "name": 181,
    "value": 1
  },
  {
    "name": 193,
    "value": 1
  },
  {
    "name": 198,
    "value": 1
  },
  {
    "name": 199,
    "value": 1
  },
  {
    "name": 210,
    "value": 1
  },
  {
    "name": 223,
    "value": 1
  },
  {
    "name": 225,
    "value": 1
  },
  {
    "name": 236,
    "value": 1
  },
  {
    "name": 237,
    "value": 1
  },
  {
    "name": 5,
    "value": 0
  },
  {
    "name": 10,
    "value": 0
  },
  {
    "name": 13,
    "value": 0
  },
  {
    "name": 24,
    "value": 0
  },
  {
    "name": 46,
    "value": 0
  },
  {
    "name": 52,
    "value": 0
  },
  {
    "name": 58,
    "value": 0
  },
  {
    "name": 79,
    "value": 0
  },
  {
    "name": 86,
    "value": 0
  },
  {
    "name": 98,
    "value": 0
  },
  {
    "name": 120,
    "value": 0
  },
  {
    "name": 127,
    "value": 0
  },
  {
    "name": 132,
    "value": 0
  },
  {
    "name": 133,
    "value": 0
  },
  {
    "name": 138,
    "value": 0
  },
  {
    "name": 141,
    "value": 0
  },
  {
    "name": 143,
    "value": 0
  },
  {
    "name": 147,
    "value": 0
  },
  {
    "name": 151,
    "value": 0
  },
  {
    "name": 154,
    "value": 0
  },
  {
    "name": 166,
    "value": 0
  },
  {
    "name": 177,
    "value": 0
  },
  {
    "name": 189,
    "value": 0
  },
  {
    "name": 204,
    "value": 0
  },
  {
    "name": 218,
    "value": 0
  },
  {
    "name": 219,
    "value": 0
  },
  {
    "name": 224,
    "value": 0
  },
  {
    "name": 226,
    "value": 0
  },
  {
    "name": 228,
    "value": 0
  },
  {
    "name": 231,
    "value": 0
  },
  {
    "name": 232,
    "value": 0
  },
  {
    "name": 238,
    "value": 0
  },
  {
    "name": 239,
    "value": 0
  },
  {
    "name": 240,
    "value": 0
  },
  {
    "name": 241,
    "value": 0
  }
]

// 充电桩配置信息
const cityOptions = [
  {
    label: '北京',
    key: '北京',
  },
  {
    label: '广州',
    key: '广州',
  },
  {
    label: '天津',
    key: '天津',
  },
]
let city = ref('北京')
function changeCity(key){
  city.value = key
}

// 预算档位配置
const budgetOptions = [
  {
    label: '1000万元',
    key: '1000万元',
  },
  {
    label: '2000万元',
    key: '2000万元'
  },
  {
    label: '3000万元',
    key: '3000万元'
  },
  {
    label: '4000万元',
    key: '4000万元'
  },
  {
    label: '5000万元',
    key: '5000万元'
  },
]
let budget = ref('1000万元')
function changeBudget(key){
  budget.value = key
}

const wayOptions = [
  {
    label: 'Even',
    key: 'Even'
  },
  {
    label: 'Greedy',
    key: 'Greedy'
  },
  {
    label: 'SPAP',
    key: 'SPAP',
  },
]
let way = ref('Even')
function changeWay(key){
  way.value = key
}

let dayIncome = ref()
let slowUse = ref()
let fastUse = ref()
let cycle = ref()
let fastCharger = ref()
let slowCharger = ref()

watch([city, budget, way, chargerId],(newValue,oldValue) => {
  let cityKey = beijingKey, cityPlan =beijingPlan, budgetNum = '1w', wayNum = 0
  switch (city.value){
    case '北京': {
      cityKey = beijingKey
      cityPlan = beijingPlan
      if(newValue[0] !== oldValue[0]){
        center.value = [116.66342052947668, 39.866526542896786]
      }
      break
    }
    case '广州': {
      cityKey = guangzhouKey
      cityPlan = guangzhouPlan
      if(newValue[0] !== oldValue[0]){
        center.value = [113.27822154820997, 23.08354497586727]
      }
      break
    }
    case '天津': {
      cityKey = tianjinKey
      cityPlan = tianjinPlan
      if(newValue[0] !== oldValue[0]){
        center.value = [117.38830793338316, 39.167028314992606]
      }
      break
    }
  }
  switch (budget.value){
      case '1000万元': budgetNum = "1w"; break
      case '2000万元': budgetNum = "2w"; break
      case '3000万元': budgetNum = "3w"; break
      case '4000万元': budgetNum = "4w"; break
      case '5000万元': budgetNum = "5w"; break
  }
  switch (way.value){
    case 'Even': wayNum = 0; break
    case 'Greedy': wayNum = 1; break
    case 'SPAP': wayNum = 2; break
  }

  // 快慢充电桩
  slowCharger.value = cityPlan[budgetNum][wayNum][0][parseInt(chargerId.value)]
  fastCharger.value = cityPlan[budgetNum][wayNum][1][parseInt(chargerId.value)]
  // 指标
  dayIncome.value = Math.round(cityKey[budgetNum][wayNum][0])
  slowUse.value = (cityKey[budgetNum][wayNum][1]*100).toFixed(2)
  fastUse.value = (cityKey[budgetNum][wayNum][2]*100).toFixed(2)
  cycle.value = cityKey[budgetNum][wayNum][3].toFixed(2)

},{immediate: true})


</script>

<style>

img {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}

/*左侧容器*/

.leftContainer {
  width: 28vw;
  height: 100%;
  float: left;
  /*display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;*/
  border-radius: 18px;
  margin-right: 10px;
  padding: 0 10px;

}

.mainTitle{
  font-size: 40px;
  border-bottom: 5px solid black;
  width: 18vw;
  text-align: center;
  font-weight: bold;
  margin: 0 auto;
  margin-bottom: 20px;
}

/*充电桩配置信息*/
.chargerConfig{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.chargerConfig-title{
  font-size: 24px;
  width: 8vw;
  text-align: center;
}

.chargerConfig-options{
  width: 140px;
}

/*充电桩信息*/
.charger-info {
  display: flex;
  flex-direction: column;
  margin: 0 0 2vh 0;
}

.charger-info-title {
  color: rgba(7, 23, 56, 0.85);
  font-size: 26px;
  margin-right: 15px;
  display: inline-block;
}

.charger-info-number {
  font-size: 26px;
  font-weight: bold;
  display: inline-block;
}
.charger-info-item{
  display: flex;
  align-items: center;
  width: 26vw;
  justify-content: space-between;
  margin-top: 10px;
}
.roadName {
  width: 18vw !important;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
  text-align: right;
}

/*结果关键指标*/
.result-key{
  width: 28vw;
  display: flex;
  justify-content: space-between
}

.result-info-title {
  font-size: 30px;
  font-weight: bold;
  color: black;
  margin-top: 10px;
}

.result-key-info {
  display: flex;
  align-items: center;
  margin-top: 1vh;
  color: rgba(7, 23, 56, 0.7);
}

.result-key-info img {
  width: 3vw;
}

.result-key-info-detail {
  display: inline-block;
  width: 10vw;
}

.result-key-info-detail div {
  font-size: 20px;
  color: #A0AEC0;
}

.result-key-info-detail span:nth-of-type(1) {
  font-size: 32px;
  font-weight: bold;
  margin-right: 5px;
  color: black;
}

.result-key-info-detail span:nth-of-type(2) {
  font-size: 20px;
  color: black;
  font-weight: bold;
}

/*右侧容器*/

.rightContainer {
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
}

/*当前总体利用率*/
.curSum-chart{
  position: absolute;
  display: inline-block;
  z-index: 100;
  background-color: rgb(255,255,255);
  border-radius: 18px;
  padding: 30px 0 0 30px;
  border: 1px solid rgb(204,214,215);
  left: 58%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
