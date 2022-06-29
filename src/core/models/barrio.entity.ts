import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";
import { Propiedad } from "./propiedad.entity";

@Entity('barrio')
export class Barrio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(() => Ciudad, ciudad => ciudad.id)
    @JoinColumn({ name: 'fk_ciudad', referencedColumnName: "id" })
    ciudad: Ciudad;

    @OneToMany(() => Propiedad, propiedad => propiedad.barrio)
    propiedades : Propiedad[];
}