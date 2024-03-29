<template>
  <div class="map-chart" ref="map"></div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, onUpdated, ref} from "vue";
import * as echarts from "echarts";
import "echarts/extension/bmap/bmap";
import _ from "lodash";
import he_feiMap from "/src/assets/he_feiMap.json";
import tai_anMap from "/src/assets/tai_anMap.json";
import nan_shanMap from "/src/assets/nan_shanMap.json";

const emit = defineEmits(["reportData", "idIndex"]);
const props = defineProps({
  title: String,
  data: Array,
  geoCoordMap: Object,
  geo: String,
  center: Array,
  zoom: Number,
  roadmap: Array
});
const map = ref(null);
const data = props.data || [];
const geoCoordMap = props.geoCoordMap;
let myChart;
const convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      if (props.geo == "nanshan") {
        res.push({
          name: nan_shanMap[data[i].name]?.name || "无名路",
          value: geoCoord.concat(data[i].value),
        });
      } else if (props.geo == "hefei") {
        res.push({
          name: he_feiMap[data[i].name]?.name || "无名路",
          value: geoCoord.concat(data[i].value),
        });
      } else {
        res.push({
          name: tai_anMap[data[i].name]?.name || "无名路",
          value: geoCoord.concat(data[i].value),
        });
      }
    }
  }
  return res;
};
const option = {
  tooltip: {
    trigger: "item",
    triggerOn: 'click',
    enterable: true,
    formatter: function (params) {
      return `
        <div style="color: white;background-color: rgb(18,23,40);">
            路段：${params.name}
        </div>
      `;
    }
  },
  bmap: {
    zoom: 13,
    roam: true,
    center: props.center,
    mapStyle: {
      /*styleJson: [
        {
          featureType: "water",
          elementType: "all",
          stylers: {
            color: "#031628",
          },
        },
        {
          featureType: "land",
          elementType: "geometry",
          stylers: {
            color: "#293441",
          },
        },
        {
          featureType: "highway",
          elementType: "all",
          stylers: {
            visibility: "off",
          },
        },
        {
          featureType: "arterial",
          elementType: "geometry.fill",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "arterial",
          elementType: "geometry.stroke",
          stylers: {
            color: "#0b3d51",
          },
        },
        {
          featureType: "local",
          elementType: "geometry",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "railway",
          elementType: "geometry.fill",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "railway",
          elementType: "geometry.stroke",
          stylers: {
            color: "#08304b",
          },
        },
        {
          featureType: "subway",
          elementType: "geometry",
          stylers: {
            lightness: -70,
          },
        },
        {
          featureType: "building",
          elementType: "geometry.fill",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: {
            color: "#857f7f",
          },
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: {
            color: "#000000",
          },
        },
        {
          featureType: "building",
          elementType: "geometry",
          stylers: {
            color: "#022338",
          },
        },
        {
          featureType: "green",
          elementType: "geometry",
          stylers: {
            color: "#062032",
          },
        },
        {
          featureType: "boundary",
          elementType: "all",
          stylers: {
            color: "#465b6c",
          },
        },
        {
          featureType: "manmade",
          elementType: "all",
          stylers: {
            color: "#022338",
          },
        },
        {
          featureType: "label",
          elementType: "all",
          stylers: {
            visibility: "off",
          },
        },
      ],*/
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
      data: convertData(data),
      symbolSize: function (val) {
        return val[2] / props.zoom;
      },
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
  myChart.setOption(option);
  myChart.on("click", function (params) {
    reportData(params.data);
  });

  function myAlert(nam){
    provide("roadData", nam)
  }
  window.myAlert=myAlert;
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
        data: convertData(data),
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
      },
      {
        name: "Top 5",
        type: "effectScatter",
        coordinateSystem: "bmap",
        data: convertData(
          data
            .sort(function (a, b) {
              return b.value - a.value;
            })
            .slice(0, 6)
        ),
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
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});

const reportData = (data) => {
  emit("reportData", data);
};
</script>

<style scoped>
.map-chart {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
</style>
