<template>
  <m-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        v-if="$store.getters.token"
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <!-- 头像 -->
        <img class="w-3 h-3 rounded-sm" :src="$store.getters.userInfo.avatar" />
        <!-- 下箭头 -->
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <!-- vip 标记 -->
        <m-svg-icon
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
          v-if="$store.getters.userInfo.vipLevel"
        ></m-svg-icon>
      </div>
      <div v-else>
        <m-svg-icon
          class="guide-my w-4 h-3"
          name="profile"
          fillClass="fill-zinc-400"
          @click="onToLogin"
        ></m-svg-icon>
      </div>
    </template>

    <div v-if="$store.getters.token" class="w-[140px] overflow-hidden p-1">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          iconColor="#fff"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">
          {{ item.title }}
        </span>
      </div>
    </div>
  </m-popover>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

// 构建 menu 数据源
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]

const onToLogin = () => {
  router.push('/login')
}
// 点击
const onItemClick = (item) => {
  if (item.id === 2) {
    //退出登录
    store.dispatch('user/logout')
    return
  } else if (item.id === 0) {
    router.push('/profile')
  }
}
</script>
