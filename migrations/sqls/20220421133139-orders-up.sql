/* Replace with your SQL commands */


CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(255) NOT NULL,
    user_id BIGINT REFERENCES users (id)

);