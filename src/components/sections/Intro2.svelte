<script>
    import Header from './Header.svelte'
    import Ripple from '../helpers/Ripple.svelte'
</script>

<style lang="scss">
    @import '../../styles/abstracts/variables';

    .intro {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        overflow: hidden;

        #intro__copy {
            align-items: flex-start;
            gap: 2em;

            p {
                font-size: $article-font-size;
                padding-right: 10em; 
                line-height: 1.5;
            }
        }

        &__area {
            width: 50vw;
            height: 60vh;
            padding: 2em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: left;

            img {
                max-width: 1000px;
                transform: translateY(200px);
            }
        }


        &__cta { 
            width: 100%;
            height: 100%;
            display: flex;
            
            button {
                margin-right: 32px;
            }
        }
    }
    
</style>


<Header/>
<section class="intro">
    <div class="intro__area" id="intro__copy">
        <h1>Pathways to Prosperity</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in nisi commodo, pellentesque leo vel, pellentesque orci. Nam viverra mi nec mauris elementum, ac lobortis nisi vestibulum. Cras vel augue lacinia, venenatis magna at, lacinia nisi. Proin vitae neque massa. Maecenas odio enim, interdum sit amet eros sed, mollis bibendum ex. Integer id dictum purus. Etiam tincidunt elit sit amet quam vulputate, eget auctor est suscipit. Praesent aliquam felis et maximus consectetur.
        </p>
        <div class="intro__cta">
            <button class="cta-btn">Read the Story</button>
            <button class="cta-btn-alt">Submit your Org</button>
        </div>
    </div>
    <div class="intro__area">
        <Ripple/>
        <img src="./assets/images/black-up.jpg" alt="Black Female">
    </div>
</section>
