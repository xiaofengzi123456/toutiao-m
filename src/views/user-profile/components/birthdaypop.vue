<template>
  <div>
    <van-datetime-picker
  v-model="newBirthday"
  type="date"
  :min-date="minDate"
  :max-date="maxDate"
  confirm-button-text="完成"
  @confirm="changeBirthday"
  @cancel="$emit('close')"
/>
  </div>
</template>
    
<script>
import { reqUpdateUserInfo } from '@/api/user'
export default {
  name: 'BirthdayPop',
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      newBirthday: new Date(this.birthday),
    };
  },
  props: ['birthday'],
  methods: {
    async changeBirthday (value) {
        const year = value.getFullYear()
        let month = value.getMonth()
        month++
        // console.log(month);
        const day = value.getDate()
        this.newBirthday = year + '-' + month + '-' + day
        const result = await reqUpdateUserInfo({ birthday: this.newBirthday })
        // console.log(result);
        if (result.status == 200) {
            this.$emit('update:birthday', this.newBirthday)
            this.$emit('finish')
        }
    }
  }
}
</script>

<style scoped lang="less">

</style>