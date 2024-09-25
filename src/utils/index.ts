import { User } from '@/types'
import { fakerEN } from '@faker-js/faker'

export const filterData = <T extends { [key: string | number]: any }>(
  currentPage: number,
  recordsPerPage: number,
  dataList: T[],
  searchInput: string,
  searchField: string
) => {
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const filteredList = dataList.filter((val) => {
    // Convert the name to lowercase for case-insensitive search
    const name = val[searchField]
    if (!searchInput) {
      return true
    }
    return name.toLowerCase().includes(searchInput.toLowerCase()) || name == searchInput
  })

  return filteredList.slice(startIndex, endIndex)
}

export const fSampleUsers = (): User[] => {
  const users: User[] = []
  for (let i = 0; i < 100; i++) {
    const userId = i + 1
    const firstName = fakerEN.person.firstName()
    const lastName = fakerEN.person.lastName()
    const loginName = firstName + userId
    const name = firstName + ' ' + lastName
    users.push({
      userId,
      name,
      email: fakerEN.internet.email(),
      password: fakerEN.internet.password(),
      created: fakerEN.date.birthdate() + '',
      loginName,
      errorMsg: ''
    })
  }
  return users
}
