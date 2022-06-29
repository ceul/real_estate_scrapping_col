import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barrio } from "./barrio.entity";
import { Plataforma } from "./plataforma.entity";
import { TipoNegocio } from "./tipo_negocio.entity";
import { TipoPropiedad } from "./tipo_propiedad.entity";

@Entity('propiedad')
export class Propiedad {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  id_plataforma: string;

  @Column({ type: 'double' })
  area: number;

  @Column({ type: 'double' })
  nro_cuartos: number;

  @Column({ type: 'double' })
  nro_banos: number;

  @Column({ type: 'double' })
  nro_garajes: number;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @Column({ type: 'double' })
  valor_venta: number;

  @Column({ type: 'double' })
  valor_arrendo: number;

  @Column({ type: 'double' })
  consto_administracion: number;

  @Column()
  estrato: string;

  @ManyToOne(() => Plataforma, (plataforma: Plataforma) => plataforma.propiedades, {
    nullable: false
  })
  @JoinColumn({ name: 'fk_plataforma', referencedColumnName: "id" })
  plataforma: Plataforma;

  @ManyToOne(() => Barrio, barrio => barrio.propiedades)
  @JoinColumn({ name: 'fk_barrio', referencedColumnName: "id" })
  barrio: Barrio;

  @ManyToOne(() => TipoNegocio, tipo_negocio => tipo_negocio.propiedades)
  @JoinColumn({ name: 'fk_tipo_negocio', referencedColumnName: "id" })
  tipo_negocio: TipoNegocio;

  @ManyToOne(() => TipoPropiedad, tipo_propiedad => tipo_propiedad.propiedades)
  @JoinColumn({ name: 'fk_tipo_propiedad', referencedColumnName: "id" })
  tipo_propiedad: TipoPropiedad;
}