<template>
  <div class="container">
    <template v-if="error.statusCode === 404">
      <h1>ページが見つかりません。</h1>
      お探しのページは存在しないか削除されました。
    </template>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'default',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error']
}
</script>
