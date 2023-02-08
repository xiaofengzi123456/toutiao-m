<template>
  <van-cell class="article-item" :to="{ name: 'article', params: { article_id: article.art_id, aut_id: article.aut_id } }">
    <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-imgs" v-if="article.cover.type === 3">
        <van-image class="cover-imgs-item" fit="cover" v-for="(img,index) in article.cover.images" :key="index" :src="img"></van-image>
      </div>
      <div class="spans-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image class="right-cover" fit="cover" slot="value" v-if="article.cover.type === 1" :src="article.cover.images[0]"></van-image>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
    .title {
      font-size: 16px;
      color: #3a3a3a;
    }
    /deep/ .van-cell_value {
      flex: unset;
      width: 116px;
      height: 73px;
      margin-left: 12px;
    }
    .right-cover {
      width: 116px;
      height: 73px;
    }
    .cover-imgs{
      display: flex;
      padding: 15px 0;
      .cover-imgs-item {
        flex: 1;
        // width: 116px;
        height: 73px;
        &:nth-child(2) {
          margin:0 4px;
        }
    }
    }
    .spans-wrap {
      font-size: 11px;
      span {
        margin-right: 12px;
      }
    }
}
</style>
