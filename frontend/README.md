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

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://app.jumper.local:3000](http://app.jumper.local:3000) with your browser to see the result.

- Tests: `npm run test`
- Run the development server: `npm run dev`
- Build the project: `npm run build`
- Start the production server: `npm run start`
