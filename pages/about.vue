<template>
  <div class="container">
    <main class="main">
      <h1 class="title">taichanブログについて</h1>
      <div v-if="article.description" class="description">{{ article.description }}</div>
      <Toc :article="article"></Toc>
      <div class="post" v-html="article.body"></div>
    </main>
  </div>
</template>

<script>
  export default {
    head()  {
      return {
        title: `${this.article.title} | taichanブログ`
      }
    },
    async asyncData({ params, $microcms }) {
      const data = {};
      data.article = await $microcms.get({
        endpoint: `article/about`,
        queries: {}
      });
      return data;
    }
  }
</script>

<style lang="scss" scoped>
.main {
  background-color: #FCFCFC;
  padding: 4px 20px 8px;
}
.title {
  margin: 20px 0 8px;
}
</style>

