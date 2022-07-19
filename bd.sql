DROP DATABASE real_state;

CREATE DATABASE real_state;

\c real_state;

CREATE TABLE departamento(
    id SERIAL NOT NULL,
    nombre VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ciudad(
    id SERIAL NOT NULL,
    nombre VARCHAR(256) NOT NULL,
    fk_departamento INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_departamento) 
    REFERENCES departamento(id)
);

CREATE TABLE barrio(
    id SERIAL NOT NULL,
    nombre VARCHAR(256),
    fk_ciudad INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_ciudad_barrio FOREIGN KEY (fk_ciudad) 
    REFERENCES ciudad(id)
);

CREATE TABLE tipo_negocio(
    id SERIAL NOT NULL,
    nombre VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tipo_propiedad(
    id SERIAL NOT NULL,
    nombre VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE plataforma(
    id SERIAL NOT NULL,
    nombre VARCHAR(32) NOT NULL,
    url VARCHAR(512) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE propiedad(
    id SERIAL NOT NULL,
    id_plataforma VARCHAR(128),
    area real NOT NULL,
    nro_cuartos VARCHAR(128),
    nro_banos VARCHAR(128),
    nro_garajes VARCHAR(128),
    latitud VARCHAR(4),
    longitud VARCHAR(4),
    valor_venta double precision,
    valor_arrendo double precision,
    consto_administracion double precision,
    estrato varchar(12),
    fk_tipo_negocio INT NOT NULL,
    fk_tipo_propiedad INT NOT NULL,
    fk_plataforma INT NOT NULL,
    fk_barrio INT NOT NULL,
    PRIMARY KEY (id)
    
);


    ALTER TABLE propiedad ADD CONSTRAINT fk_tipo_negocio FOREIGN KEY (fk_tipo_negocio) 
    REFERENCES tipo_negocio(id);

    ALTER TABLE propiedad ADD CONSTRAINT fk_tipo_propiedad FOREIGN KEY (fk_tipo_propiedad) 
    REFERENCES tipo_propiedad(id);

    ALTER TABLE propiedad ADD CONSTRAINT fk_plataforma FOREIGN KEY (fk_plataforma) 
    REFERENCES plataforma(id);

    ALTER TABLE propiedad ADD CONSTRAINT fk_barrio FOREIGN KEY (fk_barrio) 
    REFERENCES barrio(id);

INSERT INTO tipo_negocio (nombre) VALUES ('venta');
INSERT INTO tipo_negocio (nombre) VALUES ('alquiler');

INSERT INTO tipo_propiedad (nombre) VALUES ('casa');
INSERT INTO tipo_propiedad (nombre) VALUES ('apartamento');
INSERT INTO tipo_propiedad (nombre) VALUES ('lote');
INSERT INTO tipo_propiedad (nombre) VALUES ('local');

INSERT INTO plataforma (nombre, url) VALUES ('finca raiz', 'https://api.fincaraiz.com.co/document/api/1.0/listing/search');
INSERT INTO plataforma (nombre, url) VALUES ('metrocuadrado', 'https://www.metrocuadrado.com/rest-search/search?realEstateBusinessList=venta&realEstateTypeList=casa,edificio-de-apartamentos,edificio-de-oficinas,consultorio,finca,lote,bodega,local,oficina,apartamento&from=0&size=50');

INSERT INTO departamento (nombre) VALUES ('antioquia');
INSERT INTO departamento (nombre) VALUES ('valle del cauca');
INSERT INTO departamento (nombre) VALUES ('cundinamarca');

INSERT INTO ciudad (nombre, fk_departamento) VALUES ('medellin', 1);
INSERT INTO ciudad (nombre, fk_departamento) VALUES ('cali', 2);
INSERT INTO ciudad (nombre, fk_departamento) VALUES ('bogota',3);

INSERT INTO barrio (nombre, fk_ciudad) VALUES ('general', 1);
INSERT INTO barrio (nombre, fk_ciudad) VALUES ('general', 2);
INSERT INTO barrio (nombre, fk_ciudad) VALUES ('general', 3);





