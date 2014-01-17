$(document).ready(function(){
//search function for a XML file
// find the key and value you want to get from xml file
// then pass them into this function
var getNodeValue = function(key, value) {
	//declaring variable in scope of the function
	var retrievedValue
	//using jQuery to load the specific XML file then the data is passed into the function
	$.get( "data/buienxml.xml", function(data) {
		//we save our loaded data in a variable and then parse with the .parseXML function
		var xml = data,
		xmlDoc = $.parseXML( xml),
		$xml = $(xmlDoc);
		$(xml).find(key).each(function(){
			if($(this).find(value).length > 0) {
				retrievedValue = $(this).children(value)
				$("body").append(retrievedValue.text() + "<br /><br />");
			}
			return retrievedValue
		});
	})

}

// function for getting the weather report for each day
function dagPlus(dagNummer){
	//check if number is between 0 and 5 but not 0
	if (dagNummer > 0 && dagNummer <= 5){
		// getter functions
		this.getDate = function() {
			getNodeValue('dag-plus'+dagNummer,'datum')
		}
		
		this.getCurrentDay = function() {
			getNodeValue('dag-plus'+dagNummer,'dagweek')
		}

		this.getWindKracht = function() {
			getNodeValue('dag-plus'+dagNummer,'windkracht')
		}

		this.getMaxTemp = function() {
			getNodeValue('dag-plus'+dagNummer,'maxtemp')
		}

		this.getMinTemp = function() {
			getNodeValue('dag-plus'+dagNummer,'mintemp')

		}

		this.getAvgTemp = function() {
			
		}
	} else {
		alert('We dont have data for this day')
	}
}
	dagPlus1 = new dagPlus('1')
})