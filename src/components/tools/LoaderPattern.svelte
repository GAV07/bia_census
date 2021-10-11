<script>
    import gsap from 'gsap'
    import { onMount } from 'svelte';


    onMount(() => { 

    })
</script>

<style lang="scss">
    #pattern-container {
        position: absolute;
        width: 100vw;
        height: 100vh;
        opacity: .5;

        .top{
            animation: moveTop 10s linear infinite;
            transform: translateX(-160px);
            opacity: .2;
            fill: #fff;
        }
        @keyframes moveTop{
            to{
                transform: translateX(0px);
            }
        }
    }
</style>

<div id="pattern-container">
    <svg class="top" width="calc(100% + 160px)" height="100%">
        <pattern id="pattern" x="0" y="0" width="165" height="50" patternUnits="userSpaceOnUse">
            <path  d="M165 25.4051L89.031 49.3231C84.9076 50.6213 81.9419 45.3631 85.186 42.506L104.603 25.4051L84.826 7.51031C81.6297 4.61817 84.6395 -0.588187 88.7408 0.738423L165 25.4051Z"/>
            <path  d="M-1.32905e-06 24.5949L75.969 0.676848C80.0924 -0.621345 83.0581 4.63685 79.814 7.494L60.3972 24.5949L80.174 42.4897C83.3703 45.3818 80.3605 50.5882 76.2592 49.2616L-1.32905e-06 24.5949Z"/>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"></rect>
    </svg>
</div>