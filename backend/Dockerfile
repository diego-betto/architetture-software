FROM node:22-slim
WORKDIR /usr/src/app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt update && apt install -y --no-install-recommends \
    chromium \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "start"]