<template>
  <div class="user-profile">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="file" accept="image/*" @change="onFileChange">
    <van-cell title="头像" is-link  @click="$refs.file.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo"></van-image>
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isShowNamePop = true"></van-cell>
    <van-cell title="性别" :value="user.gender == 1 ? '女' : '男'" is-link @click="isShowGenderPop = true"></van-cell>
    <van-cell title="生日" :value="user.birthday" is-link @click="isShowBirthdayPop = true"></van-cell>

    <van-popup position="bottom" v-model="isShowNamePop" :style="{ height: '100%' }">
      <namepop v-model="user.name" v-if="isShowNamePop" @close="isShowNamePop = false"  @finish="isShowNamePop = false"></namepop>
    </van-popup>
    <van-popup position="bottom" :style="{ height: '50%' }" v-model="isShowGenderPop">
      <genderpop :gender.sync="user.gender"  v-if="isShowGenderPop" @close="isShowGenderPop = false" @finish="isShowGenderPop = false"></genderpop>
    </van-popup>
    <van-popup position="bottom" :style="{ height: '60%' }" v-model="isShowBirthdayPop">
      <birthdaypop :birthday.sync="user.birthday"  v-if="isShowBirthdayPop" @close="isShowBirthdayPop = false" @finish="isShowBirthdayPop = false"></birthdaypop>
    </van-popup>
    <van-popup position="bottom" :style="{ height: '100%' }" v-model="isShowAvatarPop" class="avatarpop">
      <avatarpop :avatar="avatar"  @close="isShowAvatarPop = false"  @finish="finishUpdateAvatar"></avatarpop>
    </van-popup>
  </div>
</template>

<script>
import { reqUserProfile } from '@/api/user'
import namepop from './components/namepop.vue'
import genderpop from './components/genderpop.vue'
import birthdaypop from './components/birthdaypop.vue'
import avatarpop from './components/avatarpop.vue'
export default {
  name: 'UserProfile',
  data () {
    return {
      user: {},
      isShowNamePop: false,
      isShowGenderPop: false,
      isShowBirthdayPop: false,
      isShowAvatarPop: false,
      avatar: null,
      // file: null
    }
  },
  components: {
    namepop,
    genderpop,
    birthdaypop,
    avatarpop
  },
  methods: {
    async loadUserProfile () {
      const result = await reqUserProfile()
      this.user = result.data.data 
      // console.log(result);
    },
    onFileChange () {
      this.isShowAvatarPop = true
      const avatarUrl = window.URL.createObjectURL(this.$refs.file.files[0])
      this.avatar = avatarUrl
      // this.file = this.$refs.file.files[0]
      // console.log('file', this.$refs.file.files[0]);
      this.$refs.file.value = ''
    },
    finishUpdateAvatar () {
      this.isShowAvatarPop = false
      this.loadUserProfile()
    }
  },
  created () {
    this.loadUserProfile()
  }
}
</script>

<style scoped lang="less">
.van-popup {
  background-color: #f5f7f9;
}
.avatarpop {
  background-color: #000;
}
</style>
