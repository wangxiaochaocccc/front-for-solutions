<template>
  <svg>
    <use :xlink:href="symbolId" :fill="color" :class="fillClass" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  fillClass: {
    type: String
  }
})

// svg名字
const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>
<style lang="scss"></style>
