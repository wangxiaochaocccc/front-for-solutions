<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <div class="text-xl font-bold text-zinc-900 mb-2 px-1 dark:text-zinc-200">
      所有分类
    </div>
    <ul class="overflow-y-scroll">
      <li
        class="text-lg px-1 py-1.5 text-zinc-900 dark:text-zinc-300 duration-100 active:text-zinc-100 active:bg-zinc-100 dark:active:bg-zinc-900"
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        @click="$emit('setOnItem', index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineEmits(['setOnItem'])
</script>
