CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    );

CREATE TABLE IF NOT EXISTS roles (
        id BIGSERIAL PRIMARY KEY,
        role VARCHAR NOT NULL,
        );

CREATE TABLE IF NOT EXISTS roles_users (
        user_id BIGINT NOT NULL UNIQUE,
        role_id BIGINT NOT NULL UNIQUE,
        FOREIGN KEY(role_id) REFERENCES roles(id),
        FOREIGN KEY(user_id) REFERENCES users(id),
        PRIMARY KEY (user_id,role_id)
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
        user_id BIGINT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
        );

CREATE TABLE IF NOT EXISTS cart_items (
        id BIGSERIAL PRIMARY KEY,
        cart_id BIGINT NOT NULL UNIQUE,
        products_id BIGINT NOT NULL UNIQUE,
        count_products BIGINT NOT NULL
        FOREIGN KEY(cart_id) REFERENCES carts(id),
        FOREIGN KEY(products_id) REFERENCES products(id)
        );





CREATE TABLE IF NOT EXISTS history (
        id BIGSERIAL PRIMARY KEY,

        );