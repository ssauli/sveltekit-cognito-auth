import { parse } from 'cookie';
import type { Handle } from '@sveltejs/kit';
import { verifier } from './lib/server/cognito';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const { headers } = event.request;
		const cookies = parse(headers.get('cookie') ?? '');
		const payload = await verifier.verify(cookies.jwt);
		event.locals.userId = payload.sub;
	} catch (e) {
		if (
			!['/auth/login', '/auth/sign-up', '/auth/confirm-registration'].includes(event.url.pathname)
		) {
			return new Response('Redirect', { status: 303, headers: { Location: '/auth/login' } });
		}
	}
	return await resolve(event);
};
