import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { userPool } from '$lib/server/cognito';

export const actions: Actions = {
  confirmRegistration: async ({ request, cookies }) => {
    try {
      const formData = await request.formData();
      const confirmationCode = formData.get('confirmationCode');
      const username = cookies.get('username');

      if (
        typeof username !== 'string' ||
        typeof confirmationCode !== 'string' ||
        !username ||
        !confirmationCode
      ) {
        return fail(400, { error: 'invalid' });
      }

      const myCognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool,
      });
      await cognitoConfirmRegistration(myCognitoUser, confirmationCode);
    } catch (e: any) {
      console.error(e);
      return { success: false, error: e.message };
    }

    throw redirect(303, '/auth/login');
  },
};

function cognitoConfirmRegistration(
  cognitoUser: any,
  confirmationCode: string
) {
  return new Promise<CognitoUserSession>((resolve, reject) => {
    cognitoUser.confirmRegistration(
      confirmationCode,
      true,
      (err: any, result: any) => {
        if (err) {
          reject(err);
          return;
        }
        if (result) {
          resolve(result);
        }
      }
    );
  });
}
