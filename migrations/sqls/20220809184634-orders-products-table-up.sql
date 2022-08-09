CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id int NOT NULL,
    product_id int NOT NULL,
    product_quantity int,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);