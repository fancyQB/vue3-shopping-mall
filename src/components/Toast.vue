import { reactive } from 'vue';
<template>
  <div class="toast"> {{ message}} </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export const useToastEffect = () => {
  const toastData = reactive({
    message: '',
    isShow: false
  })
  const showToast = (message, second = 2, callback) => {
    toastData.message = message
    toastData.isShow = true
    setTimeout(() => {
      toastData.isShow = false
      toastData.message = ''
      if (typeof callback === 'function') {
        callback()
      }
    }, second * 1000)
  }
  const { message, isShow } = toRefs(toastData)
  return { showToast, message, isShow }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Toast',
  props: ['message']
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: .1rem;

  background-color: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  color: #fff;

}
</style>
