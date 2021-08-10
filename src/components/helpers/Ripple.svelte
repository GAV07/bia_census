<script>
    import {select} from 'd3-selection'
    import { gsap } from 'gsap';
    import { onMount } from 'svelte';
    
    
    let circles;
    
    onMount(() => {
        for(let i=0; i < 600; i++) {     
            const circle = document.createElement('div')
            circle.classList.add('circle')
            circles.appendChild(circle)
        }

        const t1 = gsap.timeline({ repeat: -1, yoyo: true })

        t1.fromTo( '.circle', 
            { scale: .6 }, 
            { scale: 0,
                 duration: 2, 
                 stagger: { 
                    amount: 1, 
                    grid: 'auto',
                    ease: 'linear', 
                    from: 200
                }
            }
        )
    })
    
    
</script>
    
<style>
    .circles {
        position: absolute;
        top: 20vh;
        right: 45vh;
        width: 200px;
        height: 200px;
        clip-path: polygon(0 1%, 100% 50%, 0 100%, 43% 50%);
        display: flex;
        flex-wrap: wrap;
        z-index: 100;
    }

    :global(.circle) {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
        background-color: #fff;
        margin: 4px;
    }
</style>

<div class="intro__background">      
    <div class="circles" bind:this={circles}></div>       
</div>