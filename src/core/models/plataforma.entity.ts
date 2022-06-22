import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('plataforma')
export class Plataforma {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    url: string;
}