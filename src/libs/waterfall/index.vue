<template>
  <!-- 因为是relative 所以需要手动指定高度 -->
  <div
    class="relative"
    ref="containerRef"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 确保有列宽和数据时候渲染，因为列数是不确定的 -->
    <template v-if="columnWidth && data.length">
      <div
        class="m-waterfall-item duration-300 absolute"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
      >
        <slot :item="item" :width="columnWidth" :index="index" />
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'waterfall'
}
</script>
<script setup>
import { onMounted, ref, computed, watch, nextTick, onUnmounted } from 'vue'
import {
  getImgEle,
  getImgSrc,
  awaitImgLoaded,
  getMinColIndex,
  getMinHeight,
  getMaxHeight
} from './utils'

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
const containerLeft = ref(0)
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerRef.value,
    null
  )
  containerLeft.value = parseFloat(paddingLeft)
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

// 计算每个item高度
let itemHeights = []

// 监听图片加载完成(也就是需要预加载时)
const awaitImgComplete = () => {
  itemHeights = []
  // 获取所有item元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 获取所有img标签
  const imgElements = getImgEle(itemElements)
  // 获取所有img的src
  const allImgs = getImgSrc(imgElements)
  // 图片加载完成处理
  awaitImgLoaded(allImgs).then(() => {
    // 加载完成获取高度
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}
// 不需要预加载时
const useItemHeight = () => {
  itemHeights = []
  // 获取所有item元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  // 加载完成获取高度
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })
  // 渲染位置
  useItemLocation()
}
// 渲染位置方法
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    // 如果存在_style
    if (item._style) return
    // 生成_style
    item._style = {}
    // top
    item._style.top = getItemTop()
    //left
    item._style.left = getItemLeft()

    // 列高度自增
    increasingHeight(index)
  })
  // 指定容器高度
  containerHeight.value = getMaxHeight(colHeightConatiner.value)
}
// 返回下一个item的left
const getItemLeft = () => {
  // 获取最小高度素在列
  const column = getMinColIndex(colHeightConatiner.value)
  return column * (columnWidth.value + props.colSpacing) + containerLeft.value
}
// 返回下一个item的top
const getItemTop = () => {
  return getMinHeight(colHeightConatiner.value)
}
// 指定高度自增
const increasingHeight = (index) => {
  // 获取最小高度所在列
  const minHeightIndex = getMinColIndex(colHeightConatiner.value)
  colHeightConatiner.value[minHeightIndex] +=
    itemHeights[index] + props.rowSpacing
}
// 组件销毁时，清除所有_style
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
// 监听data变化
watch(
  () => props.data,
  (val) => {
    // 重置数据
    const resetColumnHeight = val.every((item) => !item._style)
    if (resetColumnHeight) {
      useColHeightContainer()
    }
    nextTick(() => {
      if (props.picturePreReading) {
        awaitImgComplete()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)
const reset = () => {
  setTimeout(() => {
    // 重新计算列宽
    useColWidth()
    // 重置数据
    props.data.forEach((item) => {
      item._style = null
    })
  }, 100)
}
// 监听列数变化
watch(
  () => props.colNum,
  () => {
    // 先停止template的渲染
    columnWidth.value = 0
    reset()
  }
)
</script>
<style lang="scss"></style>
