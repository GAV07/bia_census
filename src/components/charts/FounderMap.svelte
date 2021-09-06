<script>
	import { geoAlbersUsa, geoPath } from "d3-geo";
	import { scaleQuantize, scaleSequential, scaleLinear } from "d3-scale";
	import { extent, rollup } from "d3-array";
	import { csvParse } from 'd3-dsv'
	import { onMount } from "svelte";
	import { feature } from "topojson";
	import ChartTitle from '../tools/ChartTitle.svelte';

	export let data;
	export let supportData;
	export let title; 
	export let description;

	const citiesURL = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';
	const stateURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

	let mapData = [];
	$: cities = [];
	const keys = []
	const colors = ["#adf5ff","#70eeff","#47eaff","#33e7ff","#00b8d1","#00a2b8","#0090a3","#007e8f"]
	let founderColorScale = () => {};
	let width = 1200
	let height = width * 0.7
	let showHide = 'true';
	let toolTip = "";
	let scaleNumber = 650;
	
	let founderSummary = rollup(data, v => v.length, d => d.state)
	let founderExtent = extent(founderSummary, d => d[1])
	
	let supportSummary = rollup(supportData, v => v.length, d => d.state)
	let supportExtent = extent(supportSummary, d => d[1])

	// bucket of range for color scale
	let dif = founderExtent[1] - founderExtent[0];
	let a = dif/8;

	for (let i=founderExtent[0]; i<=founderExtent[1];i=i+a){
		keys.push(Math.round(i))
	}
	
	$: founderColorScale = scaleQuantize()
		.domain(founderExtent)
		.range(colors);

	$: supportColorScale = scaleQuantize()
		.domain(supportExtent)
		.range(colors);

	let cityCount = rollup(data, v => v.length, d => d.city)
	let cityExtent = extent(cityCount, d => d[1])
	const radiusScale = scaleLinear()
		.domain(cityExtent)
		.range([1,30])

	$: getFounderColor = function (feature) {
		let number = founderSummary.get(feature.properties.name)
		let color = founderColorScale(number)
		if (color) {
			return [color, number]
		} else {
			return ["#fff", "0"]
		}
	}

	$: getSupportColor = function (feature) {
		let number = supportSummary.get(feature.properties.name)
		let color = supportColorScale(number)
		if (color) {
			return [color, number]
		} else {
			return ["#fff", "0"]
		}
	}

	if( window.screen.width <= 480) {
		scaleNumber = 400
	}

	const projectionAlbersUsa = geoAlbersUsa().scale(scaleNumber)
	let currentProj = projectionAlbersUsa;
	
	let path = geoPath().projection(currentProj);

	const makePoints = function(lng, lat) {
		let points = currentProj([lng, lat])
		return points
	}

	const getFounderRadius = function(cityName) {
		let org = data.filter(d => d.city === cityName)
		let radius = org.length
		return radiusScale(radius)
	}

	const getSupportRadius = function(cityName) {
		let org = supportData.filter(d => d.city === cityName)
		let radius = org.length
		return radiusScale(radius)
	}

	const handleToolTip = function(stateName) {
		toolTip = stateName
		return toolTip
	}
	const handleMouseOut = function() {
		toolTip = ""
		return toolTip
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
	@import '../../styles/abstracts/mixins';
	
	#founder-map {
		background-color: $bk;
	}
	.input-container {
		display: flex;
		gap: 1em;

		@include respond(phone) {
			flex-direction: column;
        }
	}
	#map-wrapper {
		width: 1000px;
		height: 500px;
		position: relative;
		overflow: visible;
		display: flex;

		@include respond(phone) {
			flex-direction: column;
		}
	}
	svg {
		overflow: visible;
	}
	.map-name {
		transform: translate(100px, 100px);

		@include respond(phone) {
			font-size: $phone-font-size;
			transform: translate(400px, 40px);
		}
	}
	.states {
		transform: translate(-250px, 0);

		@include respond(phone) {
			transform: translate(20px, -120px);
		}
	}
	.state {
		&__shape {
		stroke: $slate;
		stroke-width: 0.15;
		transition: all .5s ease-in-out;
		}
		&__shape:hover {
			stroke: $secondary2;
			stroke-width: 1.5px;
		}


		&__info {
			
			&__name {
				font-family: 'Montserrat Alternates', sans-serif;
				font-size: $mid-font-size;
				transform: translate(0 ,250px)
			}
			&__number {
				transform: translate(0 ,270px)
			}
		}
	}
	.not-filled {
		opacity: .2;
		pointer-events: none;
	}
	.cities {
		opacity: .7;
		transform: translate(-250px, 0);
	}
	.city {
		fill: $primary3;
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
				height: 5px;
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
  
<section id="founder-map" class="chart-section">
	<ChartTitle 
		title={title}
		description= {description}
	/>
	<div class="input-container">
		<label><input type="radio" bind:group={showHide} value="true"/>Hide Cities</label>
		<label><input type="radio" bind:group={showHide} value="false"/>Show Cities</label>
	</div>
	<div class="chart-container" id="map-wrapper" bind:clientWidth="{width}">
		<svg class="founders" style="{`width: ${width}px; height: ${height}px`}">
			<text class="map-name">Black Funded Founders</text>
			<g class="states">
				{#each mapData as feature}
				<g
					class="state" 
					id={feature.properties.name}
					on:mouseover={handleToolTip(feature.properties.name)} 
					on:mouseout={handleMouseOut}
				>
					<path
						d={path(feature)}
						id={feature.properties.name}
						class="state__shape {getFounderColor(feature) != "#000" ? "filled" : "not-filled"}"
						fill={getFounderColor(feature)[0]} 
					/>
					{#if toolTip === feature.properties.name}
							<g class="state__info">
								<text class="state__info__name">{feature.properties.name}:</text>
								<text class="state__info__number">{getFounderColor(feature)[1]} Venture(s)</text>
							</g>
						{/if}
				</g>
				{/each}
			</g>
			{#if showHide === 'false'}
			<g class="cities">
				{#each cities as city}
					{#if data.some(org => org.city === city.city)}
						<circle class="city" cx={makePoints(city.lng, city.lat)[0]} cy={makePoints(city.lng, city.lat)[1]} r={getFounderRadius(city.city)} />
					{/if}
				{/each}
			</g>
			{/if}
		</svg>
		<svg class="supporters" style="{`width: ${width}px; height: ${height}px`}">
			<text class="map-name">Black Support Organizations</text>
			<g class="states">
				{#each mapData as feature}
					<g 
						class="state" 
						id={feature.properties.name}
					>
						<path
							data-tooltip="{feature.properties.name}: {getSupportColor(feature)[1]}"
							d={path(feature)}
							class="state__shape"
							fill={getSupportColor(feature)[0]} 
						/>
					</g>
				{/each}
			</g>
			{#if showHide === 'false'}
				<g class="cities">
					{#each cities as city}
						{#if supportData.some(org => org.city === city.city)}
							<circle class="city" cx={makePoints(city.lng, city.lat)[0]} cy={makePoints(city.lng, city.lat)[1]} r={getSupportRadius(city.city)} />
						{/if}
					{/each}
				</g>
			{/if}
		</svg>
		<!-- <div class="map-key">
			<div class="keys">
				{#each colors as color, index}
						<div class="boxes" style="background-color: {color};"><p>{keys[index]}</p></div>
				{/each}
			</div>
			<p>Number of Black Funded Companies</p>
		</div> -->
	</div>
</section>