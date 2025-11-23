# ——— 1) Build Stage ———
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (no optional dependencies)
RUN npm install

# Copy the rest of the source code
COPY . .

# Build NestJS into /dist
RUN npm run build



# ——— 2) Production Stage ———
FROM node:18-alpine AS runner

WORKDIR /app

# Only copy necessary built files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose API port
EXPOSE 3000

# Start the compiled app
CMD ["node", "dist/main.js"]
