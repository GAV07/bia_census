<script>
import {select} from 'd3-selection'
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { onMount } from 'svelte';

gsap.registerPlugin(MotionPathPlugin)

onMount(() => {
    let array = []
    for(let i=0; i < 100; i++) { array.push(i) }

    select("#group-one")
        .selectAll("circle")
        .data(array)
        .enter()
        .append("circle")
        .attr("class", "element-one")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 10)
    
    gsap.to(".element-one", {
        duration: 15, 
        motionPath: {
            path: "#top",
            align: "#top",
            autoRotate: true,
        },
        stagger: {
            each: 0.5,
            repeat: -1
        }
    })

    select("#group-two")
        .selectAll("circle")
        .data(array)
        .enter()
        .append("circle")
        .attr("class", "element-two")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 10)
    
    gsap.to(".element-two", {
        duration: 15, 
        motionPath: {
            path: "#bottom",
            align: "#bottom",
            autoRotate: true,
        },
        stagger: {
            each: 0.5,
            repeat: -1
        }
    })
})


</script>

<style lang="scss">
    .intro__background {
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: -1;

        &__lines {
            opacity: 0;
        }

        .elements {
            overflow: visible;
            opacity: .5;
        }
    }
</style>

<div class="intro__background">
    <svg class="intro__background__lines" viewBox="0 0 1436 385" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="top" d="M1 1C566.646 494.458 883.638 529.611 1435 1" stroke="black"/>
    </svg>
    <svg class="intro__background__lines" viewBox="0 0 1436 385" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="bottom" d="M1 384.39C566.646 -109.068 883.638 -144.222 1435 384.39" stroke="black"/>
    </svg>
    <svg class="elements" id="group-one"></svg>       
    <svg class="elements" id="group-two"></svg>       
</div>