<script lang="ts">
	import NotificationDetail from '$lib/component/local/app/home/notification-detail/NotificationDetail.svelte';
	import NotificationPreview from '$lib/component/local/app/home/notification-preview/NotificationPreview.svelte';
	import { invoke } from '@tauri-apps/api/core';
	import { onMount } from 'svelte';

	onMount(async () => {
		const systemInformation = await invoke('get_system_information');
		console.log('System Information:', systemInformation);
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
