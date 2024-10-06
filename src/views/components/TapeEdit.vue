<template>
  <Teleport to="body">
    <div class="h-screen w-screen fixed left-0 top-0 overflow-auto z-30 bg-gray-400 p-3">
      <div>
        <button @click="fCloseShowEditTape">Close</button>
        <button @click="gViewProduct = true">View</button>
      </div>

      <div>
        <button @click="editSection = EditSection.Product">Product</button>
        <button @click="editSection = EditSection.Factors">Factors</button>
      </div>
      <TapeEditProductInfo v-if="editSection == EditSection.Product" />
      <TapeEditFactors v-if="editSection == EditSection.Factors" />
      <PdfViewer :tape="selectedTape" v-if="gViewProduct" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { fCloseShowEditTape, selectedTape, gViewProduct } from '@/utils/tape'
import TapeEditFactors from './TapeEditFactors.vue'
import TapeEditProductInfo from './TapeEditProductInfo.vue'
import { onMounted, ref } from 'vue';
import PdfViewer from '@/components/PdfViewer.vue';

enum EditSection {
  Product,
  Factors
}

const editSection = ref<EditSection>(EditSection.Product)

onMounted(() => {
  console.log("Load...");
})
</script>

<style scoped>
input {
  @apply p-1 rounded-md m-1 text-black
}
</style>
