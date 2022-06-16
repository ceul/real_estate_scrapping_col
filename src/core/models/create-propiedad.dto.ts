export class CreatePropiedadDTO {
    id: number;
    id_plataforma: string;
    area: number;
    nro_cuartos: string;
    nro_banos: string;
    nro_garajes: string;
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