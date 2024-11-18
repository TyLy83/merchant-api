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

SELECT * FROM product_variant_options

