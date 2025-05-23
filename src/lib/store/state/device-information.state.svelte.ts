import type { DeviceInformationInterface } from '$lib/model/interface/device-information.interface';

export const deviceInformationState = $state({
	deviceInformation: null as DeviceInformationInterface | null
});
