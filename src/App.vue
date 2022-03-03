<template>
<Pie></Pie>
<Bar></Bar>
</template>

<script setup>
import Pie from "./components/pie.vue"
import Bar from "./components/bar.vue"
import * as echarts from 'echarts'
// Theme Config
import walden from '/src/assets/walden.json'
echarts.registerTheme('walden', walden)
</script>

<style>
html {
  background-color: rgba(41,52,65,1)
}
</style>
