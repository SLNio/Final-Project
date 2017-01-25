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

***************************************************************************/
function drawChord(bacteria, data, sampleSize, resistancePerc, emptyPerc, antibiotics, option) {

	// Add chart title
	$('#chordtitle').text('Antibiotics and resistant bacteria');

	document.getElementById('chord_diagram').innerHTML = "";

	// Define dimensions
	var margin = {top: 50, right: 50, bottom: 50, left: 50},
		width = 700 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom,
	    innerRadius = Math.min(width, height) * .39,
	    outerRadius = innerRadius * 1.05;

	// Initiate the SVG
	var svg = d3.select("#chord_diagram").append("svg:svg")
		.attr("class", "diagram")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		.append("svg:g")
	    .attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")");

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
		var offset = Math.PI * (emptyStroke/(resistancePerc + emptyStroke)) / 1.5;

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
			.on("mouseover", function(d, i) { fade(svg, undefined, opacityDefault, i, opacityLow)})
			.on("mouseout", function(d, i) { fade(svg, undefined, opacityDefault, i, opacityDefault) })
			.on("click", function(d) { 
				if (antibiotics.length < 7 && d.index > bacteria.length && 
					d.index < (element.length - 3)) {
						drawMap(element[d.index], d.index - bacteria.length - 1)
				}
				else {
					// open info window
				}
			});
		
		// Draw the outer arcs
		g.append("path")
			  .attr("class", "arc")
			  .style("stroke", function(d,i) { return (element[i] === "" ? "none" : "#19BAA2"); })
			  .style("fill", function(d,i) { return (element[i] === "" ? "none" : "#19BAA2"); })
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
					return "titles"
				}
			})
		    .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
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
			.style("fill", function(d,i) { return (element[d.source.index] == "" ? "none" : "#7ED0C4"); })
			.style("opacity", opacityDefault)
			.style("pointer-events", function(d,i) { return (element[d.source.index] == "" ? "none" : "auto"); }) //Remove pointer events from dummy strokes
			.attr("d", path)

		// Add tooltips
		chords.append("title")
			.text(function(d) {
				return Math.round(d.source.value) + "% resistance to " + element[d.target.index]; 
			});	

		$("#select")
		    .on("change", function(event) {

		     	// Get value of selected option
		        var option = $(this).val();
		        var index = getIndex(element, option)

		        fade(svg, undefined, opacityDefault, index, opacityLow)
		     
		});
	})
}