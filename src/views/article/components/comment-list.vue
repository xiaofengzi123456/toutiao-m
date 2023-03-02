<template>
  <div class="comment-wrap">
    <h6 class="title">全部评论</h6>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem :comment="comment" v-for="(comment, index) in list" :key="index" @showReplyPop="$emit('showReplyPop', $event )"></CommentItem>
    </van-list>
  </div>
</template>

<script>
// , reqSendComments, reqCommentsLike, reqCancleCommentsLike
import { reqGetComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: () => 'a'
    }
  },
  methods: {
    async onLoad () {
      const result = await reqGetComments({ type: this.type, source: this.source, offset: this.offset, limit: this.limit })
      // console.log(result);
      this.$emit('update-total-count', result.data.data.total_count)
      this.list.push(...result.data.data.results)
      this.offset = result.data.data.last_id
      this.loading = false
      if (this.list.length === result.data.data.total_count) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.title {
  margin: 10px 0;
  padding: 0 16px;
  font-size: 16px;
}
</style>
