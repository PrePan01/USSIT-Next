<template>
  <div class="curSum-chart" ref="curSum"></div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from "echarts";
import fastDemand from "/src/assets/chargerInfo/chart/fast_demand.json"
import slowDemand from "/src/assets/chargerInfo/chart/slow_demand.json"
import revenue from "/src/assets/chargerInfo/chart/revenue.json"
import {parseInt} from "lodash/string";

const props = defineProps({
  city: String,
  budget: String,
  way: String,
  chargerId: String
})
let fastData = []
let slowData = []
let revData = []

let cityData = ref()
let budgetData = ref()
let wayData = ref()
let chargerIdData = ref()

const curSum = ref(null)
const option = {
  color: ['rgb(255,66,66)', 'rgb(39,174,96)', 'rgb(242,201,76)'],
  title: {
    text: '当前总体利用率'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['慢桩利用率', '快桩利用率', '站点营收']
  },
  /*toolbox: {
    feature: {
      saveAsImage: {}
    }
  },*/
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['8:00',"8:30",'9:00',"9:30",'10:00',"10:30",'11:00',
        "11:30",'12:00',"12:30",'13:00',"13:30",'14:00',"14:30",
        '15:00',"15:30",'16:00',"16:30",'17:00',"17:30",'18:00',
        "18:30", '19:00',"19:30",'20:00',"20:30"]
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '慢桩利用率',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 2,
        color: "rgb(255,66,66)"
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(255,66,66,1)'
          },
          {
            offset: 0.8,
            color: 'rgba(255,66,66,0)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: slowData
    },
    {
      name: '快桩利用率',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 2,
        color: "rgb(39,174,96)"
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(39,174,96,1)'
          },
          {
            offset: 0.8,
            color: 'rgba(39,174,96,0)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: fastData
    },
    {
      name: '站点营收',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 2,
        color: "rgb(242,201,76)"
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(242,201,76,1)'
          },
          {
            offset: 0.8,
            color: 'rgba(242,201,76,0)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: revData
    }
  ]
}


onMounted(() => {
  watch(() =>[props.city, props.budget, props.way, props.chargerId], (newValue) => {
    [cityData.value, budgetData.value, wayData.value, chargerIdData.value] = [...newValue]
    let budget, city, way
    switch (cityData.value){
      case '北京': {
        city = 'beijing'
        break
      }
      case '广州': {
        city = 'guangzhou'
        break
      }
      case '天津': {
        city = 'tianjin'
        break
      }
    }
    switch (budgetData.value){
      case '1000万元': budget = "1w"; break
      case '2000万元': budget = "2w"; break
      case '3000万元': budget = "3w"; break
      case '4000万元': budget = "4w"; break
      case '5000万元': budget = "5w"; break
    }
    switch (wayData.value){
      case 'Even': way = 0; break
      case 'Greedy': way = 1; break
      case 'SPAP': way = 2; break
    }

    for(let item in fastDemand[budget][city][way][parseInt(chargerIdData.value)]){
      fastData[item] = (fastDemand[budget][city][way][parseInt(chargerIdData.value)][item]*100)
    }
    for(let item in slowDemand[budget][city][way][parseInt(chargerIdData.value)]){
      slowData[item] = (slowDemand[budget][city][way][parseInt(chargerIdData.value)][item]*100)
    }
    for(let item in revenue[budget][city][way][parseInt(chargerIdData.value)]){
      revData[item] = (revenue[budget][city][way][parseInt(chargerIdData.value)][item])
    }
    let curSumChart = echarts.init(curSum.value)
    curSumChart.setOption(option)
  }, {immediate: true})
})
</script>

<style scoped>
  .curSum-chart{
    width: 60vw;
    height: 70vh;
  }
</style>
