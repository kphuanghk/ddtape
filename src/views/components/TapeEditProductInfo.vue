<template>
  <div>
    <div class="flex items-center justify-center">
      <div class="w-1/5"><input v-model="selectedTape.name" placeholder="产品名称" /></div>
      <div class="w-1/5"><input v-model="selectedTape.model" placeholder="型号" /></div>
      <div class="w-1/5"><input v-model="selectedTape.lang" placeholder="语言" /></div>

      <div class="w-1/5">
        <button @click="fAddSelectedFactor" class="p-1 border-collapse border-red-100">Add Factors</button>
        <button @click="fSaveSelectedTape" class="p-1 border-collapse border-red-100">Save</button>
      </div>
    </div>
    <div>
      <input v-model="selectedTape.subtitle" placeholder="Sub title" class="w-full" />
    </div>
    <div>
      <textarea v-model="selectedTape.terms" placeholder="Terms" class="h-[300px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { selectedTape, fSaveSelectedTape, fAddSelectedFactor } from '../../utils/tape'
</script>

<style scoped>
textarea {
  @apply p-2 rounded-md w-full
}

input {
  @apply p-1 m-3 text-black rounded-md shadow-md focus:bg-blue-200;
}
</style>