<script>
    import Header from './Header.svelte'
    import Ripple from '../tools/Ripple.svelte'
    import Copy from '../../data/doc.json'
    import Image from '../tools/Image.svelte'
    import MediaQuery from '../tools/MediaQuery.svelte';
    import { fly } from 'svelte/transition'

    let y;
    let visible = true;

</script>

<style lang="scss">
    @import '../../styles/abstracts/variables';
    @import '../../styles/abstracts/mixins';

    .intro {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        overflow: hidden;
        margin-bottom: 2em;

        @include respond(phone) {
            height: 100vh;
        }
        
        &__background {
            position: absolute;
            opacity: .3;
        }

        &__copy {
            height: 60%;
            align-items: flex-start;
            z-index: 2;

            @include respond(phone) {
                    margin: 8em 0;
                }

            .lead {
                @include respond(phone) {
                    color: $primary2;
                }
            }

            h1 {
                font-size: $huge-font-size;
                color: $primary1;
                margin-bottom: .5em;

                @include respond(phone) {
                    font-size: $large-font-size;
                }
            }


            &__first {
                font-size: $mid-font-size;
                color: $primary3;
                margin-bottom: 1.5em;

                @include respond(phone) {
                    color: $white;
                    font-size: $default-font-size;
                }
            }
            &__second {
                margin-bottom: 2em;
                font-size: $default-font-size;

                @include respond(phone) {
                    color: $bk;
                    font-size: $phone-font-size;
                }
            }

            
            p {
                padding-right: 3em; 
                line-height: 1.5;
            }

            &__cta { 
                width: 100%;
                height: 100%;
                display: flex;
                gap: 2em;

                @include respond(phone) {
                    flex-direction: column;
                    max-width: 42vw;
                }
            }

        }

        &__area {
            width: 50vw;
            padding: 0 2em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;

            @include respond(phone) {
                    width: 100vw;
                    padding-left: 2em;
            }

            &__overlay {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                width: 100%;
                height: 100%;
                background-color: $primary3;
                opacity: .7;
            }

            .img-container {
                position: relative;
                overflow: hidden;
                height: 100vh;
                width: 50vw;

                @include respond(phone) {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100vw;
                }

                img {
                    position: absolute;
                    top: 0%;
                    left: 0%;
                    max-width: 200%;
                    width: 100%;
                    transition: transform ease-in-out;
                }
            }
        }
    }
    
</style>

<svelte:window bind:scrollY={y} />

<Header/>
<section class="intro">
    <div class="intro__background">
        <Image width={100} format="%" src="/assets/images/BIA_Pattern_Fog.jpg" alt="background"/>
    </div>
    <div class="intro__area intro__copy">
        <p id="intro__lead" class="lead">The Time is Now</p>
        <h1 transition:fly="{{ x: -20, duration: 1000}}" class="intro__copy__title">Pathways to Prosperity</h1>
        <p transition:fly="{{ x: -10, duration: 1000, delay: 1000}}" class="intro__copy__first">
            {Copy.opening1}
        </p>
        <p transition:fly="{{ x: -10, duration: 1000, delay: 1000}}" class="intro__copy__second">
            {Copy.opening2}
        </p>
        <div class="intro__copy__cta">
            <a href="#open-call" transition:fly="{{ x: -10, duration: 1000, delay: 2000}}" class="cta-btn">Read the Story</a>
            <a href="" transition:fly="{{ x: -10, duration: 1000, delay: 2500}}" class="cta-btn-alt">Submit your Org</a>
        </div>
    </div>
    <div class="intro__area intro__image">
        <MediaQuery query="(min-width: 1281px)" let:matches>
            {#if matches}
                <Ripple
                    top={"25vh"}
                    right={"45vh"}
                />
                <Ripple
                    top={"45vh"}
                    right={"25vh"}
                    
                />
                <Ripple
                    top={"65vh"}
                    right={"5vh"}
                    
                />
            {/if}
        </MediaQuery>
        <MediaQuery query="(max-width: 480px)" let:matches>
            {#if matches}
                <div class="intro__area__overlay"></div>
            {/if}
        </MediaQuery>
        <div class="img-container">
            <Image src="/assets/images/andrey1.jpg" alt="Black Woman"/>
        </div>
    </div>
</section>
<article>
    <div id="open-call" class="callout">
        <MediaQuery query="(min-width: 1281px)" let:matches>
            {#if matches}  
                <div class="callout__contianer callout__image">
                    <Image width={500} src="./assets/images/wesley.jpg" alt="Black Woman in Head Wrap"/>
                </div>
            {/if} 
        </MediaQuery>
        <div class="callout__contianer callout__copy">
            <p id="callout__lead" class="lead">The Time is Now</p>
            <p>{Copy.intro}</p>
        </div>
        <div class="bk"></div>
    </div>
</article>
