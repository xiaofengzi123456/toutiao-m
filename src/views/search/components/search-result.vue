<template>
  <div class="search-result-container">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
      <van-cell v-for="(article, index) in resultList" :key="index" :title="article.title"></van-cell>
    </van-list>
  </div>
</template>
<script>
import { reqSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      resultList: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      const result = await reqSearchResult({ page: this.page, per_page: this.perPage, q: this.searchText })
      // console.log(result.data)
      this.resultList.push(...result.data.data.results)
      this.loading = false
      if (this.page * this.perPage >= result.data.data.total_count) {
        this.finished = true
      } else {
        this.page++
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result-container {
    position: fixed;
    right: 0;
    left: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
}
</style>
