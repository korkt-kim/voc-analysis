import { handlers as historyOfSearch } from './history/search'
import { handlers as tag } from './tag'
import { handlers as user } from './user'
import { handlers as voc } from './voc'

export const handlers = [...historyOfSearch, ...tag, ...user, ...voc]
