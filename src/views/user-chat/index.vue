<template>
  <div>
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group class="messages-wrap" ref="messagesWrap">
      <van-cell v-for="(item,index) in messages" :key="index" :title="item.msg"></van-cell>
    </van-cell-group>
    <div class="send">
      <van-field
        class="send-content"
        :border="false"
        v-model="message"
        placeholder="请输入消息"
      ></van-field>
      <van-button class="send-btn" size="small" type="primary" @click="sendChat">发送</van-button>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import io from 'socket.io-client'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'UserChat',
  data() {
    return {
      message: '',
      socket: null,
      messages: getItem('chat-messages') || []
    }
  },
  created () {
    const socket = io('http://toutiao.itheima.net', {
      query: {
        token: store.state.user.token
      },
      transports: ['websocket']
    })
    this.socket = socket
    this.socket.on('connect', function () {
      console.log('已连接')
    })
    this.socket.on('disconnect', function () {
      console.log('已断开连接')
    })
    this.socket.on('message', data => {
        // console.log(data);
            this.messages.push(data)
            // console.log(this.messages);
    })
  },
  methods: {
    sendChat () {
        this.socket.emit('message', { msg: this.message, timestamp: Date.now() })
        this.messages.push({ msg: this.message, timestamp: Date.now() })
        // console.log(this.messages);
        this.message = ''
    },
    scrollToBottom () {
        const list = this.$refs.messagesWrap
        // console.log(list);
        list.scrollTop = list.scrollHeight
    }
  },
  watch: {
    messages :{
        immediate: true,
        handler () {
            setItem('chat-messages', this.messages)
        this.$nextTick(() => {
            this.scrollToBottom()
        })
        }
    } 
  }
}
</script>

<style scoped lang="less">
.messages-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.send {
  display: flex;
  align-items: center;
  padding: 0 14px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .send-btn {
    width: 60px;
    margin-left: 10px;
  }
}
</style>
