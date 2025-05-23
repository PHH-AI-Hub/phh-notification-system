// import { Client, Stronghold } from '@tauri-apps/plugin-stronghold';
// import { appDataDir } from '@tauri-apps/api/path';
// import { STRONGHOLD_NAME, STRONGHOLD_PASSWORD } from '$lib/env/app.env';

// export async function createStronghold() {
// 	try {
// 		const path = `${await appDataDir()}/${STRONGHOLD_NAME}`;
// 		console.log('Initializing Stronghold at path:', path);

// 		// Add error handling for the Stronghold.load operation
// 		const stronghold = await Stronghold.load(path, STRONGHOLD_PASSWORD);

// 		let client: Client;
// 		const clientName = 'name your client';
// 		try {
// 			client = await stronghold.loadClient(clientName);
// 		} catch (error) {
// 			console.log('Client not found, creating new client:', error);
// 			client = await stronghold.createClient(clientName);
// 		}

// 		console.log('Stronghold loaded:', stronghold);
// 		console.log('Client loaded:', client);
// 		return {
// 			stronghold,
// 			client
// 		};
// 	} catch (error) {
// 		console.error('Error initializing Stronghold:', error);
// 		throw error;
// 	}
// }
