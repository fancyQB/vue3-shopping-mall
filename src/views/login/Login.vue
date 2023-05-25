<template>
  <div class="wrapper">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
      <div class="wrapper__input">
        <input type="text" class="wrapper__input__content" placeholder="请输入手机号" v-model="username">
      </div>
      <div class="wrapper__input">
        <input type="password" class="wrapper__input__content" placeholder="请输入手机密码" v-model="password">
      </div>
      <div class="wrapper__login_button" @click="handleLogin">登录</div>
      <div class="wrapper__register" @click="handleRegister">立即注册</div>
      <Toast :message="message" v-if="isShow" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const { username, password } = toRefs(data)
  const handleLogin = async () => {
    if (username.value === '' || password.value === '') {
      showToast('请填写账号密码')
      return
    }
    try {
      const ret = await post('/user/login', data)
      if (ret?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  return { username, password, handleLogin }
}

const use2RegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { showToast, message, isShow } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegister } = use2RegisterEffect()
    return { handleLogin, handleRegister, username, password, message, isShow }
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
