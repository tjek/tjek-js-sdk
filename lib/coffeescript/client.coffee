import localStorage from './storage/client-local'
import { uuid } from './util'
client = do ->
    id = localStorage.get 'client-id'
    id = id?.data
    firstOpen = not id?

    if firstOpen
        id = uuid()
        
        localStorage.set 'client-id', id

    firstOpen: firstOpen
    id: id


export default client
