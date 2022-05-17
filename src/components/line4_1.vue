<template>
  <div class="curSum-chart" ref="curSum"></div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import * as echarts from "echarts";
import fastDemand from "/src/assets/chargerInfo/chart/fast_demand.json"
import slowDemand from "/src/assets/chargerInfo/chart/slow_demand.json"
import revenue from "/src/assets/chargerInfo/chart/revenue.json"

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
const props = defineProps({
  city: String,
  budget: String,
  way: String
})

let cityData = ref()
let budgetData = ref()
let wayData = ref()

watch(() =>[props.city, props.budget, props.way], (newValue) => {
  [cityData.value, budgetData, wayData] = [...newValue]
}, {immediate: true})

let fastData = ref([

])
let slowData = ref([])
let revData = ref([])

onMounted(() => {
  let curSumChart = echarts.init(curSum.value);
  curSumChart.setOption(option)
})
</script>

<style scoped>
  .curSum-chart{
    width: 70vw;
    height: 70vh;
  }
</style>
