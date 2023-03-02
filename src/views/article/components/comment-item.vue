<template>
    <van-cell class="comment-item">
      <van-image
        class="avatar"
        slot="icon"
        round
        fit="cover"
        :src="comment.aut_photo"
      />
      <div slot="title" class="title">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="icon-wrap">
          <van-icon class="rightLike" name="good-job" color="orange" v-if="comment.is_liking" @click="handleCommentLike"></van-icon>
          <van-icon class="rightLike" name="good-job-o" v-else @click="handleCommentLike"></van-icon>
          <span class="rightLike" v-show="comment.like_count">{{ comment.like_count }}</span>
        </div>
      </div>
      <div slot="label">
        <p class="content">{{ comment.content }}</p>
        <div class="time-reply">
          <span class="pubdate">{{ comment.pubdate }}</span>
          <van-button type="default" size="mini" round @click="$emit('showReplyPop', comment)">{{ comment.reply_count }} 回复</van-button>
        </div>
      </div>
    </van-cell>
</template>

<script>
import { reqCommentsLike, reqCancleCommentsLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: [Object],
      required: true
    }
  },
  methods: {
    async commentLike () {
      await reqCommentsLike(this.comment.com_id)
    },
    async cancleCommentLike () {
      reqCancleCommentsLike(this.comment.com_id)
    },
    handleCommentLike () {
      this.comment.is_liking = !this.comment.is_liking
      if (this.comment.is_liking) {
        this.commentLike()
        this.comment.like_count += 1
        this.$toast.success('已点赞')
      } else {
        this.cancleCommentLike()
        this.comment.like_count -= 1
        this.$toast.success('取消点赞成功')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
  .title {
    padding: 0;
    display: flex;
    justify-content: space-between;
    .name {
    font-size: 14px;
    color: #406599;
    }
  }
  .content {
    font-size: 16px;
    color: #222;
    margin: 5px 0;
  }
  .time-reply {
    display: flex;
    align-items: center;
    .pubdate {
      font-size: 10px;
      margin-right: 10px;
    }
    .reply {
      height: 12px;
      width: 50px;
    }
  }
}
</style>
