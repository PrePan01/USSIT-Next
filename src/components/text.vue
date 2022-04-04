<template>
  <div class="text-chart" ref="text"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, onBeforeUpdate, onUpdated } from 'vue'
import * as echarts from 'echarts'
import _ from 'lodash'
const props = defineProps(
  {
    text: String
  }
)
const text = ref(null)
let myChart
const option = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: props.text,
          fontSize: 48,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#fff',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 2000,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: '#fff'
              }
            }
          ]
        }
      }
    ]
  }
};

// basic resize in echart
const resizeHandler = _.debounce(() => {
  if (myChart) {
    myChart.resize();
  }
}, 200);

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
  myChart = echarts.init(text.value, 'walden')
  myChart.setOption(option)
});

onUpdated(() => {
  console.log(props.text)
  myChart.setOption({
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: props.text,
            fontSize: 48,
            fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: '#fff',
            lineWidth: 1,
          },
          keyframeAnimation: {
            duration: 2000,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0]
                }
              },
              {
                // Stop for a while.
                percent: 0.9,
                style: {
                  fill: 'transparent'
                }
              },
              {
                percent: 1,
                style: {
                  fill: '#fff'
                }
              }
            ]
          }
        }
      ]
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});
</script>

<style scoped>
.text-chart {
  width: 85%;
  height: 85%;
  transform: translateY(-30%);
}
</style>
