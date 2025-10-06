### Builder image: install deps and build both client and server
FROM node:20-alpine AS builder
WORKDIR /app

# Install build tools
RUN apk add --no-cache python3 make g++

# Copy package manifests first for caching
COPY package.json package-lock.json ./

# Copy full repository (we need client and shared for Vite build)
COPY . .

# Install all deps and build the project (vite build + esbuild server)
RUN npm ci
RUN npm run build

### Runtime image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built artifacts from builder
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "dist/index.js"]
