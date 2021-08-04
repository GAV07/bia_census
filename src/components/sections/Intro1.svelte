<script>
    import Header from './Header.svelte'
    import Arrows from '../helpers/Arrow.svelte'
</script>

<style lang="scss">
    .intro {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 2fr 1fr 2fr 1fr;
        grid-template-rows: repeat(5, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        justify-items: center;
        align-items: start;

        &__copy {
            min-width: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                max-width: 200px;
                margin-bottom: 16px;
            }

            &__title {
                background-color: black;
                color: white;
                text-align: center;
                margin-bottom: 32px;
                padding: .5em 1em .5em 1em;
            }
        }

        &__cta { 
            width: 100%;
            grid-area: 7 / 4 / 5 / 4; 
            display: flex;
            justify-content: space-around;
        }
    }

    #innovators { grid-area: 3 / 2 / 5 / 3; }
    #supporters { grid-area: 3 / 6 / 5 / 7; }
    #overall { 
        text-align: center;
        grid-area: 2 / 4 / 3 / 5; 
    }

</style>


<Header/>
<section class="intro">
    <Arrows/>
    <div class="intro__copy" id="overall">
        <h2 class="intro__copy__title">Pathways to Prosperity</h2>
        <h3>The pathways to Black propsperity will be created by those who dare to see the different </h3>
    </div>
    <div class="intro__copy" id="innovators">
        <img src="./assets/images/male.png" alt="black male">
        <h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
    </div>
    <div class="intro__copy" id="supporters">
        <img src="./assets/images/female.png" alt="black female">
        <h3>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h3>
    </div>
    <div class="intro__cta">
        <button class="cta-btn">Read the Story</button>
        <button class="cta-btn-alt">Submit your Org</button>
    </div>
</section>
