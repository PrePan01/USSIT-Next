<template>
  <n-card hoverable>
    <div class="all-chart" ref="all"></div>
  </n-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, onUpdated } from 'vue'
import { NCard } from 'naive-ui'
import * as echarts from 'echarts'
import _ from 'lodash'
let myChart
const all = ref(null)
const props = defineProps(
  {
    option: Object
  }
)

// basic resize in echart
const resizeHandler = _.debounce(() => {
  if (myChart) {
    myChart.resize();
  }
}, 200);

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
  myChart = echarts.init(all.value, 'walden')
  myChart.setOption(props.option)
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});

onUpdated(() => {
  myChart.setOption(props.option)
})

</script>

<style scoped>
.all-chart {
  width: 90%;
  height: 80%;
}
</style>
