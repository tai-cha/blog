<template>
  <article class="article">
    <nuxt-link :to="`/article/${article.id}`" class="article__link">
      <div class="article__image-container">
      </div>
      <div class="article__details">
        <h2 class="article__title">{{ article.title }}</h2>
        <div class="article__description">
          {{ article.description }}
        </div>
        <div class="article__bottom">
          <div class="tags">
            <Tag v-for="t in article.tags" :id="t.id" :key="`tag-${t.id}`" :name="t.name" />
          </div>
          <div class="article__date">{{ article.publishedAt.slice(0, 10).replace(/-/gi,'/') }}</div>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .article {
    background-color: #FCFCFC;
    display: flex;
    padding: 12px;
    margin: 12px 0;

    &__link {
      color: #333;
      display: flex;
      text-decoration: none;
      width: 100%;
    }
    &__image-container {
      height: 120px;
      margin-right: 20px;
      min-width: 192px;
      width: 192px;
      line-height: 100%;
      background-color: #47494e;
    }
    &__details {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    &__title {
      margin: 0 0;
      font-size: 18px;
    }
    &__description {
      font-size: 16px;
      flex-grow: 1;
    }
    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
