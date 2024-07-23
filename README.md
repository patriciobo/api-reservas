<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripción

API para gestión de reservas.

## Instalacion de dependencias

```bash
$ npm install
```

Crear archivo `.env.` basado en `.env.template` con los valores para las variables de entorno.

## Para correr la aplicación

Levantar base de datos

```bash
$ docker compose up -d
```

Ejecutar comando para generar esquema de Prisma

```bash
$ npx prisma generate
```

Correr apliación

```bash
# desarrollo
$ npm run start:dev
```

Para generar datos de prueba ejecutar una request a:

```
GET localhost:3000/api/seed
```
