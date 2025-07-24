# Test Frontend

Modern React application demonstrating frontend-backend connectivity.

## 📖 Documentation
- **[🚀 Deployment Guide](DEPLOYMENT.md)** - Complete frontend deployment instructions
- **[⚡ Quick Deploy](QUICK-DEPLOY.md)** - 3-minute deployment guide

## Features
- React 18 with Hooks (useState, useEffect)
- Axios for API calls
- Responsive design with modern CSS
- Error handling and loading states
- Environment variable support
- Beautiful gradient UI with animations
- Visual debug panel for real-time monitoring
- Professional error diagnostics

## API Integration
- Connects to Node.js backend API
- Displays real-time server data
- Shows server status and health metrics
- Handles connection errors gracefully
- Automatic backend URL detection (dev/prod)

## Local Development
```bash
npm install
npm start
```

## Debug Commands
```bash
npm start            # Development server
npm run start:debug  # Debug mode with extra logging
npm run start:local  # Force local backend connection
npm run build:debug  # Build with debug info
```

## Environment Variables
- `REACT_APP_BACKEND_URL` - Backend API URL (defaults to localhost:5000)

## Deployment
- **Platform**: Vercel (static site with CDN)
- **Framework**: Create React App
- **Optimization**: `.vercelignore` for faster builds
- **Monitoring**: Built-in debug panel and analytics

**[📖 Full Deployment Guide](DEPLOYMENT.md)** | **[⚡ Quick Deploy](QUICK-DEPLOY.md)** 