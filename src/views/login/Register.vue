<template>
  <div class="wrapper">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
      <div class="wrapper__input">
        <input type="text" class="wrapper__input__content" v-model="username" placeholder="请输入手机号">
      </div>
      <div class="wrapper__input">
        <input type="password" class="wrapper__input__content" v-model="password" placeholder="请输入密码">
      </div>
      <div class="wrapper__input">
        <input type="password" class="wrapper__input__content" v-model="rePassword" placeholder="确认密码">
      </div>
      <div class="wrapper__login_button" @click="handleRegister">注册</div>
      <div class="wrapper__register" @click="handle2Login">已有账号去登录</div>
      <Toast v-if="isShow" :message="message" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'

import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useRegisterEffect = (showToast, handle2Login) => {
  const data = reactive({
    username: '',
    password: '',
    rePassword: ''
  })
  const isDiff = () => {
    return data.password === data.rePassword
  }
  const handleRegister = async () => {
    if (!isDiff()) {
      showToast('密码不一致')
      return
    }
    try {
      const ret = await post('/user/register', {
        username: data.username,
        password: data.password
      })
      if (ret?.errno === 0) {
        showToast('注册成功,三秒后跳到登录界面', 3, handle2Login)
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败, 请重试')
    }
  }
  const { username, password, rePassword } = toRefs(data)
  return { handleRegister, username, password, rePassword }
}

const use2LoginEffect = () => {
  const router = useRouter()
  const handle2Login = () => {
    router.push({ name: 'Login' })
  }
  return { handle2Login }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { message, isShow, showToast } = useToastEffect()
    const { handle2Login } = use2LoginEffect()
    const { handleRegister, username, password, rePassword } = useRegisterEffect(showToast, handle2Login)
    return { handle2Login, handleRegister, message, isShow, showToast, username, password, rePassword }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.wrapper__img {
  display: block;
  margin: 0 auto;
  padding-bottom: .24rem;
  width: .66rem;
  height: .66rem;
}
.wrapper__input {
  box-sizing: border-box;
  margin: .16rem auto;
  padding: 0 .16rem;
  width: 2.95rem;
  height: .48rem;

  background: #F9F9F9;
  border: 1px solid rgba(0,0,0,0.10);
  border-radius: 6px;
  &__content {
    width: 100%;
    line-height: .48rem;
    font-size: 16px;
    border: none;
    outline: none;
    background: none;
    &::placeholder {
      color: $content-notice-fontcolor;

    }
  }
}
.wrapper__login_button {

  margin: .32rem auto .16rem auto;
  width: 2.95rem;
  height: .48rem;

  background-color: #0091FF;
  box-shadow: 0 4px 8px 0 rgba(0,145,255,0.32);
  border-radius: 4px;

  color: #fff;
  font-size: .16rem;
  line-height: .48rem;
  text-align: center;
}
.wrapper__register {
  line-height: .2rem;
  font-size: .14rem;

  color: $content-notice-fontcolor;
  text-align: center;
}
</style>
