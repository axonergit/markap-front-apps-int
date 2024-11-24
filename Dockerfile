# Usamos una imagen base de Node.js para la etapa de construcción
FROM node:16 AS build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y package-lock.json desde markap
COPY markap/package.json markap/package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Depuración: Listamos los archivos en el directorio /app
RUN ls -al /app

# Copiamos todo el código fuente desde la carpeta markap al contenedor
COPY markap /app

# Depuración: Listamos los archivos en /app después de la copia
RUN ls -al /app

# Limpiamos la caché de npm (opcional)
RUN npm cache clean --force

# Ejecutamos el build de Vite en el directorio correcto
RUN npm run build --prefix /app/

# Usamos una imagen más ligera para producción (Nginx)
FROM nginx:alpine

# Copiamos los archivos construidos desde la imagen anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 para que nginx pueda servir los archivos
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
