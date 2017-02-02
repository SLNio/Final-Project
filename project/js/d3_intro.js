/**************************************************************************	

	Name: Shan Li Nio
    Studentnumber: 6222420
    Final Project in Datavisualisation
    Filename: d3_intro.js
    Description: function to animate the introduction text

    https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval

***************************************************************************/

function showText(){

	// Array with introduction text
	var text = [
		'Frequent use of antibiotics has become widespread, due to their \
		increased global availability, their uncontrolled sale in many \
		developing countries and their use in livestock food.', 
		'As a result, humanity has exerted selective pressure on bacteria, \
		killing all susceptible colonies, while allowing the resistant colonies\
		to survive and multiply. This had led to a rapid increase in antibiotic\
		resistance levels.',
		'This page was created to visualize the different types of antibiotic\
		resistance and the consumption of antibiotic families in Europe.'	
	]

	// Repeating animation of introduction text
	var i = 0;

	$('#introText').text(text[i])
	setInterval(function() {

		i = (i + 1) % 3;
		$('#introText').text(text[i])

	}, 9000)
}