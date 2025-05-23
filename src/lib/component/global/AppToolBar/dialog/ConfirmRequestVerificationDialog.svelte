<script lang="ts">
	import SunnyWebp from '$lib/asset/image/webp/sunny.webp';

	let { applicationVersion, onConfirm, onClose } = $props<{
		applicationVersion: string;
		onConfirm(): void;
		onClose(): void;
	}>();

	async function handleConfirm() {
		onConfirm();
	}

	function handleClose() {
		onClose();
	}
</script>

<div class="modal modal-open">
	<div
		class="modal-box flex h-[90vh] w-11/12 max-w-5xl flex-col justify-between"
	>
		<h2 class="text-2xl font-bold">Request Verification</h2>

		<div class="modal-body flex flex-col items-center gap-2">
			<div class="card bg-base-100 p-10 shadow-sm">
				<figure>
					<img class="size-32" src={SunnyWebp} alt="Sunny" />
				</figure>
			</div>
			<div class="card-body">
				App Version: {applicationVersion}
			</div>
		</div>

		<div class="modal-action">
			<button class="btn btn-success" onclick={handleConfirm}>Continue</button>
			<button class="btn btn-error" onclick={handleClose}>Cancel</button>
		</div>
	</div>
</div>
