var npiEndpoint = 'https://npiregistry.cms.hhs.gov/api/?'

function queryDoctor(){
  console.log("the query doctor function has been called");

  // Get the values from the text input on the previous page
  var npi = document.getElementById('npi').value;
  var doctorLastName = document.getElementById('lastName').value;

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

  var request = $.ajax({
    crossDomain: true,
    url:'http://127.0.0.1:5000/query/doctor/'+npi,
    type:"GET",
    dataType: "json",
    success: function(msg) {
      console.log("we did it");
      console.log(msg);
      $('#swipht').html(msg);
    }
  });






}
