<template>
  <!-- 因为是relative 所以需要手动指定高度 -->
  <div
    class="relative"
    ref="containerRef"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 确保有列宽和数据时候渲染，因为列数是不确定的 -->
    <template v-if="colWidth && data.length">
      <div
        class="duration-300 absolute"
        :style="{
          width: 20 + 'px',
          left: 20 + 'px',
          top: 20 + 'px'
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="colWidth" :index="index"></slot>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'

const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识
  nodeKey: {
    type: String
  },
  // 是否需要预加载
  picturePreReading: {
    type: Boolean,
    default: true
  },
  // 列数
  colNum: {
    type: Number,
    default: 2
  },
  // 列间距
  colSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  }
})

// 容器的总高度 -就是最高的列的高度
const containerHeight = ref(0)
// 记录每列的高度的容器
const colHeightConatiner = ref({})
// 构建每列高度的对象
const useColHeightContainer = () => {
  colHeightConatiner.value = {}
  for (let i = 0; i < props.colNum; i++) {
    colHeightConatiner.value[i] = 0
  }
}

// 计算列宽，需要知道总宽度
// 容器实例
const containerRef = ref(null)
// 容器总宽度(只计算内容的宽度)
const containerWidth = ref(0)
// 计算容器宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerRef.value,
    null
  )
  containerWidth.value =
    containerRef.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}

// 列宽
const columnWidth = ref(0)
// 列间距总和
const colSpacingTotal = computed(() => {
  return (props.colNum - 1) * props.colSpacing
})
// 计算列宽
const useColWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - colSpacingTotal.value) / props.colNum
}

onMounted(() => {
  useColWidth()
})
</script>
<style lang="scss"></style>
