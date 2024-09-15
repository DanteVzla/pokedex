<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Ejecutar en Desarrollo

1. Clonar Repositorio
2. Ejecutar
```bash
$ npm install
```
3. Tener NestJS CLI Instalado
```bash
$ npm i -g nestjs/cli
```
4. Levantar Base de Datos
```bash
$ docker-compose up -d
```
5. Ejecutar para levantar
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

6.  Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources
1. Docker Desktop
2. Postman
3. Table Plus (nota: o su browser de dbase de preferencia)

## Stack Usado
* NodeJS
* Nest JS
* MongoDB

## Reconstruir Seed
* localhost:3000/api/v2/seed
* ejecutar solo en desarrollo, si ocurre un fallo en la data

## ENVIROMENT
* Clonar el archivo __.env.template__ y renombrar la copia a __.env__
* Llenar las variables de entorno definida el __.env__
* Ejecutar la aplicacion en dev:
``` npm run start:dev ```

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
