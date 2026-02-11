'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { loginWithBackend } from '@/lib/api';
import SkiteLogo from '@/components/SkiteLogo';
import { Button } from '@/components/ui/button';

const AUTH_LOG_STORAGE_KEY = 'skite_latest_auth_log';
const AUTH_LOG_HISTORY_STORAGE_KEY = 'skite_auth_logs';

function formatAuthTimestamp(date: Date) {
  const datePart = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
  const timePart = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date);
  return `${datePart} ${timePart}`;
}

type AuthLogEntry = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  message: string;
  userAgent: string;
  ipAddress: string;
  status: 'Failed' | 'Success';
};

function appendAuthLog(entry: AuthLogEntry) {
  const raw = localStorage.getItem(AUTH_LOG_HISTORY_STORAGE_KEY);
  let logs: AuthLogEntry[] = [];

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        logs = parsed.filter((item) => item && typeof item === 'object') as AuthLogEntry[];
      }
    } catch {
      logs = [];
    }
  }

  logs.unshift(entry);
  const trimmed = logs.slice(0, 100);
  localStorage.setItem(AUTH_LOG_HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
  localStorage.setItem(AUTH_LOG_STORAGE_KEY, JSON.stringify(entry));
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      const loginResponse = await loginWithBackend({
        idToken,
        platform: 'web',
        deviceToken: ''
      });

      const loginMessage =
        typeof loginResponse?.message === 'string'
          ? loginResponse.message
          : 'Login successful';
      const loginUser =
        typeof loginResponse?.user?.email === 'string' &&
        loginResponse.user.email.length > 0
          ? loginResponse.user.email
          : email;

      appendAuthLog({
        id: `current-login-${Date.now()}`,
        timestamp: formatAuthTimestamp(new Date()),
        user: loginUser,
        action: 'Login',
        message: loginMessage,
        userAgent: navigator.userAgent,
        ipAddress: 'Current session',
        status: 'Success'
      });

      router.replace('/logs');
      router.refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'LOGIN_FAILED';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-primary px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center">
          <SkiteLogo />
        </div>

        <div className="rounded-panel border border-border-primary bg-white shadow-card p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-heading-lg text-text-primary m-0">Admin login</h1>
            <p className="text-caption-lg text-text-secondary m-0">
              Sign in with your email and password.
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-caption-lg font-medium text-text-secondary">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg border border-border-primary bg-white px-3 text-body-sm text-text-primary placeholder:text-text-tertiary shadow-input outline-none focus:border-border-brand focus:ring-2 focus:ring-brand-primary/10"
                autoComplete="email"
                required
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-caption-lg font-medium text-text-secondary">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-lg border border-border-primary bg-white px-3 text-body-sm text-text-primary placeholder:text-text-tertiary shadow-input outline-none focus:border-border-brand focus:ring-2 focus:ring-brand-primary/10"
                autoComplete="current-password"
                required
              />
            </label>

            {error ? (
              <div className="rounded-lg border border-border-primary bg-surface-danger px-3 py-2 text-caption-lg text-text-danger">
                {error}
              </div>
            ) : null}

            <Button type="submit" disabled={loading} className="w-full h-10 shadow-button">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
