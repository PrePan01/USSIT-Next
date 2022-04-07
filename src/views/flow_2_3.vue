<template>
<div class="container">
  <div class="header-1"></div>
  <div class="header-2"></div>
  <div class="header-3"></div>
  <div class="header-4"></div>
  <div class="left-1"></div>
  <div class="left-2"></div>
  <div class="center"></div>
  <div class="right-1"></div>
  <div class="right-2"></div>
</div>
</template>

<script setup>

</script>

<style>
.container {  display: grid;
  grid-template-columns: 1.1fr 0.9fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "header-1 header-1 header-2 header-2 header-3 header-3 header-4 header-4"
    "left-1 left-1 center center center center right-1 right-1"
    "left-1 left-1 center center center center right-1 right-1"
    "left-2 left-2 center center center center right-1 right-1"
    "left-2 left-2 center center center center right-2 right-2"
    "left-2 left-2 center center center center right-2 right-2";
}

.header-1 { grid-area: header-1; background-color: red; }

.header-2 { grid-area: header-2;background-color: blue; }

.header-3 { grid-area: header-3;background-color: pink;  }

.header-4 { grid-area: header-4; background-color: purple;  }

.left-1 { grid-area: left-1;background-color: green;  }

.left-2 { grid-area: left-2; background-color: greenyellow;  }

.center { grid-area: center;background-color: black;   }

.right-1 { grid-area: right-1;background-color: black; }

.right-2 { grid-area: right-2; background-color: black;  }

</style>
