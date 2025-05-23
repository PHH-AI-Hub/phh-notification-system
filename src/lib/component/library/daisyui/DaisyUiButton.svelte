<script lang="ts">
	let {
		content,
		status,
		border,
		corner,
		size,
		color,
		className,
		tooltipContent,
		tooltipVertPosition,
		tooltipHorzPosition,
		tooltipStatus,
		tooltipClassName
	} = $props();
</script>

<div class="tooltip" data-tip="{tooltipContent}">
  <button class="btn">Hover me</button>
</div>
