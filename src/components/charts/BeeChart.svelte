<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import { scaleOrdinal } from 'd3-scale';
  import { schemeSet1 } from 'd3-scale-chromatic';
  import Key from '../cake-components/Key.svelte';
  import AxisX from '../cake-components/AxisX.svelte';
  import Beeswarm from '../cake-components/BeeswarmForce.svelte';
  import ChartTitle from '../helpers/ChartTitle.svelte';

  export let data;
  export let title;
  export let description;

  let chartData = data.filter((data) => { return data.type !== undefined })
  const xKey = 'year';
  const zKey = 'type';
  const titleKey = 'name';

  const r = 6;

  const seriesNames = new Set();
  const seriesColors = schemeSet1;


  chartData.map(d => {
    seriesNames.add(d[zKey]);
  })
  
</script>

<style lang="scss">
  // .chart-container {
  //   width: 100%;
  //   height: 800px;
  // }
</style>


<section class="chart-section">
  <ChartTitle 
    title={title}
    description= {description}
  />
  <figure class='chart-container'>
    <LayerCake
      padding={{top: 5, left: 20, right: 20, bottom: 20}}
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
        <Key shape='circle'/>
      </Html>

    </LayerCake>
  </figure>
</section>