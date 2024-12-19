FROM node:18.16.0-alpine

RUN apk add --update --no-cache tzdata curl

ENV TZ America/Sao_Paulo

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
