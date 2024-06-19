const location_endpoint="https://ttp.cbp.dhs.gov/schedulerapi/locations/?temporary=false&inviteOnly=false&operational=true&serviceName=Global+Entry"
export default async function fetchlocation(){
    try {
        const data=await fetch(location_endpoint)
        const res=await data.json()
        const filtered=res.map((location)=>{
            return{
                id:location.id,
                name:location.name,
                shortName:location.shortName,
                timezone:location.tzData,
                country:location.countryCode
            }
        })
        filtered.sort((a,b)=>a.name.localeCompare(b.name))
        chrome.storage.local.set({locations:filtered})
        console.log(filtered)
    } catch (error) {
        console.log(error.message)
    }
    
}