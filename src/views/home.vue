
<template>
  <n-space>
    <router-link to="/">home</router-link>
    <n-button type="primary" size="large">
      <router-link to="/flow_perception_hefei">hefei</router-link>
    </n-button>

    <router-link to="/flow_perception_taian">taian</router-link>
    <router-link to="flow_2_3">flow_2_3</router-link>
    <router-link to="flow_1_1">flow_1_1</router-link>
    <router-link to="flow_2_1">flow_2_1</router-link>
    <router-link to="flow_2_4">flow_2_4</router-link>
    <router-link to="flow_3_1">flow_3_1</router-link>
    <router-link to="flow_3_2">flow_3_2</router-link>
    <router-link to="flow_3_4">flow_3_4</router-link>
    <router-link to="flow_3_5">flow_3_5</router-link>
    <router-link to="flow_4_1">flow_4_1</router-link>
  </n-space>
</template>

<script setup>
import { NSpace, NButton } from 'naive-ui';

</script>

<style>
a {
  color: white;
  font-size: 30px;
  text-decoration: none;
}
</style>

