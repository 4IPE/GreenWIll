# Используем базовый образ с Node.js для сборки React-приложения
FROM node:18 AS build

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Выполняем сборку React-приложения
RUN npm run build

# Используем минимальный образ Nginx для раздачи статических файлов
FROM nginx:stable-alpine

# Копируем собранные файлы React в директорию, которую обслуживает Nginx
COPY --from=build /build /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт для приложения
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
