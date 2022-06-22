import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity('departamento')
export class Departamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(type => Ciudad, ciudad => ciudad.fk_departamento)
    ciudades: Ciudad[]
}