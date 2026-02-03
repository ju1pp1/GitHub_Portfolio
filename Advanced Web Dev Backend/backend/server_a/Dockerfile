# This is where you define the image for
# the server A.

# You should use Node image from Docker Hub as the basis.

FROM node:18

WORKDIR /app/backend/server_a

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Expose WebSocket port
EXPOSE 3000

CMD ["node", "index.js"]
