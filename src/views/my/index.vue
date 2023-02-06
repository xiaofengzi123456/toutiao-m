<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell center :border="false" class="base-info">
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="CurrentUser.photo"
        />
        <span class="name" slot="title">昵称</span>
        <van-button class="update-btn" slot="default" round size="small">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <span slot="icon" class="count">{{ CurrentUser.art_count }}</span>
          <span slot="text" class="text">头条</span>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <span slot="icon" class="count">{{ CurrentUser.follow_count }}</span>
          <span slot="text" class="text">关注</span>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <span slot="icon" class="count">{{ CurrentUser.fans_count }}</span>
          <span slot="text" class="text">粉丝</span>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <span slot="icon" class="count">{{ CurrentUser.like_count }}</span>
          <span slot="text" class="text">获赞</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-else>
      <div>
        <img class="oppo" src="./oppo.jpg" alt="" @click="$router.push('/login')">
      </div>
      <div class="text">注册 / 登录</div>
    </div>
    <van-grid :column-num="2" class="nav-grid mb-4" :border="false">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to="/"  v-if="user" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell class="logout-cell" title="退出登录" v-if="user" @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reqCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      CurrentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确定退出吗？'
      }).then(
        () => { this.$store.commit('SETUSER', null) }
      ).catch(

      )
    },
    async loadCurrentUser () {
      const { data } = await reqCurrentUser()
      this.CurrentUser = data.data
    }
  },
  created () {
    // if (user) {
    this.loadCurrentUser()
    // }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .my-info {
    background-color: #3296fa;
    .base-info {
      background-color: unset;
      box-sizing: border-box;
      height: 115px;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
        vertical-align: middle;
      }
    }
    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 11px;
        }
      }
    }
    /deep/ .van-grid-item__content {
        background-color: unset;
      }
  }
  .not-login {
    height: 180px;
    background-color: #3296fa;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .oppo {
      width: 66px;
      height: 66px;
      border-radius: 50%;
    }
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
   /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }

}
</style>
