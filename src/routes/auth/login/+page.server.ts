import { redirect, fail, type Actions } from '@sveltejs/kit';
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { userPool } from '../../../lib/server/cognito';

export const actions: Actions = {
  login: async ({ request, cookies }) => {
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
        return fail(400, { error: 'invalid' });
      }
      response = await cognitoLogin(email, password);
    } catch (e: any) {
      return fail(400, { error: e.message });
    }

    cookies.set('jwt', response.getAccessToken().getJwtToken(), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });
    throw redirect(303, '/');
  },
};

const cognitoLogin = (email: string, password: string) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });
  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise<CognitoUserSession>((resolve, reject) => {
    return cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};
