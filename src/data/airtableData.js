import Airtable from 'airtable';
import { apiData } from '../stores/apiStore'

export const base = new Airtable({apiKey: 'keyN1k9XF9da7gLtx'}).base('appjLRnzzcRAolMde');

let count = 0;

base('Black Organizations').select({
    maxRecords: 500,
    view: "Grid view"
})
.eachPage(function page(records, fetchNextPage) {
    
    // Data filter for relevant fields
    const cleanedData = records.map((record) => ({
        name: record.fields['Org. Name'],
        type: record.fields['Stakeholder Type'],
        state: record.fields['Headquarters (State)'],
        year: record.fields['Year Founded'],
        programs: record.fields['Programs (Activities)'],
        customer: record.fields['Primary Customer'],
        reach: record.fields['Reach'],
        site: record.fields['Website'],
        description: record.fields['Short Description'],
        focus: record.fields['Race/Ethnic Focus'],
        led: record.fields['Black Led Organization']
    }))

    // Pull data from multiple pages (100 record limit)
    if(count === 0) {
        apiData.set(cleanedData)
        count++;
    } else {
        apiData.update(currentData => {
            currentData = [...currentData, ...cleanedData]
            return currentData
        })
    }
    
    
    fetchNextPage();
    
}, 
function done(err) {
    if (err) { console.error(err); return; }
    
})

