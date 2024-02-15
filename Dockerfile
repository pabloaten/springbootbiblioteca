# Usa una imagen de Node.js como base
FROM node:14-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación en modo de desarrollo
CMD ["npm", "run", "dev"]
