<template>
  <div class="search-history-container">
    <van-cell center title="历史记录" >
      <div slot="default" v-if="isShowDelete" >
        <span @click="deleteAll">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isShowDelete = false">完成</span>
      </div>
      <van-icon slot="right-icon" name="delete-o" v-else @click="isShowDelete = true"></van-icon>
    </van-cell>
    <van-cell v-for="(history, index) in searchHistories" :key="index" :title="history" @click="deleteEvery(history, index)">
      <van-icon name="close" v-show="isShowDelete"></van-icon>
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  data () {
    return {
      isShowDelete: false
    }
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteAll () {
      // removeItem('search-history')
      // this.searchHistories.splice(0, this.searchHistories.length)
      this.$emit('update-searchHistories', [])
    },
    deleteEvery (history, index) {
      if (this.isShowDelete) {
        // this.searchHistories.splice(index, 1)
        this.$emit('update-searchHistories', index)
        // setItem('search-history', this.searchHistories)
      } else {
        this.$emit('search', history)
      }
    }
  },
  watch: {
    searchHistories () {
      setItem('search-history', this.searchHistories)
    }
  }
}
</script>

<style>

</style>
