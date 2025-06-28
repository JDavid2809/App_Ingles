# Development 
Pasos para levantar la app en desarrollo


1. levantar la base de datos
```
 docker compose up -d

```

2. Crear una copia de el .env.template y renombarlo  a .env 
3. Remplazar las variables de entorno
4. Ejecutar el comando ```npm install ```
5. Ejecutar el comando ``` npm run dev```
6. Eejecutar estos comandos de prisma
```
    npx prisma migrate dev
    npx prisma generate
```




# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```


