# Imagen base PHP con Apache
FROM php:8.3-apache

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    libicu-dev zip unzip git curl libzip-dev libonig-dev libpq-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip opcache

# Habilitar Apache mod_rewrite
COPY apache.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar archivos de Symfony
WORKDIR /var/www/html/backend
COPY . .

# Dar permisos
RUN chown -R www-data:www-data /var/www/html

# Instalar dependencias Symfony
RUN git config --global --add safe.directory /var/www/html/backend
RUN composer install

# Exponer puerto
EXPOSE 80