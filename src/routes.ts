import { FastifyInstance } from 'fastify'

export async function addRoutes(server: FastifyInstance) {
  server.get('/ping', {}, async () => {
    return {
        status: 'OK',
    }
  })
}
