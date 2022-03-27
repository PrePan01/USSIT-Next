<template>
  <n-card hoverable>
    <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
  </n-card>
</template>

<script setup>
import { NButton, NCard, NDataTable } from "naive-ui";
import { onMounted, ref } from 'vue'

const columns = [
  {
    title: "No",
    key: "no"
  },
  {
    title: "Title",
    key: "title"
  },
  {
    title: "Length",
    key: "length",
    sorter: (row1, row2) => row1.length - row2.length

  }
]
const data = [
  { no: 3, title: "Wonderwall", length: "4:18" },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
  { no: 12, title: "Champagne Supernova", length: "7:27" }
];

</script>

<style scoped>
.n-data-table-td{
  background-color: #202934;
}
.n-card__content {
  display: block;
}
</style>