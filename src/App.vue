<template>
  <n-config-provider :theme="darkTheme" style="height: 100%;" :theme-overrides="themeOverrides">
    <flow_perception_hefei></flow_perception_hefei>
  </n-config-provider>
</template>

<script setup>
import flow_perception_hefei from './views/flow_perception_hefei.vue';
import { NConfigProvider } from 'naive-ui'
import { darkTheme } from 'naive-ui'
// Theme Config
const themeOverrides =
{
  "DataTable": {
    "thColor": "#202934FF",
    "thColorHover": "#283B56FF",
    "tdColorHover": "#283B56FF",
    "tdColor": "#202934FF"
  }
}

</script>

<style>
</style>

