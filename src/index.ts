import * as server from './server'

const port = parseInt(process.env.PORT || '8080')
server.start(port)
