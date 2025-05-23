<script lang="ts">
	import AppToolBar from '$lib/component/global/AppToolBar/AppToolBar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { createDatabase } from '$lib/util/tauri/sql.util';
	import { getAppDataDir } from '$lib/store/startup/get.startup.svelte';
	import { listen_to_app_updates } from '$lib/util/tauri/updater.util';

	let { children } = $props();

	// Initialize Services
	onMount(async () => {
		// Store / Startup
		await getAppDataDir();
		// Util / Tauri /SQL
		await createDatabase();

		// Util / Tauri / Socket

		// Util / Tauri / Stronghold

		// Util / Tauri /Http

		// Util / Tauri / Updater
		await listen_to_app_updates();
	});
</script>

<div class="flex h-screen w-screen flex-grow flex-col overflow-hidden">
	<section class="flex-shrink">
		<AppToolBar />
	</section>
	<main class=" flex-grow">
		{@render children()}
	</main>
</div>
