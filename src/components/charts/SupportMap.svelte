<script>
	import { geoAlbersUsa, geoPath } from "d3-geo";
	import { scaleQuantize, scaleSequential, scaleLinear } from "d3-scale";
	import { schemeOranges } from 'd3-scale-chromatic';
	import { extent, rollup } from "d3-array";
	import { csvParse } from 'd3-dsv'
	import { onMount } from "svelte";
	import { feature } from "topojson";
	import ChartTitle from '../tools/ChartTitle.svelte';
	import Icon from '../tools/Icon.svelte';

	export let data;
	export let title; 
	export let description;

	const citiesURL = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';
	const stateURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

	let newList = data;
	let mapData = [];
	$: cities = [];
	const keys = [4,8,12,16,20,24,28,32]
	const colors = schemeOranges[8]
	let colorScale = () => {};
	let width = 1200
	let height = width * 0.7
	let showHide = 'true';
	
	
	let summary = rollup(data, v => v.length, d => d.state)
	let orgExtent = extent(summary, d => d[1])
	
	$: colorScale = scaleQuantize()
		.domain(orgExtent)
		.range(colors);

	let cityCount = rollup(data, v => v.length, d => d.city)
	let cityExtent = extent(cityCount, d => d[1])
	const radiusScale = scaleLinear()
		.domain(cityExtent)
		.range([2,20])

	$: getColor = function (feature) {
		let number = summary.get(feature.properties.name)
		let color = colorScale(number)
		if (color) {
			return [color, number]
		} else {
			return ["#fff", "#fff"]
		}
	}

	const projectionAlbersUsa = geoAlbersUsa().scale(950)
	let currentProj = projectionAlbersUsa;
	
	let path = geoPath().projection(currentProj);

	const makePoints = function(lng, lat) {
		let points = currentProj([lng, lat])
		return points
	}

	const getRadius = function(cityName) {
		let org = data.filter(d => d.city === cityName)
		let radius = org.length
		return radiusScale(radius)
	}

  
	onMount(async function() {
		const stateResponse = await fetch(
			stateURL
		);
		const json = await stateResponse.json();

		const cityResponse = await fetch(
			citiesURL
		);
		const csv = await cityResponse.text();
		let parsed = csvParse(csv)
		$: cities = parsed.filter(d => d.country === "United States")

		const topoData = feature(json, json.objects.states);
		const land = {
		...topoData,
		};
		mapData = land.features;
	});
</script>
  
<style lang="scss">
	@import '../../styles/abstracts/variables';
	
	.chart-section {
		background-color: $bk;
	}
	#map-wrapper {
		width: 1000px;
		height: 500px;
	}
	.stateShape {
	  stroke: $slate;
	  stroke-width: 0.15;
	  transition: all .5s ease-in-out;
	}
	.stateShape:hover {
		stroke: $secondary2;
		stroke-width: 1.5px;
	}
	.not-filled {
		opacity: .2;
		pointer-events: none;
		color: #000;
	}
	.cities {
		opacity: .7;
	}
	.city {
		fill: $primary1;
	}
	.chart-container {
		position: relative;
		overflow: visible;
	}
	.map-key {
		position: absolute;
		bottom: 0;
		right: 0;
		transform: translate(0, 30px);

		.keys {
			display: flex;

			.boxes {
				width: 40px;
				height: 10px;
				overflow: visible;
				margin-bottom: 8px;
	
				p {
					font-size: $sm-font-size;
					transform: translate(16px, -12px);
				}
			}
		}
	}

</style>
  
<section class="chart-section">
	<ChartTitle 
		title={title}
		description= {description}
	/>
	<div class="input-container">
		<label><input type="radio" bind:group={showHide} value="true"/>Hide Cities</label>
		<label><input type="radio" bind:group={showHide} value="false"/>Show Cities</label>
	</div>
	<div class="chart-container" id="map-wrapper" bind:clientWidth="{width}">
		<svg style="{`width: ${width}px; height: ${height}px`}">
			<g class="states">
				{#each mapData as feature}
					<path
					data-tooltip="{feature.properties.name}: {getColor(feature)[1]}"
					d={path(feature)}
					id={feature.properties.name}
					class="stateShape"
					fill={getColor(feature)[0]} 
					/>
				{/each}
			</g>
			{#if showHide === 'false'}
			<g class="cities">
				{#each cities as city}
					{#if data.some(org => org.city === city.city)}
						<circle class="city" cx={makePoints(city.lng, city.lat)[0]} cy={makePoints(city.lng, city.lat)[1]} r={getRadius(city.city)} />
					{/if}
				{/each}
			</g>
			{/if}
		</svg>
		<div class="map-key">
			<div class="keys">
				{#each colors as color, index}
						<div class="boxes" style="background-color: {color};"><p>{keys[index]}</p></div>
				{/each}
			</div>
			<p>Number of Orgs in State</p>
		</div>
	</div>
</section>