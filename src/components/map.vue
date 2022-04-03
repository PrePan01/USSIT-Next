
<template>
  <div class="map-chart" ref="map"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, onUpdated } from 'vue'
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import _ from 'lodash'
const emit = defineEmits(['reportData'])
const props = defineProps(
  {
    title: String,
    data: Array,
    geoCoordMap: Object,
    center: Array,
    zoom: Number
  }
)
const map = ref(null)
const data = props.data || []
const geoCoordMap = props.geoCoordMap
let myChart
const convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};
const option = {
  tooltip: {
    trigger: 'item'
  },
  bmap: {
    center: props.center,
    zoom: 13,
    roam: true,
    mapStyle: {
      styleJson: [
        {
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#031628'
          }
        },
        {
          featureType: 'land',
          elementType: 'geometry',
          stylers: {
            color: '#293441'
          }
        },
        {
          featureType: 'highway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry.fill',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry.stroke',
          stylers: {
            color: '#0b3d51'
          }
        },
        {
          featureType: 'local',
          elementType: 'geometry',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'railway',
          elementType: 'geometry.fill',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'railway',
          elementType: 'geometry.stroke',
          stylers: {
            color: '#08304b'
          }
        },
        {
          featureType: 'subway',
          elementType: 'geometry',
          stylers: {
            lightness: -70
          }
        },
        {
          featureType: 'building',
          elementType: 'geometry.fill',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: {
            color: '#857f7f'
          }
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: {
            color: '#000000'
          }
        },
        {
          featureType: 'building',
          elementType: 'geometry',
          stylers: {
            color: '#022338'
          }
        },
        {
          featureType: 'green',
          elementType: 'geometry',
          stylers: {
            color: '#062032'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'all',
          stylers: {
            color: '#465b6c'
          }
        },
        {
          featureType: 'manmade',
          elementType: 'all',
          stylers: {
            color: '#022338'
          }
        },
        {
          featureType: 'label',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        }
      ]
    }
  },
  series: [
    {
      name: props.title,
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: convertData(data),
      symbolSize: function (val) {
        return val[2] / props.zoom;
      },
      encode: {
        value: 2
      },
      label: {
        formatter: '{b}',
        position: 'right',
        show: false,
        textStyle: {
          color: '#fff'
        }
      },
      itemStyle: {
        color: '#3fb1e3'
      },
      emphasis: {
        label: {
          show: true
        }
      }
    },
    {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: convertData(
        data
          .sort(function (a, b) {
            return b.value - a.value;
          })
          .slice(0, 6)
      ),
      symbolSize: function (val) {
        return val[2] / props.zoom;
      },
      encode: {
        value: 2
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        formatter: '{b}',
        position: 'right',
        show: true,
        textStyle: {
          color: '#fff'
        }
      },
      itemStyle: {
        color: '#6be6c1',
        shadowBlur: 10,
        shadowColor: '#333'
      },
      emphasis: {
        scale: true
      },
      zlevel: 100
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
  myChart = echarts.init(map.value)
  myChart.setOption(option)
  myChart.on('click', function (params) {
    reportData(params.data)
  });
});

onUpdated(() => {
  myChart.setOption({
    series: [
      {
        name: props.title,
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: convertData(data),
        encode: {
          value: 2
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false,
          textStyle: {
            color: '#fff'
          }
        },
        emphasis: {
          label: {
            show: true
          }
        }
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: convertData(
          data
            .sort(function (a, b) {
              return b.value - a.value;
            })
            .slice(0, 6)
        ),
        encode: {
          value: 2
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: true,
          textStyle: {
            color: '#fff'
          }
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: '#333'
        },
        emphasis: {
          scale: true
        },
        zlevel: 100
      }
    ]
  })
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});

const reportData = (data) => {
  emit('reportData', data)
}

</script>


<style scoped>
.map-chart {
  width: 100%;
  height: 100%;
}
</style>
