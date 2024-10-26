from node:20-alpine as build

WORKDIR /app

COPY package*.json ./


RUN npm install 

COPY . .


RUN npm run build

FROM nginx:apline



COPY --from=build /app/dist/comptabilite-web dest