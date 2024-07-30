create table user (
  id int unsigned primary key auto_increment not null,
  firstname varchar(150) not null,
  lastname varchar(150) not null,
  email varchar(255) not null unique,
  hashed_password varchar(255) not null,
  picture varchar(255),
  cv varchar(255),
  is_admin boolean not null default false,
  is_company boolean not null default false
);

create table company (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null unique,
  description text,
  location varchar(255),
  capital varchar(255),
  creation_date date
);

create table offer (
  id int unsigned primary key auto_increment not null,
  company_name varchar(255) not null,
  title varchar(255) not null,
  description text not null,
  salary varchar(255),
  sector varchar(255) not null,
  location varchar(255) not null,
  contract_type varchar(255) not null,
  company_id int unsigned not null,
  foreign key(company_id) references company(id) on delete cascade
);

create table applying (
  id int unsigned primary key auto_increment not null,
  user_id int unsigned not null, 
  offer_id int unsigned not null,
  foreign key(user_id) references user(id) on delete cascade,
  foreign key(offer_id) references offer(id) on delete cascade
);