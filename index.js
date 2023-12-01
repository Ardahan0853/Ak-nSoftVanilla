
let websites = []
let nonWebsites = []

// Initialize PlacesService
const placesService = new google.maps.places.PlacesService(map);

// Define the location for the search
const centerLocation = new google.maps.LatLng(38.423734, 27.142826); 

// Set up Nearby Search request
const request = {
  location: centerLocation,
  radius: 5000,
  types: ['restaurant', 'cafe', 'lodging', 'bar', 'gym', 'pharmacy']
};

let request2 = []

// Perform Nearby Search
placesService.nearbySearch(request, (results, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      const place = results[i];
      // Access more details about each place in the 'place' object
      request2.push({
        placeId: place.place_id,
        fields: ['name', 'website'] 
      });
      
    }
    for(let i = 0; i < request2.length; i++){
      placesService.getDetails(request2[i], (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          
          if(place.website){
            websites.push(place.website)
            
          }else{
            nonWebsites.push(place.name)
            
          };
          
          
         
        } else {
          console.error('Place Details request failed:', status);
        }
      });
    }
    
  } else {
    console.error('Nearby Search failed:', status);
  }
  
});

let website = []

let nonWebsite = []


setTimeout(() => {
  for(let i = 0; i < websites.length; i++){
    website += `<li><a href="${websites[i]}">${websites[i]}</a></li>`
  }
  console.log(website)
  document.getElementById('nonEmptyWebsites').innerHTML = `<ul>${website}</ul>`
}, 2000);

setTimeout(() => {
  for(let i = 0; i < nonWebsites.length; i++){
    nonWebsite += `<li>${nonWebsites[i]}</li>`
  }
  console.log(nonWebsite)
  document.getElementById('emptyWebsites').innerHTML = `<ul>${nonWebsite}</ul>`
}, 2000);