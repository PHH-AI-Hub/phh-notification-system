import { listen } from '@tauri-apps/api/event';

export function listen_to_app_updates() {
	listen<boolean>('update-to-latest-version', async (event) => {
		console.log('update_to_latest_version', event.payload);
	});
}
