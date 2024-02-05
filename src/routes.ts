import { FastifyInstance } from 'fastify'
import { AppDataSource } from './data-source'
import { Movie } from './entity/Movie'

export async function addRoutes(server: FastifyInstance) {
  const movieRepository = AppDataSource.getRepository(Movie)

  server.get('/ping', {}, async () => {
    return {
        status: 'OK',
    }
  })

  // Get movie by id
  server.get('/movies/:id', {}, async (req, reply) => {
    const { id } = req.params as any
    const movie = await movieRepository.findOneBy({ id })
    if (movie) {
      reply.send({ movie })
    } else {
      reply.status(404).send()
    }
  })
  
  // List movies
  // TODO: pagination and filtering
  server.get('/movies', {}, async (req, reply) => {
    const movies = await movieRepository.find({ skip: 0, take: 10 })
    reply.send({ movies })
  })

  // Create movie
  // TODO: validation
  server.post('/movies', {}, async (req, reply) => {
    const { movie } = req.body as any
    const result = await movieRepository.save(movie)
    reply.send({ movie: result })
  })

  // Update movie
  // TODO: handle 404
  // TODO: validation
  server.put('/movies/:id', {}, async (req, reply) => {
    const { id } = req.params as any
    const { movie } = req.body as any
    const result = await AppDataSource
      .createQueryBuilder()
      .update(Movie)
      .set(movie)
      .where("id = :id", { id })
      .execute()
    reply.send({ result }) 
  })
  
  // Delete movie
  // TODO: handle 404
  server.delete('/movies/:id', {}, async (req, reply) => {
    const { id } = req.params as any
    const result = await movieRepository.delete(id)
    reply.send({ result })
  })  
}
