<script>
    import { LayerCake, Svg, Html } from 'layercake';
    import { scaleOrdinal } from 'd3-scale';
    import { orgData } from '../../stores/apiStore'
    import Key from '../cake-components/Key.svelte';
    import AxisX from '../cake-components/AxisX.svelte';
    import Beeswarm from '../cake-components/BeeswarmForce.svelte';
    import ChartTitle from '../helpers/ChartTitle.svelte'

    export let title;
    export let subtitle;
  
    const xKey = 'year';
    const zKey = 'type';
    const titleKey = 'name';
  
    const r = 6;
    const seriesColors = ['#FAAB18', '#00B8D1', '#EA96CA', '#E26D5A', '#ECE5F0'];

    $: fData = $orgData.filter((data) => { return data.type !== undefined })
  
    $: seriesNames = new Set();
  
    $: fData.map(d => {
      seriesNames.add(d[zKey]);
    })
    
  </script>
  
  <style lang="scss">

  </style>

<section class="chart-section">
    <ChartTitle 
    title={title}
    description= {subtitle}
    />
    <div class='chart-container'>
      <LayerCake
        padding={{bottom: 15}}
        x={xKey}
        z={zKey}
        zScale={scaleOrdinal()}
        zDomain={Array.from(seriesNames)}
        zRange={seriesColors}
        data={fData}
        custom={{
          getTitle: d => d[titleKey]
        }}
        let:width
      >
    
        <Svg>
          <AxisX/>
          <Beeswarm
            r={width < 400 ? r / 1 : r}
          />
        </Svg>
    
        <Html pointerEvents={false}>
          <Key shape='circle' />
        </Html>
    
      </LayerCake>
    </div>
</section>