# MSP Project Calendar - production image
FROM node:20-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json* ./

# Production dependencies only
RUN npm ci --omit=dev 2>/dev/null || npm install --omit=dev

# Copy application code
COPY . .
# Ensure critical static assets are present (styles, index)
COPY index.html styles.css ./

# Default port
EXPOSE 8000

# Use entrypoint to wait for DB and run migrations, then start server
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "server.js"]
