import { FastifyInstance, RouteShorthandOptions } from 'fastify'
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

  const movieProperties = {
    title: { type: 'string' },
    plot: { type: 'string' },
  }

  // Create movie
  const createOptions: RouteShorthandOptions = {
    schema: {
        tags: ["movies"],
        description: 'create movie',
        body: {
          type: 'object',
          properties: {
            movie: {
              type: 'object',
              properties: movieProperties,
              required: ['title'],
              additionalProperties: false
            },
          },
          required: ['movie'],
          additionalProperties: false
        },
    },
  }
  server.post('/movies', createOptions, async (req, reply) => {
    const { movie } = req.body as any
    const result = await movieRepository.save(movie)
    reply.send({ movie: result })
  })

  // Update movie
  const updateOptions: RouteShorthandOptions = {
    schema: {
        tags: ["movies"],
        description: 'create movie',
        body: {
          type: 'object',
          properties: {
            movie: {
              type: 'object',
              properties: movieProperties,
              required: [],
              minProperties: 1,
              additionalProperties: false
            },
          },
          required: ['movie'],
          additionalProperties: false
        },
    },
  }
  server.put('/movies/:id', updateOptions, async (req, reply) => {
    const { id } = req.params as any
    const { movie } = req.body as any
    const result = await AppDataSource
      .createQueryBuilder()
      .update(Movie)
      .set(movie)
      .where("id = :id", { id })
      .execute()
    if (result.affected) {
      const updatedMovie = await movieRepository.findBy({ id })
      reply.send({ movie: updatedMovie }) 
    } else {
      reply.status(404).send()
    }
  })
  
  // Delete movie
  server.delete('/movies/:id', {}, async (req, reply) => {
    const { id } = req.params as any
    const result = await movieRepository.delete(id)
    if (result.affected) {
      reply.status(204).send()
    } else {
      reply.status(404).send()
    }
  })  
}
