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

	Selection bar:
	https://select2.github.io/examples.html#placeholders

***************************************************************************/
window.onload = function() {

	var bacteria = [
		"A. baumanii", "K. pneumoniae", "E. faecium", "N. gonorrhoea", "Shigella", 
		"M. tuberculosis", "P. mirabilis", "CoNS", "C. difficile", "P. aeruginosa", 
		"S. pneumoniae", "E. coli", "S. aureus",
	]

	var familySettings = {
		data: "data/antibiotic_families.json",
		sampleSize: 20,
		resistancePerc: 531,
		emptyPerc: 0.2,
		antibiotics: [
			"Macrolides", "Cephalosporins", "Penicillins", 
			"Fluorquinolones", "Aminoglycosides", "Carbapenems",
		]
	}
	
	var individualSettings = {
		data: "data/antibiotic_individual.json",
		sampleSize: 40,
		resistancePerc: 860,
    	emptyPerc: 0.2,
    	antibiotics: [
    		"Penicillin", "Streptomycin", "Chloramphenicol", "Isoniazid", 
			"Vancomycin", "Tetracycline", "Kanamycin", "Oxacillin", "Methicillin", 
			"Ampicillin", "Sulfamethoxazole", "Cefalotin", "Gentamycin", 
			"Nalidixic acid", "Rifampicin", "Clindamycin", "Trimethoprim-sulfa", 
			"Amikacin", "Amoxicillin", "Ceftriaxone", "Ceftazidime", 
			"Ampicillin-sulbactam", "Cetiofur", "Ciprofloxacin", "Moxifloxacin", 
			"Piperacillin-tazobactam",	
		]
	}

	// Draw chord diagram for selected antibiotics option
	d3.selectAll(".btn-default")
	    .on("click", function() {

	    	// Get value of selected antibiotics option
	        var option = this.getAttribute("value");

	        if(option == "family"){
	        	settings = familySettings;
	        }
	        else{
	        	settings = individualSettings;
	        }
	        changeSelectionbar(bacteria, settings.antibiotics)
	        drawChord(bacteria, settings.data, settings.sampleSize, settings.resistancePerc, settings.emptyPerc, settings.antibiotics, option)
		});

	var settings = familySettings;
	var option = ""

	// Initiate selection bar
	changeSelectionbar(bacteria, settings.antibiotics)

	// Initiate chord diagram
	drawChord(bacteria, settings.data, settings.sampleSize, settings.resistancePerc, settings.emptyPerc, settings.antibiotics, option)

	// Initiate datamap
	drawMap('Macrolides', 0);

	// Initiate barchart
	drawBarchart('Austria', 'AUT');
}

	