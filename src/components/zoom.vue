<template>
  <n-card hoverable>
    <div class="zoom-chart" ref="zoom"></div>
  </n-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, onUpdated } from 'vue'
import * as echarts from 'echarts'
import { NCard } from 'naive-ui'
import _ from 'lodash'
let myChart
const zoom = ref(null)
const props = defineProps(
  {
    categories: Array,
    value: Array,
    yTitle: String,
    title: String
  }
)
const option = {
  title: {
    text: props.title
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
  calculable: true,
  legend: {
    data: ['value'],
    itemGap: 5
  },
  grid: {
    top: '25%',
    left: '0%',
    right: '10%',
    bottom: '20%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: props.categories
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: props.yTitle,
    }
  ],
  dataZoom: [
    {
      show: true,
      start: 0,
      end: 100
    },
    {
      type: 'inside',
      start: 90,
      end: 100
    },
    {
      show: true,
      yAxisIndex: 0,
      filterMode: 'empty',
      width: 30,
      height: '70%',
      showDataShadow: false,
      right: '3%'
    }
  ],
  series: [
    {
      name: 'value',
      type: 'bar',
      data: props.value
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
  myChart = echarts.init(zoom.value, 'walden')
  myChart.setOption(option)
});

onUpdated(() => {
  console.log(props)
  myChart.setOption(
    {
      title: {
        text: props.title
      },
      xAxis: [
        {
          type: 'category',
          data: props.categories
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: props.yTitle,
        }
      ],
      series: [
        {
          name: props.yTitle,
          type: 'bar',
          data: props.value
        }
      ]
    }
  )
})

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
