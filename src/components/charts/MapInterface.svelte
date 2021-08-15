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
	const blues = ["#4b97c9","#4a96c9","#4895c8","#4794c8","#4693c7","#4592c7","#4492c6","#4391c6","#4190c5","#408fc4","#3f8ec4","#3e8dc3","#3d8cc3","#3c8bc2","#3b8ac2","#3a89c1","#3988c1","#3787c0","#3686c0","#3585bf","#3484bf","#3383be","#3282bd","#3181bd","#3080bc","#2f7fbc","#2e7ebb","#2d7dbb","#2c7cba","#2b7bb9","#2a7ab9","#2979b8","#2878b8","#2777b7","#2676b6","#2574b6","#2473b5","#2372b4","#2371b4","#2270b3","#216fb3","#206eb2","#1f6db1","#1e6cb0","#1d6bb0","#1c6aaf","#1c69ae","#1b68ae","#1a67ad","#1966ac","#1865ab","#1864aa","#1763aa","#1662a9","#1561a8","#1560a7","#145fa6","#135ea5","#135da4","#125ca4","#115ba3","#115aa2","#1059a1","#1058a0","#0f579f","#0e569e","#0e559d","#0e549c","#0d539a","#0d5299","#0c5198","#0c5097","#0b4f96","#0b4e95","#0b4d93","#0b4c92","#0a4b91","#0a4a90","#0a498e","#0a488d","#09478c","#09468a","#094589","#094487","#094386","#094285","#094183","#084082","#083e80","#083d7f","#083c7d","#083b7c","#083a7a","#083979","#083877","#083776","#083674","#083573","#083471","#083370","#08326e","#08316d","#08306b"]
	let colorScale = () => {};
	let width = 1200
	let height = width * 0.7
	
	
	let summary = rollup(data, v => v.length, d => d.state)
	let orgExtent = extent(summary, d => d[1])
	
	$: colorScale = scaleQuantize()
		.domain(orgExtent)
		.range(blues);

	$: getColor = function (feature) {
		let number = summary.get(feature.properties.name)
		let color = colorScale(number)
		if (color) {
			return color
		} else {
			return "#EA96CA"
		}
	}

	const filteronState = function (state) {
		newList = data.filter(d => d.state == state)
		return newList
	}

	const projectionAlbersUsa = geoAlbersUsa().scale(950)
  
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
	
	.chart-section {
		background-color: $bk;
	}
	#map-wrapper {
		width: 1000px;
		height: 500px;
	}
	.states {
		//transform: translateX(-50px);
	}
	.stateShape {
	  stroke: $white;
	  stroke-width: 0.5;
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
	
	.org-list {
		height: 400px;
		overflow-y: auto;
		padding: 20px 5em;

		&__item {
			background-color: $primary3;
			padding: 1.5em 3em;
			margin: .5em 1em .5em 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: $primary2;
			border-radius: 10px;

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
			}

			a {
				text-decoration: none;
				color: $white;
			}

			.right {
				margin-top: 8px;
				max-width: 500px;
				max-height: 100px;
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
  
<section class="chart-section">
	<ChartTitle 
		title={title}
		description= {description}
	/>
	<div class="chart-container" id="map-wrapper" bind:clientWidth="{width}">
		<svg style="{`width: ${width}px; height: ${height}px`}">
			<g class="states">
				{#each mapData as feature}
					<path
					d={path(feature)}
					id={feature.properties.name}
					class="stateShape {getColor(feature) != "#EA96CA" ? "filled" : "not-filled"}"
					fill={getColor(feature)} 
					on:click={(event) => { filteronState(event.target.id)}}
					/>
				{/each}
			</g>
		</svg>
	</div>
	<div class="org-list">
	  {#each newList as org}
		<div class="org-list__item" 
			on:click={() => {
				if(current === 'hide'){
					current = 'show'
				}
				else {
					current = 'hide'
				}
				}}
		>
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
</section>