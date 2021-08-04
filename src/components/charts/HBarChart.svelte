<script>
    import { LayerCake, Svg } from 'layercake';
    import { scaleBand } from 'd3-scale';
    import { orgData } from '../../stores/apiStore'
    import Bar from '../cake-components/Bar.svelte';
    import AxisX from '../cake-components/AxisX.svelte';
    import AxisY from '../cake-components/AxisY.svelte';
    import { rollup } from 'd3-array'
    
    $: summaryData = rollup($orgData, v => v.length, d => d.reach)
    $: summaryData.delete(undefined)
    $: flatData = Array.from(summaryData, ([reach, value]) => ({ reach, value }))
    $: reachs = []
    $: flatData.forEach((object) => {
        reachs = [...reachs, object.reach]
    })
    $: reachs.filter((reach) => { return reach !== null})

    const xKey = 'value';
    const yKey = 'reach';
  
</script>
  
<style></style>

<section class="chart-section">
    <div class="chart-container">
        <LayerCake
            padding={{ top: 0, bottom: 20, left: 180 }}
            x={xKey}
            y={yKey}
            yScale={scaleBand().paddingInner(.15).round(true)}
            yDomain={[...reachs].sort()}
            xDomain={[0, null]}
            data={flatData}
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
    </div>
</section>