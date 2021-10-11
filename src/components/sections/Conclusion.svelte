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
            padding: 2em 0;
            max-width: 100%;
        }

        .ctas {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 16px;

            @include respond(phone) {
                margin-top: 8px;
                flex-direction: column;
                gap: 8px;
                max-width: 75%;
            }
        }

    }
</style>


<section class="conclusion">
    <div id="closing" class="callout">
        <div class="closing-bk">
            <Image width={100} height={100} format="%" src="/assets/images/BIA_Pattern_Black.jpg" alt="Black Pattern"/>
        </div>
        <div class="callout__contianer closing-copy ">
            <Image width={200} src="./assets/images/BIA_Logo_White.png" alt=""/>
            <p>{Copy.conclusion}</p>
            <div class="ctas">
                <a class="cta-btn" href="https://blackinnovationalliance.com/">Learn About Us</a>
                <a class="cta-btn-alt" href="https://blackinnovationalliance.com/">Read the Executive Summary</a>
                <a class="cta-btn" href="https://airtable.com/shrL6t3iLBN8mm0L7/tblAjHUkDPkTxuknm">Dive into the Data</a>
            </div>
        </div>
    </div>

    <MapInterface 
        data={data}
        title={Copy.conChartTitle}
        description={Copy.conChartSub}
    />
</section>
