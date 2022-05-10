const makeMap = async (target, center={ lat: 37.707622, lng: -122.417084 }) => {
   await checkData(()=>window.google);

   let map_el = $(target);

   if(!map_el.data("map")) map_el.data({
      "map": new google.maps.Map(map_el[0], {
         center,
         zoom: 12,
         disableDefaultUI: true,
         styles: mapstyles,
      }),
      "infoWindow": new google.maps.InfoWindow({content:''}),
   });

   return map_el;
}



const makeMarkers = (map_el, map_locs=[]) => {
   let {map,markers} = map_el.data();

   if(markers) markers.forEach(m=>m.setMap(null));

   markers = [];

   map_locs.forEach(l=>{
      let m = new google.maps.Marker({
         position: l,
         map,
         icon: {
            url: l.icon,
            scaledSize: {
               width:40,
               height:40,
            }
         }
      });
      markers.push(m);
   });

   map_el.data({markers});
   setTimeout(()=>{ setMapBounds(map_el,map_locs); }, 150);
}


const setMapBounds = (map_el,map_locs) => {
   let {map} = map_el.data();

   if(map_locs.length === 1) {
      map.setCenter(map_locs[0]);
      map.setZoom(14);
   } else if(map_locs.length === 0) {

   } else {
      let bounds = new google.maps.LatLngBounds(null);
      map_locs.forEach(l => {
         bounds.extend(l);
      });
      map.fitBounds(bounds);
   }
}




const mapstyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
]




