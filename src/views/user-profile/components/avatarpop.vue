<template>
  <div class="avatar-wrap">
    <img :src="newAvatar" ref="image" class="image" />
    <van-nav-bar
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    ></van-nav-bar>
  </div>
</template>

<script>
import { reqUpdateAvatar } from '@/api/user'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'AvatarPop',
  props: ['avatar'],
  data () {
    return {
        cropper: null,
        newAvatar: this.avatar
    }
  },
  methods: {
    async onClickRight () {
        this.$toast.loading({
            message: '保存中...',
            forbidClick: true,
            duration: 0
        })
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {
            const fd = new FormData()
            fd.append('photo',blob)
            // console.log(typeof(blob));object
            const result = await reqUpdateAvatar(fd)
            // console.log(result)
        if (result.status == 200) {
            this.$toast.success('保存成功')
            this.$emit('finish')
        } else {
            this.$toast.fail('保存失败')
        }
        })
    }
  },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        // autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false,
        movable: true
    } )
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #000;
}
.image {
    display: block;
    max-width: 100%;
}
</style>
