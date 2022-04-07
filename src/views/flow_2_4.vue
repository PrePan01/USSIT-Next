<template>
<div class="container">
  <div class="header1"></div>
  <div class="header2"></div>
  <div class="header3"></div>
  <div class="header4"></div>
  <div class="left"></div>
  <div class="center"></div>
  <div class="center2"></div>
  <div class="center3"></div>
  <div class="right1"></div>
  <div class="right2"></div>
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
    "left left center center center center center center"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center2 center2 center2 right1 right1 right1"
    "left left center3 center3 center3 right2 right2 right2"
    "left left center3 center3 center3 right2 right2 right2";
}

.header1 { grid-area: header1;  background-color: red;}

.header2 { grid-area: header2; background-color: blue;}

.header3 { grid-area: header3;background-color: blue;  }

.header4 { grid-area: header4; background-color: pink; }

.left { grid-area: left; background-color: pink;}

.center { grid-area: center;background-color: yellow }

.center2 { grid-area: center2;background-color: brown; }

.center3 { grid-area: center3;background-color: green; }

.right1 { grid-area: right1;background-color: pink; }

.right2 { grid-area: right2; background-color: pink;}

</style>
