<script>
    import Copy from '../../data/doc.json'
    import Image from '../tools/Image.svelte'
    import MapInterface from '../charts/MapInterface.svelte'
    import gsap from 'gsap'
    import { onMount } from 'svelte'
    
    export let data;

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

    @import '../../styles/abstracts/mixins';
   
    .conclusion {
        padding-top: 0;
        margin-top: -5em;
    }
    
    #closing {
        flex-direction: column;
        justify-content: center;
        margin: 0;

        @include respond(phone) {
            margin-bottom: 3em;
            padding: 4em 0;
            height: 90vh;
        }

    }
</style>


<section class="conclusion">
    <div id="closing" class="callout">
        <div class="closing-bk">
            <Image width={100} height={100} format="%" src="/assets/images/BIA_Pattern_Black.jpg" alt="Black Pattern"/>
        </div>
        <div class="callout__contianer">
            <Image width={200} src="./assets/images/BIA_Logo_White.png" alt=""/>
        </div>
        <div class="callout__contianer closing-copy ">
            <p>{Copy.conclusion}</p>
            <a class="cta-btn" href="https://blackinnovationalliance.com/">Learn More</a>
        </div>
    </div>

    <MapInterface 
        data={data}
        title={Copy.conChartTitle}
        description={Copy.conChartSub}
    />
</section>
