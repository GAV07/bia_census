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
            transform: translateY(-160px);
            opacity: .2;
            fill: #fff;
        }
        @keyframes moveTop{
            to{
                transform: translateY(0px);
            }
        }
    }
</style>

<div id="pattern-container">
    <svg class="top" width="100%" height="calc(100% + 160px)">
        <pattern id="pattern" x="0" y="0" width="119" height="166" patternUnits="userSpaceOnUse">
            <path d="M25.9051 0.5L49.8231 76.469C51.1213 80.5924 45.8631 83.5581 43.006 80.314L25.9051 60.8972L8.01031 80.674C5.11818 83.8703 -0.0881834 80.8605 1.23843 76.7592L25.9051 0.5Z" fill="#C4C4C4"/>
            <path d="M94.4051 0.5L118.323 76.469C119.621 80.5924 114.363 83.5581 111.506 80.314L94.4051 60.8972L76.5103 80.674C73.6182 83.8703 68.4118 80.8605 69.7384 76.7592L94.4051 0.5Z" fill="#C4C4C4"/>
            <path d="M59.5949 83L35.6769 7.03097C34.3787 2.90761 39.6369 -0.0580652 42.494 3.18602L59.5949 22.6028L77.4897 2.826C80.3818 -0.370294 85.5882 2.6395 84.2616 6.74082L59.5949 83Z" fill="#C4C4C4"/>
            <path d="M25.0949 165.5L1.17685 89.531C-0.121349 85.4076 5.13685 82.4419 7.99399 85.686L25.0949 105.103L42.9897 85.326C45.8818 82.1297 51.0882 85.1395 49.7616 89.2408L25.0949 165.5Z" fill="#C4C4C4"/>
            <path d="M93.5949 165.5L69.6768 89.531C68.3787 85.4076 73.6368 82.4419 76.494 85.686L93.5949 105.103L111.49 85.326C114.382 82.1297 119.588 85.1395 118.262 89.2408L93.5949 165.5Z" fill="#C4C4C4"/>
            <path d="M60.4051 83L84.3231 158.969C85.6213 163.092 80.3631 166.058 77.506 162.814L60.4051 143.397L42.5103 163.174C39.6182 166.37 34.4118 163.361 35.7384 159.259L60.4051 83Z" fill="#C4C4C4"/>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)"></rect>
    </svg>
</div>