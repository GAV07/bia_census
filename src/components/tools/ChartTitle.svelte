<script>
    export let title;
    export let description;
    export let number;
</script>


<style lang="scss">
    @import '../../styles/abstracts/variables';

    .chart__copy {
        max-width: 800px;

        &__title {
            margin-bottom: 20px;
        }

        &__description {
            margin-bottom: 32px;
            line-height: 1.5;
        }
    }
</style>

<div class="chart__copy">
    <p class="chart__copy__figure">Figure {number}</p>
    <h2 class="chart__copy__title">{title}</h2>
    <p class="chart__copy__description">{description}</p>
</div>