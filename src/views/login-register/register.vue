<template>
  <div class="w-screen h-full bg-zinc-200 dark:bg-zinc-800 xl:pt-8">
    <div
      class="w-full h-full xl:w-[440px] xl:h-[550px] mx-auto bg-white rounded dark:bg-zinc-900 overflow-hidden px-3"
    >
      <div class="text-base font-bold text-main text-center mt-4 mb-5">
        账号注册
      </div>

      <vee-form @submit="onHandleRedister">
        <vee-field
          type="text"
          class="w-full px-1 pb-1 outline-0 border-b border-b-zinc-900 focus:border-b-main text-base mx-auto dark:bg-zinc-900 dark:border-zinc-400 dark:text-zinc-300"
          name="username"
          placeholder="用户名"
          :rules="validateName"
          v-model="regParams.username"
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
          v-model="regParams.password"
        />
        <vee-error-message
          class="text-xs text-main block mt-0.5"
          name="password"
        />
        <vee-field
          type="password"
          class="w-full px-1 pb-1 outline-0 border-b border-b-zinc-900 focus:border-b-main text-base mx-auto dark:bg-zinc-900 dark:border-zinc-400 dark:text-zinc-300"
          name="confirmPassword"
          placeholder="确认密码"
          rules="validateConfirmPassword:@password"
          v-model="regParams.confirmPassword"
        />
        <vee-error-message
          class="text-xs text-main block mt-0.5"
          name="confirmPassword"
        />
        <!-- 去注册 -->
        <div
          class="text-right text-zinc-400 text-sm mt-1 cursor-pointer"
          @click="onToLogin"
        >
          去登录
        </div>

        <m-button
          class="rounded w-full bg-main mt-6 dark:bg-zinc-800"
          :isLoading="loading"
        >
          立即注册
        </m-button>
      </vee-form>
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
import { validatePass, validateName, validateConfirmPassword } from './validate'
import { ref } from 'vue'
import {
  Field as VeeField,
  Form as VeeForm,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'
import { useStore } from 'vuex'
import { LOGIN_TYPE_USERNAME } from '@/constant/'

const store = useStore()
const router = useRouter()

// 去登录
const onToLogin = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}

// 注册数据
const regParams = ref({
  password: '',
  username: '',
  confirmPassword: ''
})

// 注册
const loading = ref(false)
const onHandleRedister = async () => {
  loading.value = true
  const curParams = {
    password: regParams.value.password,
    username: regParams.value.username
  }
  try {
    await store.dispatch('user/register', curParams)
    await store.dispatch('user/login', {
      ...curParams,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
// 插入规则
defineRule('validateConfirmPassword', validateConfirmPassword)
</script>
<style lang="scss"></style>
