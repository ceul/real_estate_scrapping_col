import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreatePropiedadDTO } from '../models/create-propiedad.dto';
import { Propiedad } from '../models/propiedad.entity';

@Injectable()
export class PropiedadService {


    constructor(private httpService: HttpService,
        @InjectRepository(Propiedad) private readonly repository: Repository<Propiedad>) { }

    async findAll() {
        const response = this.repository.find()
        return response;
    }

    async getFromFincaRaiz() {
        try {
            let fincaRaizRequest =  {
                "filter": {
                    "offer": { "slug": ["sell"] },
                    "property_type": { "slug": ["apartment", "studio", "house", "cabin", "country-house", "house-lot", "farm", "room", "lot", "warehouse", "consulting-room", "commercial", "office", "parking", "building"] },
                    "location_path": "santa rosa de cabal",
                    "locations": { "location_point": [[-79.17011010000003, 12.281631822645059], [-69.32636010000003, -3.06852977650675]] }
                },
                "fields": {
                    "exclude": [], "include": ["area", "baths.id", "baths.name", "client.client_type", "client.company_name", "client.first_name", "client.last_name", "garages.name", "is_new", "locations.cities.name", "locations.cities.slug", "locations.countries.name", "locations.countries.slug", "locations.groups.name", "locations.groups.slug", "locations.groups.subgroups.name", "locations.groups.subgroups.slug", "locations.location_point", "locations.neighbourhoods.name", "locations.neighbourhoods.slug", "locations.states.name", "locations.states.slug", "locations.view_map.slug", "media.floor_plans.count", "media.photos.list.id", "media.photos.list.image.full_size", "media.photos.list.is_main", "media.videos.count", "min_area", "min_price", "price", "products.configuration.tag_name", "products.label", "products.name", "products.slug", "property_id", "fr_property_id", "rooms.name", "title", "property_type.name", "offer.name", "fr_parent_property_id"], "limit": 100,
                    "offset": 200,
                    "ordering": [],
                    "platform": 40,
                    "with_algorithm": false
                }
            }
            const response = await this.httpService.post('https://api.fincaraiz.com.co/document/api/1.0/listing/search', fincaRaizRequest).toPromise();
            for (let index = 0; index < response.data.hits.hits.length; index++) {
                console.log(response.data.hits.hits[index]['_source']['listing']['price']+'    ');
                console.log(typeof response.data.hits.hits[index]['_source']['listing']['price']);
                let createPropiedadDTO = new CreatePropiedadDTO();
                createPropiedadDTO.id_plataforma = response.data.hits.hits[index]['_id']
                createPropiedadDTO.area = response.data.hits.hits[index]['_source']['listing']['area']
                createPropiedadDTO.nro_cuartos = response.data.hits.hits[index]['_source']['listing']['rooms']['name']
                createPropiedadDTO.nro_banos = response.data.hits.hits[index]['_source']['listing']['baths']['name']
                createPropiedadDTO.nro_garajes = response.data.hits.hits[index]['_source']['listing']['garages']['name']
                createPropiedadDTO.latitud = '1'
                createPropiedadDTO.longitud = '1'
                createPropiedadDTO.valor_venta = parseInt(response.data.hits.hits[index]['_source']['listing']['price'])
                createPropiedadDTO.valor_arrendo = 0
                createPropiedadDTO.consto_administracion = 0
                createPropiedadDTO.estrato = '3'
                createPropiedadDTO.fk_tipo_negocio = 1
                createPropiedadDTO.fk_tipo_propiedad = 1
                createPropiedadDTO.fk_plataforma = 1
                createPropiedadDTO.fk_barrio = 1
                console.log(createPropiedadDTO)
                this.repository.save(createPropiedadDTO)
            }
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

}
