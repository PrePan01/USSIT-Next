<template>
  <div class="pie-chart" ref="pie"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as echarts from 'echarts'
import _ from 'lodash'
const pie = ref(null)
const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    left: '5%'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 20,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 30,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
      ]
    }
  ],
};

// basic resize in echart
const resizeHandler = _.debounce(() => {
  if (myChart) {
    myChart.resize();
  }
}, 200);

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
  let myChart = echarts.init(pie.value, 'walden')
  myChart.setOption(option)
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});
</script>


<style scoped>
.pie-chart {
  width: 100%;
  height: 100%;
}
</style>
