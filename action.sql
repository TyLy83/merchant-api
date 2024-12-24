-- WITH store AS(
-- 	INSERT INTO stores(name, login) 
-- 	VALUES('demon lord cafe', 16)
-- 	RETURNING id, name
-- ),
-- result AS (
-- 	INSERT INTO locations(street_number, street_name, suburb, city, country, postal_code, store) 
-- 	VALUES(100, 'king parades street', 'dragon hills', 'inte esla city', 'central continent empire', 1010, (SELECT id FROM store))
-- 	RETURNING (SELECT id FROM store) AS id, (SELECT name FROM store) AS name,
-- 		street_number, street_name, suburb, city, country, postal_code
-- )
-- SELECT * FROM result;

-- WITH store AS(
-- 	SELECT id, name 
-- 	FROM stores
-- 	WHERE id= 1
-- 	RETURNING id, name
-- ),
-- AS(
-- 	SELECT 
-- 	FROM
-- 	WHERE 
-- )
-- SELECT * FROM ;

-- DROP TABLE products;

-- SELECT * FROM categories WHERE store = 2

-- SELECT id, name, price, store FROM products WHERE store=2

-- SELECT contacts.id, contacts.first_name, contacts.last_name, contacts.mobile, logins.email FROM contacts
-- JOIN logins ON contacts.login = logins.id
-- WHERE contacts.id = 1

-- SELECT stores.id, stores.name, stores.login,
-- 	locations.street_number, locations.street_name, 
-- 	locations.suburb, locations.city, locations.postal_code 
-- FROM stores
-- JOIN locations ON locations.store = stores.id
-- WHERE stores.name LIKE 'demon lord cafe%'

-- SELECT * FROM logins

-- DELETE FROM logins WHERE id=1 RETURNING *

-- SELECT * FROM roles

-- SELECT * FROM user_roles;

-- ALTER TABLE user_roles
-- DROP COLUMN name;

-- SELECT roles.name FROM user_roles 
-- JOIN roles ON roles.id = user_roles.role;

-- INSERT INTO logins(email, password, first_name, last_name, mobile)
-- VALUES('john.doe@gmail.com', 'PleaseLetJohnDoeIn1!', 'john', 'doe', '0278877099')

-- INSERT INTO roles(name)
-- VALUES('user'), ('admin'), ('super admin');

-- SELECT roles.name
-- FROM user_roles
-- JOIN roles ON roles.id = user_roles.role
-- WHERE user_roles.login =1

-- DELETE FROM logins WHERE id=1;

-- SELECT * FROM roles

-- SELECT * FROM product_variants

SELECT * FROM product_images
-- WHERE id=1


