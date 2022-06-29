DROP DATABASE real_state;

CREATE DATABASE real_state;

use real_state;

CREATE TABLE departamento(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE ciudad(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(256) NOT NULL,
    fk_departamento INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_departamento) 
    REFERENCES departamento(id)
);

CREATE TABLE barrio(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(256),
    fk_ciudad INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_ciudad_barrio FOREIGN KEY (fk_ciudad) 
    REFERENCES ciudad(id)
);

CREATE TABLE tipo_negocio(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tipo_propiedad(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(32) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE plataforma(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(32) NOT NULL,
    url VARCHAR(512) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE propiedad(
    id INT NOT NULL AUTO_INCREMENT,
    id_plataforma VARCHAR(128),
    area DOUBLE(13,2) NOT NULL,
    nro_cuartos INT,
    nro_banos INT,
    nro_garajes INT,
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

INSERT INTO plataforma (nombre, url) VALUES ('finca raiz', 'www.fincaraiz.com.co');
INSERT INTO plataforma (nombre, url) VALUES ('metrocuadrado', 'www.metrocuadrado.com');

INSERT INTO departamento (nombre) VALUES ('antioquia');
INSERT INTO departamento (nombre) VALUES ('valle del cauca');
INSERT INTO departamento (nombre) VALUES ('cundinamarca');

INSERT INTO ciudad (nombre, fk_departamento) VALUES ('medellin', 1);
INSERT INTO ciudad (nombre, fk_departamento) VALUES ('cali', 2);
INSERT INTO ciudad (nombre, fk_departamento) VALUES ('bogota',3);

INSERT INTO barrio (nombre, fk_ciudad) VALUES ('general', 1);
INSERT INTO barrio (nombre, fk_ciudad) VALUES ('general', 2);
INSERT INTO barrio (nombre, fk_ciudad) VALUES ('general', 3);





