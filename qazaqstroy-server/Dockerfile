# Используем официальный образ Node.js
FROM node:14

# Создаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY .. .

# Указываем порт, который будет использован
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "index.js"]
