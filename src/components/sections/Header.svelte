<script></script>

<style lang="scss">
    @import '../../styles/abstracts/variables';

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

        img {
            min-width: 100px;
            max-height: 32px;
        }

        ul {
            list-style-type: none;
            display: flex;
            
            li {
                padding: 0 1em 0 1em;
            }
        }
    }
</style>

<div class="header">
    <a href="https://blackinnovationalliance.com/">
        <img src="./assets/images/BIA_Logo.png" alt="bia-logo">
    </a>
    <h3>Black Innovation Cens<em>Us</em></h3>
    <nav>
        <ul>
            <li>Geogrpahy</li>
            <li>Service</li>
            <li>Audience</li>
        </ul>
    </nav>
</div>