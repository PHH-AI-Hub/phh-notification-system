import type { DeviceInformationInterface } from '$lib/model/interface/device-information.interface';
import { appDataDirState } from '../state/app-data-dir.state.svelte';
import { deviceInformationState } from '../state/device-information.state.svelte';

export function setAppDataDir(appDataDirString: string) {
	appDataDirState.appDataDir = appDataDirString;
}

export function setDeviceInformation(
	deviceInformation: DeviceInformationInterface
) {
	deviceInformationState.deviceInformation = deviceInformation;
}
