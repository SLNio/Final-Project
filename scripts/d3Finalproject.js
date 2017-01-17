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

	Navigation bar:
	https://select2.github.io/examples.html#placeholders

***************************************************************************/
window.onload = function() {


	// Add selection bar with search field
	$(document).ready(function() {
		$(".js-example-basic-single").select2();
		placeholder: 'Select an option'
	});

	$('#chordtitle').text('Antibiotics and resistant bacteria');



	draw_map('Macrolides', 0);

	draw_barchart('Austria', 'AUT');




	// // Load datasets with D3
	// d3.json("Totaldata.json", function (error, Totaldata) {
	// 	if (error) throw error;

	// 	// Create a data-object
	// 	var dataset = {};
	// 	Totaldata.forEach(function(d){

	// 		// Convert string data into numeric data
	// 		total_primary = +d.lpc
	// 		total_secondary = +d.lsc
	// 		total_tertiary = +d.lhc

	// 		// Store education levels at a certain index
	// 		dataset[d.WBcode] = [total_primary, total_secondary, total_tertiary]
	// 	})

	// 	// Draw map for selected education type
 //        d3.selectAll(".education")
 //            .on("click", function() {

 //            	// Get value of selected education level
 //                var education = this.getAttribute("value");

 //                if(education == "primary"){
 //                    draw_map(0);
 //                }
 //                else if(education == "secondary"){
 //                    draw_map(1);
 //                }
 //                else{
 //                    draw_map(2);
 //                }
 //        });

 //        // Show scroll button
 //        var scroll_button = document.getElementById('btn-default');
 //        scroll_button.addEventListener('click', function() {
 //    		automatic_scroll('#container')
	// 	}, false);

 //        // Draw map function
 //        function draw_map(education) {

 //        	// Remove old map
	// 		document.getElementById('container').innerHTML = "";

	// 		// Load list of countries and country codes
	// 		var countries = Datamap.prototype.worldTopo.objects.world.geometries;
	// 		var new_data = {};

	// 		countries.forEach(function(d){

	// 			// Create a data object
	// 			var country_code = d.id;
	// 			var	total = dataset[country_code];

	// 			// Define categories
	// 			if (total == undefined){
	// 				new_data[country_code] = { fillKey: "group_0", data: 
	// 					['No data available'] }
	// 			}
	// 			else if (total[education] <= 10){
	// 				new_data[country_code] = { fillKey: "group_1", data: total }
	// 			}
	// 			else if (total[education] <= 20){
	// 				new_data[country_code] = { fillKey: "group_2", data: total }
	// 			}
	// 			else if (total[education] <= 30){
	// 				new_data[country_code] = { fillKey: "group_3", data: total }
	// 			}
	// 			else if (total[education] <= 40){
	// 				new_data[country_code] = { fillKey: "group_4", data: total }
	// 			}
	// 			else {
	// 				new_data[country_code] = { fillKey: "group_5", data: total }
	// 			}
	// 		})

	// 		// Create the tooltip titles
	//   		var list = ['Primary Education', 'Secondary Education', 
	//   			'Tertiary Education']

	//   		// Draw the datamap and tooltip
	//   		var map = new Datamap({
	// 			element: document.getElementById("container"),
	//      		width: 1200,
	// 			height: 550,
	// 			geographyConfig: {
	//     			highlightBorderColor: "#02818a",
	//    				popupTemplate: function(geography, Totaldata) {
	//       			return '<div class="hoverinfo"><strong>' + 
	//       				geography.properties.name + '</strong><br />'+ 
	//       				list[education] + ': ' +  Totaldata.data[education] + ' '
	//     			},
	//     			highlightFillColor: "#02818a",
	// 		    	highlightBorderWidth: 2
	// 		  	},
	// 			fills: {
	// 				group_0: "lightgrey",
	// 				group_1: "#fdd0a2",
	// 				group_2: "#fd8d3c",
	// 				group_3: "#f16913",
	// 				group_4: "#d94801",
	// 				group_5: "#a63603"	
	//   			},
	//   			data: new_data,

	//   			// Call functions when a country is clicked
	//   			done: function(datamap){
	// 	    		datamap.svg.selectAll('.datamaps-subunit').on('click', 
	// 	    			function(geography) {
	// 	 					select_country(geography)
	// 	 					automatic_scroll('.chartbox');
	//     			})
	//         	}
	//   		});

	//   		// Draw the map legend
	//   		map.legend({
	//     		legendTitle: 'Percentage of the population',
	// 		    labels: {
	//       			group_0: "No data available",
	// 			    group_1: "0 - 10%",
	// 			    group_2: "11 - 20%",
	// 			    group_3: "21 - 30%",
	// 			    group_4: "31 - 40%",
	// 			    group_5: "41 - 100%",
	//     		},
	//   		});
	// 	}
	//   	// Initialize map
 //        draw_map(0);

 //        // Smooth automatic scroll function
 //        function automatic_scroll(element){
 //        	$('html, body').animate({
	// 	    	scrollTop: $(element).offset().top
	// 		}, 1000);
 //        }

 //        // Prepare data for a selected country
 //  		function select_country(geography){
  	
 //  			// Get country id and country name
 //  			var country = geography.id;
 //  			var country_name = geography.properties.name;

 //  			// Show dynamic donut chart title
 //  			document.getElementById('country').innerHTML = "Country: " 
 //  				+ country_name;

 //  			// Load female dataset with D3
	//   		d3.json("Femaledata.json", function (error, Femaledata) {
	//   			if (error) throw error;

	//   			// Load male dataset with D3
	// 			d3.json("Maledata.json", function (error, Maledata) {
	// 				if (error) throw error;

	// 				// Convert string data into numeric data
	// 				var dataset_2 = {};
	// 				for (i = 0; i < Femaledata.length; i++) {
	// 					var m_primary = +Maledata[i].lpc,
	// 						f_primary = +Femaledata[i].lpc,
	// 						m_secondary = +Maledata[i].lsc,
	// 						f_secondary = +Femaledata[i].lsc,
	// 						m_tertiary = +Maledata[i].lhc,
	// 						f_tertiary = +Femaledata[i].lhc,
	// 						m_other = +Math.round(100 - m_primary - m_secondary 
	// 							- m_tertiary).toFixed(1),
	// 						f_other = +Math.round(100 - f_primary - f_secondary 
	// 							- f_tertiary).toFixed(1)

	// 						// Create data object
	// 						maledataset = [
	// 							{'education': 'primary', 'value': m_primary}, 
	// 							{'education': 'secondary', 'value': m_secondary}, 
	// 							{'education': 'tertiary', 'value': m_tertiary}, 
	// 							{'education': 'other', 'value': m_other}
	// 						]
	// 						femaledataset = [
	// 							{'education': 'primary', 'value': f_primary}, 
	// 							{'education': 'secondary', 'value': f_secondary}, 
	// 							{'education': 'tertiary', 'value': f_tertiary}, 
	// 							{'education': 'other', 'value': f_other}
	// 						]
	// 						dataset_2[Maledata[i].WBcode] = {
	// 							'M': maledataset, 
	// 							'F': femaledataset, 
	// 							'M_tooltip': male_tooltip_data, 
	// 							'F_tooltip': female_tooltip_data
	// 						}
	// 						male_tooltip_data = {
	// 							'primary': m_primary, 
	// 							'secondary': m_secondary, 
	// 							'tertiary': m_tertiary, 
	// 							'other': m_other
	// 						}
	// 						female_tooltip_data = {
	// 							'primary': f_primary, 
	// 							'secondary': f_secondary, 
	// 							'tertiary': f_tertiary, 
	// 							'other': f_other
	// 						}
	// 				}

	// 				if (dataset[country] == undefined) {
	// 					apologize()
	// 				}
	// 				else {

	// 					// Create (fe)male data objects for selected country
	// 					var maledata = dataset_2[country]['M'];
	// 					var femaledata = dataset_2[country]['F'];
	// 					var male_tooltip_data = dataset_2[country]['M_tooltip']
	// 					var female_tooltip_data = dataset_2[country]['F_tooltip']

	// 					// Define arc colors
	// 					var mColor = [
	// 					    '#3690c0',
	// 					    '#0570b0',
	// 					    '#045a8d',
	// 					    '#d9d9d9'
	// 					],
	// 						fColor = [
	// 					    '#e67d7e',
	// 					    '#d54546',
	// 					    '#b23738',
	// 					    '#d9d9d9'
	// 					]
	// 	        	}
	// 			});
	// 		});
	// 	}
	// 	// Initialize donut charts
	// 	select_country({id: 'NLD', properties: {name: 'Netherlands'}});
	// });
}
