-- CREATE TABLE logins(
-- 	id SERIAL PRIMARY KEY,
-- 	email VARCHAR(100) NOT NULL UNIQUE,
-- 	password VARCHAR(500) NOT NULL
-- );

-- CREATE TABLE contacts(
-- 	id SERIAL PRIMARY KEY,
-- 	first_name VARCHAR(20) NOT NULL,
-- 	last_name VARCHAR(20) NOT NULL,
-- 	mobile VARCHAR(20) NOT NULL,
-- 	login INT,
-- 	CONSTRAINT fk_logins
--       FOREIGN KEY(login)
-- 	  REFERENCES logins(id)
-- 	  ON DELETE CASCADE
-- );

-- CREATE TABLE stores(
-- 	id SERIAL PRIMARY KEY,
-- 	name VARCHAR(50) NOT NULL,
-- 	login INT NOT NULL,
-- 	CONSTRAINT fk_logins
-- 		FOREIGN KEY(login)
-- 		REFERENCES logins(id)
-- 		ON DELETE CASCADE
-- );

-- CREATE TABLE locations(
-- 	id SERIAL PRIMARY KEY,
-- 	street_number INT NOT NULL,
-- 	street_name VARCHAR(50) NOT NULL,
-- 	suburb VARCHAR(50) NOT NULL,
-- 	city VARCHAR(50) NOT NULL,
-- 	country VARCHAR(50),
-- 	postal_code INT NOT NULL,
-- 	store INT NOT NULL,
-- 	CONSTRAINT fk_stores
-- 		FOREIGN KEY(store)
-- 		REFERENCES stores(id)
-- 		ON DELETE CASCADE
-- );

-- CREATE TABLE categories(
-- 	id SERIAL PRIMARY KEY,
-- 	name VARCHAR(50) NOT NULL,
-- 	store INT NOT NULL,
-- 	CONSTRAINT fk_stores
-- 		FOREIGN KEY(store)
-- 		REFERENCES stores(id)
-- 		ON DELETE CASCADE	
-- );

-- CREATE TABLE products (
-- 	id SERIAL PRIMARY KEY,
-- 	name VARCHAR(50) NOT NULL,
-- 	price DOUBLE PRECISION NOT NULL,
-- 	category INT NOT NULL,
-- 	store INT NOT NULL,
-- 	CONSTRAINT fk_stores
-- 		FOREIGN KEY(store)
-- 		REFERENCES stores(id)
-- 		ON DELETE CASCADE,
-- 	CONSTRAINT fk_categories
-- 		FOREIGN KEY(category)
-- 		REFERENCES categories(id)
-- 		ON DELETE CASCADE
-- );

-- CREATE TABLE product_variants (
-- 	id SERIAL PRIMARY KEY,
-- 	name VARCHAR(50) NOT NULL,
-- 	min_number INT DEFAULT 1,
-- 	max_number INT DEFAULT 1,
-- 	product INT NOT NULL,
-- 	CONSTRAINT fk_products
-- 		FOREIGN KEY(product)
-- 		REFERENCES categories(id)
-- 		ON DELETE CASCADE
-- );

-- CREATE TABLE product_variant_options(
-- 	id SERIAL PRIMARY KEY,
-- 	name VARCHAR(20) NOT NULL,
-- 	price NUMERIC(4) DEFAULT 0,
-- 	product_variant INT NOT NULL,
-- 	CONSTRAINT fk_product_variants
-- 		FOREIGN KEY(product_variant)
-- 		REFERENCES product_variants(id)
-- 		ON DELETE CASCADE	
-- );



