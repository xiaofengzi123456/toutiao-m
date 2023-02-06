<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch"
      @cancel="$router.back()" @focus="isShowResult=false" />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isShowResult" :searchText="searchText"></SearchResult>
    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText" :searchText="searchText" @search="onSearch"></SearchSuggestion>
     <!-- 历史记录 -->
    <SearchHistory :searchHistories="searchHistories" @search="onSearch" @update-searchHistories="updateSearchHistories" v-else></SearchHistory>
  </div>
</template>

<script>
import SearchSuggestion from '@/views/search/components/search-suggestion'
import SearchHistory from '@/views/search/components/search-history'
import SearchResult from '@/views/search/components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: { SearchSuggestion, SearchHistory, SearchResult },
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isShowResult: false,
      searchHistories: getItem('search-history') || []
    }
  },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      // console.log(searchText);
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(searchText)
      setItem('search-history', this.searchHistories)
      this.isShowResult = true
    },
    updateSearchHistories (data) {
      if (typeof data === 'object') {
        this.searchHistories = data
      } else {
        this.searchHistories.splice(data, 1)
      }
    }
  }
}
</script>

<style>

</style>
