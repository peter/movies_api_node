import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    plot: string
}
