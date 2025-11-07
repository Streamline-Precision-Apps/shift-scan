# Docker Troubleshooting Guide

## 🐛 Issues Found and Fixed

### **Issue #1: Missing Sentry Flag in Runtime**
**Problem:** Entrypoint script didn't set `SKIP_SENTRY=true` before starting the app
**Fix:** Added `export SKIP_SENTRY=true` at the beginning of entrypoint.sh
**Impact:** Sentry won't try to initialize during runtime, preventing build failures

### **Issue #2: Incorrect Node Instrumentation**
**Problem:** Entrypoint was running `node dist/index.js` without Sentry instrumentation flag
```bash
# ❌ BEFORE
exec node dist/index.js

# ✅ AFTER  
exec node --import ./dist/instrument.mjs dist/index.js
```
**Impact:** Sentry error tracking won't work, and logs won't be properly instrumented

### **Issue #3: Build Script Mismatch**
**Problem:** package.json start script references `./src/instrument.mjs` but Docker only has `./dist/instrument.mjs`
**Fix:** Dockerfile now correctly copies instrument.mjs to dist/
**Impact:** Application now starts with proper instrumentation

---

## 🧪 Testing Steps

### 1. **Quick Local Build Test**
```bash
cd /Users/devunfox/shift-scan-app/server

# Make test script executable
chmod +x docker-test.sh

# Run the test
./docker-test.sh
```

### 2. **Build Only (No Push)**
```bash
docker build --platform linux/amd64 -t shift-scan-server:test .
```

### 3. **Check Build Output**
```bash
# See image layers and size
docker images shift-scan-server:test

# Inspect image
docker image inspect shift-scan-server:test
```

### 4. **Test with docker-compose**
```bash
# Make sure .env file exists with DATABASE_URL
docker-compose -f docker-compose-gcloud.yml up --build

# View logs
docker-compose -f docker-compose-gcloud.yml logs -f server
```

### 5. **Debug Inside Container**
```bash
# Build and enter shell (instead of running app)
docker run -it --rm shift-scan-server:test /bin/sh

# Inside container, verify:
ls -la dist/
ls -la node_modules/.prisma/
cat prisma/generated-schema.prisma
```

---

## 🔧 Checklist

- [ ] Verify `.env` file exists in `/server` directory
- [ ] Confirm `DATABASE_URL` or `POSTGRES_PRISMA_URL` is set in `.env`
- [ ] Check that Prisma migrations exist in `prisma/migrations/`
- [ ] Ensure `prisma/models/*.prisma` files exist (for schema merging)
- [ ] Run `npm install` locally to update dependencies
- [ ] Test build: `docker build --platform linux/amd64 -t shift-scan-server:test .`
- [ ] Check for TypeScript errors: `npm run build`

---

## 🚨 Common Errors & Solutions

### Error: "Cannot find module './prisma/generated-schema.prisma'"
**Solution:** Ensure `prisma/schema.prisma` and `prisma/models/*.prisma` exist
```bash
ls prisma/schema.prisma prisma/models/
```

### Error: "Prisma Client generation failed"
**Solution:** Reinstall dependencies and regenerate
```bash
rm -rf node_modules
npm install
npx prisma generate --schema prisma/generated-schema.prisma
```

### Error: "Port 8080 already in use"
**Solution:** Use a different port or stop conflicting container
```bash
docker kill $(docker ps -q)  # Stop all containers
# OR
docker run -p 8081:8080 ...  # Use different host port
```

### Error: "Database connection refused"
**Solution:** Ensure database is accessible before running migrations
- For Cloud Run: Set `POSTGRES_PRISMA_URL` environment variable
- For local: Start PostgreSQL or use docker-compose-prisma.yml

---

## 📝 Files Modified

1. ✅ **entrypoint.sh** - Added SKIP_SENTRY flag and --import instrumentation
2. ✅ **Dockerfile** - Already correct, verified Prisma client generation
3. 📄 **docker-test.sh** - New testing script (created)
4. 📄 **This guide** - Troubleshooting documentation

---

## 🚀 Next Steps

1. Run the test script: `./docker-test.sh`
2. Check error messages in output
3. Share specific error logs for further diagnosis
4. Once working locally, test deployment: `./deploy-to-cloudrun.sh`
