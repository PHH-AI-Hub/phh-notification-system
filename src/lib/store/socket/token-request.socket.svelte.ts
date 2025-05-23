import { BACKEND_URL } from '$lib/env/app.env';
import { io, Socket } from 'socket.io-client';

export async function getTokenRequestSocket(
	namespace?: string
): Promise<Socket> {
	try {
		const tokenRequestSocket = io(`${BACKEND_URL}${namespace}`, {
			transports: ['websocket'],
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000
		});

		return new Promise((resolve, reject) => {
			tokenRequestSocket.on('connect', () => {
				tokenRequestSocket.emit('message', 'Connected ');
				resolve(tokenRequestSocket);
			});
			tokenRequestSocket.emit('token-request', () => {
				tokenRequestSocket.emit('message', 'Token Requested ');
				resolve(tokenRequestSocket);
			});
			tokenRequestSocket.emit('abort-token-request', () => {
				tokenRequestSocket.emit('message', 'Abort Token Requested ');
				resolve(tokenRequestSocket);
			});
			tokenRequestSocket.on('token-request-accepted', (device_id: string) => {
				console.log('Token Request Accepted:', device_id);
				resolve(tokenRequestSocket);
			});
			tokenRequestSocket.on('token-request-rejected', (device_id: string) => {
				console.log('Token Request Rejected:', device_id);
				resolve(tokenRequestSocket);
			});
			tokenRequestSocket.on('connect_error', (error) => {
				reject(error);
			});
			tokenRequestSocket.on('disconnect', (reason) => {
				reject(new Error(reason));
			});
			setTimeout(() => {
				if (!tokenRequestSocket.connected) {
					reject(new Error('Connection timeout'));
				}
			}, 5000);
		});
	} catch (error) {
		console.error('Socket.io connection error:', error);
		throw error;
	}
}
