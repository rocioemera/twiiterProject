/**
 * Photos
 */
var hostIP = window.location.host
var rootURL = "http://"+hostIP+"/WebService/bhm";

$( document ).ready(function(){
	getPopularPhotos();
	getElectionsPhotos();
	getSoccerPhotos();
	
});
function getPopularPhotos(){
	//http://localhost:8080/WebService/bhm/images/popular
	console.log('getPopularPhotos');
	jQuery.support.cors = true;
	$.ajax({
		type: 'GET',
		url: rootURL + '/images/popular?param=all',
		dataType: "json", // data type of response
		success: createImages, 
		error: function(xhr) {
		    //Do Something to handle error
			alert("error");
		}
	});
}

function getElectionsPhotos(){
	//http://localhost:8080/WebService/bhm/images/popular
	console.log('getElectionsPhotos');
	jQuery.support.cors = true;
	$.ajax({
		type: 'GET',
		url: rootURL + '/images/popular?param=elections',
		dataType: "json", // data type of response
		success: createImagesElections, 
		error: function(xhr) {
		    //Do Something to handle error
			alert("error");
		}
	});
}

function getSoccerPhotos(){
	//http://localhost:8080/WebService/bhm/images/popular
	console.log('getSoccerPhotos');
	jQuery.support.cors = true;
	$.ajax({
		type: 'GET',
		url: rootURL + '/images/popular?param=soccer',
		dataType: "json", // data type of response
		success: createImagesSoccer, 
		error: function(xhr) {
		    //Do Something to handle error
			alert("error");
		}
	});
}


function createImages(data)
{
	var list = data == null ? [] : (data instanceof Array ? data : [data]);

	 var trHTML = '';
	 var counter = 0;
	
	 
	 $.each(list, function(index, info) {
		 counter++;
		 if(counter==1)
			 {
			 	trHTML+= '<tr>';			 	
			 
			 }
		 trHTML +='<td><img src="' + info.value + '"width="200" height="250" /></td>';
		// $('#image-gallery').append('<tr><td><img src="' + info.value + '"width="350" height="350" /></td><td><img src="' + info.value + '" width="350" height="350" /></td><td><img src="' + info.value + '" width="350" height="350"/></td></tr>');
	
		 if(counter == 5)
			 {
			 	trHTML+= '</tr>';
			 		 counter = 0;
			 }
		
				 
		});
	
	 $('#image-gallery').append(trHTML);
     
}

function createImagesSoccer(data)
{
	var list = data == null ? [] : (data instanceof Array ? data : [data]);

	 var trHTML = '';
	 var counter = 0;
	
	 
	 $.each(list, function(index, info) {
		 counter++;
		 if(counter==1)
			 {
			 	trHTML+= '<tr>';			 	
			 
			 }
		 trHTML +='<td><img src="' + info.value + '"width="200" height="250" /></td>';
		// $('#image-gallery').append('<tr><td><img src="' + info.value + '"width="350" height="350" /></td><td><img src="' + info.value + '" width="350" height="350" /></td><td><img src="' + info.value + '" width="350" height="350"/></td></tr>');
	
		 if(counter == 5)
			 {
			 	trHTML+= '</tr>';
			 		 counter = 0;
			 }
		
				 
		});
	
	 $('#image-soccer').append(trHTML);
     
}

function createImagesElections(data)
{
	var list = data == null ? [] : (data instanceof Array ? data : [data]);

	 var trHTML = '';
	 var counter = 0;
	
	 
	 $.each(list, function(index, info) {
		 counter++;
		 if(counter==1)
			 {
			 	trHTML+= '<tr>';			 	
			 
			 }
		 trHTML +='<td><img src="' + info.value + '"width="200" height="250" /></td>';
		// $('#image-gallery').append('<tr><td><img src="' + info.value + '"width="350" height="350" /></td><td><img src="' + info.value + '" width="350" height="350" /></td><td><img src="' + info.value + '" width="350" height="350"/></td></tr>');
	
		 if(counter == 5)
			 {
			 	trHTML+= '</tr>';
			 		 counter = 0;
			 }
		
				 
		});
	
	 $('#image-elections').append(trHTML);
     
}

