<template>
  <n-config-provider :theme="darkTheme" style="height: 100%;">
    <div class="container">
      <div class="left-top">
          <Pie></Pie>
      </div>
      <div class="left-center">
        <Pie></Pie>
      </div>
      <div class="right-top">
        <Zoom></Zoom>
      </div>
      <div class="right-center">
        <Pie></Pie>
      </div>
      <div class="center">
        <Map></Map>
      </div>
      <div class="left-button">
        <Bar></Bar>
      </div>
      <div class="right-button">
        <Line></Line>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup>
import Pie from "./components/pie.vue"
import Bar from "./components/bar.vue"
import Line from "./components/line.vue"
import Map from "./components/map.vue"
import Zoom from "./components/zoom.vue"
import * as echarts from 'echarts'
import { NCard, NConfigProvider } from 'naive-ui'
import { darkTheme } from 'naive-ui'
// Theme Config
import walden from '/src/assets/walden.json'
echarts.registerTheme('walden', walden)
</script>

<style>
.container {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-columns: 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "left-top left-top center center center center right-top right-top"
    "left-top left-top center center center center right-top right-top"
    "left-center left-center center center center center right-center right-center"
    "left-center left-center center center center center right-center right-center"
    "left-button left-button left-button left-button right-button right-button right-button right-button"
    "left-button left-button left-button left-button right-button right-button right-button right-button";
}
body {
  margin: 0px;
  height: 100vh;
  box-sizing: border-box;
  padding: 10px;
}
.left-top {
  grid-area: left-top;
}

.left-center {
  grid-area: left-center;
}

.right-top {
  grid-area: right-top;
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

