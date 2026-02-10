import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { requiredEnv } from '@/lib/env';

function initFirebaseAdmin() {
  if (getApps().length > 0) return;

  const projectId = requiredEnv('FIREBASE_PROJECT_ID');
  const clientEmail = requiredEnv('FIREBASE_CLIENT_EMAIL');
  const privateKey = requiredEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');

  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey })
  });
}

export function adminAuth() {
  initFirebaseAdmin();
  return getAuth();
}

