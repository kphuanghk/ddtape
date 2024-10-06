import { Tape } from '@/types'
import { ref } from 'vue'
import api from './api'

export const fInitTape = (): Tape => ({
  tapeId: 0,
  name: '',
  model: '',
  lang: 'cn',
  application: '',
  subtitle: '',
  terms: '',
  factors: []
})

export const tapes = ref<Tape[]>([])

export const gShowEditTape = ref(false)

export const gViewProduct = ref(false)

export const fCloseViewProduct = () => (gViewProduct.value = false)

export const fCloseShowEditTape = () => (gShowEditTape.value = false)

export const fOpenShowEditTape = () => (gShowEditTape.value = true)

export const selectedTape = ref<Tape>(fInitTape())

export const fetchTapes = async () => {
  const { data } = await api.get('http://localhost:5138/tape/list')
  tapes.value = data
}

export const fAddSelectedFactor = () => {
  selectedTape.value.factors.push({ name: '', standard: '', value: '', ordering: 0 })
}

export const fSaveSelectedTape = async () => {
  try {
    if (parseInt(`${selectedTape.value.tapeId}`) > 0) {
      const { data } = await api.put('http://localhost:5138/tape/', selectedTape.value)
      console.log(data)
    } else {
      const { data } = await api.post('http://localhost:5138/tape/', selectedTape.value)
      console.log(data)
    }
    await fetchTapes()
  } catch (error) {
    console.log(error)
  }
}
