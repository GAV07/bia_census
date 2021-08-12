<script>
    import {select} from 'd3-selection'
    import { gsap } from 'gsap';
    import { onMount } from 'svelte';
    
    export let top;
    export let right;
    //export let timeDelay = 0;

    let circles;
    
    onMount(() => {
        for(let i=0; i < 600; i++) {     
            const circle = document.createElement('div')
            circle.classList.add('circle')
            circles.appendChild(circle)
        }

        const t1 = gsap.timeline({ repeat: -1, yoyo: true })

        t1.fromTo( '.circle', 
            { 
                scale: .6
            }, 
            { 
                scale: 0,
                duration: 2,
                stagger: { 
                    amount: 1, 
                    grid: 'auto',
                    ease: 'circ.out', 
                    from: 'random'
                }
            }
        )
    })
    
    
</script>
    
<style>
    .arrow {
        position: absolute;
        width: 150px;
        height: 150px;
        clip-path: polygon(0 1%, 100% 50%, 0 100%, 43% 50%);
        display: flex;
        flex-wrap: wrap;
        z-index: 100;
    }

    :global(.circle) {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        display: inline-block;
        background-color: #fff;
        margin: 2px;
    }
</style>

<div class="intro__background">      
    <div style="top:{top}; right:{right}" class="arrow" bind:this={circles}></div>       
</div>