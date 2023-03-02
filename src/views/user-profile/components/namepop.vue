<template>
  <div>
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div class="name-wrap">
      <van-field
        v-model="newName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
        ref="newName"
      />
    </div>
  </div>
</template>

<script>
import { reqUpdateUserInfo } from '@/api/user'
export default {
  name: 'NamePop',
  props: ['value'],
  data() {
    return {
      newName: this.value
    }
  },
  methods: {
    async onClickRight() {
      await reqUpdateUserInfo({ name: this.newName })
      // console.log(result);
      this.$emit('input', this.newName)
      this.$emit('finish')
    //   this.newName = ''
    }
  },
  mounted () {
    this.$refs.newName.focus()
  }
}
</script>

<style scoped lang="less">
.name-wrap {
  padding: 10px;
}
</style>
