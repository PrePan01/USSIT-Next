<template>
  <n-card hoverable class="float-card">
    <div class="gauge-chart" ref="gauge"></div>
  </n-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, onBeforeUpdate, onUpdated } from 'vue'
import * as echarts from 'echarts'
import { NCard } from 'naive-ui'
import _ from 'lodash'
const props = defineProps(
  {
    range: Number,
    data: Number,
    title: String,
  }
)
const gauge = ref(null)
let myChart
const option = {
  series: [
    {
      type: 'gauge',
      startAngle: 360,
      endAngle: 0,
      min: 0,
      max: 1,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [
            [0.33, '#6be6c1'],
            [0.66, '#3fb1e3'],
            [1, '#626c91'],
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 20,
        offsetCenter: [0, '-60%'],
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        length: 12,
        lineStyle: {
          color: 'auto',
          width: 2
        }
      },
      splitLine: {
        length: 20,
        lineStyle: {
          color: 'auto',
          width: 5
        }
      },
      axisLabel: {
        color: '#464646',
        fontSize: 20,
        formatter: function (value) {
          if (value === 0.833) {
            return '拥挤';
          } else if (value === 0.499) {
            return '平衡';
          } else if (value === 0.166) {
            return '通畅';
          }
          return '';
        }
      },
      title: {
        offsetCenter: [0, '-10%'],
        fontSize: 18,
        color: '#fff'
      },
      data: [
        {
          value: props.data / props.range,
          name: props.title
        }
      ],
      radius: '95%'
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
  myChart = echarts.init(gauge.value, 'walden')
  myChart.setOption(option)
});

onUpdated (()=> {
  myChart.setOption({
    series: {
      detail: {
        fontSize: 20,
        offsetCenter: [0, '30%'],
        valueAnimation: true,
        formatter: function (value) {
          return Math.round(value * props.range);
        },
        color: 'auto'
      },
      data: [
        {
          value: props.data / props.range,
          name: props.title
        }
      ],
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});
</script>

<style scoped>
.gauge-chart {
  width: 90%;
  height: 90%;
}
.float-card {
  position: absolute;
  height: 40%;
  bottom: 0;
}
</style>
