<script lang="ts">
	import LucideBell from '$lib/component/library/lucide/LucideBell.svelte';
	import ConfirmRequestVerificationDialog from './dialog/ConfirmRequestVerificationDialog.svelte';
	import WaitingRequestVerificationDialog from './dialog/WaitingRequestVerificationDialog.svelte';
	import SunnyWebp from '$lib/asset/image/webp/sunny.webp';
	import { onMount } from 'svelte';
	import {
		invokeApplicationVersion,
		invokeSystemInformation
	} from '$lib/util/tauri/information.util';
	import type { SystemInformationInterface } from '$lib/model/interface/system-information.interface';
	import type { Socket } from 'socket.io-client';
	import { scale } from 'svelte/transition';

	let showConfirmRequestVerificationDialog: boolean = $state(false);
	let showWaitingRequestVerificationDialog: boolean = $state(false);

	let applicationVersion: string = $state('');
	let systemInformation: SystemInformationInterface | undefined = $state();

	let { tokenRequestSocket } = $props<{
		tokenRequestSocket: Socket | null;
	}>();

	onMount(async () => {
		applicationVersion = await invokeApplicationVersion();
		systemInformation = await invokeSystemInformation();
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
			<button class="cursor-pointer">
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
		{tokenRequestSocket}
		{systemInformation}
		onClose={handleDialogClose}
	/>
{/if}
