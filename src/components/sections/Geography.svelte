<script>
    import Copy from '../../data/doc.json'
    
    import MapChart from '../charts/SupportMap.svelte'
    import BeeChart from '../charts/BeeChart.svelte'
    //import ReachGrouped from '../charts/ReachGrouped.svelte'
    import ReachRadar from '../charts/ReachRadar.svelte';

    export let data;
</script>



<article id="place">
    <p class="lead">Place</p>
    <h1 class="title">{Copy.placeHead}</h1>
    <p class="subtitle">{Copy.placeSub}</p>

    <!-- Organiztion Map showing location of orgs -->
    <div class="copy">
        <p>{Copy.place1}</p>
    </div>
    <MapChart
        data={data}
        title={Copy.placeChartTitle1}
        description={Copy.placeChartSub1}
    />
    
    <!-- Year of inception for orgs in dataset -->
    <div class="copy">
        <p>{Copy.place2}</p>
    </div>
    <BeeChart
        data={data}
        title={Copy.placeChartTitle2}
        description={Copy.placeChartSub2}
    />

    <!-- Reach of organizations in dataset -->
    <div class="copy">
        <p>{Copy.place3}</p>
    </div>
    <ReachRadar
        data={data}
        title={Copy.placeChartTitle3}
        description={Copy.placeChartSub3}
    />
</article>

