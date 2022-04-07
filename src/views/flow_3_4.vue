<template>
<div class="container">
  <div class="left1"></div>
  <div class="center2"></div>
  <div class="center3"></div>
</div>
</template>

<script setup>

</script>

<style>
.container {  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.1fr 0.9fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "left1 left1 left1 left1 center2 center2 center2 center2 center2 center2 center2 center2"
    "left1 left1 left1 left1 center2 center2 center2 center2 center2 center2 center2 center2"
    "left1 left1 left1 left1 center2 center2 center2 center2 center2 center2 center2 center2"
    "left1 left1 left1 left1 center3 center3 center3 center3 center3 center3 center3 center3"
    "left1 left1 left1 left1 center3 center3 center3 center3 center3 center3 center3 center3"
    "left1 left1 left1 left1 center3 center3 center3 center3 center3 center3 center3 center3"
    "left1 left1 left1 left1 center3 center3 center3 center3 center3 center3 center3 center3";
}

.left1 { grid-area: left1; }

.center2 { grid-area: center2; }

.center3 { grid-area: center3; }

</style>
