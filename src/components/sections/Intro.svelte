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
        

        .intro__copy {
            height: 60%;
            align-items: flex-start;
            z-index: 2;

            h1 {
                font-size: $huge-font-size;
                color: $primary1;
                margin-bottom: .5em;
            }

            &__first {
                font-size: $mid-font-size;
                color: $primary3;
                margin-bottom: 1.5em;
            }
            &__second {
                margin-bottom: 2em;
            }

            
            p {
                font-size: $article-font-size;
                padding-right: 3em; 
                line-height: 1.5;
            }

            &__cta { 
                width: 100%;
                height: 100%;
                display: flex;
                gap: 2em;
            }

        }

        .intro__area {
            width: 50vw;
            padding: 0 2em;
            display: flex;
            flex-direction: column;
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
    }
    
</style>

<svelte:window bind:scrollY={y} />

<Header/>
<section class="intro">
    <div class="intro__area intro__copy">
        <p class="lead">The Time is Now</p>
        <h1 class="intro__copy__title">Pathways to Prosperity</h1>
        <p class="intro__copy__first">
            {Copy.opening1}
        </p>
        <p class="intro__copy__second">
            {Copy.opening2}
        </p>
        <div class="intro__copy__cta">
            <button class="cta-btn">Read the Story</button>
            <button class="cta-btn-alt">Submit your Org</button>
        </div>
    </div>
    <div class="intro__area intro__image">
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
            <Image src="/assets/images/black-up.jpg" alt="Black Woman"/>
        </div>
    </div>
</section>
<article>
    <div class="callout">
        <div class="callout__contianer">
            <Image width={400} src="./assets/images/wesley.jpg" alt="Black Woman in Head Wrap"/>
        </div>
        <div class="callout__contianer callout__copy">
            <p>{Copy.intro}</p>
        </div>
        <div class="bk"></div>
    </div>
</article>
