# Environment Configuration Setup

This project uses different configurations for development (`dev` branch) and production (`main` branch).

## AWS Amplify Configuration

### For the `dev` branch (dev.yutnori.app):
1. Go to AWS Amplify Console
2. Select your app
3. Go to "Environment variables"
4. Add: `VITE_ENV` = `development`

### For the `main` branch (yutnori.app):
1. Go to AWS Amplify Console
2. Select your app  
3. Go to "Environment variables"
4. Add: `VITE_ENV` = `production`

## How It Works

- **Development mode** (`dev` branch):
  - Socket endpoint: `https://yut-game-server-dev-6734615ef53a.herokuapp.com/`
  - Logging: **DISABLED** (no API calls to logger)
  - Log queries: **ENABLED** (Home2 component only)

- **Production mode** (`main` branch):
  - Socket endpoint: `https://yoot-game-6c96a9884664.herokuapp.com/`
  - Logging: **ENABLED** (sends logs to AWS API Gateway)
  - Log queries: **DISABLED** (returns empty data)

The configuration is managed in `src/config/env.js` and API functions are organized in `src/api/` folder.

## API Functions Organization

All API calls are now organized in the `/src/api/` folder:

### `/src/api/sendLog.js`
- Sends analytics events to the logging API
- **Only sends logs in production mode**
- Automatically skips in development with console message

### `/src/api/queryLogs.js`
- Queries analytics data from the logging API
- **Only queries logs in development mode**
- Returns empty data in production

### `/src/api/index.js`
- Barrel export file for easy imports

## Usage in Code

### Sending Logs:

```javascript
// Import from the API folder
import { sendLog } from './api'

// Send a log event (automatically skipped in dev)
await sendLog('buttonClick', { button: 'myButton' })
```

### Querying Logs (Home2 component only):

```javascript
// Import the hook
import useQueryLogs from './hooks/useQueryLogs'

// Query logs (automatically returns empty in production)
const [logs, loading] = useQueryLogs({ 
  eventName: 'pageView', 
  payload: { page: 'home' }
})
```

### Using Socket Endpoint:

```javascript
// Import the socket endpoint
import { SOCKET_ENDPOINT } from './config/env'
import { io } from 'socket.io-client'

const socket = io(SOCKET_ENDPOINT)
```

## Key Features

1. **Organized API folder** - All API calls in one place (`/src/api/`)
2. **Automatic environment detection** - No manual configuration in code
3. **Conditional logging** - Logs only sent in production
4. **Conditional queries** - Analytics queries only in development (Home2 only)
5. **Clean console feedback** - Clear messages when operations are skipped
