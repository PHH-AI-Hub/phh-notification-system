<script lang="ts">
	import type { SystemInformationInterface } from '$lib/model/interface/system-information.interface';
	import { deviceInformationState } from '$lib/store/state/device-information.state.svelte';
	import * as CryptoJS from 'crypto-js';
	import { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';

	let { tokenRequestSocket, systemInformation, onClose } = $props<{
		tokenRequestSocket: Socket;
		systemInformation: SystemInformationInterface | undefined;
		onClose: () => void;
	}>();

	let abortRequestTime: number = $state(30);
	let identifierKey: string = $state('');
	let identifierKeyChip: string[] = $state([]);

	onMount(() => {
		if (!deviceInformationState.deviceInformation?.hostname) {
			return;
		}
		identifierKey = CryptoJS.SHA256(
			deviceInformationState.deviceInformation?.hostname
		).toString(CryptoJS.enc.Hex);
		identifierKeyChip = splitIdentifierKey(identifierKey);
		countDownAbortRequest();
		sendDeviceVerificationRequest(identifierKey);
	});

	function splitIdentifierKey(key: string): string[] {
		const chips: string[] = [];
		if (!key) {
			return chips;
		}
		for (let i = 0; i < key.length; i += 8) {
			chips.push(key.substring(i, i + 8));
		}
		return chips;
	}

	function sendDeviceVerificationRequest(identifierKey: string) {
		const request = {
			arch: deviceInformationState.deviceInformation?.arch,
			exe_extension: deviceInformationState.deviceInformation?.exe_extension,
			family: deviceInformationState.deviceInformation?.family,
			hostname: deviceInformationState.deviceInformation?.hostname,
			locale: deviceInformationState.deviceInformation?.locale,
			platform: deviceInformationState.deviceInformation?.platform,
			version: deviceInformationState.deviceInformation?.version,
			username: deviceInformationState.deviceInformation?.username,
			cpu: systemInformation.cpu,
			global_cpu_usage: systemInformation.global_cpu_usage,
			available_memory: systemInformation.available_memory,
			total_memory: systemInformation.total_memory,
			used_memory: systemInformation.used_memory,
			free_swap: systemInformation.free_swap,
			total_swap: systemInformation.total_swap,
			used_swap: systemInformation.used_swap,
			processes: systemInformation.processes,
			free_memory: systemInformation.free_memory,
			device_id: identifierKey,
			is_verified: false,
			name: 'zarnihlawn'
		};
		tokenRequestSocket.emit('token-request', request);
	}

	function countDownAbortRequest() {
		setInterval(() => {
			if (abortRequestTime !== 0) {
				abortRequestTime -= 1;
			}
		}, 1000);
	}

	function abortDeviceVerificationRequest() {
		tokenRequestSocket.emit('abort-token-request', {
			device_id: identifierKey
		});
	}

	function handleClose() {
		try {
			abortDeviceVerificationRequest();
		} catch (e) {}
		onClose();
	}
</script>

<div class="modal modal-open">
	<div class="modal-box flex h-[90vh] w-11/12 max-w-5xl flex-col">
		<h2 class="text-2xl font-bold">Waiting Verification Acceptance</h2>

		<div class="my-1 flex flex-1 flex-col gap-10 overflow-y-auto py-3">
			<div>
				{#if deviceInformationState?.deviceInformation}
					<div
						class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border"
					>
						<table class="table">
							<!-- head -->
							<thead>
								<tr>
									<th></th>
									<th>key</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								<!-- row 1 -->
								<tr>
									<th>1</th>
									<td>Arch</td>
									<td>{deviceInformationState.deviceInformation.arch}</td>
								</tr>
								<!-- row 2 -->
								<tr>
									<th>2</th>
									<td>Username</td>
									<td>{deviceInformationState.deviceInformation.username}</td>
								</tr>

								<tr>
									<th>3</th>
									<td>Hostname</td>
									<td>{deviceInformationState.deviceInformation.hostname}</td>
								</tr>
								<!-- row 3 -->
								<tr>
									<th>4</th>
									<td>Family</td>
									<td>{deviceInformationState.deviceInformation.family}</td>
								</tr>
								<tr>
									<th>5</th>
									<td>Version</td>
									<td>{deviceInformationState.deviceInformation.version}</td>
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</div>
			<div class="grid grid-cols-4 justify-center gap-5 px-5">
				{#each identifierKeyChip as chip, index}
					<div class="indicator">
						<span class="indicator-item indicator-start badge badge-secondary">
							{index + 1}
						</span>
						<div class="badge badge-accent h-10 w-48 text-2xl">{chip}</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="modal-action">
			<button
				class="btn btn-warning"
				class:btn-disabled={abortRequestTime !== 0}
				onclick={handleClose}>Abort ({abortRequestTime}s)</button
			>

			<button class="btn btn-error" onclick={handleClose}>Cancel</button>
		</div>
	</div>
</div>
