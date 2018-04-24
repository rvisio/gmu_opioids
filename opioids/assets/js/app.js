var map = [];

var mapboxAccessToken = 'pk.eyJ1IjoicnZpc2lvIiwiYSI6ImNpbGZlcWp5dzFyNGd2cm0weHNkYXFmZmkifQ._SdrpHeG4bGCe7ugGJTc2Q';



var map = L.map('map').setView([37.8, -96], 4);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
}).addTo(map);

function showPittDeaths(){
  pittOverdoses();
  pittDoctors();

}

function pittOverdoses(){
  $.getJSON('assets/overdoseDeaths.json', function(json) {
    for (var key in json){
      if (json.hasOwnProperty(key)) {
        curValue =  json[key];
        if (curValue['Descendent Latitude'] && curValue['Descendant Longitude']){
          var marker = L.marker([curValue['Descendent Latitude'],curValue['Descendant Longitude']]).addTo(map);
          var popupText = "<b>Sex: </b>" + curValue["Sex"] + "</br><b>Age:</b> " + curValue["Age"] + "</br><b>Manner Of Death:</b> " + curValue["Manner of Death"];
          if(curValue["Combined OD1"]){
              popupText = popupText + "</br><b>Substance:</b> " + curValue["Combined OD1"];
          }
          if(curValue["Combined OD2"]){
              popupText = popupText + "," + curValue["Combined OD2"];
          }
          if(curValue["Combined OD3"]){
              popupText = popupText + "," + curValue["Combined OD3"];
          }
          if(curValue["Combined OD4"]){
              popupText = popupText + "," + curValue["Combined OD4"];
          }
          if(curValue["Combined OD5"]){
              popupText = popupText + "," + curValue["Combined OD5"];
          }
          if(curValue["Combined OD6"]){
              popupText = popupText + "," + curValue["Combined OD6"];
          }
          if(curValue["Combined OD7"]){
              popupText = popupText + "," + curValue["Combined OD7"];
          }
          marker.bindPopup(popupText)

        }
      }
    }
  });

  map.setView([40.4406, -79.9959],11);
}

function pittDoctors(){
  console.log("entering add doctors")
  $.getJSON('assets/pitt_doctors.json')
    .then(function (data){
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          curDoc = data[key];

          console.log(curDoc)
          var lat = curDoc['lat'];
          var lon = curDoc['lon'];

          console.log(typeof(lat));
          console.log(typeof(lon));

          var circle = L.circleMarker([lat,lon],
            {
              color: 'red',
              fillColor: "#f03",
              fillOpacity: 1.0,
              radius: 25,
            }).addTo(map);
          console.log("added doctor");
        }
      }
    })
    .fail( function(d, textStatus, error){
      console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    });
  console.log("Exiting");
}

$(document).one("ajaxStop", function() {
  $("loading").hide();
})

// togle sidebar
$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});
/**
* hide sidebar
**/
$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

// Remove all layers and reset map view to USA
function resetMapView(){
  map.setView([37.8, -96], 4);

  map.eachLayer(function (layer) {
      map.removeLayer(layer);
  });
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
      id: 'mapbox.light',
  }).addTo(map);
}
