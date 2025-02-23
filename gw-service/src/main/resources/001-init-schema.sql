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
        carbohydrates INTEGER NOT NULL,
        fats  INTEGER NOT NULL,
        proteins  INTEGER NOT NULL
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

CREATE INDEX IF NOT EXISTS idx_user_consents_accepted_at ON user_consents(accepted_at);
CREATE INDEX IF NOT EXISTS idx_user_consents_ip_address ON user_consents(ip_address);

CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_location_id ON users(location_id);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_courier_id ON orders(courier_id);
CREATE INDEX idx_orders_cook_id ON orders(cook_id);
CREATE INDEX idx_orders_address_id ON orders(address_id);

CREATE INDEX idx_carts_user_id ON carts(user_id);
CREATE INDEX idx_carts_is_active ON carts(is_active);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_name ON products(name);

CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_products_id ON cart_items(products_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_name_unique ON products(name);
CREATE UNIQUE INDEX IF NOT EXISTS idx_roles_role_unique ON roles(role);

INSERT INTO roles (role) VALUES
('ROLE_ADMIN'),
('ROLE_USER'),
('ROLE_COOK'),
('ROLE_COURIER')
ON CONFLICT (role) DO NOTHING;


INSERT INTO products (name, description, price, calories, category, img, carbohydrates, fats, proteins) VALUES
('Зеленая энергия', 'Смузи на основе шпината, киви, яблока и огурца с добавлением миндального молока и семян чиа.', 180, 220, 'Смузи', 'https://i.ibb.co/Q5bGjx6/1.png', 35, 4, 3),
('Ягодно-цитрусовый заряд', 'Смесь свежих ягод (клубника, малина) с апельсиновым соком, бананом и йогуртом, украшенная мятой.', 200, 250, 'Смузи', 'https://i.ibb.co/GQFxgxLk/2.png', 40, 3, 4),
('Тропический детокс', 'Смузи из манго, ананаса, маракуйи с добавлением кокосовой воды и небольшим количеством имбиря.', 210, 230, 'Смузи', 'https://i.ibb.co/RT0BtYBx/3.png', 45, 2, 2),
('Киноа с овощами и авокадо', 'Тёплый салат из киноа с миксом свежих овощей (помидоры черри, огурцы, болгарский перец) и нежным авокадо, заправленный лимонным соком и оливковым маслом.', 350, 420, 'Основные блюда', 'https://i.ibb.co/RkhTHmCL/4.png', 50, 15, 10),
('Лосось на пару с брокколи', 'Филе лосося, приготовленное на пару, с гарниром из нежной брокколи и морковных полосок, приправленных лимонным соком и укропом.', 480, 380, 'Основные блюда', 'https://i.ibb.co/FbT1TFD6/5.png', 10, 12, 30),
('Тофу в медово-имбирном соусе с рисом', 'Обжаренный тофу в легком соусе из мёда, имбиря и соевого соуса, поданный на постном коричневом рисе с зелёным луком.', 320, 400, 'Основные блюда', 'https://i.ibb.co/zhZkVDJ9/6.png', 55, 10, 15),
('Салат с куриной грудкой и шпинатом', 'Лёгкий салат из молодого шпината, гриль-курицы, помидоров и огурцов, с орехами пекан и бальзамической заправкой.', 400, 450, 'Основные блюда', 'https://i.ibb.co/Fb0LnwWC/7.png', 12, 14, 25),
('Чечевичный стейк с томатным соусом', 'Вегетарианский стейк из красной чечевицы с овощами, поданный с пикантным томатным соусом и зеленью.', 370, 410, 'Основные блюда', 'https://i.ibb.co/SDzbppsY/8.png', 40, 8, 18),
('Ореховый микс с сухофруктами', 'Смесь миндаля, грецких орехов, кешью с добавлением кураги и инжира – идеальный быстрый перекус.', 150, 300, 'Перекус', 'https://i.ibb.co/TBhqdbrr/9.png', 25, 18, 6),
('Гуакамоле с морковными палочками', 'Кремовое гуакамоле из авокадо, лимона и кинзы, поданное с хрустящими палочками из свежей моркови.', 170, 260, 'Перекус', 'https://i.ibb.co/mFRzXCtr/10.png', 20, 10, 3),
('Йогуртовый крем с ягодами', 'Нежный крем из греческого йогурта, смешанный с мёдом и свежими ягодами (черника, малина).', 160, 240, 'Перекус', 'https://i.ibb.co/hxRnbGF8/11.png', 30, 2, 5),
('Мини-салат с тунцом', 'Лёгкий салат из листьев рукколы, кусочков тунца, оливок и помидоров черри с оливковым маслом.', 190, 280, 'Перекус', 'https://i.ibb.co/SXc21k9h/12.png', 8, 9, 12),
('Хумус с огуречными ломтиками', 'Кремовый хумус из нута, тахини и лимонного сока, поданный с освежающими ломтиками огурца.', 160, 250, 'Перекус', 'https://i.ibb.co/tPWNwnN2/13.png', 15, 7, 4),
('Чиа пудинг с манго', 'Нежный пудинг из чиа с кокосовым молоком, подслащённый мёдом и украшенный кусочками спелого манго.', 210, 280, 'Десерты', 'https://i.ibb.co/zTQgj7Nb/14.png', 30, 8, 4),
('Запеченное яблоко с корицей', 'Тёплое запеченное яблоко, начиненное орехами и изюмом, с щедрой посыпкой корицы и легким медовым соусом.', 190, 210, 'Десерты', 'https://i.ibb.co/s9BDWbTv/15.png', 40, 2, 1),
('Фруктовый салат с мятой', 'Смесь сезонных фруктов (киви, апельсин, виноград, клубника) с листиками свежей мяты и лёгкой цитрусовой заправкой.', 200, 190, 'Десерты', 'https://i.ibb.co/bg7pXvcB/16.png', 35, 1, 2),
('Освежающий лимонад с базиликом', 'Домашний лимонад из свежевыжатого лимонного сока, с добавлением листиков базилика и небольшим количеством мёда.', 120, 110, 'Напитки', 'https://i.ibb.co/HDqgjpPJ/17.png', 25, 0, 0),
('Зеленый чай с мятой и имбирем', 'Натуральный зеленый чай, настоянный с кусочками свежего имбиря и листиками мяты для легкой пикантности.', 100, 50, 'Напитки', 'https://i.ibb.co/8gbYRr77/18.png', 5, 0, 0),
('Комбуча с ягодами', 'Ферментированный напиток комбуча с натуральной кислинкой, дополненный свежими ягодами для аромата и цвета.', 130, 90, 'Напитки', 'https://i.ibb.co/RGMz8yCc/19.png', 10, 0, 0),
('Огуречно-лимонная вода', 'Освежающая вода с тонкими ломтиками огурца, дольками лимона и веточками мяты – идеальный напиток для жаркого дня.', 90, 40, 'Напитки', 'https://i.ibb.co/4wzgxJpr/23.png', 5, 0, 0),
('Свежая овощно-фруктовая нарезка', 'Красочная нарезка из свежей моркови, сельдерея и яблока, поданная с легким лимонным соусом для сохранения яркости вкуса.', 130, 100, 'Нарезка овощей или фруктов', 'https://i.ibb.co/GQ9pLVjv/20.png', 15, 0, 1),
('Сушёное манго с орехами', 'Натуральные сушёные ломтики манго, дополненные небольшим количеством обжаренных орехов для хруста и дополнительного вкуса.', 160, 150, 'Сушёные фрукты', 'https://i.ibb.co/twnhwzsq/21.png', 20, 5, 2),
('Сушёный банан с кокосовой стружкой', 'Тонко нарезанные сушёные ломтики банана, обогащённые нежной кокосовой стружкой для экзотического вкуса.', 150, 140, 'Сушёные фрукты', 'https://i.ibb.co/tpDvm55V/22.png', 18, 3, 1)
ON CONFLICT (name) DO NOTHING;
