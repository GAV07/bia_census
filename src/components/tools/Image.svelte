<script>
    export let src
    export let alt
    export let width = 800;
    export let height;
    export let format = "px"
  
    import { onMount } from 'svelte'
  
    let loaded = false
    let thisImage
  
    onMount(() => {
      thisImage.onload = () => {
        loaded = true
      }
    }) 
  
  </script>
  
  <style>
    img {
      opacity: 0;
      transition: opacity 1200ms ease-out;
    }
    img.loaded {
      opacity: 1;
    }
  </style>
  
  <img width="{width}{format}" height="{height}{format}" {src} {alt} class:loaded bind:this={thisImage} />