/**
 * Elections Analysis
 */
var hostIP = window.location.host
var rootURL = "http://"+hostIP+"/WebService/bhm/election";

$( document ).ready(function(){
	getElectionsMentions();
	getElectionsSentiments();
});
var colorPP={labour:"#da1500",conservative:"#0098d9",liberal:"#fbc300",green:"#6ab023",ukip:"#722889"}
var resultElectionData = [
	{data:[[191321, 4]],color: colorPP.labour}, //Labour
	{data:[[109071, 3]],color: colorPP.conservative},  //Conservative
	{data:[[44163, 2]],color: colorPP.liberal},   //Liberal
	{data:[[20083, 1]],color: colorPP.green},    //Green
	{data:[[13098, 0]],color: colorPP.ukip},  //Ukip 
];
var ticks = [
	[4, "Labour"], [3, "Conservartive"], [2, "Liberal"], [1, "Green"], [0, "UKIP"]
]; 
var options = {
	label: "Political Partiec",
	series: {
        bars: {
            show: true,
            lineWidth: 0,
            order: 1,
            fillColor: {
                colors: [{
                    opacity: 1
                }, {
                    opacity: 0.7
                }]
            }
        }
    },
    bars: {
        align: "center",
        barWidth: 0.75,
        horizontal: true,
        lineWidth: 1
    },
    xaxis: {
    	
    },
    yaxis: {
        axisLabel: "Political Parties",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 12,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 3,
        tickColor: "#5E5E5E",
        tickLength: 0,
        ticks: ticks,
        color: "black"
    },
    xaxis: {
        axisLabel: "Number of Votes",
        axisLabelUseCanvas: true,
        axisLabelFontSizePixels: 15,
        axisLabelFontFamily: 'Verdana, Arial',
        axisLabelPadding: 10,
        max: 200000,
        tickColor: "#5E5E5E",
        color:"black"
    },
    legend: {
        noColumns: 4,
        labelBoxBorderColor: "#858585",
        position: "ne"
    },
    grid: {
        hoverable: true,
        borderWidth: 0
        //borderWidth: 1
        //backgroundColor: { colors: ["#171717", "#4F4F4F"] }
    }
};
var dataSet = [
   { label: "Election Results", data: resultElectionData, color: "#AB5800" }
];
$.plot("#CCC_election_result1",resultElectionData,options);
$.plot("#CCC_election_result2",resultElectionData,options);
$.plot("#CCC_election_result3",resultElectionData,options);

function getElectionsMentions(){
	//http://localhost:8080/WebService/bhm/tweet?geo=true&mapformat=true
	console.log('getElectionsMentions');
	$.ajax({
		type: 'GET',
		url: rootURL + '/mention',
		jsonp: 'callback',
        dataType: "jsonp",
        cache: false, // data type of response
		success: createGraphMentions, 
		error: function(xhr) {
		    //Do Something to handle error
			alert("error");
		}
	});
}

function getElectionsSentiments(){
	//http://localhost:8080/WebService/bhm/tweet?geo=true&mapformat=true
	console.log('getElectionsMentions');
	$.ajax({
		type: 'GET',
		url: rootURL + '/sentiment',
		jsonp: 'callback',
        dataType: "jsonp",
        cache: false, // data type of response
		success: createGraphSentiments, 
		error: function(xhr) {
		    //Do Something to handle error
			alert("error");
		}
	});
}
function createGraphMentions(data){
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	var pplist=list[0].data;
	var ppMentions=[];
	$.each(pplist, function(index, pp) {
		//{data:[[191321, 4]],color: colorPP.labour},
		var dataVal={};
		if(pp[0]=="conservative, pre-election"){
			dataVal={data:[[pp[1],3]],color: colorPP.conservative};
		}else if(pp[0]=="labour, pre-election"){
			dataVal={data:[[pp[1],4]],color: colorPP.labour};
		}else if(pp[0]=="liberal, pre-election"){
			dataVal={data:[[pp[1],2]],color: colorPP.liberal};
		}else if(pp[0]=="ukip, pre-election"){
			dataVal={data:[[pp[1],0]],color: colorPP.ukip};
		}else if(pp[0]=="green, pre-election"){
			dataVal={data:[[pp[1],1]],color: colorPP.green};
		}
		ppMentions[index]=dataVal;
	});
	options.xaxis.max=13000;
	$.plot("#CCC_election_ment",ppMentions,options);
}
function createGraphSentiments(data){
	var list = data == null ? [] : (data instanceof Array ? data : [data]);
	
	var ppPrePositives=new Object();
	var ppPreNegatives=[];
	var ppPostPositives=[];
	var ppPostNegatives=[];
	var totalPre=new Object();
	var totalPost=new Object();
	
	$.each(list, function(index, pp) {
		//{data:[[191321, 4]],color: colorPP.labour},
		var keys=pp.key;
		if(keys[1]=="pre-election"){
			if(keys[2]=="positive"){
				ppPrePositives[keys[0]]=pp.value;
			}else if(keys[2]=="negative"){
				ppPreNegatives[keys[0]]=pp.value;
			}
			if(totalPre[keys[0]]==null){
				totalPre[keys[0]]=pp.value;
			}else{
				totalPre[keys[0]]=totalPre[keys[0]]+pp.value;
			}
		}else if(keys[1]=="post-election"){
			if(keys[2]=="positive"){
				ppPostPositives[keys[0]]=pp.value;
			}else if(keys[2]=="negative"){
				ppPostNegatives[keys[0]]=pp.value;
			}
			if(totalPre[keys[0]]==null){
				totalPost[keys[0]]=pp.value;
			}else{
				totalPost[keys[0]]=totalPost[keys[0]]+pp.value;
			}
		}
	});
	
	
	var ppPrePositivesData=objectToDataSet(ppPrePositives,totalPre);
	var ppPreNegativesData=objectToDataSet(ppPreNegatives,totalPre);
	
	options.xaxis.max=100;
	$.plot("#CCC_election_ment_po",ppPrePositivesData,options);
	options.xaxis.max=100;
	$.plot("#CCC_election_ment_ne",ppPreNegativesData,options);
	
	//creatPrePostElections(ppPrePositives,ppPostPositives,"Pre Election","Post Election",totalPre,totalPost);
}
function objectToDataSet(dataset,total){
	var dataVal={}
	var result=[];
	var i=0;
	for(k in dataset){
		var perct=(100*dataset[k])/total[k];
		if(k=="conservative"){
			dataVal={"data":[[perct,3]],"color": colorPP.conservative};
		}else if(k=="labour"){
			dataVal={"data":[[perct,4]],"color": colorPP.labour};
		}else if(k=="liberal"){
			dataVal={"data":[[perct,2]],"color": colorPP.liberal};
		}else if(k=="ukip"){
			dataVal={"data":[[perct,0]],"color": colorPP.ukip};
		}else if(k=="green"){
			dataVal={"data":[[perct,1]],"color": colorPP.green};
		}
		result[i]=dataVal;
		i++;
	}
	return result;
}
function creatPrePostElections(category1Data,category2Data,label1Data,label2Data,total1,total2){
	var parties=["conservative","labour","liberal","ukip","green"];
	//category1
	var dataSet1=[];
	for(i=0;i<parties.length;i++){
		alert(category1Data);
		var perct1=(100*category1Data[parties[i]])/total1[parties[i]];
		dataSet1[i]=[perct1,i];
	}
	//category2
	var dataSet2=[];
	for(i=0;i<parties.length;i++){
		var perct2=(100*category1Data[parties[i]])/total2[parties[i]];
		dataSet2[i]=[perct2,i]
	}
	alert(dataSet1);
	
	var dataGraph=[
       { label: label1Data, data: dataSet1 },
       { label: label2Data, data: dataSet2 },
   ]
	
	var optionGraph = {
        series: {
            bars: {
                show: true,
                barWidth: 12*24*60*60*350,
                lineWidth: 0,
                order: 1,
                fillColor: {
                    colors: [{
                        opacity: 1
                    }, {
                        opacity: 0.7
                    }]
                }
            }
        },
        xaxis: {
            tickLength: 0,
            ticks: ticks,
            axisLabel: 'Parties',
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 13,
            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
            axisLabelPadding: 15
        },
        yaxis: {
            axisLabel: 'Percentage Positive Mentions',
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 13,
            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
            axisLabelPadding: 5
        },
        grid: {
            hoverable: true,
            borderWidth: 0
        },
        legend: {
            backgroundColor: "#EEE",
            labelBoxBorderColor: "none"
        },
        colors: ["#AA4643", "#89A54E"]
    };
	$.plot($("#CCC_election_prepost"), dataGraph,optionGraph);
}