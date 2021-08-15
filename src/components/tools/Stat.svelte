<script>
    import { rollup } from 'd3-array'
    export let data;
    export let category;
    export let dataPoint;
    export let info;

    const percentageOfCategory = () => {
        let sum = 0;
        let name;

        let summary = rollup(data, v => v.length, d => d[category])
        let flatData = Array.from(summary, ([variable, value]) => ({ variable, value }))
        for(let i = 0; i < flatData.length; i++){
            sum += flatData[i].value;
        }
        let percent = (summary.get("Founders/Entrepreneurs") / sum) * 100
        return Math.floor(percent)
    }



</script>

<style lang="scss">
    @import '../../styles/abstracts/variables';

    .stat-container {
        width: 100%;
        height: 120px;
        display: flex;
        align-items: center;
        background-color: $primary3;
        color: $white;
        border-radius: 10px;
        padding: 4em;

        .stat {
            font-size: $mega-font-size;
            padding-right: 1em;
        }
    }
</style>

<div class="stat-container">
    <h1 class="stat">{percentageOfCategory()}%</h1>
    <h3 class="info">{info}</h3>
</div>