<template>
  <div v-if="toc.length > 0" class="toc">
    <div class="toc__title">この記事の目次</div>
    <ul class="toc__list">
      <li
        v-for="item in toc"
        :key="`toc-${item.id}`"
        class="toc__list-item"
        :class="`toc__list-item_${item.name}`"
      >
        <nuxt-link
          v-scroll-to="`#${item.id}`"
          :to="`#${item.id}`"
          class="toc__list__link"
        >
          {{ item.text }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import cheerio from 'cheerio'
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toc: []
    }
  },
  created() {
    const $ = cheerio.load(this.article.body)
    const headings = $('h2, h3').toArray()
    this.toc = headings.map(data => ({
      text: data.children[0].data,
      id: data.attribs.id,
      name: data.name
    }));
  },
  mounted() {
    const hash = this.$route.hash
    if (hash && hash.match(/^#.+$/)) {
      this.$scrollTo(hash)
    }
  }
}
</script>

<style lang="scss" scoped>
.toc {
  margin: 12px 0;
  background-color: #F0F0F0;
  display: flex;
  flex-direction: column;

  &__title {
    font-weight: bold;
    text-align: center;
    margin: 16px 0 8px;
  }

  &__list {
    list-style: none;
    margin: 0 0 16px 0;
    &-item {
      line-height: 1.8;
      padding-left: 12px;
      position: relative;

      &::before {
        border-radius: 100%;
        content: '';
        background-color: mediumseagreen;
        display: block;
        height: 6px;
        width: 6px;
        position: absolute;
        left: 0;
        top: 12px;
      }
      &_h3 {
        margin-left: 16px;
      }
    }

    &__link {
      color: #333;
      text-decoration: none;
    }
  }
}
</style>
