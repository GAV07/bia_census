<script>
  import { fade } from 'svelte/transition'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte';

  export let visible;

  onMount(() => {
    gsap.to(".cls-1", 
      { 
        "stroke-dashoffset": 0,
        duration: 10,
        ease: "power2.out"
      })
  })
 
</script>

<style lang="scss">
  #pre-loader {
    position: relative;
  }
  #icon-container {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    #icon {
      max-width: 300px;
    }
    .cls-1{
      fill:none;
      stroke:#231f20;
      stroke-width: .75px;
      stroke-miterlimit:10;
      stroke-dasharray: 600;
      stroke-dashoffset: 600;
      fill-opacity: 0;
    }
  }
</style>

<div 
  id="pre-loader"
  transition:fade="{{delay: 2000}}"
  on:introstart="{() => visible = false}"
  on:outroend="{() => visible = true}"
>
  <div id="icon-container">
    <svg id="icon" viewBox="0 0 98.04 98.04">
      <path class="cls-1" d="M34.45,59.08,21.89,66.92a18.62,18.62,0,0,0,8.27,2l10.42-.53,2.29-1.43A20.39,20.39,0,0,1,34.45,59.08Z"/>
      <path class="cls-1" d="M42.87,30.36l-2.29-1.43L30.16,28.4a18.62,18.62,0,0,0-8.27,2l12.56,7.85A20.41,20.41,0,0,1,42.87,30.36Z"/>
      <path class="cls-1" d="M72.19,48.67l0,0,0,0L42.87,30.36a20.41,20.41,0,0,0-8.42,7.85L51.21,48.67,34.45,59.08a20.39,20.39,0,0,0,8.42,7.84Z"/>
      <path class="cls-1" d="M49.46,1.08A47.72,47.72,0,1,0,97.17,48.8,47.73,47.73,0,0,0,49.46,1.08Zm-36,58a20.33,20.33,0,0,1-2.93-10.33s0,0,0-.08v-.05c0-.09,0-.1,0-.09a20.3,20.3,0,0,1,2.93-10.32L30.14,48.62ZM93.13,48.64l0,0L61.56,68.35l-10.42.53a18.65,18.65,0,0,1-8.27-2l-2.29,1.43-10.42.53a18.62,18.62,0,0,1-8.27-2l12.56-7.84a20.53,20.53,0,0,1-2.93-10.33s0,0,0-.08v-.05c0-.09,0-.1,0-.09a20.49,20.49,0,0,1,2.93-10.32L21.89,30.36a18.62,18.62,0,0,1,8.27-2l10.42.53,2.29,1.43a18.65,18.65,0,0,1,8.27-2l10.42.53L93.09,48.62Z"/>
    </svg>
  </div>
</div>