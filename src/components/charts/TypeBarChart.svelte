<script>
    import { LayerCake, Svg } from 'layercake';
    import { scaleBand } from 'd3-scale';
    import Bar from '../cake-components/Bar.svelte';
    import AxisX from '../cake-components/AxisX.svelte';
    import AxisY from '../cake-components/AxisY.svelte';
    import ChartTitle from '../tools/ChartTitle.svelte';
    import { rollup } from 'd3-array';
    
    export let data;
    export let title;
    export let description;

    let types = []
    let summaryData = rollup(data, v => v.length, d => d.type)
    summaryData.delete(undefined)

    let chartData = Array.from(summaryData, ([type, value]) => ({ type, value }))
    chartData.forEach((object) => {
        types = [...types, object.type]
    })

    const xKey = 'value';
    const yKey = 'type';
</script>

<section class="chart-section">
    <ChartTitle 
        title={title}
        description={description}
    />
    <figure class="chart-container">
        <LayerCake
            padding={{ top: 0, bottom: 20, left: 180, right: 20 }}
            x={xKey}
            y={yKey}
            yScale={scaleBand().paddingInner(.15).round(true)}
            yDomain={[...types].sort()}
            xDomain={[0, null]}
            data={chartData}
        >
            <Svg>
                <AxisX
                    gridlines={true}
                    baseline={true}
                    snapTicks={true}
                />
                <AxisY
                    gridlines={false}
                />
                <Bar/>
            </Svg>
        </LayerCake>
    </figure>
</section>