<script>
	import { LayerCake, Svg, Html } from 'layercake';
	import { scaleOrdinal, scaleBand } from 'd3-scale';
	import ChartTitle  from '../tools/ChartTitle.svelte';
	import ForceLayout from '../cake-components/CirclePackForce.svelte';
	import Key from '../cake-components/Key.svelte';

	export let data;
	export let title;
	export let description;
	
	const xKey = 'type';
	const rKey = 'reachNum';
	const zKey = 'type';

	let groupBy = 'true';

	const seriesNameSet = new Set();
	const seriesColors = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"];
	
	 data.forEach(d => {
		seriesNameSet.add(d[zKey]);

    if(d.reach === "Local") {
          d.reachNum = 1
        } else if (d.reach === "Regional") {
          d.reachNum = 2
        } else if (d.reach === "National") {
          d.reachNum = 3
        } else if (d.reach === "International") {
          d.reachNum = 4
        } else {
          d.reachNum = undefined
        }
	});

	/* --------------------------------------------
	 * Convert this to an array so we can use it in our scales
	 */
	const seriesNames = [...seriesNameSet];
	
	let manyBodyStrength = 3;
	let xStrength = 0.1
</script>

<style lang="scss">
	@import '../../styles/abstracts/variables';

	.chart-section {
		background-color: $bk;
	}
	.chart-container {
		width: 100%;
		height: 500px;
	}
	label {
		cursor: pointer;
	}
	input {
		position: relative;
		top: -2px;
		margin-right: 7px;
	}
</style>

<section class="chart-section">
	<ChartTitle 
		title={title}
		description={description}
	/>
	<div class="input-container">
		<label><input type="radio" bind:group={groupBy} value="true"/>Group by category</label>
		<label><input type="radio" bind:group={groupBy} value="false"/>Clump together</label>
	</div>
	
	<figure class="chart-container">
		<LayerCake
			data={data}
			x={xKey}
			r={rKey}
			z={zKey}
			xScale={scaleBand()}
			xDomain={seriesNames}
			rRange={[3, 12]}
			zScale={scaleOrdinal()}
			zDomain={seriesNames}
			zRange={seriesColors}
			
		>
			<Svg>
				<ForceLayout
					{manyBodyStrength}
					{xStrength}
					groupBy={JSON.parse(groupBy)}
					nodeStrokeColor='#000'
				/>
			</Svg>

			<Html pointerEvents={false}>
				<Key shape='circle'/>
			</Html>

		</LayerCake>
	</figure>
</section>
