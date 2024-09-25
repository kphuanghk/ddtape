import dayjs from 'dayjs'
import type { DBSchema, IDBPDatabase } from 'idb'
import { openDB } from 'idb'
import { computed, ref, watch } from 'vue'

const DBName = 'scanlogs'
const StoreName = 'scanlogs'

export type BarcodeResult = {
  original: ''
  formattedbarcode: string
  gtin: string
  exp: string
  batch: string
  serial: string
  formattedDate: string
  validDate: boolean
}

export type ScanLog = {
  scandate: string
  scantime: string
  barcode: BarcodeResult
}

export const fInitBarcodeResult = (): BarcodeResult => ({
  original: '',
  formattedbarcode: '',
  gtin: '',
  exp: '',
  batch: '',
  serial: '',
  formattedDate: '',
  validDate: false
})

interface LeanScan extends DBSchema {
  scanlogs: {
    value: ScanLog
    key: string
    indexes: { 'by-scandate': string; 'by-scantime': string; 'by-barcode': string }
  }
}

// @ts-ignore
let db: IDBPDatabase<LeanScan>

const idbready = ref(false)

openDB<LeanScan>(DBName, 1, {
  upgrade(db) {
    // Create a store of objects
    const store = db.createObjectStore(StoreName, {
      // If it isn't explicitly set, create a value by auto incrementing.
      autoIncrement: true
    })
    // Create an index on the 'date' property of the objects.
    store.createIndex('by-scandate', 'scandate')
    store.createIndex('by-scantime', 'scantime')
    store.createIndex('by-barcode', 'barcode.original')
  }
}).then((v) => {
  db = v
  idbready.value = true
})

watch(idbready, async () => {
  ScanLogs.value = (await gfGetScanLog()).reverse()
})

export const gfGetScanLog = async (date: string = dayjs().format('YYYY-MM-DD')) => {
  return await db.getAllFromIndex(DBName, 'by-scandate', date)
}

export const fDeleteScanLog = async (original: string) => {
  const result = await db.getAllKeysFromIndex(DBName, 'by-barcode', original)
  console.log(result)
  for (let i = 0; i < result.length; i++) {
    await db.delete(StoreName, IDBKeyRange.only(result[i]))
  }
  ScanLogs.value = (await gfGetScanLog()).reverse()
}

export const ScanLogs = ref<ScanLog[]>([])

export const gActivateDebugCounter = ref(1)

export const fInitScanLog = (): ScanLog => ({ scandate: '', scantime: '', barcode: fInitBarcodeResult() })

export const gDebug = computed(() => gActivateDebugCounter.value % 5 == 0)

export const gfAddScanLog = async (barcode: BarcodeResult) => {
  console.log('Add to Scan log')
  //const tx = await db.transaction(DBName)
  const log: ScanLog = {
    scandate: dayjs().format('YYYY-MM-DD'),
    scantime: dayjs().format('HH:mm.ss'),
    barcode
  }
  await db.put(DBName, log)
  ScanLogs.value.push(log)
}

export const gImportDataValidations = ref<string[]>([])

export const gfClearImportValidations = () => (gImportDataValidations.value = [])

export const gMaximizedItemDetailCount = ref(0)

export const gMaximizedItemDetail = ref(false)

export const gOptionRemoveBatchLeadingZero = ref(true)
