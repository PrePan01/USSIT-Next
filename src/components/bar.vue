
<template>
  <n-card hoverable>
    <div class="bar-chart" ref="bar"></div>
  </n-card>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, onBeforeUpdate, onUpdated } from 'vue'
import * as echarts from 'echarts'
import { NCard } from 'naive-ui'
import _ from 'lodash'
const props = defineProps(
  {
    categories: Array,
    categories2: Array,
    value: Array,
    value2: Array,
    yTitle: String,
    yTitle2: String,
    title: String
  }
)
const bar = ref(null)
let myChart
let app = {}
const option = {
  title: {
    text: props.title
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100
  },
  grid: [
    {
      bottom: 20
    }
  ],
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: props.categories
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: props.yTitle,
      boundaryGap: [0.2, 0.2]
    },
    {
      type: 'value',
      scale: true,
      name: props.yTitle2,
      boundaryGap: [0.2, 0.2],
    }
  ],
  series: [
    {
      name: props.yTitle,
      type: 'bar',
      yAxisIndex: 1,
      data: props.value
    },
    {
      name: props.yTitle2,
      type: 'line',
      data: props.value2
    }
  ]
}
app.count = 11;

// basic resize in echart
const resizeHandler = _.debounce(() => {
  if (myChart) {
    myChart.resize();
  }
}, 200);

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
  myChart = echarts.init(bar.value, 'walden')
  myChart.setOption(option)
});

onUpdated(() => {
  myChart.setOption({
    title: {
      text: props.title
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: props.categories
      }
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        name: props.yTitle,
        boundaryGap: [0.2, 0.2]
      },
      {
        type: 'value',
        scale: true,
        name: props.yTitle2,
        boundaryGap: [0.2, 0.2],
      }
    ],
    series: [
      {
        name: props.yTitle,
        type: 'bar',
        yAxisIndex: 1,
        data: props.value
      },
      {
        name: props.yTitle2,
        type: 'line',
        data: props.value2,
      }
    ]
  })
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});

// TO DO
// const rollup = ((myChart) => {
//   setInterval(function () {
//     let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
//     data.shift();
//     data.push(Math.round(Math.random() * 1000));
//     data2.shift();
//     data2.push(+(Math.random() * 10 + 5).toFixed(1));
//     categories.shift();
//     categories.push(axisData);
//     categories2.shift();
//     categories2.push(app.count++);
//     myChart.setOption({
//       xAxis: [
//         {
//           data: categories
//         },
//         {
//           data: categories2
//         }
//       ],
//       series: [
//         {
//           data: data
//         },
//         {
//           data: data2
//         }
//       ]
//     });
//   }, 2000);
// })
</script>

<style scoped>
.bar-chart {
  width: 90%;
  height: 90%;
}
</style>
