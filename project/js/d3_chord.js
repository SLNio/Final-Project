/**************************************************************************	

	Name: Shan Li Nio
    Studentnumber: 6222420
    Final Project in Datavisualisation
    Filename: d3_stretched_chord.js
    Description: functions to create the stretched chord diagram to show the trends
    in antibiotic resistance

    References: 

    Interactive chord diagram:
    https://github.com/nbremer/Chord-Diagram-Storytelling

	Stretched chord diagram:
	http://www.visualcinnamon.com/2015/08/stretched-chord.html

	Automatic scroll funcation:
    https://www.abeautifulsite.net/smoothly-scroll-to-an-element-without-a-jquery-plugin-2

    Selection bar:
	https://select2.github.io/examples.html#placeholders

***************************************************************************/
function drawChord(bacteria, data, label, sampleSize, resistancePerc, emptyPerc, 
	antibiotics, option) {

	// Add chart title
	$('#chordtitle').text('Antibiotics and resistant bacteria');

	document.getElementById('chorddiagram').innerHTML = "";

	// Define dimensions
	var margin = {top: 100, right: 60, bottom: 50, left: 150},
		width = 600,
	    height = 450,
	    innerRadius = Math.min(width, height) * .39,
	    outerRadius = innerRadius * 1.05;

	// Initiate the SVG
	var svg = d3.select("#chorddiagram").append("svg:svg")
		.attr("class", "diagram")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("svg:g")
	    .attr("transform", "translate(" + (margin.left + width / 2) + "," + 
	    	(margin.top + height / 2) + ")");

	// Define design elements of the chord diagram
	var emptyStroke = Math.round(resistancePerc*emptyPerc), //emptyPerc in units
		pullOutSize = 70,
		labelDistance = 20,
		opacityDefault = 0.5,
		opacityLow = 0.02;

	// Define elements of the right arc and the space between the arcs
	var bacteria = bacteria,
	emptySpace = [""];

	// Store all data elements in a list
	var element = bacteria.concat(emptySpace, antibiotics, emptySpace);

	// Load dataset with d3
    d3.json(data, function (error, matrix) {
        if (error) throw error;

        matrix[13][sampleSize] = emptyStroke;
        matrix[sampleSize][13] = emptyStroke;

		// Formula to rotate the chord diagram clockwise, so the empty space is 
		// centered in the middle
		var offset = Math.PI * (emptyStroke/(resistancePerc + emptyStroke)) 
			/ 1.5;

		//Include the offset in de start and end angle to rotate the Chord diagram clockwise
		function startAngle(d) { return d.startAngle + offset; }
		function endAngle(d) { return d.endAngle + offset; }

		// Initiate the inner chords design
		var chord = customChordLayout() 
		    .padding(.04)
		    .sortChords(d3.descending) // Stack the chords from high to low
			.matrix(matrix);

		// Initiate the inner chords
		var path = stretchedChord()
			  .radius(innerRadius)
			  .startAngle(startAngle)
			  .endAngle(endAngle)
			  .pullOutSize(pullOutSize);

		// Initiate the outer arcs
		var arc = d3.svg.arc()
		    .innerRadius(innerRadius)
		    .outerRadius(outerRadius)
		    .startAngle(startAngle)
			.endAngle(endAngle);

		// Define the div for the tooltip
		var tooltip = d3.select("body").append("div")
		    .attr("class", "d3-chord-tip")	
		    .style("opacity", 0);

		// Initiate the outer arc labels
		var g = svg.selectAll("g.group")
			.data(chord.groups)
		  .enter().append("svg:g")
			.attr("class", function(d) {return "group " + element[d.index];})
			.attr("d", arc)
			.attr("transform", function(d, i) { // Pull the two halves apart
				d.pullOutSize = pullOutSize * (d.startAngle > (Math.PI - offset) 
					? -1 : 1);
				return "translate(" + d.pullOutSize + ',' + 0 + ")";
			})
			.on("mouseover", function(d, i) { fade(svg, undefined, 
				opacityDefault, i, opacityLow)})
			.on("mouseout", function(d, i) { fade(svg, undefined, 
				opacityDefault, i, opacityDefault) })
			.on("click", function(d) { 
				if (antibiotics.length < 7 && d.index > bacteria.length) {
					$el = $('#infowindow')
					$el.show();
					$el.find('.text').html('<i>'+ element[d.index] + '</i><br><br><br><br><br><b>' + element[d.index]  + ' resistance</b>: ' + Math.round(d.value) + '%')
					if (d.index < (element.length - 3)) {
						automaticScroll('#intermediate')
						drawMap(element[d.index], d.index - bacteria.length - 1)
					}
				}
				else {
					d3.json('scripts/info.json', function (error, information) {
        				if (error) throw error;
        				
        				var dataset = {}
				        information.forEach(function(d){
				        	var attributes = {}
				        	name = d.name
							attributes['family'] = d.family
							attributes['characteristics'] = d.characteristics
							attributes['fullname'] = d.fullname
							dataset[d.name] = attributes
				        })
	   			        var info = dataset[element[d.index]]
	   			        if (d.index < bacteria.length) {
   			        		$el = $('#infowindow')
							$el.show();
							$el.find('.text').html('<i>'+ info.fullname + 
								'</i><br><br><b>Family</b>: ' + info.family  + 
								'<br><br><b>Infections</b>: ' + 
								info.characteristics + '<br><br><b>Resistant ' + 
								element[d.index] + '</b>: ' + Math.round(d.value) 
								+ '%')
	   			        }
	   			        else {
	   			        	$el = $('#infowindow')
							$el.show();
							$el.find('.text').html('<i>'+ element[d.index] + 
								'</i><br><br><b>Family</b>: ' + info.family  + 
								'<br><br><b>Bacterial target</b>: ' + 
								info.characteristics + '<br><br><b>'+ element[d.index]  + ' resistance</b>: ' + Math.round(d.value) + '%')
	   			        }
					})
				}
				$(document).ready(function() {
					$('#closeButton').on('click', function(e) { 
						$('#infowindow').hide(); 
				    });
				});
			})
		
		// Draw the outer arcs
		g.append("path")
			  .attr("class", "arc")
			  .style("stroke", function(d,i) { return (element[i] === "" ? 
			  	"none" : "#19BAA2"); })
			  .style("fill", function(d,i) { return (element[i] === "" ? 
			  	"none" : "#19BAA2"); })
			  .style("pointer-events", function(d,i) { 
			  	return (element[i] === "" ? "none" : "auto"); 
			  })
			  .attr("d", arc)

		// Draw the outer arc labels
		g.append("text")
		    .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2 + offset})
		    .attr("dy", ".35em")
		    .attr("class", function(d) {
		    	if (antibiotics.length < 7 && d.index > bacteria.length && 
					d.index < (element.length - 3)) {
		    		return "clickTitles"
				}
				else {
					return "nonclickTitles"
				}
			})
		    .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" 
		    	: null; })
		    .attr("transform", function(d, i) {
		    	var c = arc.centroid(d);
				return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
				+ "translate(" + (innerRadius + labelDistance) + ")"
				+ (d.angle > Math.PI ? "rotate(180)" : "");
		    })
		    .text(function(d,i) { return element[i]; })

		// Draw the inner chords
		var chords = svg.selectAll("path.chord")
			.data(chord.chords)
		  .enter().append("path")
			.attr("class", "chord")
			.style("fill", function(d,i) { return (element[d.source.index] == "" 
				? "none" : "#7ED0C4"); })
			.style("opacity", opacityDefault)
			.style("pointer-events", function(d,i) { 
				return (element[d.source.index] == "" ? "none" : "auto"); 
			}) //Remove pointer events from dummy strokes
			.attr("d", path)
			.on("mouseover", function(d){
				select(svg, undefined, opacityDefault, d.source.index, 
					d.target.index, opacityLow)
				tooltip.transition()		
	                .duration(200)		
	                .style("opacity", .9);
				tooltip.style("left", (d3.event.pageX) + "px")		
	                .style("top", (d3.event.pageY - 28) + "px")
	                .html( Math.round(d.source.value) + "% resistance to " + 
				            element[d.target.index]);	
			})
			.on("mouseout", function(d) {
				select(svg, undefined, opacityDefault, d.source.index, 
					d.target.index, opacityDefault)	
	            tooltip.transition()		
	                .duration(500)		
	                .style("opacity", 0);	
        	});

		svg.append("text")
			.attr("class", "chordLabels")
	        .attr("dx", "-24em")
			.attr("dy", "-13em")
			.text(label)
			.style("fill", "#a79e9e")
            .style("font-size", "18px")

		svg.append("text")
			.attr("class", "chordLabels")
	        .attr("dx", "15em")
			.attr("dy", "-13em")
			.text("Bacteria")
			.style("fill", "#a79e9e")
            .style("font-size", "18px")

		// Update chord diagram, based on users selection
		$("#select")
		    .on("change", function(event) {

		     	// Get value of selected option
		        var option = $(this).val();
		        if (option == null) {
		        	fade(svg, undefined, opacityDefault, undefined, opacityDefault)
		        }
		        else {
			        var index = getIndex(element, option)
			        fade(svg, undefined, opacityDefault, index, opacityLow)
			    }
			});
	})
}