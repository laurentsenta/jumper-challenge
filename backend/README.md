# 🚀 Jumper challenge backend

## 🛠️ Getting Started

### Step 1: 🚀 Initial Setup

- Install dependencies: `npm install`

### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables, especially `ALCHEMY_API_KEY`.
- Update your `/etc/hosts` file to include:

```plaintext
127.0.0.1       app.jumper.local
127.0.0.1       api.jumper.local
::1             app.jumper.local
::1             api.jumper.local
```

### Step 3: 🏃‍♂️ Running the Project

- Start the docker services: `npm run start:infra` (requires Docker and Docker Compose)
- Tests: `npm run test`
- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`
