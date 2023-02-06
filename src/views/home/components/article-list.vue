<template>
  <div class="article-list-container">
    <van-pull-refresh v-model="isPullDownLoading" @refresh="onRefresh" :success-duration="1000" :success-text="refreshSuccessText">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem :article="article" v-for="article in articles" :key="article.art_id"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  data () {
    return {
      timestamp: Date.now(),
      articles: [],
      loading: false,
      finished: false,
      isPullDownLoading: false,
      refreshSuccessText: ''
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      // 异步获取数据
      const result = await reqArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp
      })
      this.timestamp = result.data.data.pre_timestamp
      this.articles.push(...result.data.data.results)
      this.loading = false
      if (!this.timestamp) {
        this.finished = true
      }
    },
    async onRefresh () {
      const result = await reqArticles({
        channel_id: this.channel.id,
        timestamp: Date.now()
      })
      // 去重
      const newArr = result.data.data.results.filter(item => {
        const compareResult = this.articles.some(item2 => {
          return item2.art_id === item.art_id
        })
        if (compareResult) {
          return false
        } else {
          return true
        }
      })
      this.articles.unshift(...newArr)
      this.isPullDownLoading = false
      this.refreshSuccessText = `刷新了${newArr.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list-container {
  position: fixed;
  top: 90px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
</style>
