# Imagen base
FROM php:8.3-apache

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    libicu-dev zip unzip git curl libzip-dev libonig-dev libpq-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip opcache

# Configurar Apache y mod_rewrite
COPY apache.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer el directorio de trabajo
WORKDIR /var/www/html/backend

# Copiar archivos de Symfony
COPY . .

# Asignar permisos correctos
RUN chown -R www-data:www-data /var/www/html/backend

# Instalar dependencias PHP/Symfony
RUN composer install

# Exponer el puerto
EXPOSE 80