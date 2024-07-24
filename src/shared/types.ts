import { Models } from './consts'

export type Model = (typeof Models)[number]

export interface VOC {
  author: string
  email: string
  category: string
  division: string
  gubun: 'KO' | 'US'
  model: Model
  title: string
  detail: string
  attachments: string
}
