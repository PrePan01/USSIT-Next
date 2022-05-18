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
        @showLine="showLine"
        @reportData="changeSelect">
    </Map4_1>
  </div>

  <!--折线图-->
  <Line4_1 class="curSum-chart" v-show="showLineChart" :city="city" :budget="budget" :way="way" :chargerId="chargerId"></Line4_1>
  <img src="../assets/close.png" alt="" class="closeLineChart" v-show="showLineChart" @click="showLineChart = !showLineChart">

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
function showLine(data){
  showLineChart.value=data
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
mapData.value = [{
  "name": 74,
  "value": 36
}]

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
  left: 65%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.closeLineChart{
  width: 28px;
  position: absolute;
  bottom: 60px;
  left: 65%;
  cursor: pointer;
}
</style>
