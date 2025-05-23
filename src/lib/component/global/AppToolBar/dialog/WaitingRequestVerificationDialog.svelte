<script lang="ts">
	import type { DeviceInformation } from '$lib/model/interface/device-information.interface';
	import * as CryptoJS from 'crypto-js';
	import { onMount } from 'svelte';

	let { deviceInformation, onClose } = $props<{
		deviceInformation: DeviceInformation | undefined;
		onClose: () => void;
	}>();

	let abortRequestTime: number = $state(30);
	let identifierKey: string = $state('');
	let identifierKeyChip: string[] = $state([]);

	onMount(() => {
		identifierKey = CryptoJS.lib.WordArray.random(32).toString();
		identifierKeyChip = splitIdentifierKey(identifierKey);
		sendDeviceVerificationRequest(identifierKey);
		countDownAbortRequest();
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
			arch: deviceInformation.arch,
			hostname: deviceInformation.hostname,
			family: deviceInformation.family,
			version: deviceInformation.version,
			identifier_key: identifierKey
		};
		// postDeviceScrape(request);
	}

	function countDownAbortRequest() {
		setInterval(() => {
			if (abortRequestTime !== 0) {
				abortRequestTime -= 1;
			}
		}, 1000);
	}

	function handleClose() {
		onClose();
	}
</script>

<div class="modal modal-open">
	<div class="modal-box flex h-[90vh] w-11/12 max-w-5xl flex-col">
		<h2 class="text-2xl font-bold">Waiting Verification Acceptance</h2>

		<div class="my-1 flex flex-1 flex-col gap-10 overflow-y-auto py-3">
			<div>
				{#if deviceInformation}
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
									<td>{deviceInformation.arch}</td>
								</tr>
								<!-- row 2 -->
								<tr>
									<th>2</th>
									<td>Hostname</td>
									<td>{deviceInformation.hostname}</td>
								</tr>
								<!-- row 3 -->
								<tr>
									<th>3</th>
									<td>Family</td>
									<td>{deviceInformation.family}</td>
								</tr>
								<tr>
									<th>4</th>
									<td>Version</td>
									<td>{deviceInformation.version}</td>
								</tr>
							</tbody>
						</table>
					</div>
				{/if}
			</div>
			<div class="grid grid-cols-4 justify-center gap-5">
				{#each identifierKeyChip as chip}
					<span class="badge badge-accent h-10 w-48 text-2xl">{chip}</span>
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
