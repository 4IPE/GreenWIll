CREATE TABLE IF NOT EXISTS roles (
        id BIGSERIAL PRIMARY KEY,
        role VARCHAR NOT NULL
        );

CREATE TABLE IF NOT EXISTS locations (
    id BIGSERIAL PRIMARY KEY,
    city VARCHAR NOT NULL,
    street VARCHAR NOT NULL,
    house VARCHAR NOT NULL,
    apartment VARCHAR,
    floor INTEGER,
    entrance INTEGER,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION
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
    location_id BIGINT,
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(location_id) REFERENCES locations(id)
);


CREATE TABLE IF NOT EXISTS products (
        id BIGSERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        price INTEGER NOT NULL,
        calories INTEGER NOT NULL,
        category VARCHAR NOT NULL,
        img VARCHAR NOT NULL,
        energy_val INTEGER NOT NULL
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
    address_id BIGINT,
    CONSTRAINT fk_user_orders FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_cart_orders FOREIGN KEY(cart_id) REFERENCES carts(id),
    CONSTRAINT fk_cook_orders FOREIGN KEY(cook_id) REFERENCES users(id),
    CONSTRAINT fk_courier_orders FOREIGN KEY(courier_id) REFERENCES users(id),
    CONSTRAINT fk_location_orders FOREIGN KEY(address_id) REFERENCES locations(id)
);


CREATE TABLE IF NOT EXISTS user_consents (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    consent_type VARCHAR(50) NOT NULL,
    accepted_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent VARCHAR(500),
    consent_version VARCHAR(10) NOT NULL,

    CONSTRAINT fk_user_consents_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE,

    CONSTRAINT uk_user_consent_type 
        UNIQUE (user_id, consent_type)
);

-- Индекс для поиска по дате принятия
CREATE INDEX IF NOT EXISTS idx_user_consents_accepted_at 
    ON user_consents(accepted_at);

-- Индекс для поиска по IP адресу
CREATE INDEX IF NOT EXISTS idx_user_consents_ip_address 
    ON user_consents(ip_address);
