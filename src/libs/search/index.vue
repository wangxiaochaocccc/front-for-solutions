<template>
  <div
    class="group relative p-0.5 border rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <div>
      <m-svg-icon
        name="search"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
      ></m-svg-icon>
      <input
        type="text"
        class="block w-full text-sm text-zinc-900 pl-4 h-[44px] rounded-xl outline-none bg-zinc-100 group-hover:bg-white"
        placeholder="搜索"
      />
      <m-svg-icon
        name="input-delete"
        color="#707070"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration"
      ></m-svg-icon>
      <!-- 分隔线 -->
      <div
        class="w-[1px] bg-zinc-200 h-1.5 duration-500 absolute translate-y-[-50%] top-[50%] right-[62px] opacity-0 group-hover:opacity-100"
      ></div>
      <!-- 下拉区域-->
      <transition name="slide">
        <div
          class="max-h-[368px] w-full rounded absolute top-[56px] left-0 z-20 bg-white overflow-auto text-base p-2 border border-zinc-200 hover:shadow-3xl duration-200"
        >
          <slot name="fropdown" />
        </div>
      </transition>
      <!-- 搜索按钮 -->
      <m-button
        icon="search"
        iconColor="#ffffff"
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-full"
      >
      </m-button>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
