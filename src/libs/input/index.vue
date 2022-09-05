<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      v-if="type === TYPE_TEXT"
      v-model="text"
      :type="type"
      class="outline-0 border boder-gray-200 dark:border-zinc-400 dark:text-zinc-300 focus:border-blue-500 py-0.5 px-1 dark:bg-zinc-600 rounded-sm text-sm w-full duration-100"
      :maxlength="max"
    />
    <!-- 多行 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      v-model="text"
      :type="type"
      class="outline-0 border boder-gray-200 dark:border-zinc-400 dark:text-zinc-300 focus:border-blue-500 py-0.5 px-1 dark:bg-zinc-600 rounded-sm text-sm w-full"
      :maxlength="max"
      rows="5"
    />
    <!-- 超出限制 -->
    <span
      v-if="max"
      class="text-xs absolute right-1 bottom-0.5"
      :class="{ 'text-red-500': curTextLength >= parseInt(max) }"
    >
      {{ curTextLength }} /{{ max }}
    </span>
  </div>
</template>

<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>
<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
  // v-model
  modelValue: {
    type: String,
    required: true
  },
  // 类型 单行或多行
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(val) {
      const arr = [TYPE_TEXTAREA, TYPE_TEXT]
      const res = arr.includes(val)
      if (!res) {
        throw new Error(`type的值必需是${arr.join('、')}中的一个`)
      }
      return res
    }
  },
  max: {
    type: [String, Number]
  }
})

// 双绑
const text = useVModel(props)

// 当前长度
const curTextLength = computed(() => {
  return text.value.length
})
</script>
<style lang="scss"></style>
