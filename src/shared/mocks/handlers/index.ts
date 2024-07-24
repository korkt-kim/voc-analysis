import { handlers as exampleHandlers } from './example'
import { handlers as historyOfSearch } from './history/search'

export const handlers = [...exampleHandlers, ...historyOfSearch]
