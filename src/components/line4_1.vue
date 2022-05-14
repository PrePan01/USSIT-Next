<template>
  <div class="curSum-chart" ref="curSum"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from "echarts";

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
      data: ['8:00','10:30','13:00','15:30','18:00','20:30']
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
      data: [340, 432, 201, 264, 90, 340, 250]
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
      data: [120, 282, 111, 234, 220, 340, 310]
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
      data: [320, 332, 201, 334, 190, 130, 220]
    }
  ]
}

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
