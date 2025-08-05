# Dockerfile para React
FROM node:18 as build

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Usar nginx para servir los archivos estáticos
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
