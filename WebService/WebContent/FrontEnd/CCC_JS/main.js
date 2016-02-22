/**
 * 
 */

// The root URL for the RESTful services
var hostIP = window.location.host
var rootURL = "http://"+hostIP+"/WebService/bhm";

$( document ).ready(function(){
	//Register listeners
	$('#btnSearchTweet').click(function() {
		alert(1);
		searchTweet($('#searchKeyTweet').val());
		return false;
	});

	// Trigger search when pressing 'Return' on search key input field
	$('#searchKeyTweet').keypress(function(e){
		if(e.which == 13) {
			alert(2);
			searchTweet($('#searchKeyTweet').val());
			e.preventDefault();
			return false;
	    }
	});

	$('#btnSearchUser').click(function() {
		searchUser($('#searchKeyUser').val());
		return false;
	});

	// Trigger search when pressing 'Return' on search key input field
	$('#searchKeyUser').keypress(function(e){
		if(e.which == 13) {
			searchUser($('#searchKeyUser').val());
			e.preventDefault();
			return false;
	    }
	});
	
	mostTweetByDate();
});


function searchTweet(searchKey) {
	if (searchKey == ''){
		alert(3);
		findAllTweet();
	}else{
		alert(4);
		findTweetById(searchKey);
	}
}

function searchUser(searchKey) {
	if (searchKey == '') 
		findAllUser();
	else
		findUserByUsername(searchKey);
}

function findAllTweet() {
	console.log('findAll');
	alert(5);
	$.ajax({
		type: 'GET',
		url: rootURL + '/tweet' ,
		dataType: "json", // data type of response
		success: renderListTweet
	});
}

function findTweetById(searchKey) {
	console.log('findByName: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + '/tweet/' + searchKey,
		dataType: "json",
		success: renderListTweet 
	});
}

function findAllUser() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL + '/user/',
		dataType: "json", // data type of response
		success: renderListUser
	});
}

function findUserByUsername(searchKey) {
	console.log('findByName: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + + '/user/' + '/search/' + searchKey,
		dataType: "json",
		success: renderListUser 
	});
}

function renderListTweet(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);

	$('#displaySearch li').remove();
	$.each(list, function(index, tweet) {
		//$('#displaySearch ul').append('<li><a href="#" data-identity="' + wine.id + '">'+wine.name+'</a></li>');
		$('#displaySearch').append('<li>'+tweet._id+','+tweet.tweet_data.user.screen_name+','+tweet.tweet_data.text+'</li>');
	});
}

function mostTweetByDate(){
	console.log('getLangStats');
	$.ajax({
		type: 'GET',
		url: rootURL + '/statistics/mostTweetByDate',
		dataType: "json", // data type of response
		success: createPieMostTweet, 
		error: function(xhr) {
		    //Do Something to handle error
			alert("error");
		}
	});
}
function createPieMostTweet(data)
{
	colors = ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FF00","#00FF80","#00FFFF","#0080FF","#0000FF","#7F00FF","#FF00FF","FF007F","#808080"];
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	var mostTweetText=list[0].data;
	var mostTweetJSON = jQuery.parseJSON(mostTweetText);
	var dataGraph=[];
	for(var i = mostTweetJSON.length-1; i > -1; i--) {
	    var label = mostTweetJSON[i][0];
        var value = parseFloat(mostTweetJSON[i][1]);
        dataGraph[i]={"label":label,"value":value,"color":colors[i]};
	}
	
	//data: [
    //{label: "Download Sales", value: 12},
    //{label: "In-Store Sales", value: 30},
    //{label: "Mail-Order Sales", value: 20},
    //{label: "Mail-Order Sales", value: 20},
    //{label: "Mail-Order Sales", value: 20}
    //],
	//DONUT CHART
     var donut = new Morris.Donut({
       element: 'twetByDate-chart',
       resize: true,
       data:dataGraph,
       hideHover: 'auto',
       //Boolean - Whether we animate the rotation of the Doughnut
       animateRotate : true,
     //String - A legend template
       legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
     });
}
