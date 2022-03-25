
<template>
  <div class="container">
    <div class="header"></div>
    <div class="left-center">
      <Pie></Pie>
    </div>
    <div class="right-center">
      <Pie></Pie>
    </div>
    <div class="center">
      <Map></Map>
    </div>
    <div class="left-button">
      <Zoom></Zoom>
    </div>
    <div class="right-button">
      <Line></Line>
    </div>
  </div>
</template>

<script setup>
import Pie from "./components/pie.vue"
import Bar from "./components/bar.vue"
import Line from "./components/line.vue"
import Map from "./components/map.vue"
import Zoom from "./components/zoom.vue"
import * as echarts from 'echarts'
// Theme Config
import walden from '/src/assets/walden.json'
echarts.registerTheme('walden', walden)
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.5fr 2fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "header header header header"
    "left-center center center right-center"
    "left-button left-button right-button right-button";
}

.header {
  grid-area: header;
}

.left-center {
  grid-area: left-center;
}

.right-center {
  grid-area: right-center;
}

.center {
  grid-area: center;
}

.left-button {
  grid-area: left-button;
}

.right-button {
  grid-area: right-button;
}
</style>
