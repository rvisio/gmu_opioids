var map = [];

var mapboxAccessToken = 'pk.eyJ1IjoicnZpc2lvIiwiYSI6ImNpbGZlcWp5dzFyNGd2cm0weHNkYXFmZmkifQ._SdrpHeG4bGCe7ugGJTc2Q';



var map = L.map('map').setView([37.8, -96], 4);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
}).addTo(map);

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
