<script>
	import { getContext } from 'svelte';
	import {
		forceSimulation,
		forceX,
		forceY,
		forceManyBody,
		forceRadial,
		forceCollide,
		forceCenter,
	} from 'd3-force';

	const { data, width, height, xScale, xGet, rGet, zGet } = getContext('LayerCake');
	/* --------------------------------------------
	 * Here are some values to play with, but most every force layout
	 * is going be unique and this component will need to be customized
	 * See more: https://github.com/d3/d3-force/blob/master/README.md
	 */
	export let manyBodyStrength = 10;
	export let xStrength = 0.5;
	/* --------------------------------------------
	 * Set a manual color, otherwise it will default to using the zScale
	 */
	export let nodeColor = undefined;
	export let nodeStrokeWidth = 1;
	export let nodeStrokeColor = '#fff';
	export let groupBy = true;

	/* --------------------------------------------
	 * Make a copy because the simulation will alter the objects
	 */
	const initialNodes = $data.map((d) => ({ ...d }));
	
	const simulation = forceSimulation(initialNodes)

	let nodes = [];

	simulation.on("tick", () => {
		nodes = simulation.nodes()
	})

	/* ----------------------------------------------
	 * When variables change, set forces and restart the simulation
	 */
	$: {
		simulation
			// .force('x', forceX().x(d => {
			// 	return groupBy === true ? $xGet(d) + $xScale.bandwidth() / 2 : $width / 2;
			// }).strength(xStrength))
			.force('center', forceCenter($width / 2, $height / 2))
			//.force('charge', forceManyBody().strength(manyBodyStrength))
			.force("radial", forceRadial(d => $rGet(d), $width / 2, $height / 2))
			.force('collision', forceCollide().radius(d => {
				return $rGet(d) + nodeStrokeWidth / 2; // Divide this by two because an svg stroke is drawn halfway out
			}))
			//.force('center', forceCenter($width / 2, $height / 2))
			.alpha(1)
			.restart()
	}

	let toolTip = "";
	const handleToolTip = function(programName) {
		toolTip = programName
		return toolTip
	}
	const handleMouseOut = function() {
		toolTip = ""
		return toolTip
	}
</script>

<style>
	.tag, .tag-text {
		z-index: 999;
	}
</style>

{#each nodes as point}
		<circle
		class='node'
		r={$rGet(point)}
		fill={nodeColor || $zGet(point)}
		stroke-width={nodeStrokeWidth}
		stroke={nodeStrokeColor}
		cx='{point.x}'
		cy='{point.y}'
		on:mouseover={handleToolTip(point.name)} 
		on:mouseout={handleMouseOut}
	>
	</circle>
	{#if $rGet(point) > 40}
		{#if toolTip === point.name}
			<rect
				class="tag"
				x='{point.x}'
				y='{point.y}'
				rx='10px'
				ry='10px'
				width='150px'
				height='60px'
				fill="#ECE5F0"
				transform='translate(-75,-25)'
			></rect>
			<text
				class="tag-text"
				x='{point.x - point.name.length * 2.5}'
				y='{point.y + 20}'
				fill='#1D1E68'
				font-size="10"
			>
				{point.name}
			</text>
		{/if}
		<text
			class="tag-text"
			x='{point.x - 10}'
			y='{point.y + 5}'
			fill='#fff'
		>
			{point.percent}%
		</text>
	{:else if toolTip === point.name}
		<rect
			class="tag"
			x='{point.x}'
			y='{point.y}'
			rx='10px'
			ry='10px'
			width='150px'
			height='60px'
			fill="#ECE5F0"
			transform='translate(-75,-25)'
		></rect>
		<text
			class="tag-text"
			x='{point.x - point.name.length * 2.5}'
			y='{point.y + 20}'
			fill='#1D1E68'
			font-size="10"
		>
			{point.name}
		</text>
	{/if}
{/each}
