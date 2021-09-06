<script>
	import { geoAlbersUsa, geoPath } from "d3-geo";
	import { scaleQuantize } from "d3-scale";
	import { extent, rollup } from "d3-array";
	import { onMount } from "svelte";
	import { feature } from "topojson";
	import ChartTitle from '../tools/ChartTitle.svelte'
	import Icon from '../tools/Icon.svelte'

	export let data;
	export let title; 
	export let description;

	let newList = data
	let mapData = []
	let current = "hide";
	const colors = ["#adf5ff","#70eeff","#47eaff","#33e7ff","#00b8d1","#00a2b8","#0090a3","#007e8f"]
	let colorScale = () => {};
	let width = 1200
	let height = width * 0.7
	let selectedState = ""
	let scaleNumber = 800;
	
	
	let summary = rollup(data, v => v.length, d => d.state)
	let orgExtent = extent(summary, d => d[1])
	
	$: colorScale = scaleQuantize()
		.domain(orgExtent)
		.range(colors);

	$: getColor = function (feature) {
		let number = summary.get(feature.properties.name)
		let color = colorScale(number)
		if (color) {
			return color
		} else {
			return "#fff"
		}
	}

	const filteronState = function (state) {
		newList = data.filter(d => d.state == state)
		return newList
	}

	if( window.screen.width <= 480) {
		scaleNumber = 400
	}

	const projectionAlbersUsa = geoAlbersUsa().scale(scaleNumber)
  
	let currentProj = projectionAlbersUsa;
	let path = geoPath().projection(currentProj);

  
	onMount(async function() {
	  const response = await fetch(
		"https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
	  );
	  const json = await response.json();
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
	
	#orgs {
		
	}
	.chart-section {
		background-color: $bk;
		border-radius: 0;
	}
	#interface {
		width: 100%;
		display: flex;

		@include respond(phone) {
			flex-direction: column;
		}
	}
	.conclusion__cta {
		margin-bottom: 3em;
	}
	#map-wrapper {
		width: 50%;
		height: 500px;

		@include respond(phone) {
			width: 100%;
		}
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
	}
	.states {
		transform: translate(-140px, 0);

		@include respond(phone) {
			transform: translate(-320px, 0);
		}
	}
	.org-list {
		max-width: 50%;
		height: 600px;
		overflow-y: auto;
		padding: 1em;
		border: 2px solid;
		border-radius: 10px;

		@include respond(phone) {
			max-width: 100%;
		}

		&__item {
			background-color: $primary3;
			padding: 1.5em 3em;
			margin: .5em 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: $primary2;
			border-radius: 10px;

			@include respond(phone) {
				flex-direction: column;
				text-align: center;
			}

			&__title-line {
				display: flex;
				align-items: center;
				margin-bottom: 8px;
			}

			&__programs {
				display: flex;
				flex-wrap: wrap;
				gap: 8px;
				margin-top: 16px;

				&__program {
					background-color: $secondary3;
					color: $primary3;
					padding: .5em $sm-font-size;
					border-radius: 20px;
					font-size: $sm-font-size;
				}
			}


			h3 {
				color: $white;
				margin-right: 1em;

				@include respond(phone) {
					margin: 0;
				}
			}

			a {
				text-decoration: none;
				color: $white;
			}

			.right {
				margin-top: 8px;
				margin-left: 24px;
				max-width: 500px;
				max-height: 100px;

				@include respond(phone) {
					margin-left: 0;
				}
			}
			.hide {
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical; 
				overflow: hidden;
			}
			.show {
				margin-top: 8px;
				margin-bottom: 8px;
				max-width: 500px;
				display: block;
			}
		}
	}
	
</style>
  
<section id="orgs" class="chart-section">
	<ChartTitle 
		title={title}
		description= {description}
	/>
	<div class="conclusion__cta">
		<a href="https://airtable.com/shriQiDe45MmH0YSw" class="cta-btn-alt">Submit your Org</a>
	</div>
	<div id="interface">
		<div class="chart-container" id="map-wrapper" bind:clientWidth="{width}">
			<svg style="{`width: ${width}px; height: ${height}px`}">
				<g class="states">
					{#each mapData as feature}
						<path
						d={path(feature)}
						id={feature.properties.name}
						class="stateShape {getColor(feature) != "#EA96CA" ? "filled" : "not-filled"}"
						fill={getColor(feature)} 
						on:click={(event) => { 
							selectedState = event.target.id
							filteronState(event.target.id)
						}}
						/>
					{/each}
				</g>
			</svg>
		</div>
		<div class="org-list">
			<h1 class="selected-state">{selectedState}</h1>
			{#each newList as org}
				<div class="org-list__item" 
				>
					<!-- on:click={() => {
						if(current === 'hide'){
							current = 'show'
						}
						else {
							current = 'hide'
						}
						}} -->
					<div class="left">
						<div class="org-list__item__title-line">
							<h3>{org.name}</h3>
							<a href="{org.site}">  <Icon name="external-link" stroke=1 strokeWidth=1/>  </a>
						</div>
						<p>{org.type}</p>
						{#if org.programs !== undefined}
							<div class="org-list__item__programs">
								{#each org.programs as program}
								<p class="org-list__item__programs__program">{program}</p>
								{/each}
							</div>
						{:else}
							<p>No Programs Avaliable</p>
						{/if}
					</div>
					<div class="right" class:show="{current === 'show'}" class:hide="{current === 'hide'}" >
						<p class="org-description" >{org.description}</p>
					</div>
				</div>
		  	{/each}
		</div>
	</div>
</section>