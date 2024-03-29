<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800"
    @click="onToDetail"
  >
    <div
      class="w-full overflow-auto rounded relative group"
      :style="{
        backgroundColor: randomRGB()
      }"
    >
      <!-- 图片 -->
      <img
        v-lazy
        ref="imgRef"
        :src="data.photo"
        class="w-full rounded bg-transparent cursor-zoom-in"
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full absolute top-0 left-0 bg-zinc-900/50 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5" @click="onShareClick">
          分享
        </m-button>
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
          @click="onLoad"
        ></m-button>
        <!--  全屏-->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/50 d"
          type="info"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-300"
          @click="onFullImg"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm font-bold mt-1 dark:text-zinc-500">{{ data.title }}</p>
    <!-- 信息 -->
    <div class="flex items-center mt-1">
      <img class="w-2 h-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<script setup>
import { randomRGB } from '@/utils/color'
import { saveAs } from 'file-saver'
import { message } from '@/libs'
import { ref, computed } from 'vue'
import { weiboShare } from '@/utils/share'
import {
  useFullscreen,
  useElementBounding,
  useEventListener
} from '@vueuse/core'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number
  }
})
// 点击下载按钮事件
const onLoad = () => {
  message('success', '图片开始下载了')
  setTimeout(() => {
    saveAs(props.data.photoDownLink)
  }, 100)
}
// 全屏处理
const imgRef = ref(null)

const { enter: onFullImg } = useFullscreen(imgRef)

const emits = defineEmits(['click'])
// 点击图片进入详情
const onToDetail = () => {
  emits('click', {
    id: props.data.id,
    localtion: imgContainerCenter.value
  })
}

/**
 * @description: 记录点击图片的中心点
 * @return {*}
 */

const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidth,
  height: imgContainerHeight
} = useElementBounding(imgRef)
const imgContainerCenter = computed(() => {
  return {
    translateX: parseInt(imgContainerX.value + imgContainerWidth.value / 2),
    translateY: parseInt(imgContainerY.value + imgContainerHeight.value / 2)
  }
})

// 分享
const onShareClick = () => {
  weiboShare(
    props.data.photo,
    `https://imooc-front.lgdsunday.club/pins/${props.data.id}`
  )
}
</script>
<style lang="scss"></style>
