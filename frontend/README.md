# Carrier Board - Frontend

Next.js frontend for the Carrier Board platform.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context (with plans for Zustand)
- **HTTP Client:** Axios

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/           # Next.js pages (routing)
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global styles
│   ├── utils/           # Helper functions
│   ├── contexts/        # React contexts
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── package.json         # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## Key Features

### Current
- Landing page
- Responsive design
- Tailwind CSS styling

### Coming Soon
- User authentication UI
- Company search and profiles
- Review submission forms
- Rating dashboards
- User dashboard

## Development Guidelines

### Component Structure

```typescript
// components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'
      }`}
    >
      {label}
    </button>
  );
};
```

### API Integration

```typescript
// utils/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

