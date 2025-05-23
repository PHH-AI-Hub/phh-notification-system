import { io, Socket } from 'socket.io-client';
import { BACKEND_URL } from '$env/static/private';

export async function connectWebSocket(namespace?: string): Promise<Socket> {
	try {
		const url = `${BACKEND_URL}${namespace}`;

		const socket = io(url, {
			transports: ['websocket'],
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 1000
		});

		return new Promise((resolve, reject) => {
			socket.on('connect', () => {
				socket.emit('message', 'Connected ');
				resolve(socket);
			});

			socket.on('connect_error', (error) => {
				reject(error);
			});

			socket.on('disconnect', (reason) => {
				reject(new Error(reason));
			});

			setTimeout(() => {
				if (!socket.connected) {
					reject(new Error('Connection timeout'));
				}
			}, 5000);
		});
	} catch (error) {
		console.error('Socket.io connection error:', error);
		throw error;
	}
}
