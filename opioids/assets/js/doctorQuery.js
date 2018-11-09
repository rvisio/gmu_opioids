var npiEndpoint = 'https://npiregistry.cms.hhs.gov/api/?'
var state;
var address;
var city;
var doctorName;

var lat;
var lon;

var indictedDoctorList = [1053372201, 1003130352, 1912940677, 1841583994,1023079274 , 1265539860,1326019712 ,1508834706 ,
                         1528087970,1558540807, 1093726556,1275748675,1346377595,1598807547 ,1922047091,1942220017,
                         1184677957,1477504157,1154471621 ,1932293115 ,1043292477 , 1386831253,1982607370,1376537399,
                         1639175763 ,1053423764, 1912909490, 1174575187, 1104924349,1285632240 ,1902818743 ,1184952442,
                         1114056082, 1710929609, 9999999999];

function viewDoctorOnMap(){
//  var address = document.getElementById('address').value;
 // var state = document.getElementById('doctorState').value;

  var fullAddress = address + " " + city + "," + state;

  console.log(fullAddress);

  var request = $.ajax({
    crossDomain: true,
    async: true,
    //url:'http://54.226.94.153:5000/query/doctor/'+npi,
    url:'http://127.0.0.1:5000/geocode/'+fullAddress,
    type:"GET",
    dataType: "json",
    success: function(msg) {
      console.log("querying geocode");
      var t = JSON.parse(msg);
      console.log(t);
      lat = t.results[0].geometry.location.lat;
      lon = t.results[0].geometry.location.lng;

      console.log(lat);
      console.log(lon);

      location.href = '/?lat=' + lat + '&lon=' +lon + '&doctorName='+doctorName + '&address='+ address + "&opioidSales=2,357,007.64" + "&opioidPrescibingRate=60.96";
    }
  });
}

function queryDoctor(){
  console.log("the query doctor function has been called");

  // Get the values from the text input on the previous page
  var npi = document.getElementById('npi').value;
  var doctorLastName = null;

  // Make REST call to get the doctors information
  var xhr = new XMLHttpRequest();
  //build requqest
  if (npi && doctorLastName){
    npiEndpoint = npiEndpoint + 'number='+npi + "\&last_name="+doctorLastName;
  }else if (npi){
    npiEndpoint = npiEndpoint + 'number='+npi;
  }else if (doctorLastName){
    npiEndpoint = npiEndpoint + 'last_name='+doctorLastName;
  }else {
    alert("Please enter in an NPI or a doctors last name")
    return;
  }
  console.log(npiEndpoint);

  var indicted = 'No'
  if (indictedDoctorList.includes(parseInt(npi))){
      var indicted = 'Yes';
  }

  var request = $.ajax({
    crossDomain: true,
    async: true,
    //url:'http://54.226.94.153:5000/query/doctor/'+npi,
    url:'http://127.0.0.1:5000/query/doctor/'+npi,
    type:"GET",
    dataType: "json",
    success: function(msg) {
      console.log("we did it");
      var t = JSON.parse(msg);
      var doctor = t.results[0];
      console.log(doctor);
      state = doctor.addresses[0].state;
      address = doctor.addresses[0].address_1;
      city = doctor.addresses[0].city
      doctorName = doctor.basic.first_name +' ' + doctor.basic.last_name;
      $('#doctorName').html("<b>Doctor's Name: &emsp;</b>" + doctor.basic.first_name +' ' + doctor.basic.last_name);
      $('#doctorState').html("<b>Doctor's State: &emsp;</b>" + doctor.addresses[0].state);
      $('#address').html("<b>Doctor's Address: &emsp;</b>" + doctor.addresses[0].address_1);
      $('#specialty').html("<b>Doctor's Specialty: &emsp;</b>" + doctor.taxonomies[0].desc);
      $('#doctorNpi').html("<b>Doctor's NPI: &emsp;</b>"+ doctor.number);
      $('#investigateDoctor').html("<b>Investigate Doctor Further? &emsp;</b>" + indicted);


    }
  });






}
