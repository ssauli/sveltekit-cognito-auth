import { redirect, fail, type Actions } from '@sveltejs/kit';
import type { ISignUpResult } from 'amazon-cognito-identity-js';
import { userPool } from '$lib/server/cognito';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    let response;
    try {
      const formData = await request.formData();
      const email = formData.get('email');
      const password = formData.get('password');

      if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !email ||
        !password
      ) {
        return fail(400, { error: 'invalid input' });
      }

      response = await cognitoRegisterUserToUserPool(email, password);
    } catch (e: any) {
      return fail(400, { error: e.message });
    }
    cookies.set('username', response.user.getUsername(), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });
    throw redirect(303, '/auth/confirm-registration');
  },
};

function cognitoRegisterUserToUserPool(
  email: string,
  password: string
): Promise<ISignUpResult> {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [], [], (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result);
      }
    });
  });
}
