# Use Node LTS
FROM node:20-alpine AS base
WORKDIR /usr/src/app

# Install deps
FROM base AS deps
COPY package*.json ./
RUN npm install

# Build
FROM base AS build
COPY . .
RUN npm install
RUN npm run build

# Production image
FROM node:20-alpine AS runtime
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY package.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
