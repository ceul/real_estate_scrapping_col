import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({type: 'int'})
  fk_tipo_negocio: number;


  @Column({type: 'int'})
  fk_tipo_propiedad: number;


  @Column({type: 'int'})
  fk_plataforma: number;


  @Column({type: 'int'})
  fk_barrio: number;



}