<template>
  <n-card hoverable>
    <div class="pie-chart" ref="pie"></div>
  </n-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, onUpdated } from 'vue'
import { NCard } from 'naive-ui'
import * as echarts from 'echarts'
import _ from 'lodash'
let myChart
const pie = ref(null)
const props = defineProps(
  {
    data: Array,
    title: String
  }
)
const option = {
  title: {
    text: props.title
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: 'bottom'
  },
  color: [
    '#6be6c1',
    '#3fb1e3',
    '#626c91'
  ],
  series: [
    {
      name: 'Access From',
      type: 'pie',
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 5,
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
      data: props.data
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
  myChart = echarts.init(pie.value, 'shine')
  myChart.setOption(option)
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});

onUpdated(() => {
  console.log(props)
  myChart.setOption({
    title: {
      text: props.title
    },
    series: [
      {
        data: props.data
      }
    ],
  });
})

</script>

<style scoped>
.pie-chart {
  width: 90%;
  height: 80%;
}
</style>
