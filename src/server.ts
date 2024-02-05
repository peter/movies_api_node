import Fastify from 'fastify'
import { addRoutes } from './routes'
import { dbTest } from './db-test'
import * as openapi from './openapi'

export async function start(port: number) {
    try {
        await dbTest()
        const server = Fastify({
            logger: true
        })
        openapi.setup(server)    
        server.register((server, _options, done) => {
            addRoutes(server)
            done()
          })
          const host = '0.0.0.0'
          await server.listen({ port, host })              
    } catch (err: any) {
        console.error(err.stack || err)
        process.exit(1)
    }
}