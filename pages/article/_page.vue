<template>
  <div class="container">
    <main class="main">
      <h1 class="title">{{ article.title }}</h1>
      <p class="published_at">{{ article.parsedPublishedAt }}</p>
      <div v-if="article.description" class="description">{{ article.description }}</div>
      <Toc :article="article"></Toc>
      <div class="post" v-html="article.body"></div>
      <div class="tags">
        タグ:
        <Tag v-for="t in article.tags" :id="t.id" :key="`tag-${t.id}`" :name="t.name" />
        <span v-if="article.tags.length < 1">なし</span>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  head()  {
    const head = {
      title: `${this.article.title} | taichanブログ`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
    if (this.article.noindex) {
      head.meta.push({ hid: "robots", name: "robots", content: "noindex" })
    }
    return head
  },
  async asyncData({ params, $microcms }) {
    const data = {};
    data.article = await $microcms.get({
      endpoint: `article/${params.page}`,
      queries: {}
    });

    Object.assign(data.article, {
      parsedPublishedAt: data.article.publishedAt.slice(0, 10).replace(/-/gi,'/')
    })
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
.published_at {
  display: flex;
  justify-content: flex-end;
  margin: 8px 0;
}
.tags {
  margin: 4px 0;
}
</style>
