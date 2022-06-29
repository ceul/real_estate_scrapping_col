import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Propiedad } from "./propiedad.entity";

@Entity('tipo_propiedad')
export class TipoPropiedad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Propiedad, propiedad => propiedad.tipo_propiedad)
    propiedades : Propiedad[];
}