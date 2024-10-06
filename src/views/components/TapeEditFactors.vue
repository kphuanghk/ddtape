<template>

  <div>
    <div v-for="(f, idx) in selectedTape.factors" class="flex justify-start items-center">
      <div>
        <input v-model="f.name" placeholder="參數" />
        <input v-model="f.value" placeholder="數值" />
        <input v-model="f.standard" placeholder="標準" />
      </div>
      <div>
        <button class="p-1" @click="fSwapUp(selectedTape, idx)">Up</button>
        <button class="p-1" @click="fSwapDown(selectedTape, idx)">Down</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Tape } from '@/types';
import { selectedTape } from '../../utils/tape'
const fSwapUp = (t: Tape, i: number) => {
  if (i == 0) return
  const f = t.factors[i]
  t.factors[i] = t.factors[i - 1]
  t.factors[i - 1] = f
}

const fSwapDown = (t: Tape, i: number) => {
  if (t.factors.length - 1 <= i) return
  const f = t.factors[i]
  t.factors[i] = t.factors[i + 1]
  t.factors[i + 1] = f
}
</script>

<style scoped>
input {
  @apply p-1 rounded-md m-1 text-black
}
</style>
