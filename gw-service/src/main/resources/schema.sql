CREATE TABLE IF NOT EXISTS roles (
        id BIGSERIAL PRIMARY KEY,
        role VARCHAR NOT NULL
        );

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    role_id BIGINT NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR UNIQUE,
    first_name VARCHAR,
    last_name VARCHAR,
    address VARCHAR,
    FOREIGN KEY(role_id) REFERENCES roles(id)
);


CREATE TABLE IF NOT EXISTS products (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        price INTEGER NOT NULL,
        calories INTEGER NOT NULL,
        category VARCHAR NOT NULL,
        img VARCHAR NOT NULL
        );


CREATE TABLE IF NOT EXISTS carts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    is_active BOOLEAN DEFAULT true,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cart_items (
    id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    products_id BIGINT NOT NULL,
    count_products BIGINT NOT NULL,
    CONSTRAINT fk_cart FOREIGN KEY(cart_id) REFERENCES carts(id),
    CONSTRAINT fk_product FOREIGN KEY(products_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    cart_id BIGINT NOT NULL,
    status VARCHAR,
    courier_id BIGINT,
    cook_id BIGINT,
    CONSTRAINT fk_user_orders FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_cart_orders FOREIGN KEY(cart_id) REFERENCES carts(id),
    CONSTRAINT fk_cook_orders FOREIGN KEY(cook_id) REFERENCES users(id),
    CONSTRAINT fk_courier_orders FOREIGN KEY(courier_id) REFERENCES users(id)
);


--
--CREATE TABLE IF NOT EXISTS history (
--        id BIGSERIAL PRIMARY KEY
--        );