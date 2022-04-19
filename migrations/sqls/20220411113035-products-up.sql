/* Replace with your SQL commands */

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    price INTEGER, 
    type VARCHAR(50) NOT NULL,
    origin VARCHAR(50)

)