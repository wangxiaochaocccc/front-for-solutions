<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800">
    <div class="w-full overflow-auto rounded relative group">
      <!-- 图片 -->
      <img
        :src="data.photo"
        class="w-full rounded bg-transparent cursor-zoom-in"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full absolute top-0 left-0 bg-zinc-900/50 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>
        <!-- 点赞 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-button>
        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/50"
          type="info"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-button>
        <!--  全屏-->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/50 d"
          type="info"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm font-bold mt-1">{{ data.title }}</p>
    <!-- 信息 -->
    <div class="flex items-center mt-1">
      <img class="w-2 h-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<style lang="scss"></style>
