import { User } from '@/types'
import { ref } from 'vue'

export const authorized = ref(false)

export const user = ref<User>()
