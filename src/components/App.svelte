<script>
  import Meta from "./Meta.svelte";
  import AsyncAirtable from 'asyncairtable'
  import Intro from './sections/Intro.svelte'
  import Geography from './sections/Geography.svelte'
  import Service from './sections/Service.svelte'
  import Innovators from "./sections/Innovators.svelte"
  import Layout from "./tools/_Layout.svelte"
  import PreLoader from '../components/sections/PreLoader.svelte'

  const asyncAirtable = new AsyncAirtable('keyN1k9XF9da7gLtx', 'appjLRnzzcRAolMde')
  async function fetchOrgs() {
    const results = await asyncAirtable.select('Black Organizations');
    const cleanedData = results.map((org) => ({
        name: org.fields['Org. Name'],
        year: org.fields['Year Founded'],
        type: org.fields['Stakeholder Type'],
        state: org.fields['Headquarters (State)'],
        city: org.fields['Headquarters (City)'],
        programs: org.fields['Programs (Activities)'],
        customer: org.fields['Primary Customer'],
        reach: org.fields['Reach'],
        site: org.fields['Website'],
        description: org.fields['Short Description'],
        focus: org.fields['Race/Ethnic Focus'],
        led: org.fields['Black Led Organization'],
    }))
    return cleanedData
  }

  async function fetchFoun() {
    const results = await asyncAirtable.select('Black Founders');
    const cleanedData = results.map(founder => ({
      company: founder.fields['Company Name'],
      city: founder.fields['City'],
      state: founder.fields['State'],
    }))
    return cleanedData
  }

  let visible;
</script>


<!-- SEO -->
<Meta />

{#await fetchOrgs()}
  <PreLoader bind:visible/>
{:then orgs}
  {#if visible}
  <!-- Introduction to Story Project -->
  <Intro />

  <!------------- Section #1 - Location and Landscape (Distribution and Year) -->
  <Geography data={orgs}/>

  <!------------- Section #2 - What they do and how they serve (Programs and Type) -->
  <Service data={orgs}/>

  {#await fetchFoun()}
    {console.log("Founders Loading")}
  {:then founders}
    <!------------ Section #3 - Who is being served (Customers and Ethnic) -->
    <Innovators 
    data={orgs}
    altData={founders}
    />
  {/await}
  {/if}
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}