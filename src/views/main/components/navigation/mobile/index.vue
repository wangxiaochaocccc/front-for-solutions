<template>
  <div class="bg-whit top-0 left-0 z-10 sticky">
    <ul
      class="relative flex text-xs text-zinc-600 overflow-x-auto overflow-hidden p-1"
    >
      <li
        class="fixed top-0 right-[-1px] h-4 z-20 px-1 flex items-center bg-white shadow-l-white"
      >
        <svg-icon name="hamburger" class="w-1.5 h-1.5"></svg-icon>
      </li>
      <li
        v-for="item in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 duration-200 last:mr-4"
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
