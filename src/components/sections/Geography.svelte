<script>
    import Copy from '../../data/doc.json'
    import MapChart from '../charts/MapChart.svelte'
    import BeeChart from '../charts/BeeChart.svelte'
    import ReachChart from '../charts/ReachChart.svelte'
</script>


<style lang="scss">
    
</style>

<article class="geography">
    <h1 class="title">{Copy.geohead}</h1>
    <p class="subtitle">{Copy.geosub}</p>

    <!-- Organiztion Map showing location of orgs -->
    <div class="copy">
        <p>{Copy.geo1}</p>
    </div>
    <MapChart
        title={Copy.geoChartTitle1}
        subtitle={Copy.geoChartSub1}
    />
    
    <!-- Year of inception for orgs in dataset -->
    <div class="copy">
        <p>{Copy.geo2}</p>
    </div>
    <BeeChart
        title={Copy.geoChartTitle2}
        subtitle={Copy.geoChartSub2}
    />

    <!-- Reach of organizations in dataset -->
    <div class="copy">
        <p>{Copy.geo3}</p>
    </div>
    <ReachChart
        title={Copy.geoChartTitle3}
        subtitle={Copy.geoChartSub3}
    />
</article>

