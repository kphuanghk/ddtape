import axios, { AxiosRequestConfig } from 'axios'
import dayjs from 'dayjs'

const { VITE_API_BASEURL, VITE_TOKEN } = import.meta.env

const api = axios.create({
  baseURL: VITE_API_BASEURL,
  validateStatus: (status) => {
    return status < 500 // Treat all 2xx and 4xx status codes as successful
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(VITE_TOKEN) || ''
  if (token.length > 10 && config.headers) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
})

api.interceptors.response.use(
  (resp) => resp,
  (error) => (error.name === 'AxiosError' ? Promise.resolve() : Promise.reject(error))
)

const blobConfig: AxiosRequestConfig = {
  responseType: 'blob'
}

export const blobclick = async (endpoint: string) => {
  const { data } = await api.get(endpoint, blobConfig)

  const url = window.URL.createObjectURL(new Blob([data]))
  const link: any = document.createElement('a')
  link.href = url
  link.setAttribute('download', `AuctionReport_${dayjs().format('YYMMDDHHmmss')}.xlsx`)
  document.body.appendChild(link)
  // Simulate a click on the download link
  link.click()
  // Clean up the temporary URL and the download link
  link.parentNode.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export const auctionHubEndPoint = VITE_API_BASEURL + '/auctionhub'

export default api
