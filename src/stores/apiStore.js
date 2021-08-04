import { writable, derived } from 'svelte/store';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const apiData = writable([]);

/** Data transformation.
Here we are only extracting the relevant fields that will be presented in the final
application.
**/
export const orgData = derived(apiData, ($apiData) => {
  if ($apiData){
    return $apiData.map(org => ({
        name: org.name,
        type: org.type,
        state: org.state,
        year: org.year,
        programs: org.programs,
        customer: org.customer,
        site: org.site,
        reach: org.reach,
        description: org.description,
        focus: org.focus,
        led: org.led
    }));
  }
  return [];
});