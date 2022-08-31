<template>
  <m-popover placement="bottom-left">
    <template #reference>
      <m-svg-icon
        class="guide-theme w-4 h-4 rounded-sm p-1 hover:bg-zinc-100/60 cursor-pointer duration-200 dark:hover:bg-zinc-800"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
        :name="svgIconName"
      ></m-svg-icon>
    </template>
    <div
      v-for="item in themeArr"
      :key="item.id"
      class="w-[120px] over-hidden flex items-center p-1 hover:bg-zinc-100/60 dark:hover:bg-zinc-800 rounded-md cursor-pointer"
      @click="handleChangeTheme(item)"
    >
      <m-svg-icon
        class="w-1.5 h-1.5"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
        :name="item.icon"
      />
      <span class="text-sm text-zinc-800 font-bold ml-1 dark:text-zinc-300">
        {{ item.name }}
      </span>
    </div>
  </m-popover>
</template>

<script setup>
import { computed } from 'vue'
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constant'
import { useStore } from 'vuex'

const store = useStore()
// 构建渲染数据源
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]
// 切换主题
const handleChangeTheme = (val) => {
  store.commit('theme/changeThemeType', val.type)
}
// 展示图标处理
const svgIconName = computed(() => {
  const iconType = themeArr.find((item) => {
    return item.type === store.getters.themeType
  })
  return iconType?.icon
})
</script>
<style lang="scss"></style>
