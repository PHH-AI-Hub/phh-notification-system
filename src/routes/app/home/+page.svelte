<script lang="ts">
	import NotificationDetail from '$lib/component/local/app/home/notification-detail/NotificationDetail.svelte';
	import NotificationPreview from '$lib/component/local/app/home/notification-preview/NotificationPreview.svelte';
	import NotificationAudio from '$lib/asset/audio/notification.mp3';
	import { onMount } from 'svelte';
	import { listen } from '@tauri-apps/api/event';
	import { check } from '@tauri-apps/plugin-updater';

	listen('update-to-latest-version', async (event) => {
		console.log('update_to_latest_version', event.payload);
		const update = await check();
		await update?.downloadAndInstall();
	});
</script>

<div class="my-2 flex h-[90vh] flex-grow overflow-hidden">
	<section class="min-w-[35vh] overflow-auto px-3">
		<NotificationPreview />
	</section>
	<div class="divider divider-horizontal"></div>
	<section class="flex-grow overflow-auto px-3">
		<NotificationDetail />
	</section>
</div>
