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
   
    #closing {
        margin: 5em;
    }
</style>


<section class="conclusion">
    <div id="closing" class="callout">
        <div class="callout__contianer">
            <Image width={400} src="./assets/images/naga.jpg" alt="Black Woman in Head Wrap"/>
        </div>
        <div class="callout__contianer callout__copy">
            <p>{Copy.conclusion}</p>
        </div>
        <div class="bk"></div>
    </div>

    <MapInterface 
        data={data}
        title={Copy.conChartTitle}
        description={Copy.conChartSub}
    />
</section>
