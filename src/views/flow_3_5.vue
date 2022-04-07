<template>
<div class="container">
  <div class="left1"></div>
  <div class="left2"></div>
  <div class="right"></div>
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
    "left1 left1 left1 left1 right right right right right right right right"
    "left1 left1 left1 left1 right right right right right right right right"
    "left1 left1 left1 left1 right right right right right right right right"
    "left2 left2 left2 left2 right right right right right right right right"
    "left2 left2 left2 left2 right right right right right right right right"
    "left2 left2 left2 left2 right right right right right right right right"
    "left2 left2 left2 left2 right right right right right right right right";
}

.left1 { grid-area: left1;background-color: aqua; }

.left2 { grid-area: left2; }

.right { grid-area: right; }

</style>
