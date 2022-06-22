import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Propiedad } from "./propiedad.entity";

@Entity('plataforma')
export class Plataforma {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    url: string;

    @OneToMany(type => Propiedad, propiedad => propiedad.fk_barrio)
    propiedades : Propiedad[];
}