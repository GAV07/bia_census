<script>
    import Copy from '../../data/doc.json'
    import Stat from '../tools/Stat.svelte'
    import MapChart from '../charts/SupportMap.svelte'
    import BeeChart from '../charts/BeeChart.svelte'
    //import ReachGrouped from '../charts/ReachGrouped.svelte'
    import ReachRadar from '../charts/ReachRadar.svelte';

    export let data;
</script>



<article id="place">
    <div class="section-header">
        <p class="lead">Place</p>
        <h1 class="title">{Copy.placeHead}</h1>
        <p class="subtitle">{Copy.placeSub}</p>
    </div>

    <!-- Organiztion Map showing location of orgs -->
    <div class="copy">
        <p>{Copy.place1}</p>
    </div>
    <MapChart
        data={data}
        title={Copy.placeChartTitle1}
        description={Copy.placeChartSub1}
    />

    <Stat
        data={data}
        category={"city"}
        dataPoint={"Atlanta"}
        info="Atlanta leads cities in America with a little over 20% of all listed Black Support Organizations headquartered there."
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

    <Stat
        data={data}
        category={"year"}
        dataPoint={2017}
        info="Over 20% of Black Support Organizations were founded in 2017."
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

