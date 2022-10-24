# Web Autoadministrable
Es una web 100% autoadministrable con cuatro secciones además de la principal. Contiene un panel administrativo donde el usuario administrador puede crear,editar,eliminar contenido para la misma web. A este panel se ingresa mediante un ingreso para administrador.


## Pre-requisitos
Una computadora con internet

## Construido con
- Node.js
- Mongodb

## Versionado
Se uso Bitbucket para el control del mismo.





## Iniciar
Primero, levantar los servicios de mongodb con el servicio que tiene instalado cada uno.

Segundo, correr el servidor de desarrollo:
```bash
npm start
# or
yarn start
```

## Como correr con Deckerfile
```docker build -t <image_name> .```

And then run the container

```docker run -p 127.0.0.1:3001:3001 -it --rm <image_name>```