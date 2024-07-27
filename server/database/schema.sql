create table user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  hashed_password varchar(255) not null,
  is_admin boolean not null default false
);