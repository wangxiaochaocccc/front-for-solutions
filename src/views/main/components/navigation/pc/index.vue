<template>
  <div class="bg-white sticky top-0 left-0 w-full z-10">
    <ul
      class="w-[800px] relative mx-auto flex flex-wrap justify-center text-sm font-[500] py-1"
    >
      <li
        class="shrink-0 cursor-pointer rounded hover:bg-zinc-200 p-1"
        v-for="item in $store.getters.categorys"
      >
        {{ item.name }}
      </li>
      <!-- 伸缩图标 -->
      <div
        class="absolute bottom-2 right-1 rounded duration-200 cursor-pointer hover:bg-zinc-200"
      >
        <m-svg-icon class="w-1 h-1" name="unfold"></m-svg-icon>
      </div>
    </ul>
  </div>
</template>

<script setup></script>
<style lang="scss"></style>
