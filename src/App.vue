<script setup lang="ts">
import { onMounted } from 'vue'
import { Buffer } from 'buffer'

console.log(Buffer)
onMounted(() => {
  const a = '144'
  console.log(a)
  import.meta.env.BASE_URL
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
