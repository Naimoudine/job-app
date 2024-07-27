create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  hashed_password varchar(255) not null,
  is_admin boolean not null default false
);

create table company (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null unique,
  description text,
  location varchar(255),
  capital varchar(255),
  creation_date date
)

create table offer (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null,
  description text not null,
  salary varchar(255),
  sector varchar(255) not null,
  location varchar(255) not null,
  contract varchar(255) not null
)