<script>
    import Copy from '../../data/doc.json'
    import CirclePackChart from '../charts/TypeGrouped.svelte';
    import TypeBarChart from '../charts/TypeBarChart.svelte';
    import ProgramsForce from '../charts/ProgramsForce.svelte'
    import Stat from '../helpers/Stat.svelte'

    export let data;
</script>



<article class="service">
    <h1 class="title">{Copy.serhead}</h1>
    <p class="subtitle">{Copy.sersub}</p>

   <!-- Programs in Simple Force Graph (change later) -->
   <div class="copy">
        <p>{Copy.ser1}</p>
    </div>
    <TypeBarChart
        data={data}
        title={Copy.serChartTitle1}
        description={Copy.serChartSub1}
    />

    <!-- Simple Type Breakdown -->
    <div class="copy">
        <p>{Copy.ser2}</p>
    </div>
    <ProgramsForce 
        data={data}
        title={Copy.serChartTitle2}
        description={Copy.serChartSub2}
    />
    

    <!-- Smaller Callout for Primary Customers -->
    <div class="copy">
        <p>{Copy.geo3}</p>
    </div>
    <Stat
        data={data}
        category={"customer"}
        dataPoint={"Founder/Entrepreneur"}
        info="Hey Erick, this would be a great place to put a particular stat that can inform your audience"
    />
    
</article>