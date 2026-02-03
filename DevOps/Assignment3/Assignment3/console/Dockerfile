FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache docker-cli
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY app.js ./
COPY public ./public
EXPOSE 3000
CMD ["node", "app.js"]