<template>
  <div class="search-suggestion-container">
    <van-cell icon="search" v-for="(suggestion, index) in suggestionsList" :key="index" @click="$emit('search', suggestion)">
      <div slot="title" v-html="highlight(suggestion)" ></div>
    </van-cell>
  </div>
</template>

<script>
import { reqSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestionsList: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    highlight (suggestion) {
      if (suggestion) {
        return suggestion.replace(new RegExp(this.searchText, 'gi'), `<span style="color: red;">${this.searchText}</span>`)
      } else {
        return suggestion
      }
    }
  },
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(async function () {
        const result = await reqSearchSuggestions({ q: this.searchText })
        this.suggestionsList = result.data.data.options
      }, 1000)
    }
  }
}
</script>

<style>

</style>
