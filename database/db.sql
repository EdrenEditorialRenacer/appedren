CREATE DATABASE database_edren;

USE database_edren;

CREATE TABLE users(
    id INT (11) AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefono varchar(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    idioma VARCHAR(100) NOT NULL,
    UNIQUE (email),
    UNIQUE (username),
    PRIMARY KEY(id)
);


CREATE TABLE autores(
    id INT (11) AUTO_INCREMENT,
    autor VARCHAR(100) NOT NULL,
    facebook VARCHAR(100) NOT NULL,
    whattsap VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,          
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    UNIQUE(autor),
    UNIQUE(email),
    UNIQUE(whattsap),
    UNIQUE(facebook),
    PRIMARY KEY(id)
);

CREATE TABLE interpretes(
    id INT (11) AUTO_INCREMENT,
    interprete VARCHAR(100) NOT NULL,
    facebook VARCHAR(100) NOT NULL,
    whattsap VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,          
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    UNIQUE(interprete),
    UNIQUE(email),
    UNIQUE(whattsap),
    UNIQUE(facebook),
    PRIMARY KEY(id)
);


CREATE TABLE archiveros(
    id INT (11) AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    idautor INT (11) NOT NULL,
    idinterprete INT (11) NULL,
    genero VARCHAR(255) NOT NULL,
    precio DOUBLE(8,2) NOT NULL,
    modulos VARCHAR(255) NOT NULL,
    roles VARCHAR(255) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    UNIQUE(titulo),
    PRIMARY KEY(id),
    FOREIGN KEY (idautor) references autores(id),
    FOREIGN KEY (idinterprete) references interpretes(id)
);



CREATE TABLE portadas(
    id INT(11) AUTO_INCREMENT,
    portada VARCHAR(255) NOT NULL,
    idarchivero INT(11) UNIQUE,
    PRIMARY KEY(id),
    FOREIGN KEY(idarchivero) references archiveros(id)
);


CREATE TABLE documentos(
    id INT(11) AUTO_INCREMENT,
    documento VARCHAR(255) NOT NULL,
    idarchivero INT(11) UNIQUE,
    PRIMARY KEY(id),
    FOREIGN KEY(idarchivero) references archiveros(id)
);
SELECT a.id, a.titulo,u.autor,p.portada,d.documento FROM archiveros a 
INNER JOIN autores u ON a.idautor = u.id
INNER JOIN portadas p ON p.idarchivero = a.id
INNER JOIN documentos d ON d.idarchivero = a.id
WHERE a.modulos = 'libros' AND a.roles = 'free';
