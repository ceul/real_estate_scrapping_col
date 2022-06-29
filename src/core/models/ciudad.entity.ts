import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Barrio } from "./barrio.entity";
import { Departamento } from "./departamento.entity";

@Entity('ciudad')
export class Ciudad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 256 })
    nombre: string;

    @ManyToOne(() => Departamento, departamento => departamento.id)
    @JoinColumn({ name: 'fk_departamento', referencedColumnName: "id" })
    fk_departamento: Departamento;

    @OneToMany(() => Barrio, barrio => barrio.fk_ciudad)
    barrios: Barrio;
}