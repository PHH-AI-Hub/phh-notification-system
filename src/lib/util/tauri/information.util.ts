import { invoke } from '@tauri-apps/api/core';
import type { DeviceInformation } from '$lib/model/interface/device-information.interface';

export async function getApplicationVersion() {
	return await invoke<string>('get_application_version');
}

export async function getDeviceInformation() {
	return await invoke<DeviceInformation>('get_device_information');
}
