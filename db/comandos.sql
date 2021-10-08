--Crear Tabla sensors
CREATE TABLE sensors (
    id       BIGSERIAL     not null PRIMARY kEY,
    name     varchar (20)  not null,
    deleted   varchar (20)  DEFAULT 'activo'
);

SELECT  * FROM sensors;

DELETE  FROM sensors WHERE id > 4;

INSERT INTO sensors (name)
VALUES ('sensor 1');

INSERT INTO sensors (name)
VALUES ('sensor 2');

INSERT INTO sensors (name, deleted)
VALUES ('sensor 3', 'inactivo');

INSERT INTO sensors (name)
VALUES ('sensor 4');

--Actualizar un registro
UPDATE sensors SET deleted = 'inactivo'
WHERE id = 4;

SELECT  * FROM sensors ORDER BY id;

--Crear Tabla measures
CREATE TABLE measures (
    id       		BIGSERIAL     not null  PRIMARY kEY,
    temperature     int 	  	  not null,
    hour   			time  		  not null,
	sensor_id		bigint		  REFERENCES sensors (id)	
);

SELECT  * FROM measures;

INSERT INTO measures (temperature, hour, sensor_id)
VALUES (3, '08:00:00', 1);

INSERT INTO measures (temperature, hour, sensor_id)
VALUES (4, '08:00:00', 2);

INSERT INTO measures (temperature, hour, sensor_id)
VALUES (4, '08:00:00', 3);

INSERT INTO measures (temperature, hour, sensor_id)
VALUES (3, '08:00:00', 4);

--Mostrar sensores y datos
SELECT s.name, m.temperature, m.hour, s.deleted
FROM  measures m
INNER JOIN sensors s ON s.id = m.sensor_id;