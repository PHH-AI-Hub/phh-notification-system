import { appDataDir } from '@tauri-apps/api/path';
import { setAppDataDir } from './set.startup.svelte';

export async function getAppDataDir() {
	const appDataDirString: string = await appDataDir();
	setAppDataDir(appDataDirString);
}
