# Deploying Notes App to Vercel

## Prerequisites
1. Firebase project setup with Firestore enabled
2. Vercel account
3. GitHub repository (recommended)

## Step 1: Prepare Your Repository
Push your code to GitHub including:
- All the current files
- The `vercel.json` configuration
- The `vite.config.client.ts` build configuration

## Step 2: Set Up Firebase Environment Variables in Vercel
When deploying to Vercel, add these environment variables in your Vercel dashboard:

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add the following variables:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`  
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

## Step 3: Deploy
1. Connect your GitHub repository to Vercel
2. Vercel will automatically use the `vercel.json` configuration
3. The build command will be: `vite build --config vite.config.client.ts`
4. Output directory will be: `dist`

## Firebase Setup
If you haven't created a Firebase project yet:

1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Firestore Database (Start in test mode for now)
4. Go to Project Settings > General > Your apps
5. Click "Web" and register your app
6. Copy the configuration values and add them to Vercel environment variables

## Notes
- The app will be deployed as a static site with Firebase handling all data operations
- No authentication is required - notes are stored directly in Firestore
- Make sure Firestore security rules allow read/write access for testing