import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Barrio } from "./barrio.entity";
import { Departamento } from "./departamento.entity";

@Entity('ciudad')
export class Ciudad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(type => Departamento, departamento => departamento.id)
    fk_departamento: Departamento;

    @OneToMany(type => Barrio, barrio => barrio.fk_ciudad)
    barrios: Barrio;
}