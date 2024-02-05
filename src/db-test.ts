import { AppDataSource } from './data-source'
import { Movie } from './entity/Movie'

export async function dbTest() {
    await AppDataSource.initialize()

    const movieRepository = AppDataSource.getRepository(Movie)

    console.log('Inserting a new movie into the database...')
    // const movie = new Movie()
    // movie.title = 
    // movie.plot = 
    const movie: any = {
        title: 'Oppenheimer',
        plot: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.'
    }
    await movieRepository.save(movie)
    console.log('Saved a new movie with id: ' + movie.id, movie)

    const foundMovie = await movieRepository.findOneBy({id: movie.id })
    console.log('findOneBy() id', foundMovie)

    const notFoundMovie = await movieRepository.findOneBy({id: 1234567 })
    console.log('findOneBy() id notFoundMovie', notFoundMovie == null)

    const movies = await movieRepository.find({ skip: 0, take: 10 })
    console.log('find()', movies)

    const moviesFiltered = await movieRepository
        .createQueryBuilder('movies')
        .where('movies.title = :title')
        .skip(0)
        .take(10)
        .setParameters({title: movie.title})
        .getMany()
    console.log('createQueryBuilder()...getMany()', moviesFiltered)

    const deleteResult = await movieRepository.delete(movie.id)
    console.log('delete()', deleteResult)

    const deleteResultMissing = await movieRepository.delete(1234567)
    console.log('delete() missing', deleteResultMissing)
}
