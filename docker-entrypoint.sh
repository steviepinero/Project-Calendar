#!/bin/sh
set -e

# Wait for PostgreSQL to be ready (use Node if nc not available)
wait_for_pg() {
    until node -e "
const net = require('net');
const s = net.createConnection(process.env.DB_PORT || 5432, process.env.DB_HOST || 'db', () => { s.destroy(); process.exit(0); });
s.on('error', () => process.exit(1));
setTimeout(() => process.exit(1), 30000);
" 2>/dev/null; do
        echo "Waiting for PostgreSQL at ${DB_HOST:-db}:${DB_PORT:-5432}..."
        sleep 2
    done
    echo "PostgreSQL is ready."
}

wait_for_pg

# Run DB init (ok if it fails e.g. database already exists)
npm run db:init || true

# Run migrations if the script exists
npm run db:migrate || true

exec "$@"
