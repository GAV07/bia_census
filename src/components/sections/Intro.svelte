<script>
    import Header from './Header.svelte'
    import Ripple from '../tools/Ripple.svelte'
    import Copy from '../../data/doc.json'
    import Image from '../tools/Image.svelte'
    import gsap from 'gsap'
    import { onMount } from 'svelte'
    let y;

    // onMount(() => {
    //     let textWrapper = document.querySelector('.intro__area__title');
    //     textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    //     let tl = gsap.timeline({delay: .25})
    //     tl.fromTo(".letter", 
    //     { 
    //         opacity: 0
    //     },
    //     { 
    //         opacity: 1,
    //         stagger: { 
    //                 amount: .5, 
    //                 grid: 'auto',
    //                 ease: 'power3.out', 
    //             }
    //     }
    //     )
    // })
</script>

<style lang="scss">
    @import '../../styles/abstracts/variables';

    .intro {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        overflow: hidden;
        

        #intro__copy-wrapper {
            height: 60vh;
            align-items: flex-start;
            gap: 2em;
            z-index: 2;

            h1 {
                font-size: $mega-font-size;
            }

            p {
                font-size: $article-font-size;
                padding-right: 10em; 
                line-height: 1.5;
            }
        }

        &__area {
            width: 50vw;
            height: 100vh;
            padding: 0 3em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: left;

            .img-container {
                position: relative;
                overflow: hidden;
                height: 100vh;
                width: 50vw;

                img {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    max-width: 200%;
                    width: 100%;
                    transition: transform ease-in-out;
                }
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
        position: relative;
        padding: 4em 2em;
        border-radius: 10px;
        color: $white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        overflow: hidden;
        
        .bk {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: url("../assets/images/BIA_Pattern_Wakanda.jpg");
            z-index: -1;
        }

        img {
            max-width: 400px;
        }

        p {
            max-width: 600px;
            line-height: 1.7;
        }
    }
    
</style>

<svelte:window bind:scrollY={y} />

<Header/>
<section class="intro">
    <div class="intro__area" id="intro__copy-wrapper">
        <h1 class="intro__area__title">Pathways to Prosperity</h1>
        <p class="intro__area__description">
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
        <div class="img-container">
            <!-- <img style="transform: translate3d(0, -{y/100}%, 0) scale({(100+y/15)/100})" src="./assets/images/black-up.jpg" alt="Black Female"> -->
            <Image src="/assets/images/black-up.jpg" alt="Black Woman"/>
        </div>
    </div>
</section>
<article>
    <div id="lead-in">
        <Image src="./assets/images/black-in-wrap.jpg" alt="Black Woman in Head Wrap" width=400/>
        <p>{Copy.leadIn}</p>
        <div class="bk"></div>
    </div>
</article>
