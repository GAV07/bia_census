<script>
    import { LayerCake, Html } from 'layercake';
    import { orgData } from '../../stores/apiStore';
    import { rollup } from 'd3-array'
    import CirclePack from '../cake-components/CirclePack.html.svelte';
    import ChartTitle from '../helpers/ChartTitle.svelte'

    export let title;
    export let description;
  
    const idKey = 'type';
    const valueKey = 'value';

    $: summaryData = rollup($orgData, v => v.length, d => d.reach)
    $: summaryData.delete(undefined)
    $: flatData = Array.from(summaryData, ([type, value]) => ({ type, value }))
</script>
  

<section class="chart-section">
    <ChartTitle 
		title={title}
		description= {description}
	/>
  <div class="chart-container">
    <LayerCake
      padding={{ top: 0, bottom: 20, left: 30 }}
      data={flatData}
    >
      <Html>
        <CirclePack
          idKey={idKey}
          valueKey={valueKey}
          fill='#00B8D1'
          stroke='#00B8D1'
          textColor="white"
        />
      </Html>
    </LayerCake>
  </div>
</section>