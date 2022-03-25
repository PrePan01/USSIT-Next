<template>
  <n-card hoverable>
  <div class="zoom-chart" ref="zoom"></div>
  </n-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as echarts from 'echarts'
import { NCard } from 'naive-ui'
import _ from 'lodash'
const zoom = ref(null)
const category = ['A', 'B', 'C', 'D', 'E']
const value = [1, 2, 3, 4, 5]
const option = {
 title: {
    text: 'Dynamic Data'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      label: {
        show: true
      }
    }
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  legend: {
    data: ['value'],
    itemGap: 5
  },
  grid: {
    top: '25%',
    left: '10%',
    right: '10%',
    bottom: '10%',
     containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: category
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'value',
    }
  ],
  dataZoom: [
    {
      show: true,
      start: 94,
      end: 100
    },
    {
      type: 'inside',
      start: 1,
      end: 100
    },
    {
      show: true,
      yAxisIndex: 0,
      filterMode: 'empty',
      width: 30,
      height: '80%',
      showDataShadow: false,
      left: '93%'
    }
  ],
  series: [
    {
      name: 'value',
      type: 'bar',
      data: value
    }
  ]
};

// basic resize in echart
const resizeHandler = _.debounce(() => {
  if (myChart) {
    myChart.resize();
  }
}, 200);

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
  let myChart = echarts.init(zoom.value, 'walden')
  myChart.setOption(option)
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});
</script>


<style scoped>
.zoom-chart {
  width: 90%;
  height: 90%;
}
</style>
