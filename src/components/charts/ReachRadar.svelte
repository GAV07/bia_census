<script>
    import { LayerCake, Svg } from 'layercake';
    import { scaleLinear } from 'd3-scale';
    import ChartTitle from '../tools/ChartTitle.svelte'
    import Radar from '../cake-components/Radar.svelte';
    import AxisRadial from '../cake-components/AxisRadial.svelte';
    import { rollup } from 'd3-array';

    export let data;
    export let title;
    export let description;

    const xKey = ['Local', 'Regional', 'National', 'International'];
    const colors = ["#FAAB18", "#00B8D1", "#1D1E68", "#E26D5A"]
    let summary = rollup(data, v => v.length, d => d.type, e => e.reach)
    let flatData = Array.from(summary, ([type, value]) => ({ type, value }))
    let formatData = flatData.map(group => ({
        type: group.type,
        National: group.value.get("National"),
        Local: group.value.get("Local"),
        Regional: group.value.get("Regional"),
        International: group.value.get("International"),
    }))
    
    let firstChart = formatData.filter(d => d.type === "Accelerator/Incubator")
    let secondChart = formatData.filter(d => d.type === "VC Firm/Angel Association")
    let thirdChart = formatData.filter(d => d.type === "Talent/Workforce")
    let fourthChart = formatData.filter(d => d.type === "Ecosystem Builder")

    let cleanSummmary = function(chartData) {
      chartData = chartData.map(group => ({
        type: group.type,
        National: group.National || 0,
        Local: group.Local || 0,
        Regional: group.Regional || 0,
        International: group.International || 0,
      }))
      return chartData
    }

    firstChart = cleanSummmary(firstChart)
    secondChart = cleanSummmary(secondChart)
    thirdChart = cleanSummmary(thirdChart)
    fourthChart = cleanSummmary(fourthChart)
    
</script>

<style lang="scss">

  #radar-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .radar-title {
      margin-bottom: 0px;
    }
    
    #radar-chart {
      height: 300px;
      width: 380px;
      margin-bottom: 32px;
    }
  }
</style>

<section  class="chart-section">
    <ChartTitle 
        title={title}
        description={description}
    />
    <div id="radar-container">
      <figure id="radar-chart" class="chart-container">
        <h3 class="radar-title">{firstChart[0].type}</h3>
        <LayerCake
          padding={{ top: 30, right: 0, bottom: 7, left: 0 }}
          x={xKey}
          xDomain={[0, 15]}
          xRange={({ height }) => [0, height / 3]}
          data={firstChart}
        >
          <Svg>
            <AxisRadial/>
            <Radar color={colors[0]}/>
          </Svg>
        </LayerCake>
      </figure>
      <figure id="radar-chart" class="chart-container">
        <h3 class="radar-title">{secondChart[0].type}</h3>
        <LayerCake
          padding={{ top: 30, right: 0, bottom: 7, left: 0 }}
          x={xKey}
          xDomain={[0, 15]}
          xRange={({ height }) => [0, height / 3]}
          data={secondChart}
        >
          <Svg>
            <AxisRadial/>
            <Radar color={colors[1]}/>
          </Svg>
        </LayerCake>
      </figure>
      <figure id="radar-chart" class="chart-container">
        <h3 class="radar-title">{thirdChart[0].type}</h3>
        <LayerCake
          padding={{ top: 30, right: 0, bottom: 7, left: 0 }}
          x={xKey}
          xDomain={[0, 15]}
          xRange={({ height }) => [0, height / 3]}
          data={thirdChart}
        >
          <Svg>
            <AxisRadial/>
            <Radar color={colors[2]}/>
          </Svg>
        </LayerCake>
      </figure>
      <figure id="radar-chart" class="chart-container">
        <h3 class="radar-title">{fourthChart[0].type}</h3>
        <LayerCake
          padding={{ top: 30, right: 0, bottom: 7, left: 0 }}
          x={xKey}
          xDomain={[0, 15]}
          xRange={({ height }) => [0, height / 3]}
          data={fourthChart}
        >
          <Svg>
            <AxisRadial/>
            <Radar color={colors[3]}/>
          </Svg>
        </LayerCake>
      </figure>
    </div>
    
</section>