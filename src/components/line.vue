<template>
  <n-card hoverable>
    <div class="line-chart" ref="line"></div>
  </n-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, onUpdated } from 'vue'
import { NCard } from 'naive-ui'
import * as echarts from 'echarts'
import _ from 'lodash'
const line = ref(null)
let myChart
const props = defineProps(
  {
    categories: Array,
    value: Array,
    value2:Array,
    title: String,
    title2: String,
    title3:String
  }
)
const option = {
  title: {
    text: props.title
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false
    },
    data: props.categories
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    scale: true
  },
  grid: {
    bottom: 20,
    left: 50
  },
  series: [
    {
      name: props.title2,
      type: 'line',
      showSymbol: false,
      data: props.value,
      itemStyle: {
        color: '#626c91'
      }
    },
     {
                name : props.title3,
                type : 'line',
                smooth: true,
                lineStyle : {
                    color : '#d256b6',
                    width : 2,
                    type : 'solid',
                },

                itemStyle : {
                    color : '#d256b6'
                },


                data :  props.value2,
            }]

};

// basic resize in echart
const resizeHandler = _.debounce(() => {
  if (myChart) {
    myChart.resize();
  }
}, 200);

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
  myChart = echarts.init(line.value, 'shine')
  myChart.setOption(option)
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});

onUpdated(() => {
  myChart.setOption({
    title: {
      text: props.title
    },
    series: [
      {
        name: props.title2,
        data: props.value
      }
    ],
    xAxis: {
      data: props.categories
    },
  });
})
</script>


<style scoped>
.line-chart {
  width: 95%;
  height: 90%;
}
</style>
