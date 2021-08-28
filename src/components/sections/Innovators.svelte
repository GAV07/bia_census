<script>
    import Copy from '../../data/doc.json'
    
    import FounderMap from '../charts/FounderMap.svelte'
    import EthnicBarChart from '../charts/EthnicBarChart.svelte';

    export let data;
    export let altData;
</script>


<article id="innovators">
    <p class="lead">Audience</p>
    <h1 class="title">{Copy.innHead}</h1>
    <p class="subtitle">{Copy.innSub}</p>

    <div class="copy">
        <p>{Copy.inn1}</p>
    </div>
    <FounderMap
        data={altData}
        supportData={data}
        title={Copy.innChartTitle1}
        description={Copy.innChartSub1}
    />

    <div class="copy">
        <p>{Copy.inn2}</p>
    </div>
    <EthnicBarChart
        data={data}
        title={Copy.innChartTitle2}
        description={Copy.innChartSub2}
    />
</article>