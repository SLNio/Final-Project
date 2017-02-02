/**************************************************************************	

	Name: Shan Li Nio
    Studentnumber: 6222420
    Final Project in Datavisualisation
    Filename: d3_index.js
    Description: calls functions which make up the linked views visualisation for the final project

    References: 

    Data:
   	Centre for Disease Dynamics, World Health Organisation: bit.ly/KIB_Antibiotics
	http://www.informationisbeautiful.net/visualizations/antibiotic-resistance/

	Datamap:
	http://datamaps.github.io/

***************************************************************************/
window.onload = function() {

	var bacteria = [
		'A. baumanii', 'K. pneumoniae', 'E. faecium', 'N. gonorrhoeae', 
		'Shigella', 'M. tuberculosis', 'P. mirabilis', 'CoNS', 'C. difficile', 
		'P. aeruginosa', 'S. pneumoniae', 'E. coli', 'S. aureus',
	];

	var familySettings = {
		data: 'scripts/antibiotic_families.json',
		label: 'Antibiotic families',
		sampleSize: 20,
		resistancePerc: 531,
		emptyPerc: 0.2,
		antibiotics: [
			'Macrolides', 'Cephalosporins', 'Penicillins', 
			'Fluorquinolones', 'Aminoglycosides', 'Carbapenems',
		]
	}
	
	var individualSettings = {
		data: 'scripts/individual_antibiotic.json',
		label: 'Individual antibiotics',
		sampleSize: 35,
		resistancePerc: 859,
    	emptyPerc: 0.2,
    	antibiotics: [
    		'Penicillin', 'Streptomycin', 'Chloramphenicol', 'Isoniazid', 
			'Vancomycin', 'Tetracycline', 'Oxacillin', 'Methicillin', 
			'Ampicillin', 'Sulfamethoxazole', 'Cefalotin', 'Gentamycin', 
			'Rifampicin', 'Clindamycin', 'Trimethoprim-sulfa', 
			'Amoxicillin', 'Ceftazidime', 'Ampicillin-sulbactam', 
			'Ciprofloxacin', 'Moxifloxacin', 'Piperacillin-tazobactam',	
		];
	}

	// Draw chord diagram for selected antibiotics option
	$('.btn-default input')
	    .on('change', function() {

	    	// Get value of selected antibiotics option
	        var option = $('.btn-default input:radio:checked').val()

	        // Use antibiotic family data
	        if(option == 'family'){
	        	settings = familySettings;
	        }
	        // Use individual antibiotics data
	        else if (option == 'individual'){
	        	settings = individualSettings;
	        }
	        // Call functions to change selectionbar & chord diagram
	        changeSelectionbar(bacteria, settings.antibiotics)
	        drawChord(bacteria, settings.data, settings.label, 
	        	settings.sampleSize, settings.resistancePerc, settings.emptyPerc,
	        	settings.antibiotics, option)
		});

	var settings = familySettings,
		option = '';

	// Play introduction
	showText();

	// Initiate selection bar
	changeSelectionbar(bacteria, settings.antibiotics);

	// Initiate chord diagram
	drawChord(bacteria, settings.data, settings.label, settings.sampleSize, 
		settings.resistancePerc, settings.emptyPerc, settings.antibiotics, 
		option);

	// Show instruction text in barchart section
	showInstruction('#barchart', 'countries');

	// Initiate datamap
	drawMap('Macrolides', 0);

}

	
