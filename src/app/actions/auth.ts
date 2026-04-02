'use server';

import { signIn, signOut } from '@/auth';

export type LoginState = {
  error?: string;
};

export async function authenticate(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/applications',
    });
    return {};
  } catch (error) {
    const message = String(error);
    if (message.includes('CredentialsSignin') || message.includes('CallbackRouteError')) {
      return { error: 'Invalid email or password.' };
    }
    throw error;
  }
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: '/login' });
}
