export class CreatePropiedadDTO {
    id: number;
    id_plataforma: string;
    area: number;
    nro_cuartos: number;
    nro_banos: number;
    nro_garajes: number;
    latitud: string;
    longitud: string;
    valor_venta: number;
    valor_arrendo: number;
    consto_administracion: number;
    estrato: string;
    fk_tipo_negocio: number;
    fk_tipo_propiedad: number;
    fk_plataforma: number;
    fk_barrio: number;
}