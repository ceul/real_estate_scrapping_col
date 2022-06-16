DROP DATABASE real_state;

CREATE DATABASE real_state;

use real_state;

CREATE TABLE departamento(
    id SERIAL NOT NULL,
    nombre VARCHAR(256),
    PRIMARY KEY (id)
);

CREATE TABLE ciudad(
    id SERIAL NOT NULL,
    nombre VARCHAR(256),
    fk_departamento INT,
    PRIMARY KEY (id),
    CONSTRAINT fk_departamento FOREIGN KEY (id) 
    REFERENCES departamento(id)
);

CREATE TABLE barrio(
    id SERIAL NOT NULL,
    nombre VARCHAR(256),
    fk_ciudad INT,
    PRIMARY KEY (id),
    CONSTRAINT fk_ciudad FOREIGN KEY (id) 
    REFERENCES ciudad(id)
);

CREATE TABLE tipo_negocio(
    id SERIAL NOT NULL,
    nombre VARCHAR(32),
    PRIMARY KEY (id)
);

CREATE TABLE tipo_propiedad(
    id SERIAL NOT NULL,
    nombre VARCHAR(32),
    PRIMARY KEY (id)
);

CREATE TABLE plataforma(
    id SERIAL NOT NULL,
    nombre VARCHAR(32),
    url VARCHAR(512),
    PRIMARY KEY (id)
);

CREATE TABLE propiedad(
    id SERIAL NOT NULL,
    id_plataforma VARCHAR(128),
    area DOUBLE(13,2) NOT NULL,
    nro_cuartos VARCHAR(2),
    nro_banos VARCHAR(2),
    nro_garajes VARCHAR(4),
    latitud VARCHAR(4),
    longitud VARCHAR(4),
    valor_venta DOUBLE(13,2),
    valor_arrendo DOUBLE(13,2),
    consto_administracion DOUBLE(13,2),
    estrato varchar(2),
    fk_tipo_negocio INT NOT NULL,
    fk_tipo_propiedad INT NOT NULL,
    fk_plataforma INT NOT NULL,
    fk_barrio INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_tipo_negocio FOREIGN KEY (id) 
    REFERENCES tipo_negocio(id),
    CONSTRAINT fk_tipo_propiedad FOREIGN KEY (id) 
    REFERENCES tipo_propiedad(id),
    CONSTRAINT fk_plataforma FOREIGN KEY (id) 
    REFERENCES plataforma(id),
    CONSTRAINT fk_barrio FOREIGN KEY (id) 
    REFERENCES barrio(id)
);

INSERT INTO tipo_negocio (nombre) VALUES ('venta');
INSERT INTO tipo_negocio (nombre) VALUES ('alquiler');

INSERT INTO tipo_propiedad (nombre) VALUES ('casa');
INSERT INTO tipo_propiedad (nombre) VALUES ('apartamento');
INSERT INTO tipo_propiedad (nombre) VALUES ('lote');
INSERT INTO tipo_propiedad (nombre) VALUES ('local');

INSERT INTO plataforma (nombre, url) VALUES ('finca raiz', 'www.fincaraiz.com.co');
INSERT INTO plataforma (nombre, url) VALUES ('metrocuadrado', 'www.metrocuadrado.com');



