import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Barrio } from "./barrio.entity";
import { Plataforma } from "./plataforma.entity";
import { TipoNegocio } from "./tipo_negocio.entity";
import { TipoPropiedad } from "./tipo_propiedad.entity";

@Entity('propiedades')
export class Propiedad {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_plataforma: string;

  @Column({type: 'double'})
  area: number;

  @Column()
  nro_cuartos: string;

  @Column()
  nro_banos: string;

  @Column()
  nro_garajes: string;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @Column({type: 'double'})
  valor_venta: number;

  @Column({type: 'double'})
  valor_arrendo: number;

  @Column({type: 'double'})
  consto_administracion: number;

  @Column()
  estrato: string;

  @ManyToOne(type => TipoNegocio, tipo_negocio => tipo_negocio.id)
  fk_tipo_negocio: TipoNegocio;


  @ManyToOne(type => TipoPropiedad, tipo_propiedad => tipo_propiedad.id)
  fk_tipo_propiedad: TipoPropiedad;


  @ManyToOne(type => Plataforma, plataforma => plataforma.id)
  fk_plataforma: Plataforma;


  @ManyToOne(type => Barrio, barrio => barrio.id)
  fk_barrio: Barrio;

}