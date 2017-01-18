/**************************************************************************	

	Name: Shan Li Nio
    Studentnumber: 6222420
    Final Project in Datavisualisation
    Filename: d3Finalproject.js
    Description: functions to create the linked views visualisation for the final project

    References: 

    Data:
   	Centre for Disease Dynamics, World Health Organisation: bit.ly/KIB_Antibiotics
	http://www.informationisbeautiful.net/visualizations/antibiotic-resistance/

	Datamap:
	http://datamaps.github.io/

	Selection bar:
	https://select2.github.io/examples.html#placeholders

***************************************************************************/
window.onload = function() {

	// Add selection bar with search field
	$(document).ready(function() {
		$(".js-example-basic-single").select2();
		placeholder: 'Select an option'
	});

	draw_chord();

	draw_map('Macrolides', 0);

	draw_barchart('Austria', 'AUT');
}
