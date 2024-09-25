export type User = {
  userId: number
  name: string
  loginName: string
  password: string
  email: string
  errorMsg: string
  created: string
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
