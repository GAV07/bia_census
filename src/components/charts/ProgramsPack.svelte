<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import { scaleOrdinal, scaleBand } from 'd3-scale';
  import ChartTitle from '../tools/ChartTitle.svelte'
  import ForceLayout from '../cake-components/CirclePackForce.svelte';

  export let title;
  export let description;
  export let data;

  const xKey = 'name';
  const rKey = 'count';
  const zKey = 'name';

  let groupBy = 'true';

  const seriesNameSet = new Set();
  const seriesColors = ['#f0c', '#0cf', '#fc0'];

  // data.forEach(d => {
  //   seriesNameSet.add(d[zKey]);
  // });
  
  let programs= [];
  let catNames = [];
  let chartData = [];

  if(data !== undefined) {
    data.forEach((org) => {
      let list = org.programs
      if(list !== undefined) {
        list.forEach(item => {
          programs.push(item)
        })
      }
    })
  }
  programs.forEach(program => {
      catNames.includes(program) ? 0 : catNames.push(program)
  })
  catNames.forEach(program => {
    let object = {"name":program, "count":0}
    chartData.push(object)
  })
  programs.forEach(program => {
    chartData.forEach(item => {
      item.name === program ? item.count++ : 0
    })
  })

  let manyBodyStrength = 3;
  let xStrength = 0.1
</script>

<style>
  label {
    cursor: pointer;
  }
  input {
    margin-right: 7px;
  }
</style>


<section class="chart-section">
  <ChartTitle 
    title={title}
    description= {description}
  />
  <div class="input-container">
    <label><input type="radio" bind:group={groupBy} value="true"/>Group by category</label>
    <label><input type="radio" bind:group={groupBy} value="false"/>Clump together</label>
  </div>

  <figure class="chart-container">
    <LayerCake
      data={chartData}
      x={xKey}
      r={rKey}
      z={zKey}
      xScale={scaleBand()}
      xDomain={catNames}
      rRange={[3, 55]}
      zScale={scaleOrdinal()}
      zDomain={catNames}
      zRange={seriesColors}
    >
      <Svg>
        <ForceLayout
          {manyBodyStrength}
          {xStrength}
          groupBy={JSON.parse(groupBy)}
          nodeStrokeColor='#fff'
        />
      </Svg>
    </LayerCake>
  </figure>
</section>