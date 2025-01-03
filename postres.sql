-- CREATE DATABASE merchants IF NOT EXIST

-- CREATE TABLE logins(
-- 	id SERIAL PRIMARY KEY,
-- 	email VARCHAR(100) NOT NULL UNIQUE,
-- 	password VARCHAR(500) NOT NULL,
-- 	first_name VARCHAR(20) NOT NULL,
-- 	last_name VARCHAR(20) NOT NULL,
-- 	mobile VARCHAR(20) NOT NULL
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
-- 	required BOOLEAN NOT NULL,
-- 	CONSTRAINT fk_products
-- 		FOREIGN KEY(product)
-- 		REFERENCES products(id)
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

-- CREATE TABLE customers(
-- 	id SERIAL PRIMARY KEY,
-- 	name VARCHAR(20) NOT NULL,
-- 	store INT NOT NULL, -- stores(id)
-- 	CONSTRAINT 	fk_stores
-- 	FOREIGN KEY(store)
-- 		REFERENCES stores(id)
-- 		ON UPDATE CASCADE
-- 		ON DELETE CASCADE	
-- );

-- CREATE TABLE orders(
-- 	id SERIAL PRIMARY KEY,
-- 	customer INT NOT NULL, -- customers(id)
-- 	product INT NOT NULL, -- products(id)
-- 	quantity INT NOT NULL,
-- 	CONSTRAINT 	fk_customers
-- 	FOREIGN KEY(customer)
-- 		REFERENCES customers(id)
-- 		ON DELETE CASCADE,
-- 	CONSTRAINT 	fk_products
-- 	FOREIGN KEY(product)
-- 		REFERENCES products(id)
-- 		ON DELETE CASCADE
-- );

-- CREATE TABLE order_variants(
-- 	id SERIAL PRIMARY KEY,
-- 	"order" INT NOT NULL, -- orders(id)
-- 	product_variant INT NOT NULL, -- product_variants(id)
-- 	CONSTRAINT 	fk_orders
-- 	FOREIGN KEY("order")
-- 		REFERENCES orders(id)
-- 		ON DELETE CASCADE,
-- 	CONSTRAINT 	fk_products
-- 	FOREIGN KEY(product_variant)
-- 		REFERENCES product_variants(id)
-- 		ON DELETE CASCADE
-- );

-- CREATE TABLE order_varaint_options(
-- 	id SERIAL PRIMARY KEY,
-- 	product_variant_option INT NOT NULL, --- product_variant_options(id)
-- 	order_variant INT NOT NULL, -- order_variants(id)
-- 	CONSTRAINT 	fk_product_variants
-- 	FOREIGN KEY(product_variant_option)
-- 		REFERENCES product_variant_options(id)
-- 		ON DELETE CASCADE,	
-- 	CONSTRAINT 	fk_order_variants
-- 	FOREIGN KEY(order_variant)
-- 		REFERENCES order_variants(id)
-- 		ON DELETE CASCADE
-- );

-- CREATE TABLE roles(
-- 	id SERIAL PRIMARY KEY,
-- 	name VARCHAR(40) NOT NULL UNIQUE	
-- );

-- CREATE TABLE user_roles(
-- 	id SERIAL PRIMARY KEY,
-- 	login INT NOT NULL,
-- 	role INT NOT NULL,
-- 	CONSTRAINT fk_logins
-- 		FOREIGN KEY(login)
-- 		REFERENCES logins(id)
-- 		ON DELETE CASCADE,
-- 	CONSTRAINT fk_roles
-- 		FOREIGN KEY(role)
-- 		REFERENCES roles(id)
-- 		ON DELETE CASCADE
-- );

CREATE TABLE product_images(
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL,
	path VARCHAR NOT NULL,
	product INT NOT NULL,
	CONSTRAINT fk_products
		FOREIGN KEY(product)
		REFERENCES products(id)
		ON DELETE CASCADE	
);
