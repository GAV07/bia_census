<script>
    import { rollup } from 'd3-array'
    export let data;
    export let category;
    export let dataPoint;
    export let info;
    export let mark = "";

    const percentageOfCategory = () => {
        let sum = 0;
        let name;

        let summary = rollup(data, v => v.length, d => d[category])
        let flatData = Array.from(summary, ([variable, value]) => ({ variable, value }))
        for(let i = 0; i < flatData.length; i++){
            sum += flatData[i].value;
        }
        let percent = (summary.get(dataPoint) / sum) * 100
        return Math.round(percent)
    }



</script>

<style lang="scss">
    @import '../../styles/abstracts/variables';

    .stat-container {
        margin-top: 2em;
        position: relative;
        width: 100%;
        height: 120px;
        display: flex;
        align-items: center;
        background-image: url("./assets/images/BIA_Pattern_Horizon.jpg");
        color: $white;
        border-radius: 10px;
        padding: 6em;
        overflow: hidden;

        .gradient {
            position: absolute;
            left: 0;
            top: 0;
            background: linear-gradient(90deg, hsla(189, 100%, 50%, 1) 0%, hsla(239, 56%, 26%, 1) 100%);
            width: 100%;
            height: 100%;
            opacity: .75;
        }

        .stat, .info {
            z-index: 2;
        }

        .stat {
            font-size: $mega-font-size;
            padding-right: 1em;
        }
    }
</style>

<div class="stat-container">
    <h1 class="stat">{mark}{percentageOfCategory()}%</h1>
    <h3 class="info">{info}</h3>
    <div class="gradient"></div>
</div>