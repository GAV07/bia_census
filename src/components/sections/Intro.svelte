<script>
    import Header from './Header.svelte'
    import Ripple from '../helpers/Ripple.svelte'
    import Copy from '../../data/doc.json'
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

            h1 {
                font-weight: bold;
            }

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
                max-width: 800px;
                transform: translateY(100px);
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

    #lead-in {
        background-color: $primary3;
        border-radius: 10px;
        color: $white;
    }
    
</style>


<Header/>
<section class="intro">
    <div class="intro__area" id="intro__copy">
        <h1>Pathways to Prosperity</h1>
        <p>
            {Copy.opening}
        </p>
        <div class="intro__cta">
            <button class="cta-btn">Read the Story</button>
            <button class="cta-btn-alt">Submit your Org</button>
        </div>
    </div>
    <div class="intro__area">
        <Ripple
            top={"25vh"}
            right={"45vh"}
        />
        <Ripple
            top={"45vh"}
            right={"25vh"}
            
        />
        <Ripple
            top={"65vh"}
            right={"5vh"}
            
        />
        <img src="./assets/images/black-up.jpg" alt="Black Female">
    </div>
</section>
<article>
    <div class="copy" id="lead-in">
        <p>{Copy.leadIn}</p>
    </div>
</article>
