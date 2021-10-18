<script>
    import { LayerCake, Svg } from 'layercake';
    import { scaleBand } from 'd3-scale';
    import Bar from '../cake-components/Bar.svelte';
    import AxisX from '../cake-components/AxisX.svelte';
    import AxisY from '../cake-components/AxisY.svelte';
    import ChartTitle from '../tools/ChartTitle.svelte';
    import MediaQuery from '../tools/MediaQuery.svelte'
    import { rollup } from 'd3-array';
    
    export let data;
    export let title;
    export let description;

    let types = []
    let summaryData = rollup(data, v => v.length, d => d.type)
    summaryData.delete(undefined)
    
    let chartData = Array.from(summaryData, ([type, value]) => ({ type, value }))
    chartData = chartData.map(group => ({
        type: group.type,
        value: group.value,
        percent: Math.round(group.value / data.length * 100)
    }))
    chartData.sort((a,b) => a.percent - b.percent)
    chartData.forEach((group) => {
        types = [...types, group.type]
    })
    
    const xKey = 'percent';
    const yKey = 'type';
</script>


<section class="chart-section">
    <ChartTitle 
        number={2}
        title={title}
        description={description}
    />
    <MediaQuery query="(min-width: 1281px)" let:matches>
        {#if matches}   
            <figure class="chart-container bar-chart">
                <LayerCake
                    padding={{ top: 0, bottom: 20, left: 200, right: 20 }}
                    x={xKey}
                    y={yKey}
                    yScale={scaleBand().paddingInner(.15).round(true)}
                    yDomain={[...types]}
                    xDomain={[0, null]}
                    data={chartData}
                >
                    <Svg>
                        <AxisX
                            gridlines={true}
                            baseline={true}
                            snapTicks={true}
                            formatTick={d => d + "%"}
                        />
                        <AxisY
                            gridlines={false}
                        />
                        <Bar/>
                    </Svg>
                </LayerCake>
            </figure>
        {/if}
    </MediaQuery>

    <MediaQuery query="(max-width: 1280px)" let:matches>
        {#if matches}   
            <figure class="chart-container bar-chart">
                <LayerCake
                    padding={{ top: 0, bottom: 20, left: 10, right: 10 }}
                    x={xKey}
                    y={yKey}
                    yScale={scaleBand().paddingInner(.15).round(true)}
                    yDomain={[...types]}
                    xDomain={[0, null]}
                    data={chartData}
                >
                    <Svg>
                        <AxisX
                            gridlines={true}
                            baseline={true}
                            snapTicks={true}
                            formatTick={d => d + "%"}
                        />
                        <Bar/>
                        <AxisY
                            gridlines={false}
                        />
                    </Svg>
                </LayerCake>
            </figure>
        {/if}
    </MediaQuery>
</section>