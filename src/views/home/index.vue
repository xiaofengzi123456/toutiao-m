<template>
  <div class="home-container">
    <!-- 顶部导航搜索栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button class="search-btn" slot="title" icon-prefix="toutiao" icon="sousuo" type="info" round to="/search" size="small">搜索</van-button>
    </van-nav-bar>
    <!-- 文章频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="isShowChannelEdit=true" class="wap-nav-wrap">
        <van-icon name="wap-nav"></van-icon>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup v-model="isShowChannelEdit" position="bottom" closeable close-icon-position="top-left" get-container="body" style="height: 100%;">
      <ChannelEdit :myChannels="channels" :active="active" @close="handleClose" @update-active="updateActive" @update-channels="updateChannels" @deleteMyChannel="deleteMyChannel"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { reqUserChannels } from '@/api/user'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
import ArticleList from '@/views/home/components/article-list.vue'
import ChannelEdit from '@/views/home/components/channel-edit.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      isShowChannelEdit: false,
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () {
      if (this.user) {
        try {
          const result = await reqUserChannels()
          this.channels = result.data.data.channels
        } catch (error) {
          console.log(error)
        }
      } else {
        const localChannels = getItem('user-channels')
        if (localChannels) {
          this.channels = localChannels
        } else {
          try {
            const result2 = await reqUserChannels()
            this.channels = result2.data.data.channels
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    handleClose (index) {
      this.isShowChannelEdit = false
      this.active = index
    },
    updateActive (index) {
      this.active = index
    },
    updateChannels (rChannel) {
      this.channels.push(rChannel)
    },
    deleteMyChannel (index) {
      this.channels.splice(index, 1)
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    border: none;
    .van-button__icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  /deep/ .van-tabs__nav {
    .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    .van-tabs__line {
      width: 15px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
    .wap-nav-placeholder {
    width: 24px;
    height: 43px;
    flex-shrink: 0;
    border-bottom: 1px solid #edeff3;
    }
    .wap-nav-wrap {
    position: fixed;
    width: 33px;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    background-color: #fff;
    border-bottom: 1px solid #edeff3;
    opacity: .9;
    .van-icon {
      font-size: 24px;
    }
    &:before {
      content: '';
      width: 1px;
      height: 40px;
      background-image: linear-gradient(to bottom, white 0, rgb(212, 204, 204) 20px, white 40px);
      position: absolute;
      left: 0;
    }
    }
  }
}
</style>
