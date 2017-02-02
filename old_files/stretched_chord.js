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
	var resistancePerc = 146, 
		emptyPerc = 0.5, // empty space between halves
		emptyStroke = Math.round(resistancePerc*emptyPerc), //emptyPerc in units
		pullOutSize = 50,
		labelDistance = 20,
		opacityDefault = 0.70,
		opacityLow = 0.02;

	// Define names of data elements
	var element = ["P. aeruginosa", "S. pneumoniae", "E. coli", "", "Penicillins", "Fluorquinolones", "Macrolides", ""];		


	// Initiate the matrix
	var matrix = [
		[0, 0, 0, 0, 0, 27, 0, 0], /*P. aeruginosa*/
	    [0, 0, 0, 0, 0, 0, 41, 0], /*S. pneumoniae */
		[0, 0, 0, 0, 45, 33, 0, 0], /*E. coli*/
		[0, 0, 0, 0, 0, 0, 0, emptyStroke], /*dummy arc*/
		[0, 0, 45, 0, 0, 0, 0, 0], /*Penicillins*/
		[27, 0, 33, 0, 0, 0, 0, 0], /*Fluorquinolones*/
		[0, 41, 0, 0, 0, 0, 0, 0], /*Macrolides*/
		[0, 0, 0, emptyStroke, 0, 0, 0, 0] /*dummy arc*/
	];

	// Formula to rotate the chord diagram clockwise, so the empty space is 
	// centered in middle
	var offset = Math.PI * (emptyStroke/(resistancePerc + emptyStroke)) / 2;

	//Include the offset in de start and end angle to rotate the Chord diagram clockwise
	function startAngle(d) { return d.startAngle + offset; }
	function endAngle(d) { return d.endAngle + offset; }

	// Initiate the inner chords design
	var chord = d3.layout.chord()
	    .padding(.04)
	    .sortSubgroups(d3.descending) // sort the chords inside an arc from high to low
	    .sortChords(d3.descending) // which chord should be shown on top when chords cross. Now the biggest chord is at the bottom
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

	// Initiate the color scale
	var colors = ["#C4C4C4","#69B40F","#EC1D25", "#FFF", "#C8125C","#008FC8","#10218B", "#FFF"],
		fill = d3.scale.ordinal()
	    	.domain(d3.range(element.length))
	    	.range(colors);

	// Create groups for every element
	var g = svg.selectAll("g.group")
		.data(chord.groups)
		.enter().append("svg:g")
		.attr("class", function(d) {return "group " + element[d.index];})
		.style("fill", function(d) { return fill(d.index); })
		.attr("d", arc)
		.attr("transform", function(d, i) { // Pull the two halves apart
			d.pullOutSize = pullOutSize * (d.startAngle > (Math.PI - offset) 
				? -1 : 1);
			return "translate(" + d.pullOutSize + ',' + 0 + ")";
		})
		.on("mouseover", fade(opacityLow))
		.on("mouseout", fade(opacityDefault));
	
	// Draw the outer arcs
	g.append("path")
		  .attr("class", "arc")
		  .style("stroke", function(d) { return fill(d.index); })
		  .style("fill", function(d) { return fill(d.index); })
		  .style("pointer-events", function(d,i) { return (element[i] === "" ? "none" : "auto"); })
		  .attr("d", arc)

	// Add the outer arc labels
	g.append("text")
	    .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2 + offset; })
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
		.style("fill", function(d) { return fill(d.source.index); })
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
		        .filter(function(d) { return d.source.index != i && d.target.index != i; })
				.transition()
		        .style("opacity", opacity);
	  	};
	};	
}