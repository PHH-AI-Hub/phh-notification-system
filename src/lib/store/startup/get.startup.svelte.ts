import { appDataDir } from '@tauri-apps/api/path';
import { setAppDataDir, setDeviceInformation } from './set.startup.svelte';
import { invokeDeviceInformation } from '$lib/util/tauri/information.util';

export async function getAppDataDir() {
	const appDataDirString: string = await appDataDir();
	setAppDataDir(appDataDirString);
}

export async function getDeviceInformation() {
	const deviceInformation = await invokeDeviceInformation();
	setDeviceInformation(deviceInformation);
}
