<template>
<div class="container">
  <div class="header1"></div>
  <div class="header2"></div>
  <div class="header3"></div>
  <div class="header4"></div>
  <div class="left1"></div>
  <div class="left2"></div>
  <div class="left3"></div>
  <div class="center"></div>
  <div class="right"></div>
</div>
</template>

<script setup>

</script>

<style>
.container {  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1.1fr 0.9fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "header1 header1 header2 header2 header3 header3 header4 header4"
    "left1 left1 center center center center right right"
    "left1 left1 center center center center right right"
    "left2 left2 center center center center right right"
    "left2 left2 center center center center right right"
    "left3 left3 center center center center right right"
    "left3 left3 center center center center right right";
}

.header1 { grid-area: header1; background-color: red; }

.header2 { grid-area: header2; background-color: blue;}

.header3 { grid-area: header3;background-color: blue; }

.header4 { grid-area: header4; }

.left1 { grid-area: left1; }

.left2 { grid-area: left2; }

.left3 { grid-area: left3; }

.center { grid-area: center; }

.right { grid-area: right; }

</style>
