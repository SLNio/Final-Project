
function showText(){

	// var textCenter = svg.append("g")

	$(".pager")
	    .on("change", function(event) {
	    	console.log("hallo")
	})

	var text = [
		"Frequent use of antibiotics has become widespread, due to their \
		increased global availability, their uncontrolled sale in many \
		developing countries and their use in livestock food.", 
		"As a result, humanity has exerted selective pressure on bacteria, \
		killing all susceptible colonies, while allowing the resistant colonies\
		to survive and multiply. This had led to a rapid increase in antibiotic\
		resistance levels.",
		"This page was created to visualize the different types of antibiotic\
		resistance and the consumption of antibiotic families in Europe."
	]

	$('#introText').text(text[0])

	// for (var i = 0; i < text.length; i++) {
	// 		$('#introText').text(text[i])

	// 			// .transition().delay(700)
	// 			// .duration(700)

	// }


}