<template>
  <div class="text-black dark:text-white">
    <div>
      <button @click="tapes.push(fNewSpecInSC())">新增中文规格参数</button>
      <button>新增英文规格参数</button>
    </div>
    <div v-for="t in tapes" class="flex flex-col p-3 border-b-2">
      <div class="flex items-center justify-center">
        <div class="w-1/5"><input v-model="t.name" placeholder="产品名称" /></div>
        <div class="w-1/5"><input v-model="t.model" placeholder="型号" /></div>
        <div class="w-1/5"><input v-model="t.lang" placeholder="语言" /></div>
        <div class="w-1/5">
          <button @click="fAddFactor(t)" class="p-1 border-collapse border-red-100">Add</button>
          <button @click="fSaveTape(t)" class="p-1 border-collapse border-red-100">Save</button>
          <button @click="fEditTape(t)" class="p-1 border-collapse border-red-100">Edit</button>
        </div>
      </div>
      <div><input v-model="t.application" class="w-full" /></div>
      <div>
        <div v-for="(f, idx) in t.factors" class="flex justify-start items-center">
          <div>
            <input v-model="f.name" placeholder="參數" />
            <input v-model="f.value" placeholder="數值" />
            <input v-model="f.standard" placeholder="標準" />
          </div>
          <div>
            <button class="p-1" @click="fSwapUp(t, idx)">Up</button>
            <button class="p-1" @click="fSwapDown(t, idx)">Down</button>
          </div>
        </div>
      </div>
      <div>
        <button>Template_1</button>
        <button>Template_2</button>
        <button>Add Images</button>
      </div>
    </div>
  </div>
  <TapeEdit v-if="gShowEditTape" />
</template>

<script setup lang="ts">
import { Tape } from '@/types';
import api from '@/utils/api'
import { onMounted } from 'vue'
import { fetchTapes, gShowEditTape, selectedTape, tapes } from '../utils/tape'
import TapeEdit from '@/views/components/TapeEdit.vue'



const fAddFactor = (t: Tape) => {
  t.factors.push({ name: '', standard: '', value: '', ordering: 0 })
}

const fEditTape = (t: Tape) => {
  selectedTape.value = t
  gShowEditTape.value = true
}

onMounted(fetchTapes)

const fNewSpecInSC = (): Tape => {
  const t: Tape = {
    tapeId: 0,
    name: '',
    model: '',
    lang: 'cn',
    application: '',
    subtitle: '',
    terms: '',
    factors: [
      { name: '胶带厚度（u）', value: '140±5', standard: 'GB / T7125 - 2014' },
      { name: '初粘力（mm）14#', value: '≤120', standard: 'GB / T4852 - 2002(斜槽法)' },
      { name: '对钢板粘着力（N / 24mm）', value: '≥30', standard: 'GB / T2792 - 2014(放置20分钟（25u PET测）' },
      { name: '保持力（min / 24 * 24mm）', value: '≥1000', standard: 'GB / T4851 - 2014' },
      { name: '胶带颜色', value: '半透明', standard: '' },
      { name: '耐温性', value: '常温使用' },
      { name: '基材', value: '普通棉纸' },
      { name: '离型材料', value: '空白离型纸' },
      { name: '离型效果', value: '好' }
    ]
  }
  return t
}

const fSaveTape = async (t: Tape) => {
  try {
    if (parseInt(`${t.tapeId}`) > 0) {
      const { data } = await api.put('http://localhost:5138/tape/', t)
      console.log(data)
    } else {
      const { data } = await api.post('http://localhost:5138/tape/', t)
      console.log(data)
    }
    await fetchTapes()
  } catch (error) {
    console.log(error)
  }
}

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
  @apply p-1 m-1 text-black rounded-md shadow-md focus:bg-blue-200;
}
</style>
