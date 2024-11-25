# Proyecto Sequelize
Este proyecto es un programa de una tienda para interactuar con sus productos, categorías, pedidos y usuarios.

## Tecnologías que he utilizado 🛠️

Mi proyecto está desarrollado en Visual Studio Code, para crear la base de datos se ha utilizado MySQL Workbench y para interactuar con ella se usa Postman.
Como dependencias del proyecto, se ha instalado Express, Sequelize y Mysql2.

### Base de datos

Vista principal de las tablas usadas en el programa:

![FotoModelo](https://github.com/user-attachments/assets/38249923-84b1-4381-9dfe-c4fbf938fe41)

En este diagrama, dado que un usuario puede hacer varios pedidos, he creado una relación 1:N.
Un pedido puede tener varios productos y a su vez, un producto puede estar en varios pedidos, así que he creado una relación N:M con una tabla intermedia.
Además, un producto puede tener varias categorías y una categoría compartir varios productos, entonces he hecho otra relación entre ambas tablas con otra intermedia.

### Pre-requisitos 📋

Para que la aplicación funcione debes tener instalado Visual Studio Code y MySQL Workbench.
Para comprobar que los enlaces del código funcionan, se debe instalar Postman.

### Instalación 🔧

Para poder iniciar el proyecto, primero debes instalar automáticamente las dependencias necesarias:

```
npm i
```

Una vez instalados, ejecuta el siguiente comando para levantar el servidor y poder hacer funcionar el código:

```
npm run dev
```

---
Hecho por [Xavier Antúnez](https://github.com/xavixam) 😊
