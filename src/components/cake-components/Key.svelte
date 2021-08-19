<script>
	import { getContext } from 'svelte';

	/* --------------------------------------------
	 * Can be: "circle", "line" or "square"
	 */
	export let shape = 'square';

	/* --------------------------------------------
	 * Can be "start", "center" or "end"
	 */
	export let align = 'center';

	/* --------------------------------------------
	 * Pass in lookup values
	 */
	export let lookup = undefined;

	/* --------------------------------------------
	 * Capitalize the series name: `true` or `false`
	 */
	export let capitalize = true;

	const { zDomain, zScale } = getContext('LayerCake');

	function cap (val) {
		return String(val).replace(/^\w/, d => d.toUpperCase());
	}

	function displayName (val) {
		if (lookup) {
			return lookup[val] || val;
		}
		return capitalize === true ? cap(val) : val;
	}
</script>

<style>
	.key {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		max-height: 120px;
		background-color: rgb(186, 211, 216);
		border-radius: 10px;
		padding: 1em;
	}
	.key-item {
		margin-right: 14px;
		margin-bottom: 8px;
		display: flex;
		align-items: center;
	}
	.chip {
		display: inline-block;
		position: relative;
		width: 12px;
		height: 12px;
		margin-right: 4px;
	}
	.chip__circle {
		border-radius: 50%;
	}
	.chip__line:after {
		content: '';
		position: absolute;
		border-width: 3px;
		width: 14px;
		transform: rotate(-45deg);
		transform-origin: 14px 5px;
	}
	.name {
		display: inline;
		font-size: 14px;

	}
</style>

<div class='key' style="justify-content: {align === 'end' ? 'flex-end': align};">
	{#each $zDomain as item}
	<div class='key-item'>
		<div
			class='chip chip__{shape}'
			style='background: {
				shape === `line` ?
				`linear-gradient(-45deg, #ffffff 40%, ${$zScale(item)} 41%, ${$zScale(item)} 59%, #ffffff 60%)`
				: $zScale(item)};'
		></div>
		<div class='name'>{displayName(item)}</div>
	</div>
	{/each}
</div>
