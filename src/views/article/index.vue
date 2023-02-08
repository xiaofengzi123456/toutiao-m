<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    >
      <div slot="right">
        <van-icon name="ellipsis" size="middle" color="white" />
      </div>
    </van-nav-bar>
    <h1 class="title">
      程序员程序员程序员程序员程序员程序员程序员程序员程序员
    </h1>
    <van-cell center class="author-info">
      <van-image
        class="avatar"
        slot="icon"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        round
        fit="cover"
      />
      <span slot="title" class="nickname">天涯小型可</span>
      <span slot="label" class="pubdate">14小时前</span>
      <van-button
        slot="default"
        round
        :type="isFollow ? 'default' : 'info'"
        :icon="isFollow ? '' : 'plus'"
        :disabled="isDisabled"
        class="follow-btn"
        @click="handleFollow"
      >
        {{ isFollow ? '已关注' : '关注' }}
      </van-button>
    </van-cell>
    <div class="markdown-body">
      <p>nidjhhhdnvnnvnvmishdfjdnsnjfdjfgbhjvcvndsjkksallvdjgjkgjrriekaskldasvmmdndjkfgjksdfmmdnbdfjjngks</p>
      <p>nidjhhhdnvnnvnvmishdfjdnsnjfdjfgbhjvcvndsjkksallvdjgjkgjrriekaskldasvmmdndjkfgjksdfmmdnbdfjjngks</p>
      <p>nidjhhhdnvnnvnvmishdfjdnsnjfdjfgbhjvcvndsjkksallvdjgjkgjrriekaskldasvmmdndjkfgjksdfmmdnbdfjjngks</p>
      <p>nidjhhhdnvnnvnvmishdfjdnsnjfdjfgbhjvcvndsjkksallvdjgjkgjrriekaskldasvmmdndjkfgjksdfmmdnbdfjjngks</p>
      <p>nidjhhhdnvnnvnvmishdfjdnsnjfdjfgbhjvcvndsjkksallvdjgjkgjrriekaskldasvmmdndjkfgjksdfmmdnbdfjjngks</p>
      <p>nidjhhhdnvnnvnvmishdfjdnsnjfdjfgbhjvcvndsjkksallvdjgjkgjrriekaskldasvmmdndjkfgjksdfmmdnbdfjjngks</p>
      <p>nidjhhhdnvnnvnvmishdfjdnsnjfdjfgbhjvcvndsjkksallvdjgjkgjrriekaskldasvmmdndjkfgjksdfmmdnbdfjjngkskcjksdfhdjfdjbdfjmnbgfjjdkskwitiuy5875389tuurgkdmmz,xmaksjdksjgjiorioeopwjfieifjrfdb,c</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v</p>
    </div>
    <div class="footer">
      <van-button type="default" round class="comment-btn">写评论</van-button>
      <van-icon name="comment-o"></van-icon>
      <van-icon name="star-o" v-if="!isCollect" @click="handleCollect"></van-icon>
      <van-icon name="star" color="orange" v-else @click="handleCollect"></van-icon>
      <van-icon name="good-job-o" v-if="!isLike" @click="handleLike"></van-icon>
      <van-icon name="good-job" color="orange" v-else @click="handleLike"></van-icon>
      <van-icon name="share-o"></van-icon>
    </div>
  </div>
</template>

<script>
import './github-markdown.css'
// import { reqArticleContent } from '@/api/article'
import { reqFollowUser, reqCancelFollow } from '@/api/user'
import { reqArticleContent, reqCollect, reqCancleCollect, reqLike, reqCancleLike } from '@/api/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      isFollow: false,
      isDisabled: false,
      isLike: false,
      isCollect: false
    }
  },
  props: {
    article_id: {
      type: [String, Number, Object],
      required: true
    },
    aut_id: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async reqArticleDetail () {
      const result = await reqArticleContent(this.article_id)
      console.log(result)
    },
    async reqFollow () {
      await reqFollowUser(this.aut_id)
    },
    async cancelFollow () {
      await reqCancelFollow(this.aut_id)
    },
    handleFollow () {
      this.isDisabled = true
      this.isFollow = !this.isFollow
      if (this.isFollow) {
        this.reqFollow()
      } else {
        this.cancelFollow()
      }
      this.isDisabled = false
    },
    async collect () {
      await reqCollect(this.article_id)
    },
    async cancleCollect () {
      reqCancleCollect(this.article_id)
    },
    handleCollect () {
      // this.isCollectLoading = true
      this.isCollect = !this.isCollect
      if (this.isCollect) {
        this.collect()
        this.$toast.success('已收藏')
      } else {
        this.cancleCollect()
        this.$toast.success('取消收藏成功')
      }
      this.isCollectLoading = false
    },
    async like () {
      await reqLike(this.article_id)
    },
    async cancleLike () {
      await reqCancleLike(this.article_id)
    },
    handleLike () {
      this.isLike = !this.isLike
      if (this.isLike) {
        this.like()
        this.$toast.success('已点赞')
      } else {
        this.cancleLike()
        this.$toast.success('取消点赞成功')
      }
    }
  },
  created () {
    // this.reqArticleDetail()
  }
}
</script>

<style scopeed lang="less">
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  margin: 0;
  background-color: #fff;
}
.author-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .nickname {
    font-size: 12px;
    color: #333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
  overflow-y: auto;
  position: fixed;
  top: 195px;
  bottom: 51px;
  left: 0;
  right: 0;
}
.footer {
  height: 51px;
  box-sizing: border-box;
  padding: 10px 16px;
  border-top: 1px solid rgb(156, 151, 151);
  // border-bottom: 1px solid rgb(70, 67, 67);
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .comment-btn {
    width: 130px;
    height: 30px;
  }
}
</style>
