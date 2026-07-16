FROM node:20-alpine
 
WORKDIR /app

COPY prisma ./prisma
COPY package*.json ./
RUN npm ci 
RUN npx prisma generate
 
COPY . .



EXPOSE 3000
 
CMD ["npm","run","dev"]