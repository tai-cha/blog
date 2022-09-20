<template>
  <div class="container">
    <h1 v-if="tag">タグ「{{tag.name}}」のついた記事一覧</h1>
    <div class="articles">
      <Article v-for="content in contents" :key="content.id" :article="content"/>
    </div>
    <ul v-if="totalCount > limit" class="pagination">
      <li v-visible="page > 1" class="pagination__item">
        <nuxt-link v-if="tagId === null" :to="`/page/${page - 1}`">&lt;</nuxt-link>
        <nuxt-link v-else :to="`/tags/${tagId}/page/${page - 1}`">&lt;</nuxt-link>
      </li>
      <li v-for="p of (totalCount / limit)" :key="`pagination-${p}`" class="pagination__item" :class="Number(page) === p ? 'pagination__item_current' : ''">
        <nuxt-link v-if="tagId === null" :to="`/page/${p}`">{{ p }}</nuxt-link>
        <nuxt-link v-else :to="`/tags/${tagId}/page/${p}`">{{ p }}</nuxt-link>
      </li>
      <li v-visible="totalCount - page * limit > 0" class="pagination__item">
        <nuxt-link v-if="tagId === null" :to="`/page/${Number(page) + 1}`">&gt;</nuxt-link>
        <nuxt-link v-else :to="`/tags/${tagId}/page/${Number(page) + 1}`">&gt;</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
const PAR_PAGE = 1;
export default {
  directives: {
    'visible': {
      bind(el, binding) {
	      el.style.visibility = binding.value ? 'visible' : 'hidden';
      }
    }
  },

  async asyncData({params, $microcms, redirect}) {
    if (params?.p === '1') {
      if (params?.tagId === undefined) return redirect(301, '/');
      else return redirect(301, `/tag/${params.tagId}`)
    }
    const page = params.p || '1';
    const tagId = params.tagId || null;
    const queries = {
      offset: (page - 1) *  PAR_PAGE,
      limit: PAR_PAGE,
      filters: "isHidden[equals]false"
    }
    if (tagId !== null) queries.filters += `[and]tags[contains]${tagId}`;
    const data = await $microcms.get({
      endpoint: 'article',
      queries
    });
    Object.assign(data, {page, tagId})
    if (params.tagId) {
      data.tag = await $microcms.get({
        endpoint: `tags/${tagId}`
      });
    } else data.tag = null;
    return data;
  }
}
</script>
<style lang="scss" scoped>
  .articles {
    display: flex;
    flex-direction: column;
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0;

    &__item {
      align-items: center;
      background-color: #FCFCFC;
      display: flex;
      height: 2em;
      justify-content: center;
      width: 2em;

      a {
        color: #333;
        text-decoration: none;
      }
      
      &_current {
        background-color: darkseagreen;
        a {
          color: #FCFCFC;
        }
      }
    }
  }
</style>
