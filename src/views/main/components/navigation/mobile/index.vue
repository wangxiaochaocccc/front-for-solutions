<template>
  <div class="bg-whit top-0 left-0 z-10 sticky">
    <ul
      class="relative flex text-xs text-zinc-600 overflow-x-auto overflow-hidden p-1"
    >
      <li
        v-for="item in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 duration-200"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// 接收数据
defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>
<style lang="scss"></style>
