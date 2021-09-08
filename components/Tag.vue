<template>
  <object class="tag">
    <nuxt-link :to="`/tag/${id}`" class="tag__link">{{name}}</nuxt-link>
  </object>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  background-color: lightgreen;
  border-radius: 4px;
  color: dimgray;
  display: inline-block;
  padding: 2px 4px;
  margin: 0 2px;
  text-decoration: none;
  &__link {
    color: dimgray;
    text-decoration: none;
  }
}
</style>
