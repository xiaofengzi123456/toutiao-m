<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
      @submit="onLogin"
      @failed="onFailed"
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down v-if="isShowCountDown" :time="1000 * 60" format="ss s" @finish="isShowCountDown=false"/>
          <van-button style="vertical-align: middle;" v-else class="send-btn" size="mini" round :loading="isSendSmsLoading" @click.prevent="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqLogin, reqSendSms } from '@/api/user'
import { Toast } from 'vant'
// import { mapMutations } from 'vuex'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3-9]{1}\d{9}/, message: '手机号格式错误' },
          { trigger: 'onBlur' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /\d{6}/, message: '验证码格式错误' },
          { trigger: 'onBlur' }
        ]
      },
      isShowCountDown: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const result = await reqLogin(this.user)
        // console.log(result)
        this.$store.commit('SETUSER', result.data.data)
        Toast.success('登录成功')
        this.$store.commit('REMOVECACHEPAGES', 'LayoutIndex')
        // this.$router.back()// 试验
        this.$router.push(this.$route.query.redirect || '/')
      } catch (error) {
        Toast.fail('登录失败,手机号或验证码错误')
      }
    },
    onFailed (errorInfo) {
      if (errorInfo.errors[0]) {
        this.$toast({
          message: errorInfo.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoading = true
        await reqSendSms(this.user.mobile)
        this.isShowCountDown = true
      } catch (error) {
        let message = ''
        if (error.name === 'mobile') {
          message = error.message
        } else if (error.response && error.response.status === 429) {
          message = error.response.data.message
        } else {
          message = '未知错误'
        }
        this.$toast({
          message: message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
}
</style>
