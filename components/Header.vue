<template>
<header class="header">
  <nuxt-link to="/" class="header__top"><span class="header__logo">taichanブログ</span></nuxt-link>
  <nav class="header__nav">
    <ul class="header__list">
      <li v-for="n in nav" :key="`nav-${n.title}`" class="header__list-item">
        <nuxt-link :to="n.path" class="header__link">{{n.title}}</nuxt-link>
      </li>
    </ul>
  </nav>
</header>
</template>

<script>
export default {
  data(){
    return {
      nav: [
        { path: '/', title: 'Home' },
        { path: '/about', title: 'About'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: darkseagreen;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 8px 30px 8px 16px;
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 99;

  &__top {
    align-items: center;
    color: #333;
    display: flex;
    text-decoration: none;
    justify-content: center;
  }

  &__logo {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  &__nav {
    display: flex;
  }

  &__list {
    display: flex;
    align-items: center;
    margin: 0;
    &-item {
      display: block;
      list-style: none;
      margin-left: 16px;
    }
  }

  &__link {
    color: #333;
    text-decoration: none;
  }
}

</style>
