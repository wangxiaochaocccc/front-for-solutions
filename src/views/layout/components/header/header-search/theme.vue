<template>
  <div>
    <div class="text-xs text-zinc-400 mb-1">热门精选</div>
    <div class="h-[140px] flex">
      <div
        class="w-[260px] relative rounded cursor-pointer"
        :style="{
          backgroundColor: randomRGB()
        }"
      >
        <img
          v-lazy
          :src="themeData.big.photo"
          class="w-full h-full object-cover rounded"
        />
        <p
          class="w-full h-[45%] pl-1 backdrop-blur rounded absolute left-0 bottom-0 flex items-center text-white duration-300 hover:backdrop-blur-none"
        >
          #{{ themeData.big.title }}
        </p>
      </div>
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="item in themeData.list"
          :key="item.id"
          class="h-[45%] w-[260px] rounded cursor-pointer ml-1.5 mb-1.5 relative"
          :style="{
            backgroundColor: randomRGB()
          }"
        >
          <img
            v-lazy
            :src="item.photo"
            class="w-full h-full object-cover rounded"
          />
          <p
            class="w-full h-full pl-1 backdrop-blur rounded absolute left-0 top-0 flex items-center text-white duration-300 hover:backdrop-blur-none"
          >
            #{{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getThemes } from '@/api/pexels'
import { ref } from 'vue'
import { randomRGB } from '@/utils/color'

// 获取数据
const themeData = ref({
  big: {},
  list: []
})
const getData = async () => {
  const { themes } = await getThemes()
  themeData.value.big = themes[0]
  themeData.value.list = themes.splice(1, themes.length)
}
getData()
</script>
<style lang="scss"></style>
