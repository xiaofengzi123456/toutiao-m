<template>
  <div>
    <van-nav-bar
      title="修改性别"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div class="gender-wrap">
      <van-picker :columns="genders" :default-index="this.gender" @change="changeGender" />
    </div>
  </div>
</template>

<script>
import { reqUpdateUserInfo } from '@/api/user'
export default {
  name: 'GenderPop',
  data () {
    return {
        newGender: this.gender,
        genders: ['男', '女']
    }
  },
  props: ['gender'],
  methods: {
    async onClickRight() {
      const result = await reqUpdateUserInfo({ gender: this.newGender })
    //   console.log(result);
      if (result.status == 200) {
        this.$emit('update:gender', this.newGender)
        this.$emit('finish')
      }
    },
    changeGender (value, index) {
        if (index == '男') {
            this.newGender = '0'
        } else {
            this.newGender = '1'
        }
    }
  }
}
</script>

<style scoped lang="less">

</style>
