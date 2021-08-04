<script>
  import Meta from "./Meta.svelte";
  import { base } from '../data/airtableData'
  
  // import Intro from './sections/Intro1.svelte'
  import Intro from './sections/Intro2.svelte'
  import Geography from './sections/Geography.svelte'
  import Service from './sections/Service.svelte'
  import Innovators from "./sections/Innovators.svelte"
  import Layout from "./helpers/_Layout.svelte"
</script>


<!-- SEO -->
<Meta />

<!-- Introduction to Story Project -->
<Intro />

<!------------- Section #1 - Location and Landscape (Distribution and Year) -->
<Geography/>

<!------------- Section #2 - What they do and how they serve (Programs and Type) -->
<Service/>

<!------------ Section #3 - Who is being served (Customers and Ethnic) -->
<Innovators/>