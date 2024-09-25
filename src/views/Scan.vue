<template>
  <div class="no-select">
    <div class="p-2">
      <input v-model="barcoderesult.original" class="w-[300px]" @keyup.enter="fSave" />
      <button @click="fSave">Add</button>
    </div>
    <div class="bg-blue-50 p-2 m-2 rounded-md">
      <div v-for="s in ScanLogs" class="flex">
        <div class="w-1/3">
          {{ s.scandate }}
        </div>
        <div class="w-1/3">
          {{ s.scantime }}
        </div>
        <div class="w-1/3">
          {{ s.barcode.original }}
          <span @click="fDeleteScanLog(s.barcode.original)" class="cursor-pointer"> X </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarcodeResult, fInitBarcodeResult, gfAddScanLog, gfGetScanLog, ScanLogs, fDeleteScanLog } from '@/state/idb'
import { ref, toRaw } from 'vue'

const barcoderesult = ref<BarcodeResult>(fInitBarcodeResult())

const fSave = async () => {
  console.log(barcoderesult.value)
  await gfAddScanLog(toRaw(barcoderesult.value))
  barcoderesult.value.original = ''
  ScanLogs.value = (await gfGetScanLog()).reverse()
}

</script>

<style scoped>
input {
  @apply p-2 rounded-sm;
}
</style>
