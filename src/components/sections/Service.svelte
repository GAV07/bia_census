<script>
    import Copy from '../../data/doc.json'
    
    import TypeBarChart from '../charts/TypeBarChart.svelte';
    import ProgramsPack from '../charts/ProgramsPack.svelte'
    import Stat from '../tools/Stat.svelte'
    import ReachPack from '../charts/ReachPack.svelte';

    export let data;
</script>


<article id="service">
    <div class="section-header">
        <p class="lead">Service</p>
        <h1 class="title">{Copy.serHead}</h1>
        <p class="subtitle">{Copy.serSub}</p>
    </div>

 

    <!-- Simple Type Breakdown -->
    <div class="copy">
        <p>{Copy.ser1}</p>
    </div>
    <ProgramsPack 
        data={data}
        title={Copy.serChartTitle1}
        description={Copy.serChartSub1}
    />
    
</article>