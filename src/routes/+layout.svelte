<script lang="ts">
	import AppToolBar from '$lib/component/global/AppToolBar/AppToolBar.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { createDatabase } from '$lib/util/tauri/sql.util';
	import {
		getAppDataDir,
		getDeviceInformation
	} from '$lib/store/startup/get.startup.svelte';
	import { getTokenRequestSocket } from '$lib/store/socket/token-request.socket.svelte';
	import type { Socket } from 'socket.io-client';

	let { children } = $props();

	let tokenRequestSocket: Socket | null = $state(null);

	// Initialize Services
	onMount(async () => {
		try {
			await getAppDataDir();

			await getDeviceInformation();

			try {
				await createDatabase();
			} catch (error) {
				console.error('Error creating database:', error);
			}

			// Socket Init
			tokenRequestSocket = await getTokenRequestSocket(
				'/emr-notification-system-token-request'
			);
			if (tokenRequestSocket && !tokenRequestSocket.connected) {
				tokenRequestSocket.connect();
			}
		} catch (error) {
			console.error('Error during onMount initialization:', error);
		}
	});
</script>

<div class="flex h-screen w-screen flex-grow flex-col overflow-hidden">
	<section class="flex-shrink">
		<AppToolBar {tokenRequestSocket} />
	</section>
	<main class=" flex-grow">
		{@render children()}
	</main>
</div>
