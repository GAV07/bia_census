<script>
    import Copy from '../../data/doc.json'
    
    import MapChart from '../charts/SupportMap.svelte'
    import BeeChart from '../charts/BeeChart.svelte'
    //import ReachGrouped from '../charts/ReachGrouped.svelte'
    import ReachRadar from '../charts/ReachRadar.svelte';

    export let data;
</script>



<article class="geography">
    <h1 class="title">{Copy.geohead}</h1>
    <p class="subtitle">{Copy.geosub}</p>

    <!-- Organiztion Map showing location of orgs -->
    <div class="copy">
        <p>{Copy.geo1}</p>
    </div>
    <MapChart
        data={data}
        title={Copy.geoChartTitle1}
        description={Copy.geoChartSub1}
    />
    
    <!-- Year of inception for orgs in dataset -->
    <div class="copy">
        <p>{Copy.geo2}</p>
    </div>
    <BeeChart
        data={data}
        title={Copy.geoChartTitle2}
        description={Copy.geoChartSub2}
    />

    <!-- Reach of organizations in dataset -->
    <div class="copy">
        <p>{Copy.geo3}</p>
    </div>
    <ReachRadar
        data={data}
        title={Copy.geoChartTitle3}
        description={Copy.geoChartSub3}
    />
</article>

