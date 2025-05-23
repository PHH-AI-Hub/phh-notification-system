import { invoke } from '@tauri-apps/api/core';
import type { DeviceInformation } from '$lib/model/interface/device-information.interface';
import type { SystemInformationInterface } from '$lib/model/interface/system-information.interface';

export async function getApplicationVersion() {
	return await invoke<string>('get_application_version');
}

export async function getDeviceInformation() {
	return await invoke<DeviceInformation>('get_device_information');
}

export async function getSystemInformation() {
	return await invoke<SystemInformationInterface>('get_system_information');
}
