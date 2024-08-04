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


INSERT INTO company (name, description, location, capital, creation_date)
VALUES
('TechWave Solutions', 'TechWave Solutions is a leading technology firm specializing in innovative software solutions and digital transformation services. We provide end-to-end development services, including frontend and backend development, mobile application development, and cloud solutions.', 'San Francisco, CA', '50 million', '2010-03-12'),
('DataWorks Inc.', 'DataWorks Inc. focuses on big data analytics and backend infrastructure services. Our mission is to help businesses leverage data to drive decision-making and innovation. We offer services ranging from data warehousing to real-time analytics and custom backend solutions.', 'Austin, TX', '35 million', '2015-09-05'),
('Innovatech Solutions', 'Innovatech Solutions specializes in full-stack development, providing cutting-edge software solutions for various industries. Our team is dedicated to delivering high-quality, scalable applications that meet the unique needs of our clients.', 'New York, NY', '45 million', '2012-01-20'),
('AppMasters Inc.', 'AppMasters Inc. is a premier mobile application development company with expertise in creating high-performance iOS and Android apps. We use the latest technologies and frameworks to build intuitive and user-friendly mobile solutions.', 'Seattle, WA', '60 million', '2008-06-15'),
('WebInnovators LLC', 'WebInnovators LLC is a digital agency that specializes in web development and design. We aim to provide exceptional web solutions that help businesses grow their online presence and achieve their digital goals.', 'Remote', '10 million', '2018-08-25'),
('CloudNet Technologies', 'CloudNet Technologies is a cloud computing and DevOps consultancy firm. We offer cloud infrastructure management, CI/CD pipeline setup, and automation services to help businesses streamline their operations and achieve greater efficiency.', 'Denver, CO', '55 million', '2011-02-14');

INSERT INTO offer (title, company_id, company_name, description, salary, sector, location, contract_type)
VALUES
('Senior Frontend Developer', 1, 'TechWave Solutions', 'We are looking for a Senior Frontend Developer to join our dynamic team. The ideal candidate will have at least 5 years of experience with modern JavaScript frameworks (React, Angular, or Vue.js), HTML, CSS, and responsive design principles. You will work closely with our backend developers to integrate APIs and ensure a seamless user experience.', '$100,000 - $120,000 per year', 'Technology', 'San Francisco, CA', 'Full-time'),
('Junior Backend Developer', 2, 'DataWorks Inc.', 'DataWorks Inc. is seeking a Junior Backend Developer with 1-2 years of experience in server-side programming languages like Node.js, Python, or Ruby. The successful candidate will assist in developing and maintaining scalable backend services and APIs. Familiarity with database technologies (SQL, NoSQL) is a plus.', '$60,000 - $75,000 per year', 'Technology', 'Austin, TX', 'Full-time'),
('Mid-Level Full Stack Developer', 3, 'Innovatech Solutions', 'Innovatech Solutions is searching for a Mid-Level Full Stack Developer with 3-5 years of experience in both frontend and backend development. Proficiency in JavaScript frameworks (React/Angular), Node.js, and databases (SQL/NoSQL) is required. You will work on developing end-to-end solutions for our clients.', '$85,000 - $100,000 per year', 'Technology', 'New York, NY', 'Full-time'),
('Senior Mobile Developer (iOS/Android)', 4, 'AppMasters Inc.', 'AppMasters Inc. is looking for a Senior Mobile Developer with 5+ years of experience in mobile application development for iOS and Android platforms. The candidate should be proficient in Swift, Kotlin, and cross-platform development frameworks such as Flutter or React Native.', '$110,000 - $130,000 per year', 'Technology', 'Seattle, WA', 'Full-time'),
('Frontend Developer Intern', 5, 'WebInnovators LLC', 'WebInnovators LLC is offering an internship opportunity for a Frontend Developer. This position is ideal for students or recent graduates who have some experience with HTML, CSS, and JavaScript. The intern will gain hands-on experience working on live projects and will be mentored by senior developers.', '$20 - $25 per hour', 'Technology', 'Remote', 'Internship'),
('Lead DevOps Engineer', 6, 'CloudNet Technologies', 'CloudNet Technologies is seeking a Lead DevOps Engineer with over 7 years of experience in managing cloud infrastructure and CI/CD pipelines. The ideal candidate will be proficient in AWS, Docker, Kubernetes, and scripting languages such as Bash or Python. Leadership experience is a must.', '$130,000 - $150,000 per year', 'Technology', 'Denver, CO', 'Full-time');
