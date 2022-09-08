<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800 xl:pt-1 overflow-auto">
    <div
      class="relative max-w-screen-lg xl:border border-zinc-300 bg-white xl:dark:border-zinc-200 rounded-sm dark:bg-zinc-900 mx-auto xl:py-1 xl:px-2"
    >
      <!-- 移动端navbar -->
      <m-navbar sticky :clickLeft="clickLeft" v-if="isMobileTerinal">
        个人资料
      </m-navbar>
      <!-- pc端标题 -->
      <div
        v-else
        class="text-xl font-bold text-zinc-900 dark:text-zinc-300 text-center xl:mb-4"
      >
        个人资料
      </div>
      <!-- 主题区域 -->
      <div class="w-full h-full px-1 mt-2 pb-4 xl:w-2/3 xl:pb-0">
        <!-- 我的头像 -->
        <div class="px-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="text-base font-bold text-zinc-900 dark:text-zinc-300 mb-1"
          >
            我的头像
          </span>
          <div
            class="relative group w-[80px] h-[80px] cursor-pointer mb-2 xl:mx-auto"
            @click="onHandleChangeImg"
          >
            <img
              :src="$store.getters.userInfo.avatar"
              class="w-[80px] h-[80px] rounded-full"
            />
            <div
              class="w-[80px] h-[80px] absolute top-0 left-0 rounded-full bg-black/40 hidden xl:group-hover:block"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></m-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5 text-center"
              >
                点击更换头像
              </div>
            </div>
          </div>
          <input
            type="file"
            ref="inputTarget"
            v-show="false"
            accept=".jpg,.jpeg,.png,.gif"
            @change="onInputChange"
          />
          <p class="text-xs text-zinc-400 xl:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>
        <!-- 用户名 -->
        <div class="px-1 mb-2 xl:flex xl:items-center xl:py-1">
          <div
            class="font-bold dark:text-zinc-3000 text-sm mb-1 w-8 xl:mb-0 dark:text-zinc-300"
          >
            用户名
          </div>
          <m-input
            class="w-full"
            type="text"
            v-model="userInfo.nickname"
          ></m-input>
        </div>
        <!-- 职位 -->
        <div class="px-1 mb-2 xl:flex xl:items-center xl:py-1">
          <div
            class="font-bold dark:text-zinc-3000 text-sm mb-1 w-8 xl:mb-0 dark:text-zinc-300"
          >
            职位
          </div>
          <m-input
            class="w-full"
            type="text"
            v-model="userInfo.title"
          ></m-input>
        </div>
        <!-- 公司 -->
        <div class="px-1 mb-2 xl:flex xl:items-center xl:py-1">
          <div
            class="font-bold dark:text-zinc-3000 text-sm mb-1 w-8 xl:mb-0 dark:text-zinc-300"
          >
            公司
          </div>
          <m-input
            class="w-full"
            type="text"
            v-model="userInfo.company"
          ></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="px-1 mb-2 xl:flex xl:items-center xl:py-1">
          <div
            class="font-bold dark:text-zinc-3000 text-sm mb-1 w-8 xl:mb-0 dark:text-zinc-300"
          >
            个人主页
          </div>
          <m-input
            class="w-full"
            type="text"
            v-model="userInfo.homePage"
          ></m-input>
        </div>
        <!-- 个人介绍 -->
        <div class="px-1 mb-2 xl:flex xl:items-center xl:py-1">
          <div
            class="font-bold dark:text-zinc-3000 text-sm mb-1 w-8 xl:mb-0 dark:text-zinc-300"
          >
            个人介绍
          </div>
          <m-input
            class="w-full"
            type="textarea"
            max="50"
            v-model="userInfo.introduction"
          ></m-input>
        </div>

        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onHandlePutProfile"
          :isLoading="loading"
        >
          保存修改
        </m-button>
        <m-button
          v-if="isMobileTerinal"
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogout"
        >
          退出登录
        </m-button>
      </div>
    </div>
    <m-dialog
      v-if="!isMobileTerinal"
      title="裁剪图片"
      v-model="isDialogVisible"
    >
      <change-avatar
        :blob="curBlob"
        @close="isDialogVisible = false"
      ></change-avatar>
    </m-dialog>

    <m-popup v-else v-model="isDialogVisible">
      <change-avatar
        :blob="curBlob"
        @close="isDialogVisible = false"
      ></change-avatar>
    </m-popup>
  </div>
</template>

<script setup>
import { isMobileTerinal } from '@/utils/flexble'
import { useStore } from 'vuex'
import { confirm } from '@/libs'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { putProfile } from '@/api/sys'
import { message } from '@/libs'
import ChangeAvatar from './components/change-avatar.vue'

const store = useStore()
const router = useRouter()
// 退出登录
const onLogout = () => {
  confirm('确认退出么？').then(() => {
    store.dispatch('user/logout')
  })
}
// 更换头像
const inputTarget = ref(null)
const onHandleChangeImg = () => {
  inputTarget.value.click()
}
// 返回
const clickLeft = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}

const userInfo = ref(store.getters.userInfo)
// // 本地数据双向绑定
// const changeUserInfo = (key, val) => {
//   store.commit('user/setUserinfo', {
//     ...store.getters.userInfo,
//     [key]: val
//   })
// }
// 保存修改
const loading = ref(false)
const onHandlePutProfile = async () => {
  loading.value = true
  await putProfile(userInfo.value)
  message('success', '修改成功')
  store.commit('user/setUserinfo', userInfo.value)
  loading.value = false
}
// 选择图片回调
const isDialogVisible = ref(false) //是否显示diallog
const curBlob = ref('') //图片回显地址
const onInputChange = () => {
  // 获取上传的图片
  const imgValue = inputTarget.value.files[0]
  // 生成blob
  curBlob.value = URL.createObjectURL(imgValue)
  isDialogVisible.value = true
}
// 当关闭dialog时，清空选择的图片
watch(isDialogVisible, (val) => {
  if (!val) {
    inputTarget.value.value = null
  }
})
</script>
<style lang="scss"></style>
