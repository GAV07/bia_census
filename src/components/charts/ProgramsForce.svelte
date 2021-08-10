<script>
  import { LayerCake, Html } from 'layercake';
  import CirclePack from '../cake-components/CirclePack.html.svelte';
  import ChartTitle from '../helpers/ChartTitle.svelte'

  export let data;
  export let title;
  export let description;

  const idKey = 'name';
  const valueKey = 'count';
  let programs= [];
  let unique = [];
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
      unique.includes(program) ? 0 : unique.push(program)
  })
  unique.forEach(program => {
    let object = {"name":program, "count":0}
    chartData.push(object)
  })
  programs.forEach(program => {
    chartData.forEach(item => {
      item.name === program ? item.count++ : 0
    })
  })
  chartData.sort((a, b) => (a.count < b.count) ? 1 : -1)
</script>
  

<section class="chart-section">
    <ChartTitle 
		title={title}
		description= {description}
	/>
  <figure class="chart-container">
    <LayerCake
      padding={{ top: 0, bottom: 20, left: 30 }}
      data={chartData}
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
  </figure>
</section>