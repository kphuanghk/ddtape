<template>
  <teleport to="body">
    <div class="fixed left-0 top-0 z-30 w-screen h-screen">
      <iframe src="blank.html" type="application/pdf" ref="pdfviewframe" width="100%" height="100%"
        class="bg-red-200 object-center"></iframe>
    </div>
    <div
      class="fixed bottom-0 left-0 h-10 z-30 w-full flex text-base bg-[#515151]/50 text-white font-semibold items-center justify-between">
      <div class="px-3 select-none">LEAN SOFTWARE LIMITED</div>
      <button @click="fCloseViewProduct" class="select-none mr-3 px-2 py-1 hover:bg-[#616161]">Close</button>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { Tape } from '@/types';
import api from '@/utils/api'
import { selectedTape, fCloseViewProduct } from '@/utils/tape';
import { onMounted, PropType, ref } from 'vue'

const pdfviewframe = ref<HTMLIFrameElement>()

defineProps({
  "tape": {
    type: Object as PropType<Tape>,
    required: true
  }
})

const url = 'http://localhost:5138/print/spec/v1/'

onMounted(async () => {
  try {
    const { data } = await api.get(url + selectedTape.value.tapeId, { responseType: 'blob' })
    const content = URL.createObjectURL(data)
    pdfviewframe.value!.src = content
  } catch (error) {
    console.log(error)
  }
})
</script>
