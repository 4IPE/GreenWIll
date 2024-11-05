# Используем базовый образ Node.js для сборки приложения
FROM node:18 AS build

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код приложения в контейнер
COPY . .

# Сборка React-приложения
RUN npm run build

# Используем NGINX для обслуживания собранного приложения
FROM nginx:alpine

# Копируем собранное приложение из предыдущего контейнера
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем NGINX
CMD ["nginx", "-g", "daemon off;"]
