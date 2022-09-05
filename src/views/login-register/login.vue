<template>
  <div class="w-screen h-full bg-zinc-200 dark:bg-zinc-800 xl:pt-8">
    <div
      class="w-full h-full xl:w-[440px] xl:h-[550px] mx-auto bg-white rounded dark:bg-zinc-900 overflow-hidden px-3"
    >
      <div class="text-base font-bold text-main text-center mt-4 mb-5">
        账号登录
      </div>

      <vee-form @submit="onHandleLogin">
        <vee-field
          type="text"
          class="w-full px-1 pb-1 outline-0 border-b border-b-zinc-900 focus:border-b-main text-base mx-auto dark:bg-zinc-900 dark:border-zinc-400 dark:text-zinc-300"
          name="username"
          placeholder="用户名"
          :rules="validateName"
          v-model="loginParams.username"
        />
        <vee-error-message
          class="text-xs text-main block mt-0.5"
          name="username"
        />
        <vee-field
          type="password"
          class="w-full px-1 pb-1 outline-0 border-b border-b-zinc-900 focus:border-b-main text-base mx-auto dark:bg-zinc-900 dark:border-zinc-400 dark:text-zinc-300"
          name="password"
          placeholder="密码"
          :rules="validatePass"
          v-model="loginParams.password"
        />
        <vee-error-message
          class="text-xs text-main block mt-0.5"
          name="password"
        />
        <!-- 去注册 -->
        <div
          class="text-right text-zinc-400 text-sm mt-1 cursor-pointer"
          @click="onToRigister"
        >
          去注册
        </div>

        <m-button
          class="rounded w-full bg-main mt-6 dark:bg-zinc-800"
          :isLoading="loading"
        >
          登录
        </m-button>
      </vee-form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
  </div>
  <slide-captcha
    v-if="isVisibleCaptcha"
    @close="isVisibleCaptcha = false"
    @success="onCaptchaSuccess"
  ></slide-captcha>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { validatePass, validateName } from './validate'
import SlideCaptcha from './slide-captcha.vue'
import { ref } from 'vue'
import {
  Field as VeeField,
  Form as VeeForm,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { useStore } from 'vuex'
import { LOGIN_TYPE_USERNAME } from '@/constant/'

const store = useStore()
const router = useRouter()

const onToRigister = () => {
  router.push('/register')
}

// 登录
const onHandleLogin = () => {
  isVisibleCaptcha.value = true
}

const isVisibleCaptcha = ref(false)
const onCaptchaSuccess = () => {
  isVisibleCaptcha.value = false
  onLogin()
  console.log('触发登陆')
}
// 登录信息
const loginParams = ref({
  password: '392985547Wc',
  username: 'wangxiaochao'
})
// 用户登录行为
const loading = ref(false)
const onLogin = () => {
  loading.value = true
  try {
    store.dispatch('user/login', {
      ...loginParams.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>
<style lang="scss"></style>
