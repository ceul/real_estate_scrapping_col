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

    @OneToMany(() => Propiedad, propiedad => propiedad.plataforma)
    propiedades : Propiedad[];
}