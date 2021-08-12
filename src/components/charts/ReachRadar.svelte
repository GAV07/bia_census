<script>
    import { LayerCake, Svg } from 'layercake';
    import { scaleLinear } from 'd3-scale';
    import ChartTitle from '../helpers/ChartTitle.svelte'
    import Radar from '../cake-components/Radar.svelte';
    import AxisRadial from '../cake-components/AxisRadial.svelte';
import { rollup } from 'd3-array';

    export let data;
    export let title;
    export let description;

    const seriesKey = 'type';
    const xKey = ['Local', 'Regional', 'National', 'International'];

    let summary = rollup(data, v => v.length, d => d.type, e => e.reach)
    let flatData = Array.from(summary, ([type, value]) => ({ type, value }))
    let formatData = flatData.map(group => ({
        type: group.type,
        National: group.value.get("National"),
        Local: group.value.get("Local"),
        Regional: group.value.get("Regional"),
        International: group.value.get("International"),
    }))
    console.log(formatData)
    let chartData = formatData.filter(d => d.type === "Accelerator/Incubator")
</script>


<section class="chart-section">
    <ChartTitle 
        title={title}
        description={description}
    />
    <figure class="chart-container">
      <LayerCake
        padding={{ top: 30, right: 0, bottom: 7, left: 0 }}
        x={xKey}
        xDomain={[0, 15]}
        xRange={({ height }) => [0, height / 2]}
        data={chartData}
      >
        <Svg>
          <AxisRadial/>
          <Radar/>
        </Svg>
      </LayerCake>
    </figure>
</section>