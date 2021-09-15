<script>
	import { geoAlbersUsa, geoPath } from "d3-geo";
	import { scaleQuantize, scaleLinear } from "d3-scale";
	import { extent, rollup } from "d3-array";
	import { csvParse } from 'd3-dsv'
	import { onMount } from "svelte";
	import { feature } from "topojson";
	import ChartTitle from '../tools/ChartTitle.svelte';
	import { fade } from 'svelte/transition';
	import MediaQuery from '../tools/MediaQuery.svelte'

	export let data;
	export let title; 
	export let description;

	const citiesURL = 'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';
	const stateURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

	
	let mapData = [];
	$: cities = [];
	const keys = [4,8,12,16,20,24,28,32]
	const colors = ["#adf5ff","#70eeff","#47eaff","#33e7ff","#00b8d1","#00a2b8","#0090a3","#007e8f"]
	let colorScale = () => {};
	let width = 1200
	let height = width * 0.7
	let showHide = 'true';
	let toolTip = "";
	let scaleNumber = 950;
	
	
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

	const getRadius = function(cityName) {
		let org = data.filter(d => d.city === cityName)
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
	
	#support-map {

		@include respond(phone) {
			padding-top: 4em;
			height: 900px;
		}
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

		@include respond(phone) {
			transform: translate(25px, -100px);
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
				transform: translate(0 ,350px)
			}
			&__number {
				transform: translate(0 ,370px)
			}
		}
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
		fill: $primary3;
	}
	.map-key {
		position: absolute;
		bottom: 0;
		right: 0;
		transform: translate(0, 30px);

		@include respond(phone) {
			transform: translate(-220px, -100px);
        }

		.keys {
			display: flex;
			flex-wrap: wrap;

			.key-title {
				flex-basis: 100%;

				@include respond(phone) {
					font-size: $phone-font-size;
				}
			}

			.boxes {
				width: 40px;
				height: 5px;
				overflow: visible;
				margin-bottom: 8px;

				@include respond(phone) {
					width: 25px;
				}
	
				p {
					font-size: $sm-font-size;
					transform: translate(16px, 8px);
				}
			}
		}
	}

</style>
  
<section id="support-map" class="chart-section">
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
					<g 
						class="state" 
						id={feature.properties.name}
						on:mouseover={handleToolTip(feature.properties.name)} 
						on:mouseout={handleMouseOut}
					>
						<path
							data-tooltip="{feature.properties.name}: {getColor(feature)[1]}"
							d={path(feature)}
							class="state__shape"
							fill={getColor(feature)[0]} 
						/>
						{#if toolTip === feature.properties.name}
							<g class="state__info">
								<text class="state__info__name">{feature.properties.name}:</text>
								<text class="state__info__number">{getColor(feature)[1]} BSO(s)</text>
							</g>
						{/if}
					</g>
				{/each}
			</g>
			{#if showHide === 'false'}
				<g class="cities">
					{#each cities as city}
						{#if data.some(org => org.city === city.city)}
							<circle transition:fade class="city" cx={makePoints(city.lng, city.lat)[0]} cy={makePoints(city.lng, city.lat)[1]} r={getRadius(city.city)} />
						{/if}
					{/each}
				</g>
			{/if}
		</svg>
		<div class="map-key">
			<div class="keys">
				<p class="key-title">Number of Black Organizations</p>
				{#each colors as color, index}
						<div class="boxes" style="background-color: {color};"><p>{keys[index]}</p></div>
				{/each}
			</div>
		</div>
	</div>
</section>