<script>
    import Copy from '../../data/doc.json'
    import Stat from '../tools/Stat.svelte'
    import MapChart from '../charts/SupportMap.svelte'
    import BeeChart from '../charts/BeeChart.svelte'
    import TypeBarChart from '../charts/TypeBarChart.svelte'
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
        info="Atlanta has more BISOs than all Southern states combined."
    />

    <div class="copy">
        <p>{Copy.place2}</p>
    </div>
    <TypeBarChart
        data={data}
        title={Copy.placeChartTitle2}
        description={Copy.placeChartSub2}
    />

    <Stat
        data={data}
        mark={"<"}
        category={"type"}
        dataPoint={"Research Institute"}
        info="Less than one percent of the types of Black Support Organizations are reserach institutions."
    />
    
    <div class="copy">
        <p>{Copy.place3}</p>
    </div>
    <BeeChart
        data={data}
        title={Copy.placeChartTitle3}
        description={Copy.placeChartSub3}
    />

    <Stat
        data={data}
        category={"year"}
        dataPoint={2017}
        info="Over 20% of Black Support Organizations were founded in 2017."
    />

    <div class="copy">
        <p>{Copy.place4}</p>
    </div>

    <ReachRadar
        data={data}
        title={Copy.placeChartTitle4}
        description={Copy.placeChartSub4}
    />

    <div class="copy">
        <p>{Copy.place5}</p>
    </div>
</article>

