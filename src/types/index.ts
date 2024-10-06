export type User = {
  userId: number
  name: string
  loginName: string
  password: string
  email: string
  errorMsg: string
  created: string
}

export type Factor = {
  ordering?: number
  name: string
  value: string
  standard?: string
}

export type Tape = {
  tapeId: number | string
  name: string
  model: string
  lang: string
  application: string
  subtitle: string
  terms: string
  factors: Factor[]
}

export const fInitUser = (): User => ({
  userId: 0,
  password: '',
  name: '',
  loginName: '',
  created: '',
  email: '',
  errorMsg: ''
})
