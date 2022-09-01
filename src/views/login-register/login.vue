<template>
  <div class="w-screen h-full bg-zinc-200 dark:bg-zinc-800 xl:pt-8">
    <div
      class="w-full h-full xl:w-[440px] xl:h-[550px] mx-auto bg-white rounded dark:bg-zinc-900 overflow-hidden px-3"
    >
      <div class="text-base font-bold text-main text-center mt-4 mb-5">
        账号登录
      </div>

      <form>
        <input
          type="text"
          class="w-full px-1 pb-1 outline-0 border-b border-b-zinc-900 focus:border-b-main text-base mx-auto dark:bg-zinc-900 dark:border-zinc-400 dark:text-zinc-300"
          name="username"
          placeholder="用户名"
        />
        <input
          type="passworn"
          class="w-full px-1 pb-1 outline-0 border-b border-b-zinc-900 focus:border-b-main text-base mx-auto dark:bg-zinc-900 dark:border-zinc-400 dark:text-zinc-300"
          name="password"
          placeholder="密码"
        />
      </form>

      <!-- 去注册 -->
      <div
        class="text-right text-zinc-400 text-sm mt-1 cursor-pointer"
        @click="onToRigister"
      >
        去注册
      </div>

      <m-button class="rounded w-full bg-main mt-6 dark:bg-zinc-800">
        登录
      </m-button>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const onToRigister = () => {
  router.push('/register')
}
</script>
<style lang="scss"></style>
