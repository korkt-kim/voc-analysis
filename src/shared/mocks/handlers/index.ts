import { handlers as search } from './search'
import { handlers as summary } from './summary'
import { handlers as tag } from './tag'
import { handlers as user } from './user'
import { handlers as voc } from './voc'

export const handlers = [...search, ...tag, ...user, ...voc, ...summary]
