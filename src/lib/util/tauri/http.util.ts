import { fetch } from '@tauri-apps/plugin-http';
import { BACKEND_URL, BACKEND_PORT } from '$lib/env/app.env';

export function getHttpUrl(): string {
	return `http://${BACKEND_URL}:${BACKEND_PORT}`;
}

export async function fetchHttp(
	endpoint: string,
	method: string,
	body?: unknown
): Promise<unknown> {
	const url = `${getHttpUrl()}/${endpoint}`;
	const options = {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: body ? JSON.stringify(body) : undefined
	};

	try {
		const response = await fetch(url, options);
		return await response.json();
	} catch (error) {
		console.error('HTTP request error:', error);
		throw error;
	}
}
