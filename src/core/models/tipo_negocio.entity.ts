import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Propiedad } from "./propiedad.entity";

@Entity('tipo_negocio')
export class TipoNegocio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Propiedad, propiedad => propiedad.tipo_negocio)
    propiedades : Propiedad[];
}