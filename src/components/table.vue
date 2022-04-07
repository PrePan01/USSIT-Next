<template>
  <n-card hoverable>
    <n-data-table
      :key="Math.random()"
      :columns="columns"
      :data="data"
      :bordered="false"
      :flex-height="true"
      :row-props="rowProps"
    />
  </n-card>
</template>

<script setup>
import { processSlotOutlet } from "@vue/compiler-core";
import { NCard, NDataTable } from "naive-ui";
import { onMounted, ref, h, onUpdated } from 'vue'
const emit = defineEmits(['reportData'])
const props = defineProps(
  {
    data: Array,
    title1: String,
  }
)
const data = ref([])
onUpdated(() => {
  data.value = props.data
})
onMounted(() => {
  data.value = props.data
})
const rowProps = (row) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      reportData(row)
    }
  }
}
const columns = [
  {
    title: "Name",
    key: "name",
    render(row, index) {
      return h('span', ['Road ', row.name])
    },
    sorter: (row1, row2) => row1.name - row2.name
  },
  {
    title: props.title1,
    key: "value",
    sorter: (row1, row2) => row1.value - row2.value
  }
]

const reportData = (data) => {
  emit('reportData', data)
}


</script>

<style scoped>
.n-data-table-td {
  background-color: #202934;
}
.n-card__content {
  display: block;
}
</style>