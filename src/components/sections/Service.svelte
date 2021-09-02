<script>
    import Copy from '../../data/doc.json'
    
    import TypeBarChart from '../charts/TypeBarChart.svelte';
    import ProgramsPack from '../charts/ProgramsPack.svelte'
    import Stat from '../tools/Stat.svelte'
    import ReachPack from '../charts/ReachPack.svelte';

    export let data;
</script>


<article id="service">
    <p class="lead">Service</p>
    <h1 class="title">{Copy.serHead}</h1>
    <p class="subtitle">{Copy.serSub}</p>

   <!-- Programs in Simple Force Graph (change later) -->
   <div class="copy">
        <p>{Copy.ser1}</p>
    </div>
    <TypeBarChart
        data={data}
        title={Copy.serChartTitle1}
        description={Copy.serChartSub1}
    />

    <Stat
        data={data}
        mark={"<"}
        category={"type"}
        dataPoint={"Research Institute"}
        info="Less than one percent of the types of Black Support Organizations are reserach institutions."
    />

    <!-- Simple Type Breakdown -->
    <div class="copy">
        <p>{Copy.ser2}</p>
    </div>
    <ProgramsPack 
        data={data}
        title={Copy.serChartTitle2}
        description={Copy.serChartSub2}
    />
    

    <!-- Smaller Callout for Primary Customers -->
    <div class="copy">
        <p>{Copy.place3}</p>
    </div>
    <Stat
        data={data}
        category={"customer"}
        dataPoint={"Founders/Entrepreneurs"}
        info="The percentage of Black Support Organizations that focus on Founders and Entrepreneurs as an audience. 
            Does this heavy emphasis on Founders limit the impact of impact that BSO's can have collectively on the wider Black Innovation Ecosystem?"
    />
    
</article>