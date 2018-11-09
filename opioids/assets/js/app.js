var map = [];

var mapboxAccessToken = 'pk.eyJ1IjoicnZpc2lvIiwiYSI6ImNpbGZlcWp5dzFyNGd2cm0weHNkYXFmZmkifQ._SdrpHeG4bGCe7ugGJTc2Q';

var map = L.map('map').setView([37.8, -96], 4);


var urlParams = new URLSearchParams(window.location.search);

console.log(urlParams.has('lat'));

if (urlParams.has('lat')){
  displayDoctor(urlParams.get('lat'), urlParams.get('lon'));
}

console.log(urlParams);

var redCrossIcon = L.icon({
  iconUrl:'assets/red_cross.png',
  iconSize: [38,45],
  iconAnchor: [22,94]
});

var dojIcon = L.icon({
  iconUrl:'assets/doj.png',
  iconSize: [68,75]
})

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
}).addTo(map);

function showPittDeaths(){
  pittOverdoses();
  pittDoctors();
}

function displayDoctor(lat,lon){
  var doctorMarker = L.marker([lat,lon]).addTo(map);
  var popupText = "<b>Name:</b> " + urlParams.get('doctorName') + "<br><b>Address:</b> " + urlParams.get('address') + "<br><b>Opioid Sales:</b> $" + urlParams.get('opioidSales')+ "<br><b>Opioid Prescription Rate:</b> " + urlParams.get('opioidPrescibingRate') + "%";

  doctorMarker.bindPopup(popupText)

  map.setView([lat,lon],15);
}



$(window).load(function(){
   // PAGE IS FULLY LOADED
   // FADE OUT YOUR OVERLAYING DIV
   $('#loading').fadeOut();


});

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

          var doctorMark = L.marker([lat,lon],
            {icon: redCrossIcon, zIndexOffset:-999}).addTo(map);

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


function showIndictedDoctors() {
  $.getJSON('assets/indictedDoctors.json', function(json) {
    for (var key in json){
      if (json.hasOwnProperty(key)) {
        curValue =  json[key];
        var marker = L.marker([curValue['lat'],curValue['lon']], {icon: dojIcon}).addTo(map);

        popupText = '<b>Doctor Name:</b> ' + curValue['doctorName'] + '<br><b>Additional Notes:</b> ' + curValue['sentence'];
        marker.bindPopup(popupText);
      }
    }
  });
}
