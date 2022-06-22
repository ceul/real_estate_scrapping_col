import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Propiedad } from "./propiedad.entity";

@Entity('tipo_negocio')
export class TipoNegocio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(type => Propiedad, propiedad => propiedad.fk_barrio)
    propiedades : Propiedad[];
}