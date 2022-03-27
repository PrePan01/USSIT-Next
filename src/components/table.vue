<template>
  <n-card hoverable>
    <n-data-table :columns="columns" :data="props.data" :bordered="false" :max-height="500" />
  </n-card>
</template>

<script setup>
import { NButton, NCard, NDataTable } from "naive-ui";
import { onMounted, ref, h } from 'vue'
const props = defineProps(
  {
    data: Array,
  }
)
const pagination = { pageSize: 10 }
const columns = [
  {
    title: "Name",
    key: "name",
    render(row, index) {
      return h('span', ['Road ', row.name])
    }
  },
  {
    title: "flow",
    key: "value",
    sorter: (row1, row2) => row1.value - row2.value
  }
]

</script>

<style scoped>
.n-data-table-td {
  background-color: #202934;
}
.n-card__content {
  display: block;
}
</style>