import { invoke } from '@tauri-apps/api/core';
import type { DeviceInformationInterface } from '$lib/model/interface/device-information.interface';
import type { SystemInformationInterface } from '$lib/model/interface/system-information.interface';

export async function invokeApplicationVersion() {
	return await invoke<string>('get_application_version');
}

export async function invokeDeviceInformation() {
	return await invoke<DeviceInformationInterface>('get_device_information');
}

export async function invokeSystemInformation() {
	return await invoke<SystemInformationInterface>('get_system_information');
}
