import "reflect-metadata"
import { DataSource } from "typeorm"
import { Movie } from "./entity/Movie"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "movies-api-node",
    synchronize: true,
    logging: true,
    entities: [Movie],
    migrations: [],
    subscribers: [],
})
