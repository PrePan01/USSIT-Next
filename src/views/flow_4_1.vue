<template>
<div class="container">
  <div class="left1"></div>
  <div class="left2"></div>
  <div class="left3"></div>
  <div class="center2"></div>
  <div class="center1"></div>
  <div class="center3"></div>
  <div class="center4"></div>
  <div class="right1"></div>
  <div class="right2"></div>
</div>
</template>

<script setup>

</script>

<style>
.container {  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.1fr 0.8fr 1.1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "left1 left1 left1 center1 center1 center1 center1 center1 right1 right1 right1 ."
    "left1 left1 left1 center1 center1 center1 center1 center1 right1 right1 right1 ."
    "left2 left2 left2 center2 center2 . . . right1 right1 right1 ."
    "left2 left2 left2 center3 center3 center3 center3 center3 right1 right1 right1 ."
    "left2 left2 left2 center3 center3 center3 center3 center3 right2 right2 right2 ."
    "left3 left3 left3 center4 center4 center4 center4 center4 right2 right2 right2 ."
    "left3 left3 left3 center4 center4 center4 center4 center4 right2 right2 right2 .";
}

.left1 { grid-area: left1; background-color: aqua;}

.left2 { grid-area: left2; }

.left3 { grid-area: left3; }

.center2 { grid-area: center2; }

.center1 { grid-area: center1; }

.center3 { grid-area: center3; }

.center4 { grid-area: center4; }

.right1 { grid-area: right1; }

.right2 { grid-area: right2; }

</style>
