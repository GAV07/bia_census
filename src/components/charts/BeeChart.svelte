<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import { scaleOrdinal } from 'd3-scale';
  import MediaQuery from '../tools/MediaQuery.svelte'
  import Key from '../cake-components/Key.svelte';
  import AxisX from '../cake-components/AxisX.svelte';
  import Beeswarm from '../cake-components/BeeswarmForce.svelte';
  import ChartTitle from '../tools/ChartTitle.svelte';

  export let data;
  export let title;
  export let description;

  let chartData = data.filter((data) => { return data.type !== undefined })
  const xKey = 'year';
  const zKey = 'type';
  const titleKey = 'name';

  let r = 6;

  if( window.screen.width <= 480) {
		r = 6
	}

  const seriesNames = new Set();
  const seriesColors = ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"];


  chartData.map(d => {
    seriesNames.add(d[zKey]);
  })
  
</script>

<style lang="scss">
  #bee-chart {
    overflow: visible;
  }
</style>

<MediaQuery query="(min-width: 1281px)" let:matches>
	{#if matches}
    <section class="chart-section">
      <ChartTitle 
        title={title}
        description= {description}
      />
      <figure id="bee-chart" class='chart-container'>
        <LayerCake
          padding={{top: 5, left: 20, right: 10, bottom: 20}}
          x={xKey}
          z={zKey}
          zScale={scaleOrdinal()}
          zDomain={Array.from(seriesNames)}
          zRange={seriesColors}
          data={chartData}
          custom={{
            getTitle: d => d[titleKey]
          }}
          let:width
        >
    
          <Svg>
            <AxisX/>
            <Beeswarm
              r={width < 400 ? r / 1.25 : r}
              strokeWidth={.5}
              xStrength={0.95}
              yStrength={0.075}
            />
          </Svg>
    
          <Html pointerEvents={false}>
            <Key width=107 shape='circle'/>
          </Html>
      
        </LayerCake>
      </figure>
    </section>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 480px)" let:matches>
	{#if matches}
    <section class="chart-section">
      <ChartTitle 
        title={title}
        description= {description}
      />
      <figure id="bee-chart" class='chart-container'>
        <LayerCake
          padding={{top: 5, left: 20, right: 10, bottom: 20}}
          x={xKey}
          z={zKey}
          zScale={scaleOrdinal()}
          zDomain={Array.from(seriesNames)}
          zRange={seriesColors}
          data={chartData}
          custom={{
            getTitle: d => d[titleKey]
          }}
          let:width
        >
    
          <Svg>
            <AxisX/>
            <Beeswarm
              r={width < 400 ? r / 1.25 : r}
              strokeWidth={.5}
              xStrength={0.95}
              yStrength={0.075}
            />
          </Svg>
      
        </LayerCake>
      </figure>
    </section>
	{/if}
</MediaQuery>