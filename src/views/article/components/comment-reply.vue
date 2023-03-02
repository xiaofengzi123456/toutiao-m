<template>
<div>
  <van-nav-bar>
    <div slot="left" @click="$emit('close')">
      <van-icon name="cross"></van-icon>
    </div>
    <div slot="title">{{comment.reply_count}}条回复</div>
  </van-nav-bar>
  <CommentItem :comment="comment"></CommentItem>
  <CommentList :source="comment.com_id" type="c" :list="replyList"></CommentList>
  <div class="footer">
    <van-button type="default" round class="reply-btn" @click="handleReply">回复</van-button>
  </div>
  <van-popup v-model="isShowReply" position="bottom" class="sendReplyPop">
      <van-field
        v-model="message"
        rows="4"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="优质评论会被优先展示"
        show-word-limit
        ref="replyInput"
      />
      <span @click="sendReply">发布</span>
    </van-popup>
</div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
import { reqSendComments } from '@/api/comment'
export default {
  name: 'CommentReply',
  data () {
    return {
      isShowReply: false,
      message: '',
      replyList: []
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    article_id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList
  },
  methods: {
    handleReply () {
      this.isShowReply = true
      this.$nextTick(() => {
        this.$refs.replyInput.focus()
      })
    },
    async sendReply () {
      if (!this.message.trim()) {
        this.$toast.fail('发布内容不能为空')
        return
      }
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      const result = await reqSendComments({ target: this.comment.com_id, content: this.message, art_id: this.article_id })
    //   console.log(result)
      this.replyList.unshift(result.data.data.new_obj)
      this.message = ''
      this.isShowReply = false
      this.$toast.success('发布成功')
      this.comment.reply_count++
    }
  }
}
</script>

<style scoped lang="less">
.footer {
  height: 51px;
  box-sizing: border-box;
  padding: 10px 26px;
  border-top: 1px solid rgb(156, 151, 151);
  // border-bottom: 1px solid rgb(70, 67, 67);
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .reply-btn {
    width: 100px;
    height: 30px;
    color: #8d8686;
  }
}
.sendReplyPop {
  display: flex;
  align-items: center;
  .van-field {
    width: 320px;
    font-size: 14px;
  }
  span {
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
