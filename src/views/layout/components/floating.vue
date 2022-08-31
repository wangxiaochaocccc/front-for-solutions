<template>
  <div class="floating-box fixed bottom-10 right-2">
    <div
      class="guide-start group h-4 w-4 rounded-full mb-1 bg-white dark:bg-zinc-800 border dark:border-0 flex justify-center items-center hover:shadow-lg"
      @click="onStartGuide"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fillClass="group-hover:fill-main dark:fill-zinc-200 fill-zinc-900"
      ></m-svg-icon>
    </div>
    <m-popover class="flex items-center guide-feedback" placement="top-left">
      <template #reference>
        <div
          class="guide-feedback w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fillClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main "
          ></m-svg-icon>
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import steps from './steps'

// 初始化driver
let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false, //禁止点击蒙层关闭
    doneBtnText: '完成',
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步'
  })
})
// 点击引导按钮
const onStartGuide = () => {
  // 配置
  driver.defineSteps(steps)
  // 开始
  driver.start()
}
</script>
<style lang="scss" scoped>
.driver-fix-stacking {
  position: fixed !important;
  z-index: 100004 !important;
}
</style>
