<script>
    import Copy from '../../data/doc.json'
    import CirclePackChart from '../charts/CirclePackChart.svelte';
    import HBarChart from '../charts/HBarChart.svelte';
</script>


<style lang="scss">

</style>

<article class="service">
    <h1 class="title">{Copy.serhead}</h1>
    <p class="subtitle">{Copy.sersub}</p>

    <div class="copy">
        <p>{Copy.ser1}</p>
    </div>
    <CirclePackChart/>

    <div class="copy">
        <p>{Copy.ser2}</p>
    </div>
    <HBarChart/>
</article>