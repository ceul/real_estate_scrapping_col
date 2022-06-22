import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";
import { Propiedad } from "./propiedad.entity";

@Entity('barrio')
export class Barrio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(type => Ciudad, ciudad => ciudad.id)
    fk_ciudad: Ciudad;

    @OneToMany(type => Propiedad, propiedad => propiedad.fk_barrio)
    propiedades : Propiedad[];
}