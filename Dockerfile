# Etapa 1: Construcción de la aplicación
FROM node:18 as builder

# Configuración de directorio de trabajo
WORKDIR /markap

# Copiar archivos de la aplicación
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación con nginx
FROM nginx:alpine

# Copiar archivos generados al directorio de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para nginx
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
