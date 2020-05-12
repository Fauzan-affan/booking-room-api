CREATE DATABASE db_booking_room;

create table tb_room(
    id_room SERIAL PRIMARY KEY,
    name TEXT,
    description VARCHAR(255),
    capacity INTEGER,
    projector BOOLEAN
);

create table tb_user(
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20),
    role VARCHAR(5) DEFAULT 'user'
);

create table tb_booking(
    id_booking SERIAL,
    date_added TIMESTAMP DEFAULT NULL,
    id_user INTEGER REFERENCES tb_user,
    id_room INTEGER REFERENCES tb_room,
    PRIMARY KEY (id_booking, id_user, id_room)
);
