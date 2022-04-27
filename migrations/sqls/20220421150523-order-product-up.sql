/* Replace with your SQL commands */




CREATE TABLE order_products (

id serial PRIMARY KEY, 
quantity integer NOT NULL, 
order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
product_id BIGINT REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);