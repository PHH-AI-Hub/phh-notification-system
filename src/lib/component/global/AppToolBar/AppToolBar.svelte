<script lang="ts">
	import LucideBell from '$lib/component/library/lucide/LucideBell.svelte';
	import ConfirmRequestVerificationDialog from './dialog/ConfirmRequestVerificationDialog.svelte';
	import WaitingRequestVerificationDialog from './dialog/WaitingRequestVerificationDialog.svelte';
	import SunnyWebp from '$lib/asset/image/webp/sunny.webp';
	import { onMount } from 'svelte';
	import type { DeviceInformation } from '$lib/model/interface/device-information.interface';
	import {
		getApplicationVersion,
		getDeviceInformation
	} from '$lib/util/tauri/information.util';

	let showConfirmRequestVerificationDialog: boolean = $state(false);
	let showWaitingRequestVerificationDialog: boolean = $state(false);

	let applicationVersion: string = $state('');
	let deviceInformation: DeviceInformation | undefined = $state();

	onMount(async () => {
		applicationVersion = await getApplicationVersion();
		deviceInformation = await getDeviceInformation();
	});

	function handleVerifyOnClick() {
		showConfirmRequestVerificationDialog = true;
	}

	function handleConfirmClick() {
		showConfirmRequestVerificationDialog = false;
		showWaitingRequestVerificationDialog = true;
	}

	function handleDialogClose() {
		showConfirmRequestVerificationDialog = false;
		showWaitingRequestVerificationDialog = false;
	}
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="navbar-start">
		<img class="size-8" src={SunnyWebp} alt="Sunny" />
		<a href="/" class="btn btn-ghost text-xl">PHH Notification System</a>
	</div>

	<div class="navbar-end gap-5">
		<div class="indicator">
			<span class="indicator-item status status-error animate-ping"></span>
			<span class="indicator-item status status-error"></span>
			<button>
				<LucideBell />
			</button>
		</div>
		<button class="btn btn-primary" onclick={handleVerifyOnClick}>Verify</button
		>
	</div>
</div>

{#if showConfirmRequestVerificationDialog}
	<ConfirmRequestVerificationDialog
		{applicationVersion}
		onConfirm={handleConfirmClick}
		onClose={handleDialogClose}
	/>
{/if}

{#if showWaitingRequestVerificationDialog}
	<WaitingRequestVerificationDialog
		{deviceInformation}
		onClose={handleDialogClose}
	/>
{/if}
