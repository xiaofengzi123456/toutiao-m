<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        class="edit-btn"
        slot="default"
        size="mini"
        round
        plain
        type="danger"
        @click="isEdit = !isEdit"
        style="vertical-align: middle"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item :class="{ active: active === index }" v-for="(channel, index) in myChannels" :key="channel.id" :text="channel.name" :icon="(isEdit && index !==0) ? 'close' : ''" @click="handleMyChannel(channel, index)" />
    </van-grid>
     <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="rChannel in recommendChannels" :key="rChannel.id" :text="rChannel.name" @click="onAdd(rChannel)" />
    </van-grid>
  </div>
</template>

<script>
import { reqAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(item => {
        const compareResult = this.myChannels.every(item2 => {
          return item2.name !== item.name
        })
        if (compareResult) {
          return true
        } else {
          return false
        }
      })
    },
    ...mapState(['user'])
  },
  methods: {
    async getAllChannels () {
      const result = await reqAllChannels()
      this.allChannels = result.data.data.channels
    },
    async onAdd (rChannel) {
      // this.myChannels.push(rChannel)
      this.$emit('update-channels', rChannel)
      if (this.user) {
        try {
          await addUserChannel({ channels: [{ id: rChannel.id, seq: this.myChannels.length }] })
        } catch (error) {
          console.log(error)
        }
      } else {
        setItem('user-channels', this.myChannels)
      }
    },
    async handleMyChannel (channel, index) {
      if (this.isEdit && index !== 0) {
        this.$emit('deleteMyChannel', index)
        // this.myChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1)
        }
        if (this.user) {
          try {
            await deleteUserChannel(channel.id)
          } catch (error) {
            console.log(error)
          }
        } else {
          setItem('user-channels', this.myChannels)
        }
      } else {
        // 切换频道
        this.$emit('close', index)
      }
    }
  },
  created () {
    this.getAllChannels()
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
  .channel-title {
    font-size: 16px;
    color: #333;
  }
  .edit-btn {
    width: 50px;
  }
  .van-grid-item {
    width: 80px;
    height: 43px;
    /deep/ .van-grid-item__content {
        background-color: #f4f5f6;
        .van-grid-item__text {
            font-size: 14px;
            color: #222;
            margin-top: 0;
        }
    }
    /deep/ .van-grid-item__icon {
        position: absolute;
        right: -5px;
        top: -5px;
        color: #ccc;
        font-size: 16px;
    }
  }
  .active {
    /deep/ .van-grid-item__content {
      .van-grid-item__text {
        color: red;
      }
    }
  }
}
</style>
