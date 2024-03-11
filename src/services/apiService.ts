import axios from 'axios'
import md5 from 'md5'

import { ResGetIds, ResGetItems } from './types'

const API_URL = 'http://api.valantis.store:40000/'
const API_PASSWORD = 'Valantis'

const instance = axios.create({
  baseURL: API_URL,
})

instance.interceptors.request.use(
  config => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const token = md5(`${API_PASSWORD}_${timestamp}`)
    config.headers['X-Auth'] = token

    return config
  },
  err => Promise.reject(err)
)

export const getIds = async (page: number) => {
  const res = await instance.post<ResGetIds>('', {
    action: 'get_ids',
    params: {
      offset: page,
      limit: 50,
    },
  })

  return res.data
}

export const getItems = async (ids: string[]) => {
  const res = await instance.post<ResGetItems>('', {
    action: 'get_items',
    params: { ids },
  })

  return res.data
}
