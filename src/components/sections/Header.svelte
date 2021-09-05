<script>
    import MediaQuery from '../tools/MediaQuery.svelte';
    import Icon from '../tools/Icon.svelte';
    import { fly } from 'svelte/transition'
    import { onMount } from 'svelte'

    let visible = false;

    function showMenu() {
        visible = true;
    }
    function hideMenu() {
        visible = false;
    }
   
</script>

<style lang="scss">
    @import '../../styles/abstracts/variables';
    @import '../../styles/abstracts/mixins';

    .header {
        position: fixed;
        top: 0;
        z-index: 100;
        width: 100vw;
        height: 64px;
        padding: 0 2em 0 2em;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $primary3;
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(3px);
        
        h3 {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            min-width: 100px;
            pointer-events: none;

            em {
                color: $primary2;
            }
        }

        .mobile-title {
            font-size: $default-font-size;
        }

        img {
            min-width: 100px;
            max-height: 32px;
        }

        ul {
            list-style-type: none;
            display: flex;

            
            li {
                padding: 0 1em 0 1em;
                
                a {
                    font-size: $default-font-size;
                    text-decoration: none;
                    color: $primary3;
                }
            }
        }
    }

    .mobile {
        position: fixed;
        z-index: 100;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: rgba(29, 29, 29, 0.9);
        backdrop-filter: blur(3px);
        font-family: 'Montserrat Alternates', sans-serif;


        ul {
            list-style-type: none;

            #back {
                font-size: $mid-font-size;
                color: $primary1;
            }

            li {
                margin: 2em 0;

                a {
                    font-size: $large-font-size;
                    text-decoration: none;
                    color: $secondary2;
                }
            }
        }

    }
</style>



<MediaQuery query="(min-width: 1281px)" let:matches>
	{#if matches}
        <div class="header">
            <a href="https://blackinnovationalliance.com/">
                <img src="./assets/images/BIA_Logo.png" alt="bia-logo">
            </a>
            <h3>Black Innovation Cens<em>Us</em></h3>
            <nav>
                <ul>
                    <li><a href="#place">Place</a></li>
                    <li><a href="#service">Service</a></li>
                    <li><a href="#innovators">Audience</a></li>
                    <li><a href="#orgs">Organizations</a></li>
                </ul>
            </nav>
        </div>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 480px)" let:matches>
	{#if matches}
        <div class="header">
            <div on:click={showMenu}><Icon name="menu" width="1.5em" height="1.5em"/></div>
            <h3 class="mobile-title">Black Innovation Cens<em>Us</em></h3>
        </div>
        {#if visible}
            <div class="mobile" transition:fly="{{ y: 200, duration: 2000 }}">
                <nav>
                    <ul>
                        <li id="back" on:click={hideMenu}>Back</li>
                        <li><a href="#place">Place</a></li>
                        <li><a href="#service">Service</a></li>
                        <li><a href="#innovators">Audience</a></li>
                        <li><a href="#orgs">Organizations</a></li>
                    </ul>
                </nav>
            </div>
        {/if}
	{/if}
</MediaQuery>