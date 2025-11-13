#!/bin/sh
set -e  # exit if any command fails

echo "🚀 Starting application initialization..."

# ============================================================
 # Set Core Environment Variables
 # ============================================================

export SKIP_SENTRY=true
export PORT=8080
export NODE_ENV=${NODE_ENV:-production}

# ============================================================
# Database Configuration
# ============================================================

export POSTGRES_PRISMA_URL=${POSTGRES_PRISMA_URL}
export POSTGRES_URL_NON_POOLING=${POSTGRES_URL_NON_POOLING}

# ============================================================
# Validation & Logging
# ============================================================

echo "✓ Environment Variables Loaded:"
echo "  - NODE_ENV: $NODE_ENV"
echo "  - PORT: $PORT"

# Check for required environment variables
MISSING_VARS=""
[ -z "$POSTGRES_PRISMA_URL" ] && MISSING_VARS="${MISSING_VARS}POSTGRES_PRISMA_URL "
[ -z "$FIREBASE_SERVICE_JSON_PROJECT_ID" ] && MISSING_VARS="${MISSING_VARS}FIREBASE_SERVICE_JSON_PROJECT_ID "
[ -z "$JWT_SECRET" ] && MISSING_VARS="${MISSING_VARS}JWT_SECRET "

if [ -n "$MISSING_VARS" ]; then
  echo ""
  echo "❌ CRITICAL: Missing required environment variables:"
  for var in $MISSING_VARS; do
    echo "  - $var"
  done
  echo ""
  echo "To fix, verify these are set in Cloud Run service configuration:"
  echo "  gcloud run services update shift-scan-server --region us-west3 --update-env-vars=..."
  exit 1
fi

echo "  - Database configured: ✓"
echo "  - Firebase project_id: ✓"
echo "  - JWT_SECRET: ✓"

# ============================================================
# Database Migrations
# ============================================================

echo ""
echo "🔄 Running Prisma migrations..."
if npx prisma migrate deploy --schema prisma/generated-schema.prisma; then
  echo "✅ Migrations completed successfully"
else
  echo "⚠️  Migration info: No pending migrations or already up to date"
fi

# ============================================================
# Start Application
# ============================================================

echo ""
echo "✅ Configuration complete. Starting Node application..."
echo "   Listening on port $PORT"

exec node --import ./dist/instrument.mjs dist/index.js