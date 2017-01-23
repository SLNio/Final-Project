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
function draw_chord() {

	// Add chart title
	$('#chordtitle').text('Antibiotics and resistant bacteria');

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
	var resistancePerc = 531, 
		emptyPerc = 0.1, // empty space between halves
		emptyStroke = Math.round(resistancePerc*emptyPerc), //emptyPerc in units
		pullOutSize = 70,
		labelDistance = 20,
		opacityDefault = 0.70,
		opacityHigh = 1,
		opacityLow = 0.02;

	var bacteria = ["A. baumanii", "K. pneumoniae", "E. faecium", "N. gonorrhoea", "Shigella", "M. tuberculosis", "P.mirabilis", "CoNS", "C. difficile", "P. aeruginosa", "S. pneumoniae", "E. coli", "S. aureus",]
	var families = ["Macrolides", "Cephalosporins", "Penicillins", "Fluorquinolones", "Aminoglycosides", "Carbapenems",]

	// Define names of data elements
	var element = bacteria.concat([""], families, [""]);	

	// Load dataset with d3
    d3.json("data/test2.json", function (error, matrix) {
        if (error) throw error;

        matrix[13][20] = emptyStroke;
        matrix[20][13] = emptyStroke;

        console.log(emptyStroke, matrix)

		// Formula to rotate the chord diagram clockwise, so the empty space is 
		// centered in middle
		var offset = Math.PI * (emptyStroke/(resistancePerc + emptyStroke)) / 2;

		//Include the offset in de start and end angle to rotate the Chord diagram clockwise
		function startAngle(d) { return d.startAngle + offset; }
		function endAngle(d) { return d.endAngle + offset; }

		// Initiate the inner chords design
		var chord = 
		// d3.layout.chord()
		customChordLayout() 
		    .padding(.04)
		    // .sortSubgroups(d3.descending) // sort the chords inside an arc from high to low
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
			.on("mouseover", fade(opacityLow))
			.on("mouseout", fade(opacityDefault))
			.on("click", function(d) { 
				if (d.index > bacteria.length && d.index < (element.length - 3)) {
					console.log(element[19])
					draw_map(element[d.index], d.index - bacteria.length - 1)
				}
			});
		
		// Draw the outer arcs
		g.append("path")
			  .attr("class", "arc")
			  .style("stroke", function(d,i) { return (element[i] === "" ? "none" : "#0570b0"); })
			  .style("fill", function(d,i) { return (element[i] === "" ? "none" : "#0570b0"); })
			  .style("pointer-events", function(d,i) { 
			  	return (element[i] === "" ? "none" : "auto"); 
			  })
			  .attr("d", arc)

		// Draw the outer arc labels
		g.append("text")
		    .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2 + offset})
		    .attr("dy", ".35em")
		    .attr("class", "titles")
		    .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
		    .attr("transform", function(d, i) {
		    	var c = arc.centroid(d);
				return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
				+ "translate(" + (innerRadius + labelDistance) + ")"
				+ (d.angle > Math.PI ? "rotate(180)" : "");
		    })
		    .text(function(d,i) { return element[i]; }); 

		// Draw the inner chords
		var chords = svg.selectAll("path.chord")
			.data(chord.chords)
			.enter().append("path")
			.attr("class", "chord")
			// .style("fill", "#C4C4C4")
			.style("fill", function(d,i) { return (element[d.source.index] == "" ? "none" : "#a6bddb"); })
			.style("opacity", opacityDefault)
			.style("pointer-events", function(d,i) { return (element[d.source.index] == "" ? "none" : "auto"); }) //Remove pointer events from dummy strokes
			.attr("d", path)

		//Chords
		chords.append("title")
			.text(function(d) {
				return Math.round(d.source.value) + "% resistance to " + element[d.target.index]; 
			});
			
		// Manage visibility of chords
		function fade(opacity) {
			return function(d, i) {
		    	svg.selectAll("path.chord")
		    		// check if this is not the one that is hovered over: apply opacity
			        .filter(function(d) { return d.source.index != i && d.target.index != i; })
					.transition()
			        .style("opacity", opacity);
		  	}
		}	
	})
}
