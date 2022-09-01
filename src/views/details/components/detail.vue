<template>
  <div class="w-screen h-screen fixed top-0 left-0 z-20 bg-slate-500 text-xl">
    {{ id }}
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: Number,
    required: true
  }
})
</script>
<style lang="scss"></style>
