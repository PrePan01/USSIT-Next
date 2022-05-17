<template>
  <div class="map-chart" ref="map"></div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, onUpdated, ref, watch} from "vue";
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
import _ from "lodash";
// TODO 删
import he_feiMap from "/src/assets/he_feiMap.json";
import tai_anMap from "/src/assets/tai_anMap.json";
import nan_shanMap from "/src/assets/nan_shanMap.json";

import beijing_locations from "/src/assets/chargerInfo/locations/beijing_locations.json"

let geoData = []
for(let item in beijing_locations){
  geoData.push({
    name: beijing_locations[item].address,
    value: [beijing_locations[item].lon, beijing_locations[item].lat, item]
  })
}

const emit = defineEmits(["reportData", "idIndex"]);
const props = defineProps({
  title: String,
  data: Array,
  geoCoordMap: Object,
  geo: String,
  center: Array,
  zoom: Number,
  roadmap: Array,
  // 切换城市
  cityOption: String,
});
const map = ref(null);
const data = props.data || []

// 切换城市
let cityOption = ref("beijing")
watch(()=>props.cityOption, (newValue) => {
  cityOption.value = newValue
})

const geoCoordMap = props.geoCoordMap;
let myChart;

/*const convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      if (props.geo == "nanshan") {
        res.push({
          name: nan_shanMap[data[i].name]?.name || "无名路",
          value: geoCoord.concat(data[i].value).concat('demo'),
        });
      } else if (props.geo == "hefei") {
        res.push({
          name: he_feiMap[data[i].name]?.name || "无名路",
          value: geoCoord.concat(data[i].value).concat('demo'),
        });
      } else {
        res.push({
          name: tai_anMap[data[i].name]?.name || "无名路",
          value: geoCoord.concat(data[i].value).concat('demo'),
        });
      }
    }
  }
  return res;
};*/

const option = {
  //弹出框配置
  tooltip: {
    trigger: "item",
    triggerOn: 'click',
    enterable: true,
    formatter: function (params) {
      // 路名 value[2] 序号 value[3]
      idIndex(params.value[2], params.name)
      return `
        <div style="padding: 2px 2px">
          <!--路段标题-->
          <div style="display: flex;align-items: center">
            <img src="/src/assets/charger.png" alt="" style="width: 30px;height: 30px;margin-right: 10px">
            <div style="display: inline-block">
                <div style="font-size: 18px">路段：<b>${params.name}</b></div>
            </div>
          </div>
          <div style="margin-top: 10px;display: flex;align-items: center;justify-content: space-evenly">
            <!--营收-->
            <div style="display: inline-block;padding: 0 12px 0 0;border-right: 1px solid black">
              <div style="margin-bottom: 5px;font-size: 14px">营收</div>
              <span style="font-size: 22px;margin-right: 5px;font-weight: bold">3122</span><span style="font-size: 12px">元</span>
            </div>
            <!--利用率占比-->
            <div style="display: inline-block;padding: 0 10px">
              <div style="margin-bottom: 5px;font-size: 14px">利用率占比</div>
              <span style="font-size: 22px;margin-right: 5px;font-weight: bold">24.12</span><span style="font-size: 12px">%</span>
            </div>
            <img src="/src/assets/Line Chart 2.png" alt="" style="height: 40px">
          </div>
        </div>
      `;
    }
  },
  //地图样式配置
  bmap: {
    zoom: 13,
    roam: true,
    center: props.center,
    mapStyle: {
      styleJson: [
          {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": {
          "visibility": "on",
          "color": "#ccd6d7ff"
        }
      }, {
        "featureType": "green",
        "elementType": "geometry",
        "stylers": {
          "visibility": "on",
          "color": "#dee5e5ff"
        }
      }, {
        "featureType": "building",
        "elementType": "geometry",
        "stylers": {
          "visibility": "on"
        }
      }, {
        "featureType": "building",
        "elementType": "geometry.topfill",
        "stylers": {
          "color": "#d1dbdbff"
        }
      }, {
        "featureType": "building",
        "elementType": "geometry.sidefill",
        "stylers": {
          "color": "#d1dbdbff"
        }
      }, {
        "featureType": "building",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#aab6b6ff"
        }
      }, {
        "featureType": "subwaystation",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "color": "#888fa0ff"
        }
      }, {
        "featureType": "education",
        "elementType": "geometry",
        "stylers": {
          "visibility": "on",
          "color": "#e1e7e7ff"
        }
      }, {
        "featureType": "medical",
        "elementType": "geometry",
        "stylers": {
          "visibility": "on",
          "color": "#d1dbdbff"
        }
      }, {
        "featureType": "scenicspots",
        "elementType": "geometry",
        "stylers": {
          "visibility": "on",
          "color": "#d1dbdbff"
        }
      }, {
        "featureType": "highway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "on",
          "weight": 4
        }
      }, {
        "featureType": "highway",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "highway",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#cacfcfff"
        }
      }, {
        "featureType": "highway",
        "elementType": "labels",
        "stylers": {
          "visibility": "on"
        }
      }, {
        "featureType": "highway",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "highway",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "highway",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "on"
        }
      }, {
        "featureType": "arterial",
        "elementType": "geometry",
        "stylers": {
          "visibility": "on",
          "weight": 2
        }
      }, {
        "featureType": "arterial",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#fbfffeff"
        }
      }, {
        "featureType": "arterial",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#cacfcfff"
        }
      }, {
        "featureType": "arterial",
        "elementType": "labels",
        "stylers": {
          "visibility": "on"
        }
      }, {
        "featureType": "arterial",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "arterial",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "local",
        "elementType": "geometry",
        "stylers": {
          "visibility": "on",
          "weight": 1
        }
      }, {
        "featureType": "local",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#fbfffeff"
        }
      }, {
        "featureType": "local",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#cacfcfff"
        }
      }, {
        "featureType": "local",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "local",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "local",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "railway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "weight": 1
        }
      }, {
        "featureType": "railway",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#9494941a"
        }
      }, {
        "featureType": "railway",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#ffffff1a"
        }
      }, {
        "featureType": "subway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "weight": 1
        }
      }, {
        "featureType": "subway",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#c3bed433"
        }
      }, {
        "featureType": "subway",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#ffffff33"
        }
      }, {
        "featureType": "subway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "subway",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#979c9aff"
        }
      }, {
        "featureType": "subway",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "continent",
        "elementType": "labels",
        "stylers": {
          "visibility": "on"
        }
      }, {
        "featureType": "continent",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "on"
        }
      }, {
        "featureType": "continent",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#333333ff"
        }
      }, {
        "featureType": "continent",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "city",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "on"
        }
      }, {
        "featureType": "city",
        "elementType": "labels",
        "stylers": {
          "visibility": "on"
        }
      }, {
        "featureType": "city",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#454d50ff"
        }
      }, {
        "featureType": "city",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "town",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "on"
        }
      }, {
        "featureType": "town",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "town",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#454d50ff"
        }
      }, {
        "featureType": "town",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#fbfffeff"
        }
      }, {
        "featureType": "poilabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "districtlabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "poilabel",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "districtlabel",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#888fa0ff"
        }
      }, {
        "featureType": "transportation",
        "elementType": "geometry",
        "stylers": {
          "color": "#d1dbdbff"
        }
      }, {
        "featureType": "companylabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "restaurantlabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "lifeservicelabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "carservicelabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "financelabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "otherlabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "village",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "district",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "land",
        "elementType": "geometry",
        "stylers": {
          "color": "#edf3f3ff"
        }
      }, {
        "featureType": "nationalway",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#cacfcfff"
        }
      }, {
        "featureType": "provincialway",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#cacfcfff"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#cacfcfff"
        }
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": {
          "color": "#cacfcfff"
        }
      }, {
        "featureType": "subwaylabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "subwaylabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "tertiarywaysign",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "tertiarywaysign",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "provincialwaysign",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "provincialwaysign",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "nationalwaysign",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "nationalwaysign",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "highwaysign",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "highwaysign",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "nationalway",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#fbfffeff"
        }
      }, {
        "featureType": "nationalway",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "provincialway",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "highway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "6"
        }
      }, {
        "featureType": "highway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "7"
        }
      }, {
        "featureType": "highway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "8"
        }
      }, {
        "featureType": "highway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "6"
        }
      }, {
        "featureType": "highway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "7"
        }
      }, {
        "featureType": "highway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "8"
        }
      }, {
        "featureType": "highway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "6"
        }
      }, {
        "featureType": "highway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "7"
        }
      }, {
        "featureType": "highway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "8"
        }
      }, {
        "featureType": "nationalway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "6"
        }
      }, {
        "featureType": "nationalway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "7"
        }
      }, {
        "featureType": "nationalway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "8"
        }
      }, {
        "featureType": "nationalway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "6"
        }
      }, {
        "featureType": "nationalway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "7"
        }
      }, {
        "featureType": "nationalway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "8"
        }
      }, {
        "featureType": "nationalway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "6"
        }
      }, {
        "featureType": "nationalway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "7"
        }
      }, {
        "featureType": "nationalway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "8"
        }
      }, {
        "featureType": "provincialway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "8,8",
          "level": "8"
        }
      }, {
        "featureType": "provincialway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "8,8",
          "level": "8"
        }
      }, {
        "featureType": "provincialway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "8,8",
          "level": "8"
        }
      }, {
        "featureType": "cityhighway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "6"
        }
      }, {
        "featureType": "cityhighway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "7"
        }
      }, {
        "featureType": "cityhighway",
        "stylers": {
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "8"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "6"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "7"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "geometry",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "8"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "6"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "7"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "labels",
        "stylers": {
          "visibility": "off",
          "curZoomRegionId": "0",
          "curZoomRegion": "6,8",
          "level": "8"
        }
      }, {
        "featureType": "cityhighway",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#fbfffeff"
        }
      }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#8f5a33ff"
        }
      }, {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "country",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#8f5a33ff"
        }
      }, {
        "featureType": "country",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "country",
        "elementType": "labels.text",
        "stylers": {
          "fontsize": 28
        }
      }, {
        "featureType": "manmade",
        "elementType": "geometry",
        "stylers": {
          "color": "#dfe7e7ff"
        }
      }, {
        "featureType": "provincialway",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#fbfffeff"
        }
      }, {
        "featureType": "tertiaryway",
        "elementType": "geometry.fill",
        "stylers": {
          "color": "#fbfffeff"
        }
      }, {
        "featureType": "manmade",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "manmade",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "scenicspots",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "scenicspots",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "airportlabel",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "airportlabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "scenicspotslabel",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "scenicspotslabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "educationlabel",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "educationlabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "medicallabel",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "medicallabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "companylabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "restaurantlabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "hotellabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "hotellabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "shoppinglabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "shoppinglabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "lifeservicelabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "carservicelabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "transportationlabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "transportationlabel",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "financelabel",
        "elementType": "labels.icon",
        "stylers": {
          "visibility": "off"
        }
      }, {
        "featureType": "entertainment",
        "elementType": "geometry",
        "stylers": {
          "color": "#d1dbdbff"
        }
      }, {
        "featureType": "estate",
        "elementType": "geometry",
        "stylers": {
          "color": "#d1dbdbff"
        }
      }, {
        "featureType": "shopping",
        "elementType": "geometry",
        "stylers": {
          "color": "#d1dbdbff"
        }
      }, {
        "featureType": "education",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "education",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "medical",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "medical",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }, {
        "featureType": "transportation",
        "elementType": "labels.text.fill",
        "stylers": {
          "color": "#999999ff"
        }
      }, {
        "featureType": "transportation",
        "elementType": "labels.text.stroke",
        "stylers": {
          "color": "#ffffffff"
        }
      }]
    },
  },
  series: [
    {
      name: props.title,
      type: "scatter",
      coordinateSystem: "bmap",
      data: geoData,
      symbolSize: function (val) {
        return val[2] / props.zoom;
      },
      /*encode: {
        value: 2,
      },*/
      label: {
        formatter: "{b}",
        position: "right",
        show: false,
        textStyle: {
          color: "#fff",
        },
      },
      itemStyle: {
        color: "#3fb1e3",
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
    {
      name: "Top 5",
      type: "effectScatter",
      coordinateSystem: "bmap",
      data: geoData.sort(function (a, b) {
        return b.value - a.value;
      }).slice(0, 6)
      ,
      symbolSize: function (val) {
        return val[2] / props.zoom;
      },
      encode: {
        value: 2,
      },
      showEffectOn: "render",
      rippleEffect: {
        brushType: "stroke",
      },
      label: {
        formatter: "{b}",
        position: "right",
        show: true,
        textStyle: {
          color: "#fff",
        },
      },
      itemStyle: {
        color: "#6be6c1",
        shadowBlur: 10,
        shadowColor: "#333",
      },
      emphasis: {
        scale: true,
      },
      zlevel: 100,
    },
    {
      type: "lines",
      coordinateSystem: "bmap",
      polyline: true,
      data: props.roadmap,
      silent: true,
      lineStyle: {
          color: "#f7c5a0",
          opacity: 0.5,
          width: 2,
        },
      progressiveThreshold: 500,
      progressive: 200,
    },
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
  myChart = echarts.init(map.value);
  myChart.setOption(option, true);
  myChart.on("click", function (params) {
    reportData(params.data);
  });
});

onUpdated(() => {
  myChart.setOption({
    bmap: {
      center: props.center,
    },
    series: [
      {
        name: props.title,
        type: "scatter",
        coordinateSystem: "bmap",
        data: geoData,
        encode: {
          value: 2,
        },
        label: {
          formatter: "{b}",
          position: "right",
          show: false,
          textStyle: {
            color: "#fff",
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
      }
    ],
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});

const reportData = (data) => {
  emit("reportData", data);
};

function idIndex(data, name){
  emit("idIndex", data)
  emit("getRoadName", name)
}
</script>

<style scoped>
.map-chart {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
</style>
