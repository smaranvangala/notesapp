# Notes App

A modern, responsive notes application built with React and Firebase, featuring real-time data persistence, tag-based organization, and search functionality.

## Features

- Create, edit, and delete notes
- Tag-based organization with hashtag support
- Real-time search functionality
- Responsive design with dark theme
- Cloud data persistence with Firebase Firestore
- Clean, intuitive user interface

## Tech Stack

### Frontend
- **React** `18.3.1` - UI framework
- **TypeScript** `5.6.3` - Type safety
- **Vite** `5.4.14` - Build tool and dev server
- **Wouter** `3.3.5` - Lightweight routing

### Styling & UI
- **Tailwind CSS** `3.4.17` - Utility-first CSS framework
- **Radix UI** `1.1.x - 2.2.x` - Accessible UI components
- **Lucide React** `0.453.0` - Icon library
- **Framer Motion** `11.13.1` - Animations

### State Management
- **TanStack React Query** `5.60.5` - Server state management
- **React Hook Form** `7.55.0` - Form handling
- **Zod** `3.24.2` - Schema validation

### Backend & Database
- **Firebase** `11.8.1` - Backend-as-a-Service
- **Firestore** - NoSQL cloud database

### Development
- **Node.js** `20.x` - Runtime environment
- **PostCSS** `8.4.47` - CSS processing
- **ESBuild** `0.25.0` - Fast bundler

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- Firebase project with Firestore enabled

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm run dev
```

## Deployment

### Vercel Deployment

This project is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your Firebase environment variables in Vercel dashboard
4. Deploy automatically

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Configure security rules for your use case
4. Get your web app configuration from Project Settings

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Firebase configuration
│   │   ├── utils/               # Utility functions
│   │   └── constants/           # App constants
├── vercel.json                  # Vercel deployment config
├── vite.config.client.ts        # Vite build configuration
└── DEPLOYMENT.md                # Deployment instructions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details