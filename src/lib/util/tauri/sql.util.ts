import Database from '@tauri-apps/plugin-sql';
import { exists, create } from '@tauri-apps/plugin-fs';
import { appDataDirState } from '$lib/store/state/app-data-dir.state.svelte';

export async function createDatabase() {
	const filePath = appDataDirState.appDataDir;
	const dbPath = `${filePath}/local.db`;

	if (!(await exists(dbPath))) {
		await create(dbPath);
	}

	return Database.load(`sqlite:${dbPath}`);
}
