import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from '$env/static/private';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

const poolData = {
	UserPoolId: COGNITO_USER_POOL_ID,
	ClientId: COGNITO_CLIENT_ID
};
export const userPool = new CognitoUserPool(poolData);

export const verifier = CognitoJwtVerifier.create({
	userPoolId: COGNITO_USER_POOL_ID,
	tokenUse: 'access',
	clientId: COGNITO_CLIENT_ID
});
