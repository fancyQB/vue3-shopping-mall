<template>
  <div class="position">
    <i class="iconfont position_icon">&#xe619;</i>
    北京理工大学国防科技园2号楼10层
    <i class="iconfont position_bell">&#xe63f;</i>
  </div>

  <div class="search">
    <span class="iconfont search__icon">&#xe65c;</span>
    <span class="tips-text">山姆会员商店优惠商品</span>
  </div>

  <div class="banner">
    <img
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
      alt=""
      class="banner__img"
    />
  </div>

  <div class="icons">
    <div class="icons__item" v-for="(item, index) in data" :key=index>
      <img
        class="icons__item__img"
        :src="item.imgUrl"
      />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <div class="rectangle"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const data = [
      {
        desc: '超市便利',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png'
      },
      {
        desc: '菜市场',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png'
      },
      {
        desc: '水果店',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png'
      },
      {
        desc: '鲜花绿植',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png'
      },
      {
        desc: '医药健康',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png'
      },
      {
        desc: '家居时尚',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png'
      },
      {
        desc: '烘焙蛋糕',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png'
      },
      {
        desc: '签到',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png'
      },
      {
        desc: '大牌免运',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png'
      },
      {
        desc: '红包套餐',
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png'
      }
    ]
    return { data }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixins.scss";
.position {
  position: relative;
  padding: 0.16rem 0.16rem 0.16rem 0;
  font-size: 0.16rem;
  line-height: 0.22rem;
  color: $font-color;
  @include single-ellipsis;

  .position_icon {
    margin-right: 0.04rem;
    position: relative;
    top: 0.01rem;
    font-size: 0.2rem;
  }
  .position_bell {
    position: absolute;
    top: 0.18;
    right: 0;
  }
}

.search {
  height: 0.32rem;
  border-radius: 0.16rem;
  background: #f5f5f5;
  color: #b7b7b7;
  .tips-text {
    display: inline-block;
    margin-top: 0.08rem;
    margin-left: 0.12rem;
    line-height: 0.16rem;
    font-size: 0.14rem;
  }
  &__icon {
    display: inline-block;
    margin-left: 0.16rem;
    font-size: 0.16rem;
  }
}
.banner {
  margin-bottom: 0.16rem;
  &__img {
    margin-top: 0.12rem;
    height: 0.86rem;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  padding: 0 0.08rem;

  &__item {
    margin-bottom: 0.16rem;
    width: 20%;
    height: 0.63rem;
    text-align: center;
    &__img {
      margin-bottom: 0.06rem;
      width: 0.4rem;
      height: 0.4rem;
    }
  }
}

.rectangle {
  margin: 0 -0.18rem;
  height: 0.1rem;
  background-color: #f1f1f1;
}
</style>
