# Base image Playwright
FROM mcr.microsoft.com/playwright:v1.50.0-jammy

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Chạy Playwright
CMD ["node", "dist/index.js"]