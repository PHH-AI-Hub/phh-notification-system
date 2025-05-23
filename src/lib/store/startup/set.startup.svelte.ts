import { appDataDirState } from '../state/app-data-dir.state.svelte';

export function setAppDataDir(appDataDirString: string) {
	appDataDirState.appDataDir = appDataDirString;
}
